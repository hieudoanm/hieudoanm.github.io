package io.github.hieudoanm.backbone.mcp

import io.github.hieudoanm.backbone.database.Database
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import java.io.BufferedReader
import java.io.BufferedWriter
import java.io.InputStream
import java.io.OutputStream
import java.io.PrintStream

/**
 * Model Context Protocol server exposing Backbone data as tools.
 *
 * The server speaks newline-delimited JSON-RPC 2.0 over stdio: one frame per
 * line, diagnostics to the [diagnostics] stream, and nothing but frames on
 * output. Tools run against the same SQLite database the Ktor routes use.
 */
class Server(
    private val output: BufferedWriter,
    private val diagnostics: PrintStream,
    private val handlers: Handlers,
    private val serverName: String,
    private val serverVersion: String,
) {
    /** Runs until the input stream reaches EOF, which is how a client signals shutdown. */
    fun serve(input: InputStream) {
        val reader = BufferedReader(input.reader())
        while (true) {
            when (val frame = readFrame(reader)) {
                is Frame.Eof -> return
                is Frame.TooLong -> write(
                    errorResponse(JsonNull, ErrorCode.PARSE, "parse error: frame too large"),
                )
                is Frame.Line -> handleMessage(frame.text)
            }
        }
    }

    /**
     * Decodes one frame and dispatches it. An undecodable frame produces a parse
     * error. A notification — a frame with no id — is never answered whatever the
     * method, because answering one desynchronises the client. That check precedes
     * the version check so a notification which is also malformed stays silent.
     */
    private fun handleMessage(text: String) {
        val request = runCatching { compact.decodeFromString(Request.serializer(), text) }.getOrElse { error ->
            write(errorResponse(JsonNull, ErrorCode.PARSE, "parse error: ${error.message}"))
            return
        }

        if (request.isNotification) {
            diagnostics.println("ignoring notification for method ${request.method ?: "<missing>"}")
            return
        }
        if (request.jsonrpc != JSONRPC_VERSION) {
            write(errorResponse(request.id ?: JsonNull, ErrorCode.INVALID_REQUEST, "invalid jsonrpc version"))
            return
        }

        val id = request.id ?: JsonNull
        when (request.method) {
            "initialize" -> write(successResponse(id, initializeResult(serverName, serverVersion)))
            "ping" -> write(successResponse(id, JsonObject(emptyMap())))
            "tools/list" -> write(successResponse(id, listToolsResult()))
            "tools/call" -> handleCall(id, request.params)
            null -> write(errorResponse(id, ErrorCode.INVALID_REQUEST, "invalid request: method is required"))
            else -> write(errorResponse(id, ErrorCode.METHOD_NOT_FOUND, "method not found: ${request.method}"))
        }
    }

    /** Returns the registered tools sorted by name, so a client sees a stable order. */
    private fun listToolsResult(): JsonElement =
        compact.encodeToJsonElement(ListToolsResult.serializer(), ListToolsResult(handlers.tools.sortedBy { it.name }))

    /**
     * Decodes the call params and runs the named handler. Absent or null params
     * are treated as an empty object so a call with no params names no tool
     * rather than failing to decode.
     */
    private fun handleCall(id: JsonElement, params: JsonElement?) {
        val call = runCatching { objectOrEmpty(params) }.getOrElse { error ->
            write(errorResponse(id, ErrorCode.INVALID_PARAMS, "invalid params: ${error.message}"))
            return
        }

        if (call.name !in handlers.tools.map { it.name }) {
            write(errorResponse(id, ErrorCode.METHOD_NOT_FOUND, "tool not found: ${call.name}"))
            return
        }
        val arguments = runCatching { call.argumentsObject() }.getOrElse { error ->
            write(errorResponse(id, ErrorCode.INVALID_PARAMS, "invalid params: ${error.message}"))
            return
        }
        val result = handlers.call(call.name, arguments)
        val encoded = runCatching { compact.encodeToJsonElement(ToolResult.serializer(), result) }
            .getOrElse { error ->
                write(errorResponse(id, ErrorCode.INTERNAL, "could not encode tool result: ${error.message}"))
                return
            }
        write(successResponse(id, encoded))
    }

    /**
     * Emits one compact frame. Responses are encoded compactly so a reply never
     * spans lines, which would desynchronise a line-oriented client.
     */
    private fun write(response: Response) {
        val encoded = runCatching { compact.encodeToString(Response.serializer(), response) }
            .getOrElse { error ->
                diagnostics.println("could not encode response: ${error.message}")
                return
            }
        runCatching {
            output.write(encoded)
            output.newLine()
            output.flush()
        }.onFailure { error ->
            diagnostics.println("could not write response: ${error.message}")
        }
    }
}

/** Runs the MCP server on stdio, using [output] and [diagnostics] for the two streams. */
fun runMcpServer(
    db: Database,
    output: OutputStream,
    diagnostics: PrintStream,
    serverName: String,
    serverVersion: String,
) {
    Server(
        output = output.bufferedWriter(),
        diagnostics = diagnostics,
        handlers = Handlers(db),
        serverName = serverName,
        serverVersion = serverVersion,
    ).serve(System.`in`)
}
