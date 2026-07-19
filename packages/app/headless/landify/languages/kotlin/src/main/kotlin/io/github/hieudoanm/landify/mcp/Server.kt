package io.github.hieudoanm.landify.mcp

import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonObject
import java.io.BufferedReader
import java.io.Writer

/**
 * An MCP server that speaks newline-delimited JSON-RPC 2.0 over stdio.
 *
 * Every tool shares one sandboxed [Workspace], so none of them can read or write
 * outside the server root.
 */
class Server {
    private val tools = linkedMapOf<String, Tool>()
    private val handlers = linkedMapOf<String, ToolHandler>()

    /** Registers a tool and the handler that runs it. */
    fun addTool(tool: Tool, handler: ToolHandler) {
        tools[tool.name] = tool
        handlers[tool.name] = handler
    }

    /**
     * Serves requests read from [reader] until EOF, writing replies to [writer]
     * and diagnostics to [diagnostics]. The two are separate because the reply
     * stream is a machine protocol: a stray log line on it desynchronises the
     * client, so nothing but JSON-RPC frames may ever be written to [writer].
     */
    fun run(reader: BufferedReader, writer: Writer, diagnostics: Appendable = System.err) {
        while (true) {
            when (val frame = readFrame(reader) ?: return) {
                is Frame.TooLong -> write(
                    writer,
                    errorResponse(null, ErrorCode.PARSE, "parse error: frame too large"),
                )
                is Frame.Line -> {
                    if (frame.text.isNotBlank()) handleMessage(frame.text.trim(), writer, diagnostics)
                }
            }
        }
    }

    /**
     * Decodes one JSON-RPC frame and dispatches it. Undecodable frames produce an
     * error reply. A notification — a frame with no id — is never answered,
     * whatever the method, because replying to one desynchronises the client.
     *
     * The notification check precedes the version check, so a notification that is
     * also malformed stays silent instead of producing a reply the client will
     * never match to a request.
     */
    private fun handleMessage(raw: String, writer: Writer, diagnostics: Appendable) {
        val request = try {
            json.decodeFromString<Request>(raw)
        } catch (e: Exception) {
            write(writer, errorResponse(null, ErrorCode.PARSE, "parse error: ${e.message}"))
            return
        }

        if (request.isNotification) {
            diagnostics.appendLine("[mcp] ignoring notification for method ${request.method}")
            return
        }
        if (request.jsonrpc != "2.0") {
            write(writer, errorResponse(request.id, ErrorCode.INVALID_REQUEST, "invalid jsonrpc version"))
            return
        }

        when (request.method) {
            "initialize" -> handleInitialize(request, writer)
            "ping" -> write(writer, successResponse(request.id, JsonObject(emptyMap())))
            "tools/list" -> handleListTools(request, writer)
            "tools/call" -> handleCallTool(request, writer)
            else -> write(
                writer,
                errorResponse(
                    request.id,
                    ErrorCode.METHOD_NOT_FOUND,
                    "method not found: ${request.method}",
                ),
            )
        }
    }

    /** Replies with the negotiated protocol version and this server's identity. */
    private fun handleInitialize(request: Request, writer: Writer) {
        val result = marshal(
            InitializeResult(
                protocolVersion = negotiatedVersion(request.params),
                capabilities = ServerCapabilities(ToolsCapabilities()),
                serverInfo = ServerInfo(SERVER_NAME, SERVER_VERSION),
            ),
        )
        write(writer, successResponse(request.id, json.parseToJsonElement(result).jsonObject))
    }

    /** Replies with every registered tool, sorted by name for a stable order. */
    private fun handleListTools(request: Request, writer: Writer) {
        val payload = marshal(ListToolsResult(tools.values.sortedBy { it.name }))
        write(writer, successResponse(request.id, json.parseToJsonElement(payload).jsonObject))
    }

    /**
     * Decodes the call params and invokes the named tool handler. Absent or null
     * params are treated as an empty object, so a call with no params names no
     * tool rather than failing to decode.
     */
    private fun handleCallTool(request: Request, writer: Writer) {
        val supplied = request.params
        // Only an absent or JSON-null params stands in for an empty object. Any
        // other non-object is a client bug worth reporting, so it is rejected
        // rather than silently treated as "no arguments".
        if (supplied != null && supplied !is JsonObject && supplied !is JsonNull) {
            return write(
                writer,
                errorResponse(request.id, ErrorCode.INVALID_PARAMS, "invalid params: expected an object"),
            )
        }
        val params = supplied as? JsonObject ?: JsonObject(emptyMap())
        val call = try {
            json.decodeFromJsonElement(ToolCallParams.serializer(), params)
        } catch (e: Exception) {
            return write(
                writer,
                errorResponse(request.id, ErrorCode.INVALID_PARAMS, "invalid params: ${e.message}"),
            )
        }

        val handler = handlers[call.name]
            ?: return write(
                writer,
                errorResponse(request.id, ErrorCode.METHOD_NOT_FOUND, "tool not found: ${call.name}"),
            )
        write(writer, successResponse(request.id, json.parseToJsonElement(marshal(handler.handle(call.arguments))).jsonObject))
    }

    /**
     * Emits one response frame. The payload is written compactly even though
     * tool payloads are pretty-printed, because the transport is one JSON
     * document per line — a multi-line frame would desynchronise the client.
     */
    private fun write(writer: Writer, response: Response) {
        writer.write(compact.encodeToString(Response.serializer(), response) + "\n")
        writer.flush()
    }

    companion object {
        /** The name this server identifies as. */
        const val SERVER_NAME = "landify-mcp"

        /** The version this server identifies as. */
        const val SERVER_VERSION = "1.0.0"

        private val json = Json { ignoreUnknownKeys = true }

        /** The wire codec: one compact JSON document per line. */
        private val compact = Json { }
    }
}
