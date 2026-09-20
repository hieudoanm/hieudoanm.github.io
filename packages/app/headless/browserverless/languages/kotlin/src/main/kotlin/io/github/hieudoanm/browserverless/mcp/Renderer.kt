package io.github.hieudoanm.browserverless.mcp

import kotlinx.serialization.Serializable

/**
 * The page content a render produced.
 *
 * [timedOut] reports that the page did not finish loading before the deadline,
 * so a model can tell an incomplete scrape from a complete one instead of
 * treating a partial document as the whole page.
 */
data class ScrapeOutcome(
    val url: String,
    val title: String,
    val html: String,
    val timedOut: Boolean,
    val durationMs: Long,
    val memoryKb: Long,
)

/** A rendered page plus its PNG bytes. */
data class ScreenshotOutcome(
    val url: String,
    val title: String,
    val png: ByteArray,
    val timedOut: Boolean,
    val durationMs: Long,
    val memoryKb: Long,
)

/**
 * Renders pages. The JVM has no in-process Servo binding, so the shipped
 * implementation proxies a running `browserverless serve`; tests supply a stub.
 *
 * A render failure is returned, not thrown, so the handler can report it to the
 * model as a tool error rather than as a protocol failure.
 */
interface Renderer {
    /** Renders [url] and returns its HTML. */
    fun scrape(url: String, timeoutMs: Long?): Result<ScrapeOutcome>

    /** Renders [url] and returns a PNG. */
    fun screenshot(url: String, timeoutMs: Long?): Result<ScreenshotOutcome>
}

/** The JSON body both render endpoints accept. */
@Serializable
internal data class RequestBody(val url: String)

/** Caps a rendered response so a hostile page cannot exhaust the heap. */
internal const val MAX_RESPONSE_BYTES = 32L shl 20
