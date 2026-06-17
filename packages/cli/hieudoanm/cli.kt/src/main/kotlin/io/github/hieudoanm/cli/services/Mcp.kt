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

const val PROTOCOL_VERSION = "2025-11-25"

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

    fun run() {
        val gson = GsonBuilder().disableHtmlEscaping().create()
        val reader = BufferedReader(InputStreamReader(System.`in`))
        val writer = OutputStreamWriter(System.out)

        while (true) {
            val line = reader.readLine() ?: break
            if (line.isBlank()) continue

            val msg = try {
                JsonParser.parseString(line).asJsonObject
            } catch (e: Exception) {
                writeResponse(writer, gson, Response("2.0", null, error = ErrorObject(-32700, "parse error: ${e.message}")))
                continue
            }

            val id = msg.get("id")
            val method = msg.get("method")?.asString ?: ""
            val params = msg.get("params")

            if (msg.get("jsonrpc")?.asString != "2.0") {
                writeResponse(writer, gson, Response("2.0", id, error = ErrorObject(-32600, "invalid jsonrpc version")))
                continue
            }

            val isNotification = id == null || id.isJsonNull

            when (method) {
                "initialize" -> handleInitialize(writer, gson, id)
                "ping" -> writeResponse(writer, gson, Response("2.0", id, result = JsonObject()))
                "tools/list" -> handleListTools(writer, gson, id)
                "tools/call" -> handleCallTool(writer, gson, id, params)
                else -> {
                    if (!isNotification) {
                        writeResponse(writer, gson, Response("2.0", id, error = ErrorObject(-32601, "method not found: $method")))
                    }
                }
            }
        }
    }

    private fun handleInitialize(writer: OutputStreamWriter, gson: Gson, id: JsonElement?) {
        val result = JsonObject().apply {
            addProperty("protocolVersion", PROTOCOL_VERSION)
            add("capabilities", JsonObject().apply {
                add("tools", JsonObject().apply {
                    addProperty("listChanged", false)
                })
            })
            add("serverInfo", JsonObject().apply {
                addProperty("name", "hieudoanm-mcp")
                addProperty("version", "1.0.0")
            })
        }
        writeResponse(writer, gson, Response("2.0", id, result = gson.toJsonTree(result)))
    }

    private fun handleListTools(writer: OutputStreamWriter, gson: Gson, id: JsonElement?) {
        val result = JsonObject().apply {
            add("tools", gson.toJsonTree(tools))
        }
        writeResponse(writer, gson, Response("2.0", id, result = gson.toJsonTree(result)))
    }

    private fun handleCallTool(writer: OutputStreamWriter, gson: Gson, id: JsonElement?, params: JsonElement?) {
        if (params == null || !params.isJsonObject) {
            writeResponse(writer, gson, Response("2.0", id, error = ErrorObject(-32602, "missing params")))
            return
        }

        val obj = params.asJsonObject
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

    private fun writeResponse(writer: OutputStreamWriter, gson: Gson, resp: Response) {
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
