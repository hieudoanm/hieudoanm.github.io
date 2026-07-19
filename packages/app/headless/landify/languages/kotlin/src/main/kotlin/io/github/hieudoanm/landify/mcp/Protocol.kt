package io.github.hieudoanm.landify.mcp

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive

/** The MCP revision this server implements. */
const val PROTOCOL_VERSION = "2025-11-25"

/** The MCP revisions this server can speak, newest first. */
val SUPPORTED_PROTOCOL_VERSIONS = listOf(PROTOCOL_VERSION)

/**
 * Caps a single JSON-RPC frame. A larger frame is reported as a parse error
 * instead of being buffered, so a client cannot grow the heap without bound.
 * It matches the cap the other headless MCP servers use.
 */
const val MAX_FRAME_CHARS = 8 shl 20

/** JSON-RPC 2.0 error codes used by this server. */
object ErrorCode {
    const val PARSE = -32700
    const val INVALID_REQUEST = -32600
    const val METHOD_NOT_FOUND = -32601
    const val INVALID_PARAMS = -32602
}

/** An incoming request frame. A null or JSON-null id marks a notification. */
@Serializable
data class Request(
    val jsonrpc: String? = null,
    val id: JsonElement? = null,
    val method: String? = null,
    val params: JsonElement? = null,
) {
    /**
     * Reports whether this frame expects no reply. A missing or JSON-null id
     * marks a notification.
     */
    val isNotification: Boolean
        get() = id == null || id is JsonPrimitive && id.content == "null"
}

/** One property in a tool's JSON schema. */
@Serializable
data class PropertySchema(
    val type: String,
    val description: String? = null,
    val enum: List<String>? = null,
    val items: PropertySchema? = null,
)

/** A tool's input schema. */
@Serializable
data class Schema(
    val type: String = "object",
    val properties: Map<String, PropertySchema> = emptyMap(),
    val required: List<String> = emptyList(),
)

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

/** What a tool handler returns. A failure sets [isError] rather than throwing. */
@Serializable
data class ToolResult(
    val content: List<ContentItem>,
    val isError: Boolean = false,
)

/** An error object in a JSON-RPC response. */
@Serializable
data class ErrorObject(val code: Int, val message: String)

/** A JSON-RPC response. Exactly one of result and error is populated. */
@Serializable
data class Response(
    val jsonrpc: String = "2.0",
    val id: JsonElement? = null,
    val result: JsonObject? = null,
    val error: ErrorObject? = null,
)

/** Tool capability advertised during initialize. */
@Serializable
data class ToolsCapabilities(val listChanged: Boolean = false)

/** The capability set advertised during initialize. */
@Serializable
data class ServerCapabilities(val tools: ToolsCapabilities? = null)

/** Identifies this server during initialize. */
@Serializable
data class ServerInfo(val name: String, val version: String)

/** The reply to an initialize request. */
@Serializable
data class InitializeResult(
    val protocolVersion: String,
    val capabilities: ServerCapabilities,
    val serverInfo: ServerInfo,
)

/** The reply to a tools/list request. */
@Serializable
data class ListToolsResult(val tools: List<Tool>)

/** The arguments of a tools/call request. */
@Serializable
data class ToolCallParams(
    val name: String = "",
    val arguments: JsonElement? = null,
)

/** A tool implementation. */
fun interface ToolHandler {
    fun handle(arguments: JsonElement?): ToolResult
}

/** Text content, for a successful tool. */
fun textResult(text: String): ToolResult = ToolResult(listOf(ContentItem(text = text)))

/** Errored content, for a tool the model should not treat as a success. */
fun errorResult(text: String): ToolResult =
    ToolResult(listOf(ContentItem(text = text)), isError = true)

/** A successful response carrying [result]. */
fun successResponse(id: JsonElement?, result: JsonObject): Response =
    Response(id = id, result = result)

/** An error response. */
fun errorResponse(id: JsonElement?, code: Int, message: String): Response =
    Response(id = id, error = ErrorObject(code, message))

/**
 * Picks the revision to advertise to a client that requested the given
 * initialize params. A revision this server speaks is echoed; anything else
 * falls back to [PROTOCOL_VERSION] and the client is expected to disconnect if
 * it cannot speak that either.
 */
fun negotiatedVersion(params: JsonElement?): String {
    val requested = (params as? JsonObject)
        ?.get("protocolVersion")
        ?.let { (it as? JsonPrimitive)?.content }
    return if (requested != null && requested in SUPPORTED_PROTOCOL_VERSIONS) {
        requested
    } else {
        PROTOCOL_VERSION
    }
}

/** The payload codecs, with pretty printing so a model sees readable JSON. */
val McpJson: Json = Json {
    prettyPrint = true
    encodeDefaults = true
    explicitNulls = false
}

/**
 * Renders a tool payload as indented JSON. Every text block goes through this
 * rather than string interpolation so quotes and newlines in user content cannot
 * corrupt the JSON a model has to parse.
 */
inline fun <reified T> marshal(payload: T): String = McpJson.encodeToString(payload)

/** Decodes tool arguments, treating a missing or null object as empty. */
inline fun <reified T> decodeArgs(raw: JsonElement?): T {
    val source = if (raw == null || raw is JsonPrimitive && raw.content == "null") {
        JsonObject(emptyMap())
    } else if (raw is JsonObject) {
        raw
    } else {
        throw IllegalArgumentException("invalid arguments: expected an object, got $raw")
    }
    return try {
        McpJson.decodeFromJsonElement(kotlinx.serialization.serializer(), source)
    } catch (e: Exception) {
        throw IllegalArgumentException("invalid arguments: ${e.message}")
    }
}

