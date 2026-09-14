package io.github.hieudoanm.backbone.routes

import io.github.hieudoanm.backbone.cache.CacheStore
import io.github.hieudoanm.backbone.core.AppConfig
import io.github.hieudoanm.backbone.core.AppError
import io.github.hieudoanm.backbone.core.AppState
import io.github.hieudoanm.backbone.database.Database
import io.github.hieudoanm.backbone.http.createHttpClient
import io.github.hieudoanm.backbone.ratelimit.RateLimiter
import io.github.hieudoanm.backbone.ws.SSEHub
import io.github.hieudoanm.backbone.ws.WebSocketHub
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.response.*
import io.ktor.server.testing.*
import io.ktor.server.websocket.*
import kotlin.test.assertEquals
import kotlinx.serialization.json.*
import org.junit.jupiter.api.*
import java.io.File
import java.security.SecureRandom

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
abstract class RoutesTestBase {
    protected lateinit var state: AppState
    protected lateinit var tempDir: File
    protected val json = Json { ignoreUnknownKeys = true }

    @BeforeAll
    fun setup() {
        tempDir = createTempDir("backbone-test-")
        val config = AppConfig(
            port = 0,
            jwtSecret = "test-secret-at-least-32-characters-long!!",
            backboneData = tempDir.absolutePath,
            secretsKeyHex = null,
        )
        val database = Database(config)
        val cache = CacheStore(config, database)
        val rateLimiter = RateLimiter()
        val wsHub = WebSocketHub(database)
        val notifHub = SSEHub<String>()
        val logHub = SSEHub<String>()
        val pubsubHub = SSEHub<String>()
        val storageDir = File(config.backboneData, "storage").also { it.mkdirs() }

        val key = ByteArray(32).also { SecureRandom().nextBytes(it) }
        state = AppState(
            config = config, db = database, cache = cache,
            rateLimiter = rateLimiter, wsHub = wsHub,
            notifHub = notifHub, logHub = logHub, pubsubHub = pubsubHub,
            storageDir = storageDir, secretsKey = key, httpClient = createHttpClient(),
        )
    }

    @BeforeEach
    fun cleanup() {
        state.cache.flush()
        for (table in listOf(
            "_pubsub_messages", "_pubsub_topics", "_cronjob_logs", "_cronjobs",
            "_files", "_notifications", "_logs", "_cache", "_secrets", "_webhooks",
            "_permissions", "_buckets", "_collections", "_users",
        )) {
            state.db.connection().use { conn ->
                conn.createStatement().executeUpdate("DELETE FROM $table")
            }
        }
    }

    @AfterAll
    fun teardown() {
        state.db.close()
        state.httpClient.close()
        tempDir.deleteRecursively()
    }

    protected fun Application.testModule() {
        install(ContentNegotiation) { json(Json { ignoreUnknownKeys = true }) }
        install(CORS) { anyHost() }
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
        install(WebSockets)
        configureRoutes(state)
    }

    protected fun testApp(callback: suspend ApplicationTestBuilder.() -> Unit) = testApplication {
        application { testModule() }
        callback()
    }

    protected fun io.ktor.client.request.HttpRequestBuilder.bearer(token: String) {
        header(HttpHeaders.Authorization, "Bearer $token")
    }

    protected suspend fun registerUser(client: HttpClient, email: String = "test@example.com", password: String = "password123"): String {
        val res = client.post("/api/auth/register") {
            contentType(ContentType.Application.Json)
            setBody("""{"email":"$email","password":"$password"}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)
        return res.bodyAsText()
    }

    protected suspend fun loginUser(client: HttpClient, email: String = "test@example.com", password: String = "password123"): String {
        val res = client.post("/api/auth/login") {
            contentType(ContentType.Application.Json)
            setBody("""{"email":"$email","password":"$password"}""")
        }
        assertEquals(HttpStatusCode.OK, res.status)
        val body = json.decodeFromString<JsonObject>(res.bodyAsText())
        return body["token"]!!.jsonPrimitive.content
    }
}
