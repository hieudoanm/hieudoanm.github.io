package io.github.hieudoanm.backbone.routes

import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlinx.serialization.json.*
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class RoutesTest : RoutesTestBase() {

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
            "/api/collections", "/api/buckets", "/api/webhooks", "/api/secrets",
            "/api/cronjobs", "/api/websockets", "/api/cache", "/api/notifications",
            "/api/logs", "/api/pubsub/topics", "/api/permissions", "/api/export",
        )
        for (ep in endpoints) {
            val res = client.get(ep)
            assertEquals(HttpStatusCode.Unauthorized, res.status, "Expected 401 for GET $ep")
        }
    }

    @Test
    fun `collections CRUD`() = testApp {
        val token = run { registerUser(client, "coll@example.com"); loginUser(client, "coll@example.com") }
        var res = client.get("/api/collections") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)
        var body = json.decodeFromString<JsonArray>(res.bodyAsText())
        assertEquals(0, body.size)

        res = client.post("/api/collections") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"testcol","schema":"{\"fields\":[]}"}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)

        res = client.get("/api/collections") { bearer(token) }
        body = json.decodeFromString(res.bodyAsText())
        assertEquals(1, body.size)

        res = client.get("/api/collections/testcol") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

        res = client.get("/api/collections/nonexist") { bearer(token) }
        assertEquals(HttpStatusCode.NotFound, res.status)

        res = client.post("/api/collections") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"testcol"}""")
        }
        assertEquals(HttpStatusCode.Conflict, res.status)

        res = client.patch("/api/collections/testcol") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"schema":"{\"fields\":[{\"name\":\"title\"}]}"}""")
        }
        assertEquals(HttpStatusCode.OK, res.status)

        res = client.delete("/api/collections/testcol") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

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

    @Test
    fun `records CRUD`() = testApp {
        val token = run { registerUser(client, "rec@example.com"); loginUser(client, "rec@example.com") }
        client.post("/api/collections") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"recordsCol"}""")
        }

        var res = client.get("/api/collections/recordsCol/records") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)
        var body = json.decodeFromString<JsonObject>(res.bodyAsText())
        assertEquals(0, body["total"]?.jsonPrimitive?.int)

        res = client.post("/api/collections/recordsCol/records") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"data":"{\"title\":\"hello\"}"}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)
        val recId = json.decodeFromString<JsonObject>(res.bodyAsText())["id"]!!.jsonPrimitive.content

        res = client.get("/api/collections/recordsCol/records/$recId") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

        res = client.get("/api/collections/recordsCol/records/nonexist") { bearer(token) }
        assertEquals(HttpStatusCode.NotFound, res.status)

        res = client.patch("/api/collections/recordsCol/records/$recId") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"data":"{\"title\":\"updated\"}"}""")
        }
        assertEquals(HttpStatusCode.OK, res.status)

        res = client.delete("/api/collections/recordsCol/records/$recId") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

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

    @Test
    fun `buckets CRUD`() = testApp {
        val token = run { registerUser(client, "bkt@example.com"); loginUser(client, "bkt@example.com") }
        var res = client.get("/api/buckets") { bearer(token) }
        assertEquals(0, json.decodeFromString<JsonArray>(res.bodyAsText()).size)

        res = client.post("/api/buckets") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"testbucket","is_public":true}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)

        res = client.post("/api/buckets") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"testbucket"}""")
        }
        assertEquals(HttpStatusCode.Conflict, res.status)

        res = client.get("/api/buckets/testbucket") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

        res = client.get("/api/buckets/nonexist") { bearer(token) }
        assertEquals(HttpStatusCode.NotFound, res.status)

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

    @Test
    fun `files CRUD`() = testApp {
        val token = run { registerUser(client, "fl@example.com"); loginUser(client, "fl@example.com") }
        client.post("/api/buckets") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"filebucket"}""")
        }

        var res = client.get("/api/buckets/filebucket/files") { bearer(token) }
        var body = json.decodeFromString<JsonObject>(res.bodyAsText())
        assertEquals(0, body["total"]?.jsonPrimitive?.int)

        val base64data = java.util.Base64.getEncoder().encodeToString("hello world".toByteArray())
        res = client.post("/api/buckets/filebucket/files") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"filename":"test.txt","data":"$base64data","mime_type":"text/plain"}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)
        val fileId = json.decodeFromString<JsonObject>(res.bodyAsText())["id"]!!.jsonPrimitive.content

        res = client.get("/api/buckets/filebucket/files/$fileId") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)
        assertContains(res.headers[HttpHeaders.ContentType] ?: "", "text/plain")

        res = client.post("/api/buckets/nonexist/files") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"filename":"nope.txt","data":"$base64data"}""")
        }
        assertEquals(HttpStatusCode.NotFound, res.status)

        res = client.delete("/api/buckets/filebucket/files/$fileId") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)
    }

    @Test
    fun `webhooks CRUD`() = testApp {
        val token = run { registerUser(client, "wh@example.com"); loginUser(client, "wh@example.com") }
        var res = client.get("/api/webhooks") { bearer(token) }
        assertEquals(0, json.decodeFromString<JsonArray>(res.bodyAsText()).size)

        res = client.post("/api/webhooks") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"testwh","url":"http://localhost:9999/hook","events":["record.created"],"secret":"s3cret","is_active":true}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)
        val whId = json.decodeFromString<JsonObject>(res.bodyAsText())["id"]!!.jsonPrimitive.content

        res = client.get("/api/webhooks/$whId") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

        res = client.get("/api/webhooks/nonexist") { bearer(token) }
        assertEquals(HttpStatusCode.NotFound, res.status)

        res = client.patch("/api/webhooks/$whId") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"updated","url":"http://localhost:9999/hook2","events":["record.updated"],"is_active":false}""")
        }
        assertEquals(HttpStatusCode.OK, res.status)

        res = client.delete("/api/webhooks/$whId") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)
    }

    @Test
    fun `webhooks reject validation`() = testApp {
        val token = run { registerUser(client, "wh2@example.com"); loginUser(client, "wh2@example.com") }
        var res = client.post("/api/webhooks") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"url":"http://localhost/h","events":["record.created"]}""")
        }
        assertEquals(HttpStatusCode.BadRequest, res.status)

        res = client.post("/api/webhooks") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"n","events":["record.created"]}""")
        }
        assertEquals(HttpStatusCode.BadRequest, res.status)

        res = client.post("/api/webhooks") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"n","url":"http://localhost/h"}""")
        }
        assertEquals(HttpStatusCode.BadRequest, res.status)

        res = client.post("/api/webhooks") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"n","url":"http://localhost/h","events":["unknown.event"]}""")
        }
        assertEquals(HttpStatusCode.BadRequest, res.status)
    }

    @Test
    fun `secrets CRUD`() = testApp {
        val token = run { registerUser(client, "sec@example.com"); loginUser(client, "sec@example.com") }
        var res = client.get("/api/secrets") { bearer(token) }
        assertEquals(0, json.decodeFromString<JsonArray>(res.bodyAsText()).size)

        res = client.post("/api/secrets") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"api-key","value":"sk-12345","scope":"general"}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)
        val secId = json.decodeFromString<JsonObject>(res.bodyAsText())["id"]!!.jsonPrimitive.content

        res = client.get("/api/secrets/$secId") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)
        val secBody = json.decodeFromString<JsonObject>(res.bodyAsText())
        assertEquals("sk-12345", secBody["value"]?.jsonPrimitive?.content)

        res = client.patch("/api/secrets/$secId") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"value":"sk-67890","name":"api-key"}""")
        }
        assertEquals(HttpStatusCode.OK, res.status)

        res = client.get("/api/secrets/$secId") { bearer(token) }
        val updatedBody = json.decodeFromString<JsonObject>(res.bodyAsText())
        assertEquals("sk-67890", updatedBody["value"]?.jsonPrimitive?.content)

        res = client.delete("/api/secrets/$secId") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)
    }

    @Test
    fun `cache CRUD`() = testApp {
        val token = run { registerUser(client, "cache@example.com"); loginUser(client, "cache@example.com") }
        var res = client.get("/api/cache/stats") { bearer(token) }
        var body = json.decodeFromString<JsonObject>(res.bodyAsText())
        assertEquals(0, body["total_entries"]?.jsonPrimitive?.int)

        res = client.post("/api/cache") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"key":"mykey","value":"myval","ttl":"60"}""")
        }
        assertEquals(HttpStatusCode.OK, res.status)

        res = client.get("/api/cache/mykey") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

        res = client.get("/api/cache/nonexist") { bearer(token) }
        assertEquals(HttpStatusCode.NotFound, res.status)

        res = client.delete("/api/cache/mykey") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

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

    @Test
    fun `notifications CRUD`() = testApp {
        val token = run { registerUser(client, "notif@example.com"); loginUser(client, "notif@example.com") }
        var res = client.get("/api/notifications") { bearer(token) }
        assertEquals(0, json.decodeFromString<JsonArray>(res.bodyAsText()).size)

        res = client.post("/api/notifications") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"title":"Hello","body":"World","type":"info"}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)
        val nid = json.decodeFromString<JsonObject>(res.bodyAsText())["id"]!!.jsonPrimitive.content

        res = client.get("/api/notifications/$nid") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

        res = client.patch("/api/notifications/$nid") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

        res = client.delete("/api/notifications/$nid") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

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

    @Test
    fun `logs CRUD`() = testApp {
        val token = run { registerUser(client, "logs@example.com"); loginUser(client, "logs@example.com") }
        var res = client.get("/api/logs") { bearer(token) }
        assertEquals(0, json.decodeFromString<JsonArray>(res.bodyAsText()).size)

        res = client.post("/api/logs") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"message":"test log","level":"info","meta":"{\"source\":\"test\"}"}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)

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

    @Test
    fun `pubsub CRUD`() = testApp {
        val token = run { registerUser(client, "ps@example.com"); loginUser(client, "ps@example.com") }
        var res = client.get("/api/pubsub/topics") { bearer(token) }
        assertEquals(0, json.decodeFromString<JsonArray>(res.bodyAsText()).size)

        res = client.post("/api/pubsub/topics") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"events"}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)

        res = client.post("/api/pubsub/topics") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"events"}""")
        }
        assertEquals(HttpStatusCode.Conflict, res.status)

        res = client.get("/api/pubsub/topics/events") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

        res = client.post("/api/pubsub/topics/events/messages") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"body":"hello"}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)

        res = client.get("/api/pubsub/topics/events/messages") { bearer(token) }
        val msgs = json.decodeFromString<JsonArray>(res.bodyAsText())
        assertTrue(msgs.size > 0)

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

    @Test
    fun `cronjobs CRUD`() = testApp {
        val token = run { registerUser(client, "cron@example.com"); loginUser(client, "cron@example.com") }
        var res = client.get("/api/cronjobs") { bearer(token) }
        assertEquals(0, json.decodeFromString<JsonArray>(res.bodyAsText()).size)

        res = client.post("/api/cronjobs") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"ping","schedule":"*/5 * * * *","command":"http://localhost:9999/ping","method":"GET"}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)
        val jobId = json.decodeFromString<JsonObject>(res.bodyAsText())["id"]!!.jsonPrimitive.content

        res = client.get("/api/cronjobs/$jobId") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

        res = client.patch("/api/cronjobs/$jobId") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"pong","is_active":"0"}""")
        }
        assertEquals(HttpStatusCode.OK, res.status)

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

    @Test
    fun `permissions CRUD`() = testApp {
        val token = run { registerUser(client, "perm@example.com"); loginUser(client, "perm@example.com") }
        var res = client.post("/api/permissions") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"user_id":"user1","collection":"col1","role":"admin"}""")
        }
        assertEquals(HttpStatusCode.Created, res.status)

        res = client.post("/api/permissions") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"user_id":"user1","collection":"col1","role":"read"}""")
        }
        assertEquals(HttpStatusCode.Conflict, res.status)

        res = client.get("/api/permissions") { bearer(token) }
        assertEquals(1, json.decodeFromString<JsonArray>(res.bodyAsText()).size)

        res = client.delete("/api/permissions") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"user_id":"user1","collection":"col1"}""")
        }
        assertEquals(HttpStatusCode.OK, res.status)

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

    @Test
    fun `websocket management`() = testApp {
        val token = run { registerUser(client, "ws@example.com"); loginUser(client, "ws@example.com") }
        var res = client.get("/api/websockets") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)

        res = client.post("/api/websockets/broadcast") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"message":"hello"}""")
        }
        assertEquals(HttpStatusCode.OK, res.status)

        res = client.get("/api/websockets/nonexist") { bearer(token) }
        assertEquals(HttpStatusCode.NotFound, res.status)
    }

    @Test
    fun `export and import`() = testApp {
        val token = run { registerUser(client, "exim@example.com"); loginUser(client, "exim@example.com") }
        client.post("/api/collections") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"excol"}""")
        }
        client.post("/api/buckets") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"name":"exbkt"}""")
        }
        var res = client.get("/api/export") { bearer(token) }
        assertEquals(HttpStatusCode.OK, res.status)
        val exportBody = json.decodeFromString<JsonObject>(res.bodyAsText())
        assertTrue(exportBody.containsKey("export"))
        assertTrue(exportBody.containsKey("exported_at"))

        val exportData = exportBody["export"]!!.jsonObject
        res = client.post("/api/import") {
            bearer(token); contentType(ContentType.Application.Json)
            setBody("""{"data":${exportData}}""")
        }
        assertEquals(HttpStatusCode.OK, res.status)
    }

    @Test
    fun `backup endpoint`() = testApp {
        val token = run { registerUser(client, "bkp@example.com"); loginUser(client, "bkp@example.com") }
        val res = client.get("/api/backup") {
            header(HttpHeaders.Authorization, "Bearer $token")
        }
        assertEquals(HttpStatusCode.OK, res.status)
        assertContains(res.headers[HttpHeaders.ContentDisposition] ?: "", "backbone-backup.db")
    }

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
