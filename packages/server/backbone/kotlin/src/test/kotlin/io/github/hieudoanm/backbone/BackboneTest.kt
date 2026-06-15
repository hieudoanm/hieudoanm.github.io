package io.github.hieudoanm.backbone

import io.github.hieudoanm.backbone.cache.CacheStore
import io.github.hieudoanm.backbone.core.AppConfig
import io.github.hieudoanm.backbone.core.AppError
import io.github.hieudoanm.backbone.core.AppState
import io.github.hieudoanm.backbone.database.Database
import io.github.hieudoanm.backbone.http.createHttpClient
import io.github.hieudoanm.backbone.ratelimit.RateLimiter
import io.github.hieudoanm.backbone.routes.configureRoutes
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
import kotlinx.serialization.json.*
import org.junit.jupiter.api.*
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation
import java.io.File
import java.security.SecureRandom
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class BackboneTest {
    private lateinit var state: AppState
    private lateinit var tempDir: File
    private val json = Json { ignoreUnknownKeys = true }

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
            config = config,
            db = database,
            cache = cache,
            rateLimiter = rateLimiter,
            wsHub = wsHub,
            notifHub = notifHub,
            logHub = logHub,
            pubsubHub = pubsubHub,
            storageDir = storageDir,
            secretsKey = key,
            httpClient = createHttpClient(),
        )
    }

    @BeforeEach
    fun cleanup() {
        state.cache.flush()
        for (table in listOf("_pubsub_messages", "_pubsub_topics", "_cronjob_logs", "_cronjobs",
                "_files", "_notifications", "_logs", "_cache", "_secrets", "_webhooks",
                "_permissions", "_buckets", "_collections", "_users")) {
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

    private fun Application.testModule() {
        install(ContentNegotiation) {
            json(Json { ignoreUnknownKeys = true })
        }
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

    private fun testApp(callback: suspend ApplicationTestBuilder.() -> Unit) = testApplication {
        application { testModule() }
        callback()
    }

    private fun io.ktor.client.request.HttpRequestBuilder.bearer(token: String) {
        header(HttpHeaders.Authorization, "Bearer $token")
    }

    private suspend fun registerUser(client: HttpClient, email: String = "test@example.com", password: String = "password123"): String {
        val res = client.post("/api/auth/register") {
            contentType(ContentType.Application.Json)
            setBody("""{"email":"$email","password":"$password"}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)
        return res.bodyAsText()
    }

    private suspend fun loginUser(client: HttpClient, email: String = "test@example.com", password: String = "password123"): String {
        val res = client.post("/api/auth/login") {
            contentType(ContentType.Application.Json)
            setBody("""{"email":"$email","password":"$password"}""")
        }
        assertEquals(HttpStatusCode.OK, res.status)
        val body = json.decodeFromString<JsonObject>(res.bodyAsText())
        return body["token"]!!.jsonPrimitive.content
    }

    @Test
    fun `health endpoint returns ok`() = testApp {
        val res = client.get("/api/health")
        assertEquals(HttpStatusCode.OK, res.status)
        val body = json.decodeFromString<JsonObject>(res.bodyAsText())
        assertEquals("ok", body["status"]?.jsonPrimitive?.content)
    }

    @Test
    fun `register creates user and returns 201`() = testApp {
        val res = client.post("/api/auth/register") {
            contentType(ContentType.Application.Json)
            setBody("""{"email":"regtest@example.com","password":"password123"}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)
        val body = json.decodeFromString<JsonObject>(res.bodyAsText())
        assertEquals("regtest@example.com", body["email"]?.jsonPrimitive?.content)
    }

    @Test
    fun `register rejects duplicate email`() = testApp {
        client.post("/api/auth/register") {
            contentType(ContentType.Application.Json)
            setBody("""{"email":"dup@example.com","password":"password123"}""")
        }
        val res = client.post("/api/auth/register") {
            contentType(ContentType.Application.Json)
            setBody("""{"email":"dup@example.com","password":"password123"}""")
        }
        assertEquals(HttpStatusCode.Conflict, res.status)
    }

    @Test
    fun `register rejects short password`() = testApp {
        val res = client.post("/api/auth/register") {
            contentType(ContentType.Application.Json)
            setBody("""{"email":"short@example.com","password":"ab"}""")
        }
        assertEquals(HttpStatusCode.BadRequest, res.status)
    }

    @Test
    fun `login returns token`() = testApp {
        registerUser(client, "logintest@example.com")
        val token = loginUser(client, "logintest@example.com")
        assertTrue(token.isNotBlank())
    }

    @Test
    fun `login rejects invalid credentials`() = testApp {
        val res = client.post("/api/auth/login") {
            contentType(ContentType.Application.Json)
            setBody("""{"email":"nonexist@example.com","password":"wrong"}""")
        }
        assertEquals(HttpStatusCode.Unauthorized, res.status)
    }

    @Test
    fun `unauthenticated requests return 401`() = testApp {
        val endpoints = listOf(
            "/api/collections",
            "/api/buckets",
            "/api/webhooks",
            "/api/secrets",
            "/api/cronjobs",
            "/api/websockets",
            "/api/cache",
            "/api/notifications",
            "/api/logs",
            "/api/pubsub/topics",
            "/api/permissions",
            "/api/export",
        )
        for (ep in endpoints) {
            val res = client.get(ep)
            assertEquals(HttpStatusCode.Unauthorized, res.status, "Expected 401 for GET $ep")
        }
    }

    // ---- Collections ----

    @Test
    fun `collections CRUD`() = testApp {
        val token = run { registerUser(client, "coll@example.com"); loginUser(client, "coll@example.com") }
        // List empty
        var res = client.get("/api/collections") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)
        var body = json.decodeFromString<JsonArray>(res.bodyAsText())
        assertEquals(0, body.size)

        // Create
        res = client.post("/api/collections") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"testcol","schema":"{\"fields\":[]}"}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)

        // List one
        res = client.get("/api/collections") { bearer(token) }
        body = json.decodeFromString(res.bodyAsText())
        assertEquals(1, body.size)

        // Get by name
        res = client.get("/api/collections/testcol") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

        // Get not found
        res = client.get("/api/collections/nonexist") { bearer(token) }
        assertEquals(HttpStatusCode.NotFound, res.status)

        // Duplicate
        res = client.post("/api/collections") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"testcol"}""")
        }
        assertEquals(HttpStatusCode.Conflict, res.status)

        // Update schema
        res = client.patch("/api/collections/testcol") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"schema":"{\"fields\":[{\"name\":\"title\"}]}"}""")
        }
        assertEquals(HttpStatusCode.OK, res.status)

        // Delete
        res = client.delete("/api/collections/testcol") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

        // Delete not found
        res = client.delete("/api/collections/testcol") { bearer(token) }
        assertEquals(HttpStatusCode.NotFound, res.status)
    }

    @Test
    fun `collections reject missing name`() = testApp {
        val token = run { registerUser(client, "coll2@example.com"); loginUser(client, "coll2@example.com") }
        val res = client.post("/api/collections") {
            header(HttpHeaders.Authorization, "Bearer $token")
            contentType(ContentType.Application.Json)
            setBody("""{}""")
        }
        assertEquals(HttpStatusCode.BadRequest, res.status)
    }

    // ---- Records ----

    @Test
    fun `records CRUD`() = testApp {
        val token = run { registerUser(client, "rec@example.com"); loginUser(client, "rec@example.com") }
        // Create collection first
        client.post("/api/collections") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"recordsCol"}""")
        }

        // List empty
        var res = client.get("/api/collections/recordsCol/records") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)
        var body = json.decodeFromString<JsonObject>(res.bodyAsText())
        assertEquals(0, body["total"]?.jsonPrimitive?.int)

        // Create record
        res = client.post("/api/collections/recordsCol/records") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"data":"{\"title\":\"hello\"}"}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)
        val recId = json.decodeFromString<JsonObject>(res.bodyAsText())["id"]!!.jsonPrimitive.content

        // Get record
        res = client.get("/api/collections/recordsCol/records/$recId") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

        // Get not found
        res = client.get("/api/collections/recordsCol/records/nonexist") { bearer(token) }
        assertEquals(HttpStatusCode.NotFound, res.status)

        // Update record
        res = client.patch("/api/collections/recordsCol/records/$recId") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"data":"{\"title\":\"updated\"}"}""")
        }
        assertEquals(HttpStatusCode.OK, res.status)

        // Delete record
        res = client.delete("/api/collections/recordsCol/records/$recId") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

        // Delete not found
        res = client.delete("/api/collections/recordsCol/records/$recId") { bearer(token) }
        assertEquals(HttpStatusCode.NotFound, res.status)
    }

    @Test
    fun `records pagination`() = testApp {
        val token = run { registerUser(client, "recpage@example.com"); loginUser(client, "recpage@example.com") }

        client.post("/api/collections") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"pagCol"}""")
        }

        for (i in 1..5) {
            client.post("/api/collections/pagCol/records") {
                bearer(token); contentType(ContentType.Application.Json)
                setBody("""{"data":"{\"n\":$i}"}""")
            }
        }

        var res = client.get("/api/collections/pagCol/records?page=1&per_page=2") { bearer(token) }
        var body = json.decodeFromString<JsonObject>(res.bodyAsText())
        assertEquals(5, body["total"]?.jsonPrimitive?.int)
        assertEquals(1, body["page"]?.jsonPrimitive?.int)
        assertEquals(2, body["per_page"]?.jsonPrimitive?.int)
    }

    // ---- Buckets ----

    @Test
    fun `buckets CRUD`() = testApp {
        val token = run { registerUser(client, "bkt@example.com"); loginUser(client, "bkt@example.com") }

        // List empty
        var res = client.get("/api/buckets") { bearer(token) }
        assertEquals(0, json.decodeFromString<JsonArray>(res.bodyAsText()).size)

        // Create
        res = client.post("/api/buckets") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"testbucket","is_public":true}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)

        // Duplicate
        res = client.post("/api/buckets") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"testbucket"}""")
        }
        assertEquals(HttpStatusCode.Conflict, res.status)

        // Get
        res = client.get("/api/buckets/testbucket") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

        // Get not found
        res = client.get("/api/buckets/nonexist") { bearer(token) }
        assertEquals(HttpStatusCode.NotFound, res.status)

        // Delete
        res = client.delete("/api/buckets/testbucket") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)
    }

    @Test
    fun `buckets reject missing name`() = testApp {
        val token = run { registerUser(client, "bkt2@example.com"); loginUser(client, "bkt2@example.com") }
        val res = client.post("/api/buckets") {
            header(HttpHeaders.Authorization, "Bearer $token")
            contentType(ContentType.Application.Json)
            setBody("""{}""")
        }
        assertEquals(HttpStatusCode.BadRequest, res.status)
    }

    // ---- Files ----

    @Test
    fun `files CRUD`() = testApp {
        val token = run { registerUser(client, "fl@example.com"); loginUser(client, "fl@example.com") }

        client.post("/api/buckets") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"filebucket"}""")
        }

        // List empty
        var res = client.get("/api/buckets/filebucket/files") { bearer(token) }
        var body = json.decodeFromString<JsonObject>(res.bodyAsText())
        assertEquals(0, body["total"]?.jsonPrimitive?.int)

        // Upload base64 file
        val base64data = java.util.Base64.getEncoder().encodeToString("hello world".toByteArray())
        res = client.post("/api/buckets/filebucket/files") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"filename":"test.txt","data":"$base64data","mime_type":"text/plain"}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)
        val fileId = json.decodeFromString<JsonObject>(res.bodyAsText())["id"]!!.jsonPrimitive.content

        // Get file
        res = client.get("/api/buckets/filebucket/files/$fileId") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)
        assertContains(res.headers[HttpHeaders.ContentType] ?: "", "text/plain")

        // Upload to nonexistent bucket
        res = client.post("/api/buckets/nonexist/files") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"filename":"nope.txt","data":"$base64data"}""")
        }
        assertEquals(HttpStatusCode.NotFound, res.status)

        // Delete file
        res = client.delete("/api/buckets/filebucket/files/$fileId") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)
    }

    // ---- Webhooks ----

    @Test
    fun `webhooks CRUD`() = testApp {
        val token = run { registerUser(client, "wh@example.com"); loginUser(client, "wh@example.com") }

        // List empty
        var res = client.get("/api/webhooks") { bearer(token) }
        assertEquals(0, json.decodeFromString<JsonArray>(res.bodyAsText()).size)

        // Create
        res = client.post("/api/webhooks") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"testwh","url":"http://localhost:9999/hook","events":["record.created"],"secret":"s3cret","is_active":true}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)
        val whId = json.decodeFromString<JsonObject>(res.bodyAsText())["id"]!!.jsonPrimitive.content

        // Get
        res = client.get("/api/webhooks/$whId") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

        // Get not found
        res = client.get("/api/webhooks/nonexist") { bearer(token) }
        assertEquals(HttpStatusCode.NotFound, res.status)

        // Update
        res = client.patch("/api/webhooks/$whId") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"updated","url":"http://localhost:9999/hook2","events":["record.updated"],"is_active":false}""")
        }
        assertEquals(HttpStatusCode.OK, res.status)

        // Delete
        res = client.delete("/api/webhooks/$whId") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)
    }

    @Test
    fun `webhooks reject validation`() = testApp {
        val token = run { registerUser(client, "wh2@example.com"); loginUser(client, "wh2@example.com") }

        // Missing name
        var res = client.post("/api/webhooks") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"url":"http://localhost/h","events":["record.created"]}""")
        }
        assertEquals(HttpStatusCode.BadRequest, res.status)

        // Missing url
        res = client.post("/api/webhooks") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"n","events":["record.created"]}""")
        }
        assertEquals(HttpStatusCode.BadRequest, res.status)

        // Missing events
        res = client.post("/api/webhooks") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"n","url":"http://localhost/h"}""")
        }
        assertEquals(HttpStatusCode.BadRequest, res.status)

        // Unknown event
        res = client.post("/api/webhooks") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"n","url":"http://localhost/h","events":["unknown.event"]}""")
        }
        assertEquals(HttpStatusCode.BadRequest, res.status)
    }

    // ---- Secrets ----

    @Test
    fun `secrets CRUD`() = testApp {
        val token = run { registerUser(client, "sec@example.com"); loginUser(client, "sec@example.com") }

        // List empty
        var res = client.get("/api/secrets") { bearer(token) }
        assertEquals(0, json.decodeFromString<JsonArray>(res.bodyAsText()).size)

        // Create
        res = client.post("/api/secrets") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"api-key","value":"sk-12345","scope":"general"}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)
        val secId = json.decodeFromString<JsonObject>(res.bodyAsText())["id"]!!.jsonPrimitive.content

        // Get decrypted
        res = client.get("/api/secrets/$secId") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)
        val secBody = json.decodeFromString<JsonObject>(res.bodyAsText())
        assertEquals("sk-12345", secBody["value"]?.jsonPrimitive?.content)

        // Update
        res = client.patch("/api/secrets/$secId") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"value":"sk-67890","name":"api-key"}""")
        }
        assertEquals(HttpStatusCode.OK, res.status)

        // Verify updated
        res = client.get("/api/secrets/$secId") { bearer(token) }
        val updatedBody = json.decodeFromString<JsonObject>(res.bodyAsText())
        assertEquals("sk-67890", updatedBody["value"]?.jsonPrimitive?.content)

        // Delete
        res = client.delete("/api/secrets/$secId") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)
    }

    // ---- Cache ----

    @Test
    fun `cache CRUD`() = testApp {
        val token = run { registerUser(client, "cache@example.com"); loginUser(client, "cache@example.com") }

        // Stats empty
        var res = client.get("/api/cache/stats") { bearer(token) }
        var body = json.decodeFromString<JsonObject>(res.bodyAsText())
        assertEquals(0, body["total_entries"]?.jsonPrimitive?.int)

        // Set
        res = client.post("/api/cache") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"key":"mykey","value":"myval","ttl":60}""")
        }
        assertEquals(HttpStatusCode.OK, res.status)

        // Get
        res = client.get("/api/cache/mykey") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

        // Get not found
        res = client.get("/api/cache/nonexist") { bearer(token) }
        assertEquals(HttpStatusCode.NotFound, res.status)

        // Delete
        res = client.delete("/api/cache/mykey") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

        // Flush
        client.post("/api/cache") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"key":"k1","value":"v1"}""")
        }
        client.post("/api/cache") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"key":"k2","value":"v2"}""")
        }
        res = client.delete("/api/cache") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)
        res = client.get("/api/cache/stats") { bearer(token) }
        body = json.decodeFromString(res.bodyAsText())
        assertEquals(0, body["total_entries"]?.jsonPrimitive?.int)
    }

    // ---- Notifications ----

    @Test
    fun `notifications CRUD`() = testApp {
        val token = run { registerUser(client, "notif@example.com"); loginUser(client, "notif@example.com") }

        // List empty
        var res = client.get("/api/notifications") { bearer(token) }
        assertEquals(0, json.decodeFromString<JsonArray>(res.bodyAsText()).size)

        // Create
        res = client.post("/api/notifications") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"title":"Hello","body":"World","type":"info"}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)
        val nid = json.decodeFromString<JsonObject>(res.bodyAsText())["id"]!!.jsonPrimitive.content

        // Get
        res = client.get("/api/notifications/$nid") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

        // Mark read
        res = client.patch("/api/notifications/$nid") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

        // Delete
        res = client.delete("/api/notifications/$nid") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

        // Clear all
        res = client.delete("/api/notifications") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)
    }

    @Test
    fun `notifications reject invalid type`() = testApp {
        val token = run { registerUser(client, "notif2@example.com"); loginUser(client, "notif2@example.com") }
        val res = client.post("/api/notifications") {
            header(HttpHeaders.Authorization, "Bearer $token")
            contentType(ContentType.Application.Json)
            setBody("""{"title":"X","type":"invalid"}""")
        }
        assertEquals(HttpStatusCode.BadRequest, res.status)
    }

    // ---- Logs ----

    @Test
    fun `logs CRUD`() = testApp {
        val token = run { registerUser(client, "logs@example.com"); loginUser(client, "logs@example.com") }

        // List empty
        var res = client.get("/api/logs") { bearer(token) }
        assertEquals(0, json.decodeFromString<JsonArray>(res.bodyAsText()).size)

        // Create
        res = client.post("/api/logs") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"message":"test log","level":"info","meta":"{\"source\":\"test\"}"}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)

        // Clear
        res = client.delete("/api/logs") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

        res = client.get("/api/logs") { bearer(token) }
        assertEquals(0, json.decodeFromString<JsonArray>(res.bodyAsText()).size)
    }

    @Test
    fun `logs reject empty message`() = testApp {
        val token = run { registerUser(client, "logs2@example.com"); loginUser(client, "logs2@example.com") }
        val res = client.post("/api/logs") {
            header(HttpHeaders.Authorization, "Bearer $token")
            contentType(ContentType.Application.Json)
            setBody("""{"message":""}""")
        }
        assertEquals(HttpStatusCode.BadRequest, res.status)
    }

    @Test
    fun `logs reject invalid level`() = testApp {
        val token = run { registerUser(client, "logs3@example.com"); loginUser(client, "logs3@example.com") }
        val res = client.post("/api/logs") {
            header(HttpHeaders.Authorization, "Bearer $token")
            contentType(ContentType.Application.Json)
            setBody("""{"message":"test","level":"invalid"}""")
        }
        assertEquals(HttpStatusCode.BadRequest, res.status)
    }

    // ---- PubSub ----

    @Test
    fun `pubsub CRUD`() = testApp {
        val token = run { registerUser(client, "ps@example.com"); loginUser(client, "ps@example.com") }

        // List empty
        var res = client.get("/api/pubsub/topics") { bearer(token) }
        assertEquals(0, json.decodeFromString<JsonArray>(res.bodyAsText()).size)

        // Create topic
        res = client.post("/api/pubsub/topics") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"events"}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)

        // Duplicate
        res = client.post("/api/pubsub/topics") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"events"}""")
        }
        assertEquals(HttpStatusCode.Conflict, res.status)

        // Get topic
        res = client.get("/api/pubsub/topics/events") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

        // Publish message
        res = client.post("/api/pubsub/topics/events/messages") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"body":"hello"}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)

        // List messages
        res = client.get("/api/pubsub/topics/events/messages") { bearer(token) }
        val msgs = json.decodeFromString<JsonArray>(res.bodyAsText())
        assertTrue(msgs.size > 0)

        // Delete topic
        res = client.delete("/api/pubsub/topics/events") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)
    }

    @Test
    fun `pubsub reject missing name`() = testApp {
        val token = run { registerUser(client, "ps2@example.com"); loginUser(client, "ps2@example.com") }
        val res = client.post("/api/pubsub/topics") {
            header(HttpHeaders.Authorization, "Bearer $token")
            contentType(ContentType.Application.Json)
            setBody("""{}""")
        }
        assertEquals(HttpStatusCode.BadRequest, res.status)
    }

    // ---- CronJobs ----

    @Test
    fun `cronjobs CRUD`() = testApp {
        val token = run { registerUser(client, "cron@example.com"); loginUser(client, "cron@example.com") }

        // List empty
        var res = client.get("/api/cronjobs") { bearer(token) }
        assertEquals(0, json.decodeFromString<JsonArray>(res.bodyAsText()).size)

        // Create
        res = client.post("/api/cronjobs") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"ping","schedule":"*/5 * * * *","command":"http://localhost:9999/ping","method":"GET"}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)
        val jobId = json.decodeFromString<JsonObject>(res.bodyAsText())["id"]!!.jsonPrimitive.content

        // Get
        res = client.get("/api/cronjobs/$jobId") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

        // Update
        res = client.patch("/api/cronjobs/$jobId") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"pong","is_active":"0"}""")
        }
        assertEquals(HttpStatusCode.OK, res.status)

        // Delete
        res = client.delete("/api/cronjobs/$jobId") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)
    }

    @Test
    fun `cronjobs reject validation`() = testApp {
        val token = run { registerUser(client, "cron2@example.com"); loginUser(client, "cron2@example.com") }

        var res = client.post("/api/cronjobs") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{}""")
        }
        assertEquals(HttpStatusCode.BadRequest, res.status)
    }

    // ---- Permissions ----

    @Test
    fun `permissions CRUD`() = testApp {
        val token = run { registerUser(client, "perm@example.com"); loginUser(client, "perm@example.com") }

        // Create permission
        var res = client.post("/api/permissions") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"user_id":"user1","collection":"col1","role":"admin"}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)

        // Duplicate
        res = client.post("/api/permissions") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"user_id":"user1","collection":"col1","role":"read"}""")
        }
        assertEquals(HttpStatusCode.Conflict, res.status)

        // List
        res = client.get("/api/permissions") { bearer(token) }
        assertEquals(1, json.decodeFromString<JsonArray>(res.bodyAsText()).size)

        // Delete
        res = client.delete("/api/permissions") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"user_id":"user1","collection":"col1"}""")
        }
        assertEquals(HttpStatusCode.OK, res.status)

        // Delete not found
        res = client.delete("/api/permissions") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"user_id":"user1","collection":"col1"}""")
        }
        assertEquals(HttpStatusCode.NotFound, res.status)
    }

    @Test
    fun `permissions reject invalid role`() = testApp {
        val token = run { registerUser(client, "perm2@example.com"); loginUser(client, "perm2@example.com") }
        val res = client.post("/api/permissions") {
            header(HttpHeaders.Authorization, "Bearer $token")
            contentType(ContentType.Application.Json)
            setBody("""{"user_id":"u","collection":"c","role":"invalid"}""")
        }
        assertEquals(HttpStatusCode.BadRequest, res.status)
    }

    // ---- WebSocket management ----

    @Test
    fun `websocket management`() = testApp {
        val token = run { registerUser(client, "ws@example.com"); loginUser(client, "ws@example.com") }

        // List
        var res = client.get("/api/websockets") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

        // Broadcast (no connections active)
        res = client.post("/api/websockets/broadcast") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"message":"hello"}""")
        }
        assertEquals(HttpStatusCode.OK, res.status)

        // Get not found
        res = client.get("/api/websockets/nonexist") { bearer(token) }
        assertEquals(HttpStatusCode.NotFound, res.status)
    }

    // ---- Export/Import ----

    @Test
    fun `export and import`() = testApp {
        val token = run { registerUser(client, "exim@example.com"); loginUser(client, "exim@example.com") }

        // Create some data
        client.post("/api/collections") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"excol"}""")
        }
        client.post("/api/buckets") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"exbkt"}""")
        }

        // Export
        var res = client.get("/api/export") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)
        val exportBody = json.decodeFromString<JsonObject>(res.bodyAsText())
        assertTrue(exportBody.containsKey("export"))
        assertTrue(exportBody.containsKey("exported_at"))

        // Import (re-import the same data)
        val exportData = exportBody["export"]!!.jsonObject
        res = client.post("/api/import") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"data":${exportData}}""")
        }
        assertEquals(HttpStatusCode.OK, res.status)
    }

    // ---- Backup ----

    @Test
    fun `backup endpoint`() = testApp {
        val token = run { registerUser(client, "bkp@example.com"); loginUser(client, "bkp@example.com") }
        val res = client.get("/api/backup") {
            header(HttpHeaders.Authorization, "Bearer $token")
        }
        assertEquals(HttpStatusCode.OK, res.status)
        assertContains(res.headers[HttpHeaders.ContentDisposition] ?: "", "backbone-backup.db")
    }

    // ---- OpenAPI ----

    @Test
    fun `openapi spec returns`() = testApp {
        val res = client.get("/api/openapi.json")
        assertEquals(HttpStatusCode.OK, res.status)
        val body = json.decodeFromString<JsonObject>(res.bodyAsText())
        assertEquals("3.0.3", body["openapi"]?.jsonPrimitive?.content)
    }

    @Test
    fun `swagger docs returns html`() = testApp {
        val res = client.get("/api/docs")
        assertEquals(HttpStatusCode.OK, res.status)
        assertContains(res.bodyAsText(), "swagger-ui")
    }
}
