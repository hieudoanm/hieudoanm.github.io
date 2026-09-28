package io.github.hieudoanm.kevin.mcp

import kotlinx.serialization.EncodeDefault
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import kotlinx.serialization.json.putJsonObject

/** A single entry in the `tools/list` result. */
@Serializable
internal data class Tool(
    val name: String,
    val description: String,
    @SerialName("inputSchema") val inputSchema: JsonObject,
)

/** One piece of tool output. Only text is emitted. */
@Serializable
internal data class ContentItem(
    @SerialName("type") val type: String,
    val text: String,
)

/**
 * The payload of a `tools/call` result.
 *
 * A failure is reported here rather than as a JSON-RPC error so the model can
 * read it and react.
 */
@Serializable
internal data class ToolResult(
    val content: List<ContentItem>,
    @EncodeDefault(EncodeDefault.Mode.NEVER)
    @SerialName("isError")
    val isError: Boolean = false,
)

/** Identifies the server implementation. */
@Serializable
internal data class ServerInfo(
    val name: String,
    val version: String,
)

/** Describes tool-related capabilities. */
@Serializable
internal data class ToolsCapabilities(
    @SerialName("listChanged") val listChanged: Boolean,
)

/** Advertises the features this server implements; only tools are supported. */
@Serializable
internal data class ServerCapabilities(
    val tools: ToolsCapabilities? = null,
)

/** The reply to `initialize`. */
@Serializable
internal data class InitializeResult(
    @SerialName("protocolVersion") val protocolVersion: String,
    val capabilities: ServerCapabilities,
    @SerialName("serverInfo") val serverInfo: ServerInfo,
)

/** The reply to `tools/list`. */
@Serializable
internal data class ListToolsResult(
    val tools: List<Tool>,
)

/** The empty object a `ping` is answered with. */
internal val PING_RESULT: JsonObject = JsonObject(emptyMap())

/**
 * The revisions this server can speak, newest first. A client asking for one of
 * these gets exactly that version echoed back.
 */
internal fun supportedProtocolVersions(): List<String> = listOf(PROTOCOL_VERSION)

/**
 * The `initialize` reply, negotiating the protocol revision.
 *
 * When [params] asks for a revision this server does not speak, the server's
 * latest is offered and the client is expected to disconnect if it cannot speak
 * that either.
 */
internal fun initializeResult(params: JsonElement? = null): InitializeResult = InitializeResult(
    protocolVersion = negotiatedVersion(params),
    capabilities = ServerCapabilities(tools = ToolsCapabilities(listChanged = false)),
    serverInfo = ServerInfo(name = SERVER_NAME, version = SERVER_VERSION),
)

/**
 * Echoes the client's requested revision when the server supports it, and
 * otherwise falls back to the server's latest. Absent or non-object params are
 * treated as no request at all.
 */
internal fun negotiatedVersion(params: JsonElement?): String {
    val requested = ((params as? JsonObject)?.get("protocolVersion") as? JsonPrimitive)
        ?.takeIf(JsonPrimitive::isString)?.content ?: return PROTOCOL_VERSION
    return if (requested in supportedProtocolVersions()) requested else PROTOCOL_VERSION
}

/** A successful result carrying [json] as text. */
internal fun textResult(json: JsonElement): ToolResult = textResult(json.toString())

/** A successful result carrying an already-encoded JSON document. */
internal fun textResult(text: String): ToolResult =
    ToolResult(content = listOf(ContentItem(type = "text", text = text)))

/** A failed result carrying a plain-text explanation. */
internal fun failureResult(message: String): ToolResult =
    ToolResult(content = listOf(ContentItem(type = "text", text = message)), isError = true)

/** The key property every key-addressed tool shares, so the wording cannot drift. */
internal fun keyProperty(): JsonObject = stringProperty("Key to operate on.")

/** A string property. */
internal fun stringProperty(description: String): JsonObject = buildJsonObject {
    put("type", "string")
    put("description", description)
}

/** An integer property. */
internal fun integerProperty(description: String): JsonObject = buildJsonObject {
    put("type", "integer")
    put("description", description)
}

/** A boolean property. */
internal fun booleanProperty(description: String): JsonObject = buildJsonObject {
    put("type", "boolean")
    put("description", description)
}

/** An array-of-strings property. */
internal fun stringArrayProperty(description: String): JsonObject = buildJsonObject {
    put("type", "array")
    put("description", description)
    putJsonObject("items") { put("type", "string") }
}

/**
 * An object schema over [properties].
 *
 * Properties are stored in a sorted map so serialisation order is stable for
 * clients and tests, matching the Go and Rust ports.
 */
internal fun objectSchema(
    properties: Map<String, JsonObject>,
    required: List<String> = emptyList(),
): JsonObject {
    val members = sortedMapOf<String, JsonElement>()
    for ((name, schema) in properties) members[name] = schema
    return buildJsonObject {
        put("type", "object")
        put("properties", JsonObject(members))
        if (required.isNotEmpty()) {
            put("required", JsonArray(required.sorted().map(::JsonPrimitive)))
        }
    }
}
