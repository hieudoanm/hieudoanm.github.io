package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.types.int
import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import com.sun.net.httpserver.HttpServer
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import java.io.BufferedReader
import java.io.File
import java.io.InputStreamReader
import java.net.InetSocketAddress
import java.util.concurrent.TimeUnit

class OpenrouterCommand : CliktCommand(name = "openrouter", help = "Interact with OpenRouter AI models and services") {
    init {
        subcommands(OpenrouterCode(), OpenrouterHook(), OpenrouterModels(), OpenrouterServe(), OpenrouterStatus())
    }
    override fun run() = Unit
}

private const val BASE_URL = "https://openrouter.ai/api/v1"

// ─── Config ──────────────────────────────────────────────────────────────────

private fun loadApiKey(): String? {
    System.getenv("OPEN_ROUTER_API_KEY")?.let { return it }
    val configFile = File(System.getProperty("user.home"), ".hieudoanm/config.json")
    if (configFile.exists()) {
        try {
            val data = GsonBuilder().create().fromJson(configFile.readText(), Map::class.java)
            (data["open_router_api_key"] as? String)?.let { return it }
        } catch (_: Exception) {}
    }
    val envFile = File(".env")
    if (envFile.exists()) {
        envFile.readLines().forEach { line ->
            val trimmed = line.trim()
            if (trimmed.startsWith("OPEN_ROUTER_API_KEY=")) return trimmed.substringAfter("=")
        }
    }
    return null
}

// ─── Models data class ───────────────────────────────────────────────────────

data class OpenRouterModel(
    val id: String = "",
    val name: String = "",
    val description: String = "",
    val context_length: Int = 0
)

// ─── Fetch models ────────────────────────────────────────────────────────────

private fun fetchFreeModels(): List<OpenRouterModel> {
    val client = OkHttpClient.Builder()
        .connectTimeout(10, TimeUnit.SECONDS)
        .readTimeout(10, TimeUnit.SECONDS)
        .build()
    val request = Request.Builder().url("$BASE_URL/models").build()
    val response = client.newCall(request).execute()
    val body = response.body?.string() ?: error("no response")
    val data = GsonBuilder().create().fromJson(body, Map::class.java)
    val models = (data["data"] as? List<Map<String, Any?>>) ?: emptyList()
    return models
        .filter { m ->
            val pricing = m["pricing"] as? Map<String, Any?> ?: emptyMap()
            val prompt = pricing["prompt"] as? String
            val completion = pricing["completion"] as? String
            (prompt == "0" || prompt.isNullOrEmpty()) && (completion == "0" || completion.isNullOrEmpty())
        }
        .map { GsonBuilder().create().fromJson(GsonBuilder().create().toJson(it), OpenRouterModel::class.java) }
        .sortedBy { it.id }
}

// ─── Code (AI assistant) ─────────────────────────────────────────────────────

class OpenrouterCode : CliktCommand(name = "code", help = "AI coding assistant with file editing and bash access") {
    private val model by option("--model").default("google/gemma-4-26b-a4b-it:free")
    override fun run() {
        val apiKey = loadApiKey() ?: error("OpenRouter API key not set. Set OPEN_ROUTER_API_KEY")
        val client = OkHttpClient.Builder()
            .connectTimeout(60, TimeUnit.SECONDS)
            .readTimeout(60, TimeUnit.SECONDS)
            .build()
        val reader = BufferedReader(InputStreamReader(System.`in`))
        val messages = mutableListOf<Map<String, Any?>>()
        messages.add(mapOf("role" to "system", "content" to "You are a coding assistant. Be concise."))
        echo("OpenRouter Code assistant (model: $model). Type /exit to quit.")
        while (true) {
            echo("> ", trailingNewline = false)
            val input = reader.readLine() ?: break
            val text = input.trim()
            if (text == "/exit") break
            if (text == "/new") { messages.clear(); messages.add(mapOf("role" to "system", "content" to "You are a coding assistant. Be concise.")); continue }
            if (text.startsWith("/")) continue
            messages.add(mapOf("role" to "user", "content" to text))
            val payload = mapOf("model" to model, "messages" to messages)
            val jsonBody = GsonBuilder().create().toJson(payload)
            val request = Request.Builder()
                .url("$BASE_URL/chat/completions")
                .header("Authorization", "Bearer $apiKey")
                .header("HTTP-Referer", "https://github.com/hieudoanm/hieudoanm")
                .header("X-Title", "hieudoanm")
                .post(jsonBody.toRequestBody("application/json".toMediaType()))
                .build()
            val resp = client.newCall(request).execute()
            val respBody = resp.body?.string() ?: "no response"
            val result = GsonBuilder().create().fromJson(respBody, Map::class.java)
            val choices = result["choices"] as? List<Map<String, Any?>> ?: emptyList()
            val reply = (choices.firstOrNull()?.get("message") as? Map<String, Any?>)?.get("content") as? String ?: "no response"
            messages.add(mapOf("role" to "assistant", "content" to reply))
            echo(reply)
        }
    }
}

// ─── Hook (Telegram webhook) ─────────────────────────────────────────────────

class OpenrouterHook : CliktCommand(name = "hook", help = "Start webhook server on :8080 and expose via ngrok") {
    override fun run() {
        echo("Starting hook mode...")
        val server = HttpServer.create(InetSocketAddress(8080), 0)
        server.createContext("/webhook") { exchange ->
            if (exchange.requestMethod == "POST") {
                val body = exchange.requestBody.readBytes().decodeToString()
                echo("Webhook received: $body")
                exchange.sendResponseHeaders(200, 12)
                exchange.responseBody.write("""{"ok":true}""".toByteArray())
            }
            exchange.close()
        }
        server.createContext("/health") { exchange ->
            exchange.sendResponseHeaders(200, 17)
            exchange.responseBody.write("""{"status":"healthy"}""".toByteArray())
            exchange.close()
        }
        server.start()
        echo("Webhook server listening on http://localhost:8080/webhook")
        echo("Health check at http://localhost:8080/health")
        try { Runtime.getRuntime().exec(arrayOf("ngrok", "http", "8080")) } catch (_: Exception) { echo("ngrok not found") }
        Thread.sleep(Long.MAX_VALUE)
    }
}

// ─── Models ──────────────────────────────────────────────────────────────────

class OpenrouterModels : CliktCommand(name = "models", help = "List available free models from OpenRouter") {
    private val search by option("--search", "-s")
    private val json by option("--json").flag()
    override fun run() {
        val models = fetchFreeModels()
        var filtered = models
        if (search != null) {
            val q = search!!.lowercase()
            filtered = models.filter { it.id.lowercase().contains(q) || it.name.lowercase().contains(q) }
        }
        if (json) {
            echo(GsonBuilder().setPrettyPrinting().create().toJson(filtered))
        } else {
            echo("${filtered.size} free model(s) on OpenRouter")
            val grouped = filtered.groupBy { it.id.split("/").first() }
            for ((provider, mods) in grouped.toSortedMap()) {
                echo("  $provider")
                for (m in mods) {
                    val ctx = if (m.context_length > 0) " [${formatCtx(m.context_length)} ctx]" else ""
                    echo("    ${m.id}$ctx")
                    if (m.description.isNotEmpty()) {
                        val desc = if (m.description.length > 72) m.description.take(71) + "..." else m.description
                        echo("      $desc")
                    }
                }
                echo()
            }
        }
    }
}

private fun formatCtx(n: Int): String = when {
    n >= 1_000_000 -> "${n / 1_000_000}M"
    n >= 1_000 -> "${n / 1_000}k"
    else -> "$n"
}

// ─── Serve ───────────────────────────────────────────────────────────────────

class OpenrouterServe : CliktCommand(name = "serve", help = "Start the OpenRouter HTTP server") {
    private val port by option("--port", "-p").default("8080")
    override fun run() {
        val server = HttpServer.create(InetSocketAddress(port.toInt()), 0)
        server.createContext("/") { exchange ->
            val resp = """{"message":"OpenRouter Chat API server is running"}"""
            exchange.responseHeaders.add("Content-Type", "application/json")
            exchange.sendResponseHeaders(200, resp.toByteArray().size.toLong())
            exchange.responseBody.write(resp.toByteArray())
            exchange.close()
        }
        server.createContext("/chat") { exchange ->
            exchange.responseHeaders.add("Content-Type", "application/json")
            if (exchange.requestMethod != "POST") {
                exchange.sendResponseHeaders(405, -1)
                exchange.close(); return@createContext
            }
            val body = exchange.requestBody.readBytes().decodeToString()
            val data = GsonBuilder().create().fromJson(body, Map::class.java)
            val prompt = (data["prompt"] as? String) ?: ""
            val model = (data["model"] as? String) ?: "openai/gpt-oss-20b"
            val apiKey = loadApiKey() ?: run {
                val err = """{"error":"API key not set"}"""
                exchange.sendResponseHeaders(500, err.toByteArray().size.toLong())
                exchange.responseBody.write(err.toByteArray()); exchange.close(); return@createContext
            }
            val resp = generate(model, prompt, apiKey)
            val out = GsonBuilder().create().toJson(mapOf("prompt" to prompt, "response" to resp))
            exchange.sendResponseHeaders(200, out.toByteArray().size.toLong())
            exchange.responseBody.write(out.toByteArray())
            exchange.close()
        }
        server.start()
        echo("OpenRouter server listening on http://localhost:$port")
        echo("  GET  / -> health check")
        echo("  POST /chat -> {\"prompt\":\"...\",\"model\":\"...\"}")
        Thread.sleep(Long.MAX_VALUE)
    }
}

private fun generate(model: String, prompt: String, apiKey: String): String {
    val client = OkHttpClient.Builder()
        .connectTimeout(30, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .build()
    val payload = mapOf(
        "model" to model,
        "messages" to listOf(mapOf("role" to "user", "content" to prompt)),
        "max_tokens" to 2048
    )
    val jsonBody = GsonBuilder().create().toJson(payload)
    val request = Request.Builder()
        .url("$BASE_URL/chat/completions")
        .header("Content-Type", "application/json")
        .header("Authorization", "Bearer $apiKey")
        .header("HTTP-Referer", "https://github.com/hieudoanm/hieudoanm")
        .header("X-Title", "hieudoanm")
        .post(jsonBody.toRequestBody("application/json".toMediaType()))
        .build()
    val resp = client.newCall(request).execute()
    val respBody = resp.body?.string() ?: error("no response")
    val result = GsonBuilder().create().fromJson(respBody, Map::class.java)
    if (result["error"] != null) error("OpenRouter error: $result")
    val choices = result["choices"] as? List<Map<String, Any?>> ?: error("no choices")
    return (choices.firstOrNull()?.get("message") as? Map<String, Any?>)?.get("content") as? String ?: ""
}

// ─── Status ──────────────────────────────────────────────────────────────────

class OpenrouterStatus : CliktCommand(name = "status", help = "Probe free models for availability and latency") {
    private val search by option("--search", "-s")
    private val workers by option("--workers", "-w").int().default(6)
    override fun run() {
        val apiKey = loadApiKey() ?: error("no OpenRouter API key found")
        var models = fetchFreeModels()
        if (search != null) {
            val q = search!!.lowercase()
            models = models.filter { it.id.lowercase().contains(q) || it.name.lowercase().contains(q) }
        }
        echo("Probing ${models.size} model(s)...")
        val client = OkHttpClient.Builder()
            .connectTimeout(5, TimeUnit.SECONDS)
            .readTimeout(5, TimeUnit.SECONDS)
            .build()
        data class ProbeResult(val id: String, val status: String, val latency: Long = 0, val message: String = "")
        val results = models.map { m ->
            try {
                val payload = mapOf(
                    "model" to m.id,
                    "messages" to listOf(mapOf("role" to "user", "content" to "hi")),
                    "max_tokens" to 1
                )
                val jsonBody = GsonBuilder().create().toJson(payload)
                val start = System.currentTimeMillis()
                val request = Request.Builder()
                    .url("$BASE_URL/chat/completions")
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer $apiKey")
                    .header("HTTP-Referer", "https://github.com/hieudoanm/hieudoanm")
                    .header("X-Title", "hieudoanm")
                    .post(jsonBody.toRequestBody("application/json".toMediaType()))
                    .build()
                val resp = client.newCall(request).execute()
                val elapsed = System.currentTimeMillis() - start
                when (resp.code) {
                    200 -> ProbeResult(m.id, "ok", elapsed)
                    429 -> ProbeResult(m.id, "rate-limited", message = resp.body?.string() ?: "")
                    404 -> ProbeResult(m.id, "restricted", message = resp.body?.string() ?: "")
                    else -> ProbeResult(m.id, "error", message = "HTTP ${resp.code}")
                }
            } catch (e: Exception) {
                ProbeResult(m.id, "error", message = e.message ?: "")
            }
        }.sortedBy { it.status }
        val okCount = results.count { it.status == "ok" }
        val rlCount = results.count { it.status == "rate-limited" }
        val restrictedCount = results.count { it.status == "restricted" }
        val errCount = results.count { it.status == "error" }
        echo("  OK: $okCount | Rate-limited: $rlCount | Restricted: $restrictedCount | Error: $errCount")
        echo()
        for (r in results) {
            when (r.status) {
                "ok" -> echo("  OK          ${r.id.padEnd(52)} ${r.latency}ms")
                "rate-limited" -> echo("  RATE-LIMIT  ${r.id.padEnd(52)} ${r.message}")
                "restricted" -> echo("  RESTRICTED  ${r.id.padEnd(52)} privacy/guardrail")
                "error" -> echo("  ERROR       ${r.id.padEnd(52)} ${r.message}")
            }
        }
    }
}
