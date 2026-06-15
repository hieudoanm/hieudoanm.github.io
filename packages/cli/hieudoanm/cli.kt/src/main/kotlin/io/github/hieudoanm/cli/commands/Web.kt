package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.arguments.argument
import com.github.ajalt.clikt.parameters.arguments.default
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.required
import com.github.ajalt.clikt.parameters.types.int
import com.google.gson.GsonBuilder
import io.github.hieudoanm.cli.services.Requests
import java.io.File
import java.net.URL

class WebCommand : CliktCommand(name = "web", help = "Web service tools") {
    init {
        subcommands(
            WebInstagram(), WebShopify(), WebSnapshot(), WebWeather(), WebYoutube()
        )
    }
    override fun run() = Unit
}

class WebInstagram : CliktCommand(name = "instagram", help = "Instagram related tools") {
    init { subcommands(WebInstagramDownload()) }
    override fun run() = Unit
}

class WebInstagramDownload : CliktCommand(name = "download", help = "Download images from Instagram") {
    private val url by option("--url", "-u", help = "Instagram post URL or shortcode").required()
    private val output by option("--output", "-o", help = "Output directory").default(".")
    private val index by option("--index", "-i", help = "Specific image index (1-based)").int().default(0)
    private val proxy by option("--proxy", "-p", help = "Use proxy").flag()
    private val json by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val shortcode = extractShortcode(url)
        val html = fetchIGPage(shortcode, proxy)
        val imageURLs = scrapeIGImages(html)
        if (imageURLs.isEmpty()) {
            echo("no images found in post $shortcode")
            return
        }

        if (json) {
            val gson = GsonBuilder().setPrettyPrinting().create()
            echo(gson.toJson(mapOf("shortcode" to shortcode, "image_urls" to imageURLs, "count" to imageURLs.size)))
            return
        }

        echo("Shortcode: $shortcode")
        echo("Found ${imageURLs.size} image candidates")

        val targets = if (index > 0) {
            if (index > imageURLs.size) throw IllegalArgumentException("index $index out of range (found ${imageURLs.size} images)")
            echo("Selected image index $index")
            listOf(imageURLs[index - 1])
        } else imageURLs

        File(output).mkdirs()
        var downloaded = 0
        targets.forEachIndexed { i, imgUrl ->
            val filename = if (targets.size == 1 && index > 0) "${shortcode}_$index.jpg"
                else if (targets.size == 1) "$shortcode.jpg"
                else "${shortcode}_${i + 1}.jpg"
            echo("  Downloading $filename ... ", trailingNewline = false)
            try {
                val url = URL(imgUrl)
                url.openStream().use { input -> File(File(output), filename).outputStream().use { it.write(input.readBytes()) } }
                echo("saved -> $filename")
                downloaded++
            } catch (e: Exception) {
                echo("failed: ${e.message}")
            }
        }
        echo("Done. $downloaded image(s) saved to $output")
    }
}

private val igShortcodePattern = Regex("(?:instagram\\.com/(?:p|reels|tv|reel)/)([^/?#&]+)")
private val igDisplayUrlPattern = Regex("\"display_url\":\"([^\"]+)\"")
private val igOgImagePattern = Regex("<meta property=\"og:image\" content=\"([^\"]+)\"")

private fun extractShortcode(input: String): String {
    val m = igShortcodePattern.find(input.trim())
    if (m != null) return m.groupValues[1]
    if (!input.contains("/") && input.trim().length >= 10) return input.trim()
    throw IllegalArgumentException("could not extract Instagram shortcode from: $input")
}

private fun fetchIGPage(shortcode: String, useProxy: Boolean): String {
    val targetURL = "https://www.instagram.com/p/$shortcode/"
    if (useProxy) {
        val proxyURL = "https://hieudoanm-proxy.vercel.app/api?url=${java.net.URLEncoder.encode(targetURL, "UTF-8")}"
        val result = Requests.get(proxyURL)
        return result.getOrThrow()
    }
    val result = Requests.get(targetURL, mapOf(
        "User-Agent" to "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    ))
    return result.getOrThrow()
}

private fun scrapeIGImages(html: String): List<String> {
    val urls = mutableListOf<String>()
    val seen = mutableSetOf<String>()
    for (m in igDisplayUrlPattern.findAll(html)) {
        val u = m.groupValues[1].replace("\\u0026", "&")
        if (seen.add(u)) urls.add(u)
    }
    if (urls.isEmpty()) {
        val m = igOgImagePattern.find(html)
        if (m != null) urls.add(m.groupValues[1])
    }
    return urls
}

class WebShopify : CliktCommand(name = "shopify", help = "Shopify detection and analysis tools") {
    init { subcommands(WebShopifyDetect()) }
    override fun run() = Unit
}

class WebShopifyDetect : CliktCommand(name = "detect", help = "Detect if a website is using Shopify") {
    private val url by argument().default("")
    private val verbose by option("--verbose", "-v", help = "Show detection signals").flag()
    private val json by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        var target = url
        if (target.isEmpty()) {
            echo("Enter website URL: ")
            target = readLine()?.trim() ?: ""
        }
        if (target.isEmpty()) throw IllegalArgumentException("URL is required")
        if (!target.startsWith("http://") && !target.startsWith("https://")) target = "https://$target"

        val (isShopify, isPlus, signals) = checkShopify(target)
        if (json) {
            val gson = GsonBuilder().setPrettyPrinting().create()
            echo(gson.toJson(mapOf("url" to target, "shopify" to isShopify, "plus" to isPlus, "signals" to signals)))
            return
        }
        if (isShopify) echo("Shopify detected")
        else {
            echo("Shopify not detected")
            return
        }
        if (isPlus) echo("Shopify Plus detected")
        else echo("Shopify Plus not detected")
        if (verbose && signals.isNotEmpty()) {
            echo("Signals:")
            signals.forEach { echo(" - $it") }
        }
    }
}

private data class ShopifyResult(val isShopify: Boolean, val isPlus: Boolean, val signals: List<String>)

private fun checkShopify(urlStr: String): ShopifyResult {
    var isShopify = false
    var isPlus = false
    val signals = mutableListOf<String>()

    try {
        val url = URL(urlStr)
        val conn = url.openConnection() as java.net.HttpURLConnection
        conn.setRequestProperty("User-Agent", "shopify-check/1.0")
        conn.connectTimeout = 10000
        conn.readTimeout = 10000
        conn.instanceFollowRedirects = true

        for ((key, values) in conn.headerFields) {
            if (key == null) continue
            val lk = key.lowercase()
            if (lk.startsWith("x-shopify")) {
                isShopify = true
                signals.add("Header: $key")
                if (lk == "x-shopify-stage" || lk == "x-shopify-shop-api-call-limit") isPlus = true
            }
            values.forEach { v ->
                if (v.lowercase().contains("shopify")) {
                    isShopify = true
                    signals.add("Header value: $key")
                }
            }
        }

        val body = conn.inputStream.bufferedReader().readText().take(16 * 1024).lowercase()
        if (body.contains("cdn.shopify.com")) { isShopify = true; signals.add("HTML: cdn.shopify.com") }
        if (body.contains("shopify-section")) { isShopify = true; signals.add("HTML: shopify-section") }
        if (body.contains("shopify-plus")) { isPlus = true; signals.add("HTML: shopify-plus") }
    } catch (_: Exception) {}
    return ShopifyResult(isShopify, isPlus, signals)
}

class WebSnapshot : CliktCommand(name = "snapshot", help = "Take a screenshot of a web page") {
    private val url by option("--url", "-u", help = "URL to capture").required()
    private val output by option("--output", "-o", help = "Output file or directory").default("")
    private val width by option("--width", help = "Viewport width").int().default(0)
    private val height by option("--height", help = "Viewport height").int().default(0)
    private val preset by option("--preset", help = "Viewport preset: desktop|laptop|tablet|mobile|hd|4k").default("desktop")
    private val fullPage by option("--full-page", help = "Capture full scrollable page").flag()
    private val delay by option("--delay", help = "Wait before capturing (e.g. 500ms, 2s)").default("")
    private val pdf by option("--pdf", help = "Save as PDF instead of PNG").flag()
    private val quality by option("--quality", help = "Screenshot quality 1-100").int().default(90)
    private val verbose by option("--verbose", "-v", help = "Print extra info").flag()
    private val json by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        var rawURL = url
        if (!rawURL.startsWith("http://") && !rawURL.startsWith("https://")) rawURL = "https://$rawURL"
        val ext = if (pdf) ".pdf" else ".png"
        val outPath = if (output.isNotEmpty()) output else "${System.getProperty("user.home")}/.snapshot/${hostnameSlug(rawURL)}_${java.time.LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"))}$ext"

        echo("Snapshot: Opening $rawURL in default browser (external tool)")
        try {
            val os = System.getProperty("os.name").lowercase()
            val cmd = when {
                os.contains("mac") -> arrayOf("open", rawURL)
                os.contains("linux") -> arrayOf("xdg-open", rawURL)
                else -> arrayOf("cmd", "/c", "start", rawURL)
            }
            Runtime.getRuntime().exec(cmd)
        } catch (e: Exception) {
            echo("Failed to open browser: ${e.message}")
        }

        if (json) {
            val gson = GsonBuilder().setPrettyPrinting().create()
            echo(gson.toJson(mapOf("url" to rawURL, "format" to ext.uppercase().removePrefix("."))))
        }
    }
}

private fun hostnameSlug(rawURL: String): String {
    return try {
        val u = URL(rawURL)
        u.host.replace(".", "_").replace(":", "_")
    } catch (_: Exception) { "snapshot" }
}

class WebWeather : CliktCommand(name = "weather", help = "Check current weather for a city") {
    private val city by argument().default("")
    private val forecast by option("--forecast", "-f", help = "Show 3-day forecast").flag()
    private val json by option("--json", help = "Output in JSON format").flag()
    private val units by option("--units", "-u", help = "Units: metric, imperial, uk").default("metric")

    override fun run() {
        var location = city
        if (location.isEmpty() && !forecast) {
            val ipResult = Requests.get("https://ipinfo.io/json")
            ipResult.onSuccess { body ->
                try {
                    val data = GsonBuilder().create().fromJson(body, Map::class.java)
                    location = data["city"]?.toString() ?: ""
                } catch (_: Exception) {}
            }
        }
        if (location.isEmpty()) throw IllegalArgumentException("provide a city name")

        val unitParam = when (units) {
            "us", "imperial" -> "u"
            "uk" -> "M"
            else -> "m"
        }
        val encoded = java.net.URLEncoder.encode(location, "UTF-8")
        val url = if (forecast) {
            if (json) "https://wttr.in/$encoded?format=j1&lang=en&$unitParam"
            else "https://wttr.in/$encoded?0&lang=en&$unitParam"
        } else {
            if (json) "https://wttr.in/$encoded?format=j1&lang=en&$unitParam"
            else "https://wttr.in/$encoded?format=%C+%t+%w+%h&$unitParam"
        }

        val result = Requests.get(url)
        result.onSuccess { body ->
            if (json) {
                try {
                    val data = GsonBuilder().create().fromJson(body, Any::class.java)
                    val gson = GsonBuilder().setPrettyPrinting().create()
                    echo(gson.toJson(data))
                } catch (_: Exception) { echo(body) }
            } else {
                echo(body.trim())
            }
        }.onFailure { echo("fetch error: ${it.message}") }
    }
}

class WebYoutube : CliktCommand(name = "youtube", help = "YouTube transcript and thumbnail tools") {
    init { subcommands(WebYoutubeThumbnails(), WebYoutubeTranscript()) }
    override fun run() = Unit
}

private data class YtQuality(val id: String, val label: String, val resolution: String)

private val ytQualities = listOf(
    YtQuality("maxresdefault", "Max Resolution", "1280x720"),
    YtQuality("sddefault", "SD", "640x480"),
    YtQuality("hqdefault", "HQ", "480x360"),
    YtQuality("mqdefault", "MQ", "320x180"),
    YtQuality("default", "Default", "120x90"),
    YtQuality("0", "Frame 0", "480x360"),
    YtQuality("1", "Frame 1", "120x90"),
    YtQuality("2", "Frame 2", "120x90"),
    YtQuality("3", "Frame 3", "120x90"),
)

private val ytVideoIDPatterns = listOf(
    Regex("(?:youtube\\.com/watch\\?.*v=)([a-zA-Z0-9_-]{11})"),
    Regex("(?:youtu\\.be/)([a-zA-Z0-9_-]{11})"),
    Regex("(?:youtube\\.com/embed/)([a-zA-Z0-9_-]{11})"),
    Regex("(?:youtube\\.com/shorts/)([a-zA-Z0-9_-]{11})"),
    Regex("^([a-zA-Z0-9_-]{11})$"),
)

private fun ytExtractVideoID(input: String): String {
    val trimmed = input.trim()
    for (re in ytVideoIDPatterns) {
        val m = re.find(trimmed)
        if (m != null) return m.groupValues[1]
    }
    throw IllegalArgumentException("could not extract video ID from: $input")
}

private fun ytThumbURL(videoID: String, qualityID: String): String =
    "https://img.youtube.com/vi/$videoID/$qualityID.jpg"

private fun ytValidQualityIDs(): String = ytQualities.joinToString(", ") { it.id }

private fun ytDownloadThumb(videoID: String, qualityID: String, outDir: String): String {
    val rawURL = ytThumbURL(videoID, qualityID)
    val url = URL(rawURL)
    val bytes = url.openStream().readBytes()
    if (bytes.size < 1000) throw IllegalArgumentException("quality $qualityID not available (too small: ${bytes.size} bytes)")
    val filename = "$videoID-$qualityID.jpg"
    val path = File(outDir, filename)
    path.writeBytes(bytes)
    return path.absolutePath
}

class WebYoutubeThumbnails : CliktCommand(name = "thumbnails", help = "Download YouTube video thumbnails") {
    private val url by option("--url", "-u", help = "Video URL or ID").required()
    private val quality by option("--quality", "-q", help = "Specific quality to download").default("")
    private val output by option("--output", "-o", help = "Output directory").default(".")
    private val all by option("--all", "-a", help = "Download all quality variants").flag()
    private val list by option("--list", "-l", help = "List thumbnail URLs without downloading").flag()
    private val json by option("--json", help = "Output in JSON format (with --list)").flag()

    override fun run() {
        val videoID = ytExtractVideoID(url)

        if (list) {
            if (json) {
                val entries = ytQualities.map { q -> mapOf("id" to q.id, "resolution" to q.resolution, "url" to ytThumbURL(videoID, q.id)) }
                val gson = GsonBuilder().setPrettyPrinting().create()
                echo(gson.toJson(mapOf("video_id" to videoID, "thumbnails" to entries)))
            } else {
                echo("Video ID: $videoID")
                echo("")
                echo("Available thumbnail URLs:")
                ytQualities.forEach { q -> echo("  ${"%-18s".format(q.id)} ${"%-12s".format(q.resolution)} ${ytThumbURL(videoID, q.id)}") }
            }
            return
        }

        echo("Video ID: $videoID")
        File(output).mkdirs()
        val targets = when {
            all -> ytQualities
            quality.isNotEmpty() -> {
                val found = ytQualities.firstOrNull { it.id == quality }
                    ?: throw IllegalArgumentException("unknown quality $quality — valid values: ${ytValidQualityIDs()}")
                listOf(found)
            }
            else -> ytQualities.take(3)
        }
        var downloaded = 0
        for (q in targets) {
            echo("  Downloading ${"%-18s".format(q.id)} (${q.resolution}) ... ", trailingNewline = false)
            try {
                val path = ytDownloadThumb(videoID, q.id, output)
                echo("saved -> $path")
                downloaded++
            } catch (e: Exception) {
                echo("skipped (${e.message})")
            }
        }
        echo("Done. $downloaded thumbnail(s) saved to $output")
    }
}

class WebYoutubeTranscript : CliktCommand(name = "transcript", help = "Fetch YouTube video transcript") {
    private val url by option("--url", "-u", help = "Video URL or ID").required()
    private val lang by option("--lang", "-l", help = "Language code (e.g. en, es, fr)").default("en")
    private val output by option("--output", "-o", help = "Save to file instead of stdout").default("")
    private val format by option("--format", "-f", help = "Output format: text or json").default("text")
    private val noTimestamps by option("--no-timestamps", help = "Omit timestamps from text output").flag()

    override fun run() {
        val videoID = ytExtractVideoID(url)
        val apiURL = "https://youtubetranscript.com/?v=$videoID&lang=$lang"
        val result = Requests.get(apiURL)
        result.onSuccess { body ->
            val out = body
            if (output.isNotEmpty()) File(output).writeText(out)
            else echo(out)
        }.onFailure { echo("Failed to fetch transcript: ${it.message}") }
    }
}
