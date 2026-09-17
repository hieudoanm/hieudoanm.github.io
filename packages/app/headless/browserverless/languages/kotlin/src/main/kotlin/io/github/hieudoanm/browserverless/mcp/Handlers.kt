package io.github.hieudoanm.browserverless.mcp

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import java.net.URI
import java.util.Base64

/**
 * Caps a caller-supplied timeout. Values beyond it are rejected rather than
 * allowed to overflow the duration arithmetic, which would wrap to a
 * non-positive value and silently disable the deadline.
 */
private const val MAX_TIMEOUT_MS = 10L * 60 * 1000

/** The arguments shared by the two render tools. */
@Serializable
private data class RenderArgs(
    val url: String = "",
    @SerialName("timeout_ms") val timeoutMs: Long? = null,
)

/** The payload the scrape tool returns. */
@Serializable
private data class ScrapePayload(
    val url: String,
    val title: String,
    val html: String,
    @SerialName("timed_out") val timedOut: Boolean,
    @SerialName("duration_ms") val durationMs: Long,
    @SerialName("memory_kb") val memoryKb: Long,
)

/** The text summary the screenshot tool returns alongside the image block. */
@Serializable
private data class ScreenshotPayload(
    val url: String,
    val title: String,
    @SerialName("png_bytes") val pngBytes: Int,
    @SerialName("timed_out") val timedOut: Boolean,
    @SerialName("duration_ms") val durationMs: Long,
    @SerialName("memory_kb") val memoryKb: Long,
)

/** The payload the version tool returns. */
@Serializable
private data class VersionPayload(val server: String, val version: String)

/** Either the validated arguments, or the tool error explaining why not. */
private sealed interface ParsedArgs {
    data class Valid(val url: String, val timeoutMs: Long?) : ParsedArgs

    /** Rejected before any render is attempted, reported to the model. */
    data class Rejected(val message: String) : ParsedArgs
}

/** Returns the browserverless tool surface bound to a renderer. */
fun register(renderer: Renderer): List<Pair<Tool, ToolHandler>> = listOf(
    Tools.scrape() to scrapeHandler(renderer),
    Tools.screenshot() to screenshotHandler(renderer),
    Tools.version() to versionHandler(),
)

private fun scrapeHandler(renderer: Renderer): ToolHandler = ToolHandler { arguments ->
    when (val parsed = parseRenderArgs(arguments)) {
        is ParsedArgs.Rejected -> errorResult(parsed.message)
        is ParsedArgs.Valid -> renderer.scrape(parsed.url, parsed.timeoutMs).fold(
            onSuccess = { outcome ->
                textResult(
                    marshal(
                        ScrapePayload(
                            url = outcome.url,
                            title = outcome.title,
                            html = outcome.html,
                            timedOut = outcome.timedOut,
                            durationMs = outcome.durationMs,
                            memoryKb = outcome.memoryKb,
                        ),
                    ),
                )
            },
            onFailure = ::renderFailure,
        )
    }
}

private fun screenshotHandler(renderer: Renderer): ToolHandler = ToolHandler { arguments ->
    when (val parsed = parseRenderArgs(arguments)) {
        is ParsedArgs.Rejected -> errorResult(parsed.message)
        is ParsedArgs.Valid -> renderer.screenshot(parsed.url, parsed.timeoutMs).fold(
            onSuccess = { outcome ->
                ToolResult(
                    content = listOf(
                        ContentItem(
                            text = marshal(
                                ScreenshotPayload(
                                    url = outcome.url,
                                    title = outcome.title,
                                    pngBytes = outcome.png.size,
                                    timedOut = outcome.timedOut,
                                    durationMs = outcome.durationMs,
                                    memoryKb = outcome.memoryKb,
                                ),
                            ),
                        ),
                        // Bytes go in an image block so the model gets a real
                        // image rather than megabytes of base64 in a text block.
                        ContentItem(
                            type = "image",
                            mimeType = "image/png",
                            data = Base64.getEncoder().encodeToString(outcome.png),
                        ),
                    ),
                )
            },
            onFailure = ::renderFailure,
        )
    }
}

private fun versionHandler(): ToolHandler = ToolHandler {
    textResult(marshal(VersionPayload(SERVER_NAME, MCP_VERSION)))
}

/** A render failure becomes a tool error so the model can see what went wrong. */
private fun renderFailure(error: Throwable): ToolResult =
    errorResult("render failed: ${error.message ?: error::class.simpleName}")

/**
 * Decodes and validates tool arguments, returning the URL and an optional
 * per-call timeout. A rejected value names the field the model should fix, and
 * becomes a tool error rather than a protocol error.
 */
private fun parseRenderArgs(arguments: JsonElement?): ParsedArgs {
    val source = when {
        arguments == null || arguments is JsonPrimitive && arguments.content == "null" ->
            JsonObject(emptyMap())
        arguments is JsonObject -> arguments
        else -> return ParsedArgs.Rejected("invalid arguments: expected an object")
    }

    val args = try {
        McpJson.decodeFromJsonElement(RenderArgs.serializer(), source)
    } catch (e: Exception) {
        return ParsedArgs.Rejected("invalid arguments: ${e.message}")
    }

    val url = args.url.trim()
    if (url.isEmpty()) return ParsedArgs.Rejected("missing required argument: url")

    // Only http and https may be fetched. file:// would read the local disk and
    // any other scheme has no meaning to the engine.
    val scheme = runCatching { URI(url).scheme?.lowercase() }.getOrNull()
    if (scheme != "http" && scheme != "https") {
        return ParsedArgs.Rejected("unsupported scheme: ${scheme ?: url}")
    }

    val timeout = args.timeoutMs
    if (timeout != null) {
        if (timeout < 0) return ParsedArgs.Rejected("timeout_ms must not be negative")
        if (timeout > MAX_TIMEOUT_MS) {
            return ParsedArgs.Rejected("timeout_ms must not exceed $MAX_TIMEOUT_MS")
        }
    }

    return ParsedArgs.Valid(url, if (timeout == 0L) null else timeout)
}
