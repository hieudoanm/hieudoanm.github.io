package io.github.hieudoanm.kevin.mcp

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put

/** MCP revision this server implements. */
const val PROTOCOL_VERSION: String = "2025-11-25"

/** Server identity advertised during `initialize`. */
const val SERVER_NAME: String = "kevin-mcp"
const val SERVER_VERSION: String = "1.0.0"

/** JSON-RPC 2.0 and MCP error codes used by the server. */
const val ERR_PARSE: Int = -32700
const val ERR_INVALID_REQUEST: Int = -32600
const val ERR_METHOD_NOT_FOUND: Int = -32601
const val ERR_INVALID_PARAMS: Int = -32602

/**
 * Caps a single JSON-RPC frame. A larger frame is reported as a parse error
 * instead of being buffered, so a client cannot grow the heap without bound.
 */
const val MAX_FRAME_CHARS: Int = 8 shl 20

internal const val JSONRPC: String = "2.0"

internal val json: Json = Json { ignoreUnknownKeys = true }

/**
 * An incoming JSON-RPC 2.0 message. A missing or null `id` marks it as a
 * notification, which is never answered.
 */
@Serializable
internal data class JsonRpcRequest(
    val jsonrpc: String = JSONRPC,
    val id: JsonElement? = null,
    val method: String = "",
    val params: JsonElement? = null,
) {
    /** Reports whether this frame expects no reply. */
    val isNotification: Boolean get() = id == null

    /** Returns [params] as an object, or null when absent or another type. */
    fun paramObject(): JsonObject? = params as? JsonObject
}

/** A tool name paired with the function that runs it. */
internal data class ToolHandler(
    val tool: Tool,
    val invoke: (JsonObject?) -> ToolResult,
)

/** Builds a success frame for [id]. */
internal fun okFrame(id: JsonElement?, result: JsonElement): String = buildJsonObject {
    put("jsonrpc", JSONRPC)
    put("id", id ?: JsonPrimitive(null))
    put("result", result)
}.toString()

/** Builds a JSON-RPC error frame for [id]. */
internal fun errorFrame(id: JsonElement?, code: Int, message: String): String = buildJsonObject {
    put("jsonrpc", JSONRPC)
    put("id", id ?: JsonPrimitive(null))
    put("error", buildJsonObject {
        put("code", code)
        put("message", message)
    })
}.toString()
