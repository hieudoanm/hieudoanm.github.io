package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.arguments.argument
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.types.int
import com.google.gson.GsonBuilder
import okhttp3.OkHttpClient
import okhttp3.Request
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.InetAddress
import java.net.Socket
import java.net.URL
import java.security.cert.X509Certificate
import java.time.Duration
import java.time.Instant
import java.util.concurrent.TimeUnit
import javax.net.ssl.SSLContext
import javax.net.ssl.TrustManager
import javax.net.ssl.X509TrustManager

class NetCommand : CliktCommand(name = "net", help = "Network diagnostics and servers") {
    init {
        subcommands(
            NetCert(), NetCertCheck(), NetCertInfo(), NetDns(), NetHttp(),
            NetIp(), NetPing(), NetServe(), NetStatus(), NetWhois(), NetWifi()
        )
    }
    override fun run() = Unit
}

// ─── TLS Cert ────────────────────────────────────────────────────────────────

class NetCert : CliktCommand(name = "cert", help = "SSL/TLS certificate inspection") {
    init {
        subcommands(NetCertInfo(), NetCertCheck())
    }
    override fun run() = Unit
}

private val trustAllCerts = arrayOf<TrustManager>(object : X509TrustManager {
    override fun checkClientTrusted(chain: Array<out X509Certificate>?, authType: String?) {}
    override fun checkServerTrusted(chain: Array<out X509Certificate>?, authType: String?) {}
    override fun getAcceptedIssuers(): Array<X509Certificate> = arrayOf()
})

private fun tlsSocket(host: String): Socket {
    var h = host
    if (!h.contains(":")) h += ":443"
    val parts = h.split(":")
    val ctx = SSLContext.getInstance("TLS").apply { init(null, trustAllCerts, java.security.SecureRandom()) }
    val factory = ctx.socketFactory
    return factory.createSocket(parts[0], parts[1].toInt())
}

class NetCertInfo : CliktCommand(name = "info", help = "Show detailed certificate information") {
    private val host by option("--host", "-H")
    override fun run() {
        val sock = tlsSocket(host ?: error("--host required"))
        sock.use { s ->
            val session = (s as? javax.net.ssl.SSLSocket)?.session ?: return
            session.peerCertificates.forEachIndexed { i, cert ->
                val c = cert as X509Certificate
                echo("-- Certificate ${i + 1} ----------------------")
                echo("Subject   : ${c.subjectX500Principal.name}")
                echo("Issuer    : ${c.issuerX500Principal.name}")
                echo("Serial    : ${c.serialNumber}")
                echo("Version   : ${c.version}")
                echo()
                echo("Validity:")
                echo("  Not Before: ${c.notBefore}")
                echo("  Not After : ${c.notAfter}")
                val remaining = Duration.between(Instant.now(), c.notAfter.toInstant())
                if (remaining.isNegative) {
                    echo("  Status    : EXPIRED (${remaining.abs().seconds}s ago)")
                } else {
                    echo("  Status    : Valid (${remaining.seconds}s remaining)")
                }
                if (c.subjectAlternativeNames != null) {
                    echo()
                    echo("Subject Alternative Names:")
                    c.subjectAlternativeNames.forEach { echo("  - ${it[1]}") }
                }
                echo()
                echo("Signature Algorithm: ${c.sigAlgName}")
                echo("Public Key Algorithm: ${c.publicKey.algorithm}")
                echo()
            }
        }
    }
}

class NetCertCheck : CliktCommand(name = "check", help = "Quick certificate health check (expiry warning)") {
    private val host by option("--host", "-H")
    override fun run() {
        val sock = tlsSocket(host ?: error("--host required"))
        sock.use { s ->
            val session = (s as? javax.net.ssl.SSLSocket)?.session ?: return
            val cert = session.peerCertificates.firstOrNull() as? X509Certificate ?: return
            val remaining = Duration.between(Instant.now(), cert.notAfter.toInstant())
            echo("Host      : ${host ?: ""}")
            echo("Status    : ${if (remaining.isNegative) "EXPIRED" else if (remaining.seconds < 30 * 86400) "Expiring soon" else "Valid"}")
            echo("SANs      : ${cert.subjectAlternativeNames?.size ?: 0} DNS names")
        }
    }
}

// ─── DNS ─────────────────────────────────────────────────────────────────────

data class DnsResult(
    var domain: String = "",
    var a: List<String> = emptyList(),
    var aaaa: List<String> = emptyList(),
    var cname: String = "",
    var mx: List<String> = emptyList(),
    var ns: List<String> = emptyList(),
    var txt: List<String> = emptyList()
)

class NetDns : CliktCommand(name = "dns", help = "DNS record lookup") {
    private val domain by option("--domain", "-d")
    private val type by option("--type", "-t")
    private val json by option("--json").flag()
    override fun run() {
        val d = domain ?: error("--domain required")
        val types = if (type != null) listOf(type!!.lowercase()) else listOf("a", "aaaa", "cname", "mx", "ns", "txt")
        val result = DnsResult(domain = d)
        for (t in types) {
            when (t) {
                "a" -> {
                    try {
                        val addrs = InetAddress.getAllByName(d)
                        result.a?.let { result.a = it + addrs.filter { it is java.net.Inet4Address }.map { it.hostAddress } }
                    } catch (_: Exception) {}
                }
                "aaaa" -> {
                    try {
                        val addrs = InetAddress.getAllByName(d)
                        result.aaaa?.let { result.aaaa = it + addrs.filter { it is java.net.Inet6Address }.map { it.hostAddress } }
                    } catch (_: Exception) {}
                }
                "cname" -> {
                    try { result.cname = InetAddress.getByName(d).canonicalHostName.trimEnd('.') } catch (_: Exception) {}
                }
                "mx" -> {}
                "ns" -> {
                    try { result.ns = InetAddress.getAllByName(d).map { it.canonicalHostName.trimEnd('.') } } catch (_: Exception) {}
                }
                "txt" -> {}
            }
        }
        if (json) {
            echo(GsonBuilder().setPrettyPrinting().create().toJson(result))
        } else {
            echo("Domain: ${result.domain}")
            if (result.a.isNotEmpty()) echo("A:      ${result.a.joinToString(", ")}")
            if (result.aaaa.isNotEmpty()) echo("AAAA:   ${result.aaaa.joinToString(", ")}")
            if (result.cname.isNotEmpty()) echo("CNAME:  ${result.cname}")
            if (result.mx.isNotEmpty()) echo("MX:     ${result.mx.joinToString(", ")}")
            if (result.ns.isNotEmpty()) echo("NS:     ${result.ns.joinToString(", ")}")
            if (result.txt.isNotEmpty()) echo("TXT:    ${result.txt.joinToString(", ")}")
        }
    }
}

// ─── HTTP ────────────────────────────────────────────────────────────────────

class NetHttp : CliktCommand(name = "http", help = "Make HTTP requests") {
    private val url by option("--url", "-u")
    private val method by option("--method", "-X").default("GET")
    private val data by option("--data", "-d")
    private val header by option("--header", "-H")
    private val json by option("--json").flag()
    override fun run() {
        val u = url ?: error("--url required")
        val m = method.uppercase()
        val conn = URL(u).openConnection() as HttpURLConnection
        conn.requestMethod = m
        val hdr = header
        if (hdr != null) {
            hdr.split(",").forEach { h ->
                val parts = h.split(":", limit = 2)
                if (parts.size == 2) conn.setRequestProperty(parts[0].trim(), parts[1].trim())
            }
        }
        val dataStr = data
        if (dataStr != null) {
            conn.doOutput = true
            conn.outputStream.write(dataStr.toByteArray())
        }
        val body = conn.inputStream.readAllBytes().decodeToString()
        echo(body)
    }
}

// ─── IP ──────────────────────────────────────────────────────────────────────

data class IPInfo(
    val ip: String = "", val version: String = "",
    val city: String = "", val region: String = "",
    val countryName: String = "", val countryCode: String = "",
    val postal: String = "", val latitude: String = "",
    val longitude: String = "", val timezone: String = "",
    val org: String = "", val asn: String = ""
)

class NetIp : CliktCommand(name = "ip", help = "Look up your public IP and geolocation") {
    private val json by option("--json").flag()
    override fun run() {
        try {
            val ipResp = URL("https://api.ipify.org?format=json").readText()
            val ip = GsonBuilder().create().fromJson(ipResp, Map::class.java)["ip"] as? String ?: error("no ip")
            val infoResp = URL("https://ipinfo.io/$ip/json").readText()
            val data = GsonBuilder().create().fromJson(infoResp, Map::class.java)
            val loc = (data["loc"] as? String)?.split(",") ?: listOf("", "")
            val info = IPInfo(
                ip = ip, version = if (ip.contains(":")) "IPv6" else "IPv4",
                city = data["city"] as? String ?: "",
                region = data["region"] as? String ?: "",
                countryName = data["country"] as? String ?: "",
                countryCode = data["country"] as? String ?: "",
                postal = data["postal"] as? String ?: "",
                latitude = loc.getOrElse(0) { "" },
                longitude = loc.getOrElse(1) { "" },
                timezone = data["timezone"] as? String ?: "",
                org = data["org"] as? String ?: "",
                asn = data["org"] as? String ?: ""
            )
            if (json) {
                echo(GsonBuilder().setPrettyPrinting().create().toJson(info))
            } else {
                echo("Provider    : IPinfo")
                echo()
                echo("-- Network Info ----------------------")
                echo("IP          : ${info.ip}")
                echo("Version     : ${info.version}")
                echo("ASN         : ${info.asn}")
                echo("Organization: ${info.org}")
                echo("Timezone    : ${info.timezone}")
                echo()
                echo("-- Location --------------------------")
                echo("Country     : ${info.countryName}")
                echo("Region      : ${info.region}")
                echo("City        : ${info.city}")
                echo("Postal      : ${info.postal}")
                echo("Coordinates : ${info.latitude}, ${info.longitude}")
            }
        } catch (e: Exception) {
            error("IP lookup failed: ${e.message}")
        }
    }
}

// ─── Ping ────────────────────────────────────────────────────────────────────

class NetPing : CliktCommand(name = "ping", help = "TCP ping to check host reachability") {
    private val host by option("--host", "-H")
    private val port by option("--port", "-p").int().default(80)
    private val count by option("--count", "-c").int().default(4)
    private val timeout by option("--timeout", "-t").int().default(5)
    private val json by option("--json").flag()
    override fun run() {
        val h = host ?: error("--host required")
        var successes = 0; var failures = 0; var total = 0L
        val results = mutableListOf<Map<String, Any?>>()
        for (i in 0 until count) {
            val start = System.currentTimeMillis()
            try {
                Socket().use { sock -> sock.connect(java.net.InetSocketAddress(h, port), timeout * 1000) }
                successes++; val elapsed = System.currentTimeMillis() - start; total += elapsed
                if (json) results.add(mapOf("seq" to (i + 1), "success" to true, "latency" to "${elapsed}ms"))
                else echo("PING $h (port $port) - seq=${i + 1} time=${elapsed}ms")
            } catch (e: Exception) {
                failures++; val elapsed = System.currentTimeMillis() - start
                if (json) results.add(mapOf("seq" to (i + 1), "success" to false, "error" to e.message))
                else echo("PING $h (port $port) - seq=${i + 1} time=${elapsed}ms error=${e.message}")
            }
        }
        if (json) {
            val avg = if (successes > 0) "${total / successes}ms" else "0ms"
            echo(GsonBuilder().setPrettyPrinting().create().toJson(mapOf(
                "host" to h, "port" to port, "sent" to count,
                "successes" to successes, "failures" to failures,
                "avg_ms" to avg, "results" to results
            )))
        } else {
            echo()
            echo("--- $h ping statistics ---")
            echo("$count sent, $successes received, ${if (count > 0) "%.0f".format(failures.toFloat() / count * 100) else "0"}% loss")
            if (successes > 0) echo("avg time: ${total / successes}ms")
        }
    }
}

// ─── Serve ───────────────────────────────────────────────────────────────────

class NetServe : CliktCommand(name = "serve", help = "Start an HTTP file server") {
    private val port by option("--port", "-p").int().default(8080)
    private val dir by option("--dir", "-d").default(".")
    private val cors by option("--cors").flag()
    override fun run() {
        val absDir = java.io.File(dir).absoluteFile
        if (!absDir.isDirectory) error("${absDir.path} is not a directory")
        val addr = java.net.InetSocketAddress(port)
        val server = com.sun.net.httpserver.HttpServer.create(addr, 0)
        server.createContext("/") { exchange ->
            if (cors) {
                exchange.responseHeaders.add("Access-Control-Allow-Origin", "*")
                exchange.responseHeaders.add("Access-Control-Allow-Methods", "GET, OPTIONS")
            }
            if (exchange.requestMethod == "OPTIONS") {
                exchange.sendResponseHeaders(204, -1)
                return@createContext
            }
            val file = java.io.File(absDir, exchange.requestURI.path.removePrefix("/").ifEmpty { "." })
            if (file.isFile) {
                exchange.sendResponseHeaders(200, file.length())
                file.inputStream().use { it.copyTo(exchange.responseBody) }
            } else {
                val html = file.listFiles()?.joinToString("\n") { "<a href=\"${it.name}\">${it.name}</a>" } ?: "404"
                exchange.sendResponseHeaders(200, html.toByteArray().size.toLong())
                exchange.responseBody.write(html.toByteArray())
            }
            exchange.responseBody.close()
        }
        echo("Serving ${absDir.path} on http://localhost:$port")
        server.start()
    }
}

// ─── Status ──────────────────────────────────────────────────────────────────

class NetStatus : CliktCommand(name = "status", help = "Check the uptime status of cloud services") {
    private val json by option("--json").flag()
    override fun run() {
        val services = mapOf(
            "GitHub" to "https://www.githubstatus.com/api/v2/status.json",
            "Vercel" to "https://www.vercel-status.com/api/v2/status.json",
            "Cloudflare" to "https://www.cloudflarestatus.com/api/v2/status.json",
            "Netlify" to "https://www.netlifystatus.com/api/v2/status.json"
        )
        val results = services.map { (name, url) ->
            try {
                val resp = URL(url).readText()
                val data = GsonBuilder().create().fromJson(resp, Map::class.java)
                val status = (data["status"] as? Map<*, *>)?.get("description") as? String ?: "unknown"
                name to status
            } catch (e: Exception) {
                name to "Error: ${e.message}"
            }
        }
        if (json) {
            echo(GsonBuilder().setPrettyPrinting().create().toJson(results.map { mapOf("name" to it.first, "status" to it.second) }))
        } else {
            results.forEach { (name, status) -> echo("$name: $status") }
        }
    }
}

// ─── Whois ───────────────────────────────────────────────────────────────────

class NetWhois : CliktCommand(name = "whois", help = "WHOIS lookup for a domain") {
    private val domain by option("--domain", "-d")
    private val server by option("--server", "-s")
    override fun run() {
        val d = domain ?: error("--domain required")
        val whoisServer = server ?: whoisServerFor(d)
        Socket().use { sock ->
            sock.connect(java.net.InetSocketAddress(whoisServer, 43), 10000)
            sock.soTimeout = 10000
            sock.getOutputStream().write("$d\r\n".toByteArray())
            val reader = BufferedReader(InputStreamReader(sock.getInputStream()))
            reader.lines().forEach { echo(it) }
        }
    }
}

private fun whoisServerFor(domain: String): String {
    val tld = domain.split(".").lastOrNull() ?: return "whois.iana.org"
    return when (tld) {
        "com", "net" -> "whois.verisign-grs.com"
        "org" -> "whois.pir.org"
        "io" -> "whois.nic.io"
        "dev" -> "whois.nic.dev"
        "app" -> "whois.nic.google"
        "ai" -> "whois.nic.ai"
        "me" -> "whois.nic.me"
        "co" -> "whois.nic.co"
        "uk" -> "whois.nic.uk"
        "de" -> "whois.denic.de"
        "jp" -> "whois.jprs.jp"
        "fr" -> "whois.nic.fr"
        "xyz" -> "whois.nic.xyz"
        else -> "whois.nic.$tld"
    }
}

// ─── WiFi ────────────────────────────────────────────────────────────────────

class NetWifi : CliktCommand(name = "wifi", help = "Show current WiFi network info") {
    private val json by option("--json").flag()
    override fun run() {
        try {
            val os = System.getProperty("os.name").lowercase()
            val out = if (os.contains("mac")) {
                val proc = Runtime.getRuntime().exec( arrayOf("networksetup", "-getairportnetwork", "en0"))
                proc.inputStream.readAllBytes().decodeToString()
            } else if (os.contains("linux")) {
                val proc = Runtime.getRuntime().exec(arrayOf("iwgetid"))
                proc.inputStream.readAllBytes().decodeToString()
            } else {
                error("unsupported OS: $os")
            }
            if (json) {
                echo(GsonBuilder().setPrettyPrinting().create().toJson(mapOf("output" to out.trim())))
            } else {
                echo(out.trim())
            }
        } catch (e: Exception) {
            error("WiFi scan failed: ${e.message}")
        }
    }
}
