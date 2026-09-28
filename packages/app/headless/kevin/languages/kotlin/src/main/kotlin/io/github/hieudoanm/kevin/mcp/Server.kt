package io.github.hieudoanm.kevin.mcp

import kotlinx.serialization.json.encodeToJsonElement
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import java.io.BufferedReader
import java.io.Writer

/**
 * Dispatches MCP frames to registered tools.
 *
 * Dispatch is strictly sequential — one frame is answered before the next is
 * read — so a [Store] needs no internal synchronisation of its own.
 */
internal class McpServer {
    private val handlers = sortedMapOf<String, ToolHandler>()

    /** Registers [handler] under its tool name, replacing any earlier one. */
    fun register(handler: ToolHandler) {
        handlers[handler.tool.name] = handler
    }

    /** Returns the registered tools sorted by name. */
    fun tools(): ListToolsResult = ListToolsResult(handlers.values.map(ToolHandler::tool))

    /**
     * Answers one protocol line.
     *
     * Returns the frame to write, or null when the frame was a notification and
     * must not be answered or dispatched at all. Dispatching a tools/call
     * notification would run a destructive tool with no reply to carry its
     * result, so the check precedes the method dispatch.
     */
    fun handle(line: String): String? {
        val request = runCatching { json.decodeFromString<JsonRpcRequest>(line) }
            .getOrElse { return errorFrame(null, ERR_PARSE, "parse error: ${it.message}") }
        if (request.isNotification) return null
        if (request.jsonrpc != JSONRPC) {
            return errorFrame(request.id, ERR_INVALID_REQUEST, "invalid jsonrpc version")
        }
        val id = request.id
        return when (request.method) {
            "initialize" -> okFrame(id, json.encodeToJsonElement(initializeResult(request.params)))
            "ping" -> okFrame(id, PING_RESULT)
            "tools/list" -> okFrame(id, json.encodeToJsonElement(tools()))
            "tools/call" -> call(id, request)
            else -> errorFrame(id, ERR_METHOD_NOT_FOUND, "method not found: ${request.method}")
        }
    }

    /**
     * Consumes frames from [input] and writes one reply per answered request.
     *
     * An oversized frame is answered with a parse error and its remainder is
     * discarded, so a hostile or broken client cannot grow the heap without bound
     * and the following frames are still read in the right place.
     */
    fun runWith(input: BufferedReader, output: Writer) {
        val frames = FrameReader(input)
        while (true) {
            val line = when (val frame = frames.next()) {
                is Frame.Eof -> break
                is Frame.TooLong -> {
                    output.write(errorFrame(null, ERR_PARSE, "parse error: frame too large"))
                    output.write("\n")
                    output.flush()
                    continue
                }
                is Frame.Line -> frame.text.trim()
            }
            // A blank line is padding, not a frame: answering it would put a
            // reply on the wire that no client is waiting to match.
            if (line.isEmpty()) continue
            val frame = handle(line) ?: continue
            output.write(frame)
            output.write("\n")
            output.flush()
        }
    }

    private fun call(id: JsonElement?, request: JsonRpcRequest): String {
        val params = when {
            request.params == null || request.params is JsonNull -> JsonObject(emptyMap())
            else -> request.params as? JsonObject
                ?: return errorFrame(id, ERR_INVALID_PARAMS, "invalid params: expected an object")
        }
        val name = (params["name"] as? JsonPrimitive)?.takeIf(JsonPrimitive::isString)?.content ?: ""
        val handler = handlers[name]
            ?: return errorFrame(id, ERR_METHOD_NOT_FOUND, "tool not found: $name")
        val args = params["arguments"] as? JsonObject
        return okFrame(id, json.encodeToJsonElement(handler.invoke(args)))
    }
}
