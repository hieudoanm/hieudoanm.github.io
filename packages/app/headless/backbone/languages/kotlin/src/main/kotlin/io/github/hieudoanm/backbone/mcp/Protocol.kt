package io.github.hieudoanm.backbone.mcp

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.intOrNull

/** The MCP revision this server implements. */
const val PROTOCOL_VERSION: String = "2025-11-25"

/** The JSON-RPC dialect every frame must declare. */
const val JSONRPC_VERSION: String = "2.0"

/** JSON-RPC error codes used by this server. */
object ErrorCode {
    const val PARSE: Int = -32700
    const val INVALID_REQUEST: Int = -32600
    const val METHOD_NOT_FOUND: Int = -32601
    const val INVALID_PARAMS: Int = -32602
    const val INTERNAL: Int = -32603
}

/**
 * Pretty JSON for tool payloads, so a model can read a result without
 * unescaping newlines. Frames themselves are written compactly by [compact].
 */
val pretty: Json = Json {
    prettyPrint = true
    explicitNulls = false
    encodeDefaults = true
}

/**
 * Compact JSON for frames. A reply must occupy exactly one line, so pretty
 * printing is never applied here even when a payload contains newlines.
 */
val compact: Json = Json {
    prettyPrint = false
    explicitNulls = false
    encodeDefaults = true
}

/** A request frame. A missing or JSON-null id marks a notification. */
@Serializable
data class Request(
    val jsonrpc: String? = null,
    val id: JsonElement? = null,
    val method: String? = null,
    val params: JsonElement? = null,
) {
    /**
     * Reports whether this frame expects no reply.
     *
     * A *string* `"null"` is a real id, not a notification: a client may use it
     * as a request key, and dropping the reply would hang that request.
     */
    val isNotification: Boolean get() = id == null || id is JsonNull
}

/** One property in a tool's input schema. */
@Serializable
data class PropertySchema(
    val type: String,
    val description: String? = null,
    val enum: List<String>? = null,
)

/** A tool's input schema. */
@Serializable
data class Schema(
    val type: String = "object",
    val properties: Map<String, PropertySchema> = emptyMap(),
    val required: List<String> = emptyList(),
) {
    companion object {
        /** A schema for a tool taking no arguments. */
        fun empty(): Schema = Schema()
    }
}

/** One tool exposed over MCP. */
@Serializable
data class Tool(
    val name: String,
    val description: String,
    @SerialName("inputSchema") val inputSchema: Schema,
)

/** A text block inside a tool result. */
@Serializable
data class ContentItem(
    val type: String = "text",
    val text: String,
)

/**
 * What a tool handler returns. A failure sets [isError] rather than throwing, so
 * a model can correct the call instead of the session dying. The flag is omitted
 * on success so a model reads only real failures.
 */
@Serializable
data class ToolResult(
    val content: List<ContentItem>,
    /**
     * Omitted on success, so a model reads only real failures. This matches the
     * Rust port, where the field is `skip_serializing_if` false.
     */
    @SerialName("isError") val isError: Boolean? = null,
) {
    companion object {
        /** Text content, for a successful tool. */
        fun text(body: String): ToolResult = ToolResult(listOf(ContentItem(text = body)))

        /** Errored content, for a tool the model should not treat as a success. */
        fun error(message: String): ToolResult = ToolResult(listOf(ContentItem(text = message)), true)
    }
}

/** An error object in a JSON-RPC response. */
@Serializable
data class ErrorObject(
    val code: Int,
    val message: String,
)

/** A JSON-RPC response. Exactly one of result and error is populated. */
@Serializable
data class Response(
    val jsonrpc: String = JSONRPC_VERSION,
    val id: JsonElement = JsonNull,
    val result: JsonElement? = null,
    val error: ErrorObject? = null,
)

/** The reply to a tools/list request. */
@Serializable
data class ListToolsResult(
    val tools: List<Tool>,
)

/** The arguments of a tools/call request. */
@Serializable
data class ToolCallParams(
    val name: String = "",
    val arguments: JsonElement? = null,
) {
    /**
     * Returns the arguments as an object for a handler. Absent or null arguments
     * become an empty object so a handler sees a well-formed value.
     */
    fun argumentsObject(): JsonObject = when (val value = arguments) {
        null, JsonNull -> JsonObject(emptyMap())
        is JsonObject -> value
        else -> throw IllegalArgumentException("arguments must be an object")
    }
}

/**
 * Decodes tools/call params, treating absent or null params as an empty object
 * so a call with no params names no tool rather than failing to decode.
 */
fun objectOrEmpty(params: JsonElement?): ToolCallParams = when (params) {
    null, JsonNull -> ToolCallParams()
    is JsonObject -> compact.decodeFromJsonElement(ToolCallParams.serializer(), params)
    else -> throw IllegalArgumentException("params must be an object")
}

/** A successful response carrying [result]. */
fun successResponse(id: JsonElement, result: JsonElement): Response =
    Response(id = id, result = result)

/** An error response. */
fun errorResponse(id: JsonElement, code: Int, message: String): Response =
    Response(id = id, error = ErrorObject(code, message))

/** The initialize reply. */
fun initializeResult(name: String, version: String): JsonObject = JsonObject(
    mapOf(
        "protocolVersion" to JsonPrimitive(PROTOCOL_VERSION),
        "capabilities" to JsonObject(
            mapOf("tools" to JsonObject(mapOf("listChanged" to JsonPrimitive(false)))),
        ),
        "serverInfo" to JsonObject(
            mapOf(
                "name" to JsonPrimitive(name),
                "version" to JsonPrimitive(version),
            ),
        ),
    ),
)

/** Reads a string member of a JSON object, or null when absent or not a string. */
fun JsonObject.stringOrNull(key: String): String? =
    (this[key] as? JsonPrimitive)?.takeIf { it.isString }?.content

/** Reads a required string member, or null when absent or not a string. */
fun JsonObject.requiredString(key: String): String? = stringOrNull(key)

/**
 * Reads a required JSON object member, or null when absent or not an object.
 *
 * Record bodies are stored verbatim, so a caller passing a string would silently
 * persist a JSON string where an object is expected.
 */
fun JsonObject.requiredObject(key: String): JsonObject? = this[key] as? JsonObject

/** Reads an integer member, or [fallback] when absent or not an integer. */
fun JsonObject.intOrDefault(key: String, fallback: Int): Int =
    (this[key] as? JsonPrimitive)?.intOrNull ?: fallback

/** Reads a boolean member, or [fallback] when absent or not a boolean. */
fun JsonObject.booleanOrDefault(key: String, fallback: Boolean): Boolean =
    (this[key] as? JsonPrimitive)?.booleanOrNull ?: fallback

/** Renders a JSON value as indented text for a tool result. */
fun JsonElement.prettyText(): String = when (this) {
    is JsonNull -> "null"
    is JsonPrimitive -> toString()
    is JsonObject, is JsonArray -> pretty.encodeToString(JsonElement.serializer(), this)
}
