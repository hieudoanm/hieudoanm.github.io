package io.github.hieudoanm.landify.serve

import java.util.Locale

/**
 * Maps a file extension to a `Content-Type` header.
 *
 * Landify output is a single `index.html` plus optional media, so this covers
 * what the templates reference rather than the whole MIME registry. Anything
 * unknown is served as `application/octet-stream`, which is what Go's
 * `http.FileServer` does too.
 */
fun contentTypeOf(path: String): String {
    val extension = path.substringAfterLast('.', "").lowercase(Locale.ROOT)
    return CONTENT_TYPES[extension] ?: "application/octet-stream"
}

private val CONTENT_TYPES: Map<String, String> = mapOf(
    "html" to "text/html; charset=utf-8",
    "htm" to "text/html; charset=utf-8",
    "css" to "text/css; charset=utf-8",
    "js" to "text/javascript; charset=utf-8",
    "mjs" to "text/javascript; charset=utf-8",
    "json" to "application/json",
    "map" to "application/json",
    "txt" to "text/plain; charset=utf-8",
    "md" to "text/plain; charset=utf-8",
    // Go's mime table has no YAML entry, so it sniffs the body and answers
    // text/plain; matching that keeps the preview identical.
    "yaml" to "text/plain; charset=utf-8",
    "yml" to "text/plain; charset=utf-8",
    "xml" to "application/xml",
    "svg" to "image/svg+xml",
    "png" to "image/png",
    "jpg" to "image/jpeg",
    "jpeg" to "image/jpeg",
    "gif" to "image/gif",
    "webp" to "image/webp",
    "avif" to "image/avif",
    "ico" to "image/x-icon",
    "mp4" to "video/mp4",
    "webm" to "video/webm",
    "mp3" to "audio/mpeg",
    "wav" to "audio/wav",
    "woff" to "font/woff",
    "woff2" to "font/woff2",
    "ttf" to "font/ttf",
    "otf" to "font/otf",
    "vtt" to "text/vtt",
    "pdf" to "application/pdf",
    "zip" to "application/zip",
)
