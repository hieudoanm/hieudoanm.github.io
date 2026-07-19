package io.github.hieudoanm.browserverless.mcp

import java.io.ByteArrayOutputStream
import java.io.IOException
import java.io.InputStream
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import java.time.Duration

/**
 * Renders by proxying a running `browserverless serve`, selected by
 * `mcp serve --addr`. Several clients can then share one warm engine instead of
 * paying browser start-up per process.
 *
 * The JVM has no in-process Servo embedding, so this is the only way to get a
 * real render: there is no stub path that could quietly stand in for the engine.
 */
class HttpRenderer(
    baseUrl: String,
    private val defaultTimeoutMs: Long = 30_000,
    connectTimeoutMs: Long = 10_000,
    private val maxResponseBytes: Long = MAX_RESPONSE_BYTES,
) : Renderer {
    private val baseUrl = baseUrl.trimEnd('/')

    // A bounded client is required: an unbounded request to an unresponsive
    // server would hang the MCP session with no reply the client can match.
    private val client: HttpClient = HttpClient.newBuilder()
        .connectTimeout(Duration.ofMillis(connectTimeoutMs))
        .build()

    override fun scrape(url: String, timeoutMs: Long?): Result<ScrapeOutcome> =
        post("/api/v1/scrape", url, timeoutMs).map { response ->
            val meta = Meta.of(response, url)
            ScrapeOutcome(
                url = meta.url,
                title = meta.title,
                html = String(response.body, Charsets.UTF_8),
                timedOut = meta.timedOut,
                durationMs = meta.durationMs,
                memoryKb = meta.memoryKb,
            )
        }

    override fun screenshot(url: String, timeoutMs: Long?): Result<ScreenshotOutcome> =
        post("/api/v1/screenshot", url, timeoutMs).map { response ->
            val meta = Meta.of(response, url)
            ScreenshotOutcome(
                url = meta.url,
                title = meta.title,
                png = response.body,
                timedOut = meta.timedOut,
                durationMs = meta.durationMs,
                memoryKb = meta.memoryKb,
            )
        }

    /** A render response whose body has already been read under a hard cap. */
    private data class RenderResponse(
        val statusCode: Int,
        val headers: Map<String, List<String>>,
        val body: ByteArray,
    )

    /**
     * The per-request metadata the server returns as response headers. Anything
     * absent falls back to a neutral value rather than failing the render, since
     * the bytes are the result and the metadata is context.
     */
    private data class Meta(
        val url: String,
        val title: String,
        val timedOut: Boolean,
        val durationMs: Long,
        val memoryKb: Long,
    ) {
        companion object {
            fun of(response: RenderResponse, requested: String): Meta {
                fun header(name: String) = response.headers[name.lowercase()]?.firstOrNull()
                return Meta(
                    url = header("x-browserverless-url") ?: requested,
                    title = header("x-browserverless-title").orEmpty(),
                    timedOut = header("x-browserverless-load-status") == "partial",
                    durationMs = header("x-browserverless-duration-ms")?.toLongOrNull() ?: 0,
                    memoryKb = header("x-browserverless-memory-kb")?.toLongOrNull() ?: 0,
                )
            }
        }
    }

    /**
     * Posts a render request and returns the response, failing on a non-2xx
     * status. The request timeout bounds the whole exchange, so a stalled engine
     * surfaces as a reported error instead of hanging the session.
     */
    private fun post(path: String, url: String, timeoutMs: Long?): Result<RenderResponse> = runCatching {
        val body = McpJson.encodeToString(RequestBody.serializer(), RequestBody(url))
        val deadline = timeoutMs ?: defaultTimeoutMs
        val request = HttpRequest.newBuilder()
            .uri(URI.create("$baseUrl$path"))
            .timeout(Duration.ofMillis(deadline))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(body))
            .build()

        val response = client.send(request, HttpResponse.BodyHandlers.ofInputStream())
        val payload = response.body().use { stream -> readBounded(stream) }
        if (response.statusCode() !in 200..299) {
            throw IOException(
                "browserverless server returned ${response.statusCode()}: " +
                    String(payload, Charsets.UTF_8).take(512),
            )
        }
        RenderResponse(response.statusCode(), response.headers().map(), payload)
    }

    /**
     * Reads at most [maxResponseBytes], failing as soon as the stream exceeds
     * it. Buffering the whole body first and checking its length afterwards would
     * let a broken or hostile server exhaust the heap before the cap applied.
     */
    private fun readBounded(stream: InputStream): ByteArray {
        val buffer = ByteArrayOutputStream()
        val chunk = ByteArray(16 * 1024)
        var total = 0L
        while (true) {
            val read = stream.read(chunk)
            if (read < 0) break
            total += read
            if (total > maxResponseBytes) {
                throw IOException("render response exceeded $maxResponseBytes bytes")
            }
            buffer.write(chunk, 0, read)
        }
        return buffer.toByteArray()
    }
}
