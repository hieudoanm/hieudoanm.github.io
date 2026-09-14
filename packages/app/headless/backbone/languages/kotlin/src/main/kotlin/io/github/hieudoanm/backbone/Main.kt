package io.github.hieudoanm.backbone

import io.github.hieudoanm.backbone.cache.CacheStore
import io.github.hieudoanm.backbone.core.AppConfig
import io.github.hieudoanm.backbone.core.AppError
import io.github.hieudoanm.backbone.core.AppState
import io.github.hieudoanm.backbone.cron.startCronScheduler
import io.github.hieudoanm.backbone.database.Database
import io.github.hieudoanm.backbone.http.createHttpClient
import io.github.hieudoanm.backbone.ratelimit.RateLimiter
import io.github.hieudoanm.backbone.routes.configureRoutes
import io.github.hieudoanm.backbone.ws.SSEHub
import io.github.hieudoanm.backbone.ws.WebSocketHub
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import io.ktor.http.*
import io.ktor.websocket.*
import kotlinx.coroutines.*
import kotlinx.serialization.json.*
import java.io.File
import java.security.SecureRandom
import java.time.Duration

fun main() {
    val config = AppConfig()
    val database = Database(config)
    val cache = CacheStore(config, database)
    val rateLimiter = RateLimiter()
    val wsHub = WebSocketHub(database)
    val notifHub = SSEHub<String>()
    val logHub = SSEHub<String>()
    val pubsubHub = SSEHub<String>()

    val storageDir = File(config.backboneData, "storage").also { it.mkdirs() }
    val secretsKey = loadOrGenerateSecretsKey(config.backboneData, config.secretsKeyHex)
    val httpClient = createHttpClient()

    val state = AppState(
        config = config,
        db = database,
        cache = cache,
        rateLimiter = rateLimiter,
        wsHub = wsHub,
        notifHub = notifHub,
        logHub = logHub,
        pubsubHub = pubsubHub,
        storageDir = storageDir,
        secretsKey = secretsKey,
        httpClient = httpClient,
    )

    val app = embeddedServer(Netty, port = config.port) {
        install(ContentNegotiation) {
            json(Json {
                ignoreUnknownKeys = true
            })
        }
        install(CORS) {
            anyHost()
        }
        install(WebSockets)
        install(StatusPages) {
            exception<AppError> { call, cause ->
                val body = buildJsonObject { put("error", cause.message) }.toString()
                call.respondText(body, ContentType.Application.Json, cause.status)
            }
            exception<Throwable> { call, cause ->
                call.application.log.error("Unhandled exception", cause)
                val body = buildJsonObject { put("error", "Internal error") }.toString()
                call.respondText(body, ContentType.Application.Json, HttpStatusCode.InternalServerError)
            }
        }

        configureRoutes(state)
    }

    val serviceScope = CoroutineScope(Dispatchers.Default + SupervisorJob())
    rateLimiter.startCleanup(serviceScope)
    cache.startEviction(serviceScope)
    startCronScheduler(serviceScope, database, httpClient)

    Runtime.getRuntime().addShutdownHook(Thread {
        serviceScope.cancel()
        app.stop(10, 30)
        database.close()
        httpClient.close()
    })

    app.start(wait = true)
}

private fun loadOrGenerateSecretsKey(dataDir: String, hexKey: String?): ByteArray {
    if (hexKey != null) {
        return ByteArray(hexKey.length / 2) { hexKey.substring(it * 2, it * 2 + 2).toInt(16).toByte() }
    }
    val keyFile = File(dataDir, "secrets.key")
    if (keyFile.exists()) {
        return keyFile.readText().trim().let { h ->
            ByteArray(h.length / 2) { h.substring(it * 2, it * 2 + 2).toInt(16).toByte() }
        }
    }
    val key = ByteArray(32).also { SecureRandom().nextBytes(it) }
    keyFile.writeText(key.joinToString("") { "%02x".format(it) })
    return key
}
