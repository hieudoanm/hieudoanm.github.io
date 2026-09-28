package io.github.hieudoanm.cli.services

import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.JsonArray
import com.google.gson.JsonElement
import com.google.gson.JsonObject
import com.google.gson.JsonParser
import java.io.BufferedReader
import java.io.InputStreamReader
import java.io.OutputStreamWriter
import java.io.Writer

const val PROTOCOL_VERSION = "2025-11-25"

/** The MCP revisions this server can speak, newest first. */
val SUPPORTED_PROTOCOL_VERSIONS = listOf(PROTOCOL_VERSION)

/**
 * Caps a single JSON-RPC frame. A larger frame is reported as a parse error
 * instead of being buffered, so a client cannot grow the heap without bound.
 * It matches the cap the other headless MCP servers use.
 */
const val MAX_FRAME_CHARS = 8 shl 20

/** The outcome of reading one frame: a normal line, or one that was too large. */
sealed interface Frame {
    data class Line(val text: String) : Frame
    data object TooLong : Frame
}

/**
 * Reads one newline-terminated frame, refusing anything larger than
 * [MAX_FRAME_CHARS]. This reads a character at a time rather than calling
 * [BufferedReader.readLine], which would allocate an unbounded line before the
 * cap could be applied. An over-long frame's remainder is consumed as junk so
 * the stream resynchronises on the next newline.
 */
private fun readFrame(reader: BufferedReader): Frame? {
    val frame = StringBuilder()
    while (true) {
        val value = reader.read()
        if (value == -1) {
            if (frame.isEmpty()) return null
            return Frame.Line(frame.toString())
        }
        if (frame.length >= MAX_FRAME_CHARS) {
            discardToNewline(reader)
            return Frame.TooLong
        }
        frame.append(value.toChar())
        if (value == '\n'.code) return Frame.Line(frame.toString())
    }
}

/** Consumes characters up to and including the next newline. */
private fun discardToNewline(reader: BufferedReader) {
    while (true) {
        when (reader.read()) {
            -1 -> return
            '\n'.code -> return
        }
    }
}

data class Request(
    val jsonrpc: String,
    val id: JsonElement?,
    val method: String,
    val params: JsonElement?
)

data class Response(
    val jsonrpc: String,
    val id: JsonElement?,
    val result: Any? = null,
    val error: ErrorObject? = null
)

data class ErrorObject(
    val code: Int,
    val message: String
)

data class ToolSchema(
    val name: String,
    val description: String,
    val inputSchema: Schema
)

data class Schema(
    val type: String,
    val properties: Map<String, PropertySchema>? = null,
    val required: List<String>? = null
)

data class PropertySchema(
    val type: String,
    val description: String? = null,
    val default: JsonElement? = null,
    val items: PropertySchema? = null
)

class McpServer {
    private val tools = mutableListOf<ToolSchema>()
    private val handlers = mutableMapOf<String, (JsonElement?) -> JsonObject>()

    fun addTool(name: String, description: String, schema: Schema, handler: (JsonElement?) -> JsonObject) {
        tools.add(ToolSchema(name, description, schema))
        handlers[name] = handler
    }

    fun run(reader: BufferedReader = BufferedReader(InputStreamReader(System.`in`)), writer: Writer = OutputStreamWriter(System.out)) {
        val gson = GsonBuilder().disableHtmlEscaping().create()

        while (true) {
            val frame = readFrame(reader) ?: break

            when (frame) {
                is Frame.TooLong -> {
                    writeResponse(writer, gson, Response("2.0", null, error = ErrorObject(-32700, "parse error: frame too large")))
                    continue
                }
                is Frame.Line -> {
                    val line = frame.text
                    if (line.isBlank()) continue
                    handleFrame(line, writer, gson)
                }
            }
        }
    }

    private fun handleFrame(line: String, writer: Writer, gson: Gson) {
        val msg = try {
            JsonParser.parseString(line).asJsonObject
        } catch (e: Exception) {
            writeResponse(writer, gson, Response("2.0", null, error = ErrorObject(-32700, "parse error: ${e.message}")))
            return
        }

        val id = msg.get("id")
        val method = msg.get("method")?.asString ?: ""
        val params = msg.get("params")

        // A notification carries no id, so it must never be answered. Answering
        // one desynchronises the client, so this check precedes the jsonrpc
        // version check and covers every method, not just unknown ones.
        if (id == null || id.isJsonNull) {
            System.err.println("[mcp] ignoring notification for method $method")
            return
        }

        if (msg.get("jsonrpc")?.asString != "2.0") {
            writeResponse(writer, gson, Response("2.0", id, error = ErrorObject(-32600, "invalid jsonrpc version")))
            return
        }

        when (method) {
            "initialize" -> handleInitialize(writer, gson, id, params)
            "ping" -> writeResponse(writer, gson, Response("2.0", id, result = JsonObject()))
            "tools/list" -> handleListTools(writer, gson, id)
            "tools/call" -> handleCallTool(writer, gson, id, params)
            else -> writeResponse(writer, gson, Response("2.0", id, error = ErrorObject(-32601, "method not found: $method")))
        }
    }

    private fun handleInitialize(writer: Writer, gson: Gson, id: JsonElement?, params: JsonElement?) {
        // A revision this server speaks is echoed back; anything else falls back
        // to PROTOCOL_VERSION and the client disconnects if it cannot speak it.
        val requested = params
            ?.takeIf { it.isJsonObject }
            ?.asJsonObject
            ?.get("protocolVersion")
            ?.asString
        val version = if (requested != null && requested in SUPPORTED_PROTOCOL_VERSIONS) requested else PROTOCOL_VERSION

        val result = JsonObject().apply {
            addProperty("protocolVersion", version)
            add("capabilities", JsonObject().apply {
                add("tools", JsonObject().apply {
                    addProperty("listChanged", false)
                })
            })
            add("serverInfo", JsonObject().apply {
                addProperty("name", "jack-mcp")
                addProperty("version", "1.0.0")
            })
        }
        writeResponse(writer, gson, Response("2.0", id, result = gson.toJsonTree(result)))
    }

    private fun handleListTools(writer: Writer, gson: Gson, id: JsonElement?) {
        val result = JsonObject().apply {
            add("tools", gson.toJsonTree(tools))
        }
        writeResponse(writer, gson, Response("2.0", id, result = gson.toJsonTree(result)))
    }

    private fun handleCallTool(writer: Writer, gson: Gson, id: JsonElement?, params: JsonElement?) {
        // Absent or null params are an empty object, so a call with no params
        // names no tool rather than being rejected as malformed.
        if (params != null && !params.isJsonNull && !params.isJsonObject) {
            writeResponse(writer, gson, Response("2.0", id, error = ErrorObject(-32602, "invalid params: expected an object")))
            return
        }

        val obj = params?.takeIf { it.isJsonObject }?.asJsonObject ?: JsonObject()
        val name = obj.get("name")?.asString ?: ""
        val args = obj.get("arguments")

        val handler = handlers[name]
        if (handler == null) {
            writeResponse(writer, gson, Response("2.0", id, error = ErrorObject(-32601, "tool not found: $name")))
            return
        }

        val result = handler(args)
        writeResponse(writer, gson, Response("2.0", id, result = gson.toJsonTree(result)))
    }

    private fun writeResponse(writer: Writer, gson: Gson, resp: Response) {
        writer.write(gson.toJson(resp))
        writer.write("\n")
        writer.flush()
    }
}

fun newToolResultText(text: String): JsonObject {
    return JsonObject().apply {
        add("content", JsonArray().apply {
            add(JsonObject().apply {
                addProperty("type", "text")
                addProperty("text", text)
            })
        })
    }
}

fun newToolResultError(text: String): JsonObject {
    return JsonObject().apply {
        add("content", JsonArray().apply {
            add(JsonObject().apply {
                addProperty("type", "text")
                addProperty("text", text)
            })
        })
        addProperty("isError", true)
    }
}
