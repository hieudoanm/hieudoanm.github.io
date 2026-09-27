package io.github.hieudoanm.kevin.mcp

import kotlinx.serialization.json.encodeToJsonElement
import kotlinx.serialization.json.JsonElement
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
     * must not be answered at all.
     */
    fun handle(line: String): String? {
        val request = runCatching { json.decodeFromString<JsonRpcRequest>(line) }
            .getOrElse { return errorFrame(null, ERR_PARSE, "parse error: ${it.message}") }
        if (request.isNotification) return null
        val id = request.id
        return when (request.method) {
            "initialize" -> okFrame(id, json.encodeToJsonElement(initializeResult()))
            "tools/list" -> okFrame(id, json.encodeToJsonElement(tools()))
            "tools/call" -> call(id, request)
            else -> errorFrame(id, ERR_METHOD_NOT_FOUND, "method not found: ${request.method}")
        }
    }

    /** Consumes lines from [input] and writes one frame per answered request. */
    fun runWith(input: BufferedReader, output: Writer) {
        while (true) {
            val line = input.readLine() ?: break
            val frame = handle(line) ?: continue
            output.write(frame)
            output.write("\n")
            output.flush()
        }
    }

    private fun call(id: JsonElement?, request: JsonRpcRequest): String {
        val params = request.paramObject()
        val name = (params?.get("name") as? JsonPrimitive)?.takeIf(JsonPrimitive::isString)?.content ?: ""
        val handler = handlers[name]
            ?: return errorFrame(id, ERR_METHOD_NOT_FOUND, "tool not found: $name")
        val args = params?.get("arguments") as? JsonObject
        return okFrame(id, json.encodeToJsonElement(handler.invoke(args)))
    }
}
