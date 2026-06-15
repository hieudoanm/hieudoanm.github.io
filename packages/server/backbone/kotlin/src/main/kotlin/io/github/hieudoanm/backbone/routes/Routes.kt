package io.github.hieudoanm.backbone.routes

import io.github.hieudoanm.backbone.auth.generateToken
import io.github.hieudoanm.backbone.auth.hashPassword
import io.github.hieudoanm.backbone.auth.validateToken
import io.github.hieudoanm.backbone.auth.verifyPassword
import io.github.hieudoanm.backbone.core.AppError
import io.github.hieudoanm.backbone.core.AppState
import io.github.hieudoanm.backbone.crypto.aesDecrypt
import io.github.hieudoanm.backbone.crypto.aesEncrypt
import io.github.hieudoanm.backbone.crypto.uuid
import io.github.hieudoanm.backbone.database.toList
import io.github.hieudoanm.backbone.openapi.openApiSpec
import io.github.hieudoanm.backbone.ws.SSEHub
import io.github.hieudoanm.backbone.ws.WebSocketHub
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.plugins.origin
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import io.ktor.util.pipeline.*
import io.ktor.utils.io.*
import io.ktor.websocket.*
import kotlinx.coroutines.*
import kotlinx.coroutines.channels.Channel
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.json.*

fun Application.configureRoutes(state: AppState) {
    routing {
        // ---- Public: Health ----
        get("/api/health") {
            call.respond(mapOf("status" to "ok"))
        }

        // ---- Public: Auth ----
        post("/api/auth/register") {
            val body = call.receive<Map<String, String>>()
            val email = body["email"] ?: throw AppError.BadRequest("Email is required")
            val password = body["password"] ?: throw AppError.BadRequest("Password is required")
            if (password.length < 6) throw AppError.BadRequest("Password must be at least 6 characters")

            state.db.connection().use { conn ->
                val existing = conn.createStatement().executeQuery(
                    "SELECT id FROM _users WHERE email = '${email.replace("'", "''")}'"
                )
                if (existing.next()) throw AppError.Conflict("Email already registered")

                val id = uuid()
                val hash = hashPassword(password)
                conn.createStatement().executeUpdate("""
                    INSERT INTO _users (id, email, password, created_at, updated_at)
                    VALUES ('$id', '${email.replace("'", "''")}', '$hash', datetime('now'), datetime('now'))
                """)
            }

            call.respond(status = HttpStatusCode.Created, mapOf("email" to email))
        }

        post("/api/auth/login") {
            val body = call.receive<Map<String, String>>()
            val email = body["email"] ?: throw AppError.BadRequest("Email is required")
            val password = body["password"] ?: throw AppError.BadRequest("Password is required")

            state.db.connection().use { conn ->
                val row = conn.createStatement().executeQuery(
                    "SELECT * FROM _users WHERE email = '${email.replace("'", "''")}'"
                )
                if (!row.next()) throw AppError.Unauthorized("Invalid credentials")

                val hash = row.getString("password")
                if (!verifyPassword(password, hash)) throw AppError.Unauthorized("Invalid credentials")

                val userId = row.getString("id")
                val token = generateToken(state.config.jwtSecret, userId, email)
                call.respondText(
                    buildJsonObject {
                        put("user", buildJsonObject {
                            put("id", userId)
                            put("email", email)
                        })
                        put("token", token)
                    }.toString(),
                    ContentType.Application.Json,
                )
            }
        }

        // ---- Public: OpenAPI ----
        get("/api/openapi.json") {
            call.respondText(
                buildJsonObject {
                    put("openapi", "3.0.3")
                    put("info", buildJsonObject {
                        put("title", "BackboneServer API")
                        put("version", "0.0.1")
                        put("description", "Back-end as a Service (BaaS) API")
                    })
                    put("servers", buildJsonArray {
                        addJsonObject { put("url", "/"); put("description", "Local server") }
                    })
                    put("paths", buildJsonObject {
                        put("/api/health", buildJsonObject {
                            put("get", buildJsonObject {
                                put("summary", "Health check")
                                put("responses", buildJsonObject { put("200", buildJsonObject { put("description", "OK") }) })
                            })
                        })
                        put("/api/auth/register", buildJsonObject {
                            put("post", buildJsonObject {
                                put("summary", "Register user")
                                put("responses", buildJsonObject {
                                    put("201", buildJsonObject { put("description", "Created") })
                                    put("409", buildJsonObject { put("description", "Duplicate email") })
                                })
                            })
                        })
                        put("/api/auth/login", buildJsonObject {
                            put("post", buildJsonObject {
                                put("summary", "Login")
                                put("responses", buildJsonObject {
                                    put("200", buildJsonObject { put("description", "OK") })
                                    put("401", buildJsonObject { put("description", "Invalid credentials") })
                                })
                            })
                        })
                        put("/api/collections", buildJsonObject {
                            put("get", buildJsonObject { put("summary", "List collections") })
                            put("post", buildJsonObject { put("summary", "Create collection") })
                        })
                        put("/api/buckets", buildJsonObject {
                            put("get", buildJsonObject { put("summary", "List buckets") })
                            put("post", buildJsonObject { put("summary", "Create bucket") })
                        })
                    })
                }.toString(),
                ContentType.Application.Json,
            )
        }

        get("/api/docs") {
            call.respondText(
                contentType = ContentType.Text.Html,
                text = """<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Backbone API Docs</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css"></head><body><div id="swagger-ui"></div><script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js"></script><script>SwaggerUIBundle({url:"/api/openapi.json",dom_id:"#swagger-ui"})</script></body></html>"""
            )
        }

        // ---- Protected routes (auth required) ----
        // checkAuth(state, call) calls are resolved to the PipelineContext receiver

        // ---- Collections ----
        get("/api/collections") {
            checkAuth(state, call)
            state.db.connection().use { conn ->
                val rows = conn.createStatement().executeQuery("SELECT * FROM _collections ORDER BY name").toList()
                call.respondText(buildJsonArray {
                    for (row in rows) {
                        addJsonObject {
                            put("name", (row["name"] as? String) ?: "")
                            put("schema", (row["schema"] as? String) ?: "")
                            put("created_at", (row["created_at"] as? String) ?: "")
                            put("updated_at", (row["updated_at"] as? String) ?: "")
                        }
                    }
                }.toString(), ContentType.Application.Json)
            }
        }

        post("/api/collections") {
            checkAuth(state, call)
            val body = call.receive<Map<String, String>>()
            val name = body["name"] ?: throw AppError.BadRequest("Collection name is required")
            val schema = body["schema"] ?: "{}"

            state.db.connection().use { conn ->
                val existing = conn.createStatement().executeQuery(
                    "SELECT name FROM _collections WHERE name = '${name.replace("'", "''")}'"
                )
                if (existing.next()) throw AppError.Conflict("Collection '$name' already exists")

                conn.createStatement().executeUpdate("""
                    INSERT INTO _collections (name, schema, created_at, updated_at)
                    VALUES ('${name.replace("'", "''")}', '$schema', datetime('now'), datetime('now'))
                """)
                state.db.ensureDataTable(name)
            }

            call.respond(status = HttpStatusCode.Created, mapOf("name" to name, "schema" to schema))
        }

        get("/api/collections/{name}") {
            checkAuth(state, call)
            val name = call.parameters["name"] ?: throw AppError.BadRequest("Collection name required")
            state.db.connection().use { conn ->
                val row = conn.createStatement().executeQuery(
                    "SELECT * FROM _collections WHERE name = '${name.replace("'", "''")}'"
                )
                if (!row.next()) throw AppError.NotFound("Collection '$name' not found")
                call.respond(mapOf(
                    "name" to row.getString("name"),
                    "schema" to row.getString("schema"),
                    "created_at" to row.getString("created_at"),
                    "updated_at" to row.getString("updated_at"),
                ))
            }
        }

        patch("/api/collections/{name}") {
            checkAuth(state, call)
            val name = call.parameters["name"] ?: throw AppError.BadRequest("Collection name required")
            val body = call.receive<Map<String, String>>()
            val schema = body["schema"] ?: throw AppError.BadRequest("Schema is required")

            state.db.connection().use { conn ->
                val updated = conn.createStatement().executeUpdate("""
                    UPDATE _collections SET schema = '${schema.replace("'", "''")}', updated_at = datetime('now')
                    WHERE name = '${name.replace("'", "''")}'
                """)
                if (updated == 0) throw AppError.NotFound("Collection '$name' not found")
            }
            call.respond(mapOf("name" to name, "schema" to schema))
        }

        delete("/api/collections/{name}") {
            checkAuth(state, call)
            val name = call.parameters["name"] ?: throw AppError.BadRequest("Collection name required")
            state.db.connection().use { conn ->
                val deleted = conn.createStatement().executeUpdate(
                    "DELETE FROM _collections WHERE name = '${name.replace("'", "''")}'"
                )
                if (deleted == 0) throw AppError.NotFound("Collection '$name' not found")
            }
            call.respond(mapOf("deleted" to true))
        }

        // ---- Records ----
        get("/api/collections/{name}/records") {
            checkAuth(state, call)
            val collectionName = call.parameters["name"] ?: throw AppError.BadRequest("Collection name required")
            val page = call.request.queryParameters["page"]?.toIntOrNull() ?: 1
            val perPage = (call.request.queryParameters["per_page"]?.toIntOrNull() ?: 20).coerceAtMost(100)
            val search = call.request.queryParameters["search"]
            val offset = (page - 1) * perPage

            state.db.ensureDataTable(collectionName)
            val tableName = state.db.collectionTableName(collectionName)

            state.db.connection().use { conn ->
                val whereClause = if (!search.isNullOrBlank()) {
                    "WHERE data LIKE '%${search.replace("'", "''")}%'"
                } else ""

                val countRow = conn.createStatement().executeQuery(
                    "SELECT COUNT(*) as count FROM $tableName $whereClause"
                )
                countRow.next()
                val total = countRow.getInt("count")

                val rows = conn.createStatement().executeQuery(
                    "SELECT * FROM $tableName $whereClause ORDER BY created_at DESC LIMIT $perPage OFFSET $offset"
                ).toList()

                call.respondJson(buildJsonObject {
                    put("records", buildJsonArray {
                        for (row in rows) {
                            addJsonObject {
                                put("id", (row["id"] as? String) ?: "")
                                put("data", (row["data"] as? String) ?: "")
                                put("created_at", (row["created_at"] as? String) ?: "")
                                put("updated_at", (row["updated_at"] as? String) ?: "")
                            }
                        }
                    })
                    put("page", page)
                    put("per_page", perPage)
                    put("total", total)
                })
            }
        }

        post("/api/collections/{name}/records") {
            checkAuth(state, call)
            val collectionName = call.parameters["name"] ?: throw AppError.BadRequest("Collection name required")
            val body = call.receive<Map<String, String>>()
            val data = body["data"] ?: "{}"

            state.db.ensureDataTable(collectionName)
            val tableName = state.db.collectionTableName(collectionName)
            val id = uuid()

            state.db.connection().use { conn ->
                conn.createStatement().executeUpdate("""
                    INSERT INTO $tableName (id, data, created_at, updated_at)
                    VALUES ('$id', '${data.replace("'", "''")}', datetime('now'), datetime('now'))
                """)
            }
            call.respond(status = HttpStatusCode.Created, mapOf("id" to id, "data" to data))
        }

        get("/api/collections/{name}/records/{id}") {
            checkAuth(state, call)
            val collectionName = call.parameters["name"] ?: throw AppError.BadRequest("Collection name required")
            val id = call.parameters["id"] ?: throw AppError.BadRequest("Record ID required")
            val tableName = state.db.collectionTableName(collectionName)

            state.db.connection().use { conn ->
                val row = conn.createStatement().executeQuery(
                    "SELECT * FROM $tableName WHERE id = '$id'"
                )
                if (!row.next()) throw AppError.NotFound("Record '$id' not found")
                call.respond(mapOf(
                    "id" to row.getString("id"),
                    "data" to row.getString("data"),
                    "created_at" to row.getString("created_at"),
                    "updated_at" to row.getString("updated_at"),
                ))
            }
        }

        patch("/api/collections/{name}/records/{id}") {
            checkAuth(state, call)
            val collectionName = call.parameters["name"] ?: throw AppError.BadRequest("Collection name required")
            val id = call.parameters["id"] ?: throw AppError.BadRequest("Record ID required")
            val body = call.receive<Map<String, String>>()
            val data = body["data"] ?: throw AppError.BadRequest("Data is required")
            val tableName = state.db.collectionTableName(collectionName)

            state.db.connection().use { conn ->
                val updated = conn.createStatement().executeUpdate("""
                    UPDATE $tableName SET data = '${data.replace("'", "''")}', updated_at = datetime('now')
                    WHERE id = '$id'
                """)
                if (updated == 0) throw AppError.NotFound("Record '$id' not found")
            }
            call.respond(mapOf("id" to id, "data" to data))
        }

        delete("/api/collections/{name}/records/{id}") {
            checkAuth(state, call)
            val collectionName = call.parameters["name"] ?: throw AppError.BadRequest("Collection name required")
            val id = call.parameters["id"] ?: throw AppError.BadRequest("Record ID required")
            val tableName = state.db.collectionTableName(collectionName)

            state.db.connection().use { conn ->
                val deleted = conn.createStatement().executeUpdate(
                    "DELETE FROM $tableName WHERE id = '$id'"
                )
                if (deleted == 0) throw AppError.NotFound("Record '$id' not found")
            }
            call.respond(mapOf("deleted" to true))
        }

        // ---- Buckets ----
        get("/api/buckets") {
            checkAuth(state, call)
            state.db.connection().use { conn ->
                val rows = conn.createStatement().executeQuery("SELECT * FROM _buckets ORDER BY name").toList()
                call.respond(buildJsonArray {
                    for (row in rows) {
                        addJsonObject {
                            put("name", (row["name"] as? String) ?: "")
                            put("is_public", (row["is_public"] as? Number)?.toInt() == 1)
                            put("created_at", (row["created_at"] as? String) ?: "")
                            put("updated_at", (row["updated_at"] as? String) ?: "")
                        }
                    }
                })
            }
        }

        post("/api/buckets") {
            checkAuth(state, call)
            val body = kotlinx.serialization.json.Json.parseToJsonElement(call.receiveText()).jsonObject
            val name = body["name"]?.jsonPrimitive?.content ?: throw AppError.BadRequest("Bucket name is required")
            val isPublic = body["is_public"]?.jsonPrimitive?.boolean ?: false
            val isPublicInt = if (isPublic) 1 else 0

            state.db.connection().use { conn ->
                val existing = conn.createStatement().executeQuery(
                    "SELECT name FROM _buckets WHERE name = '${name.replace("'", "''")}'"
                )
                if (existing.next()) throw AppError.Conflict("Bucket '$name' already exists")

                conn.createStatement().executeUpdate("""
                    INSERT INTO _buckets (name, is_public, created_at, updated_at)
                    VALUES ('${name.replace("'", "''")}', $isPublicInt, datetime('now'), datetime('now'))
                """)
            }
            call.respondJson(buildJsonObject {
                put("name", name)
                put("is_public", isPublic)
            }, HttpStatusCode.Created)
        }

        get("/api/buckets/{name}") {
            checkAuth(state, call)
            val name = call.parameters["name"] ?: throw AppError.BadRequest("Bucket name required")
            state.db.connection().use { conn ->
                val row = conn.createStatement().executeQuery(
                    "SELECT * FROM _buckets WHERE name = '${name.replace("'", "''")}'"
                )
                if (!row.next()) throw AppError.NotFound("Bucket '$name' not found")
                call.respondJson(buildJsonObject {
                    put("name", row.getString("name"))
                    put("is_public", row.getInt("is_public") == 1)
                    put("created_at", row.getString("created_at"))
                    put("updated_at", row.getString("updated_at"))
                })
            }
        }

        delete("/api/buckets/{name}") {
            checkAuth(state, call)
            val name = call.parameters["name"] ?: throw AppError.BadRequest("Bucket name required")
            state.db.connection().use { conn ->
                val deleted = conn.createStatement().executeUpdate(
                    "DELETE FROM _buckets WHERE name = '${name.replace("'", "''")}'"
                )
                if (deleted == 0) throw AppError.NotFound("Bucket '$name' not found")
            }
            val bucketDir = java.io.File(state.storageDir, name)
            if (bucketDir.exists()) bucketDir.deleteRecursively()
            call.respond(mapOf("deleted" to true))
        }

        // ---- Files ----
        get("/api/buckets/{name}/files") {
            checkAuth(state, call)
            val bucketName = call.parameters["name"] ?: throw AppError.BadRequest("Bucket name required")
            val page = call.request.queryParameters["page"]?.toIntOrNull() ?: 1
            val perPage = (call.request.queryParameters["per_page"]?.toIntOrNull() ?: 20).coerceAtMost(100)
            val offset = (page - 1) * perPage

            state.db.connection().use { conn ->
                val countRow = conn.createStatement().executeQuery(
                    "SELECT COUNT(*) as count FROM _files WHERE bucket = '${bucketName.replace("'", "''")}'"
                )
                countRow.next()
                val total = countRow.getInt("count")

                val rows = conn.createStatement().executeQuery("""
                    SELECT * FROM _files WHERE bucket = '${bucketName.replace("'", "''")}'
                    ORDER BY created_at DESC LIMIT $perPage OFFSET $offset
                """).toList()

                call.respondJson(buildJsonObject {
                    put("files", buildJsonArray {
                        for (row in rows) {
                            addJsonObject {
                                put("id", (row["id"] as? String) ?: "")
                                put("bucket", (row["bucket"] as? String) ?: "")
                                put("filename", (row["filename"] as? String) ?: "")
                                put("mime_type", (row["mime_type"] as? String) ?: "")
                                put("size", (row["size"] as? Number)?.toLong() ?: 0L)
                                put("created_at", (row["created_at"] as? String) ?: "")
                                put("updated_at", (row["updated_at"] as? String) ?: "")
                            }
                        }
                    })
                    put("page", page)
                    put("per_page", perPage)
                    put("total", total)
                })
            }
        }

        post("/api/buckets/{name}/files") {
            checkAuth(state, call)
            val bucketName = call.parameters["name"] ?: throw AppError.BadRequest("Bucket name required")

            state.db.connection().use { conn ->
                val bucketRow = conn.createStatement().executeQuery(
                    "SELECT name FROM _buckets WHERE name = '${bucketName.replace("'", "''")}'"
                )
                if (!bucketRow.next()) throw AppError.NotFound("Bucket '$bucketName' not found")
            }

            val body = call.receive<Map<String, String>>()
            val fileName = body["filename"] ?: "untitled"
            val data = body["data"] ?: throw AppError.BadRequest("File data (base64) is required")
            val mimeType = body["mime_type"] ?: "application/octet-stream"
            val fileBytes = java.util.Base64.getDecoder().decode(data)
            val fileSize = fileBytes.size.toLong()
            if (fileSize > 10 * 1024 * 1024) throw AppError.BadRequest("File too large (max 10MB)")

            val id = uuid()
            val bucketDir = java.io.File(state.storageDir, bucketName).also { it.mkdirs() }
            java.io.File(bucketDir, id).writeBytes(fileBytes)

            state.db.connection().use { conn ->
                conn.createStatement().executeUpdate("""
                    INSERT INTO _files (id, bucket, filename, mime_type, size, created_at, updated_at)
                    VALUES ('$id', '${bucketName.replace("'", "''")}',
                            '${fileName.replace("'", "''")}',
                            '$mimeType', $fileSize, datetime('now'), datetime('now'))
                """)
            }

            call.respondJson(buildJsonObject {
                put("id", id)
                put("filename", fileName)
                put("mime_type", mimeType)
                put("size", fileSize)
            }, HttpStatusCode.Created)
        }

        get("/api/buckets/{name}/files/{id}") {
            checkAuth(state, call)
            val bucketName = call.parameters["name"] ?: throw AppError.BadRequest("Bucket name required")
            val id = call.parameters["id"] ?: throw AppError.BadRequest("File ID required")

            state.db.connection().use { conn ->
                val row = conn.createStatement().executeQuery(
                    "SELECT * FROM _files WHERE id = '$id' AND bucket = '${bucketName.replace("'", "''")}'"
                )
                if (!row.next()) throw AppError.NotFound("File '$id' not found")

                val file = java.io.File(java.io.File(state.storageDir, bucketName), id)
                if (!file.exists()) throw AppError.NotFound("File data not found")

                call.response.header(HttpHeaders.ContentDisposition, "attachment; filename=\"${row.getString("filename")}\"")
                call.response.header(HttpHeaders.ContentLength, row.getLong("size").toString())
                call.response.header(HttpHeaders.ContentType, row.getString("mime_type"))
                call.respondFile(file)
            }
        }

        get("/api/buckets/{name}/files/{id}/thumb") {
            checkAuth(state, call)
            getThumbnailHandler(state, call)
        }

        delete("/api/buckets/{name}/files/{id}") {
            checkAuth(state, call)
            val bucketName = call.parameters["name"] ?: throw AppError.BadRequest("Bucket name required")
            val id = call.parameters["id"] ?: throw AppError.BadRequest("File ID required")

            state.db.connection().use { conn ->
                val deleted = conn.createStatement().executeUpdate(
                    "DELETE FROM _files WHERE id = '$id' AND bucket = '${bucketName.replace("'", "''")}'"
                )
                if (deleted == 0) throw AppError.NotFound("File '$id' not found")
            }
            val file = java.io.File(java.io.File(state.storageDir, bucketName), id)
            if (file.exists()) file.delete()
            call.respond(mapOf("deleted" to true))
        }

        // ---- Webhooks ----
        get("/api/webhooks") {
            checkAuth(state, call)
            val rows = state.db.connection().use { conn ->
                conn.createStatement().executeQuery("SELECT * FROM _webhooks ORDER BY name").toList()
            }
            call.respondText(buildJsonArray {
                for (row in rows) {
                    addJsonObject {
                        put("id", (row["id"] as? String) ?: "")
                        put("name", (row["name"] as? String) ?: "")
                        put("url", (row["url"] as? String) ?: "")
                        put("events", buildJsonArray {
                            for (e in jsonStringToEvents2(row["events"] as? String ?: "[]")) add(e)
                        })
                        put("is_active", (row["is_active"] as? Number)?.toInt() == 1)
                        put("created_at", (row["created_at"] as? String) ?: "")
                        put("updated_at", (row["updated_at"] as? String) ?: "")
                    }
                }
            }.toString(), ContentType.Application.Json)
        }

        post("/api/webhooks") {
            checkAuth(state, call)
            val body = kotlinx.serialization.json.Json.parseToJsonElement(call.receiveText()).jsonObject
            val name = body["name"]?.jsonPrimitive?.content ?: throw AppError.BadRequest("Webhook name is required")
            val url = body["url"]?.jsonPrimitive?.content ?: throw AppError.BadRequest("Webhook URL is required")
            val events = body["events"]?.jsonArray?.map { it.jsonPrimitive.content }
                ?: throw AppError.BadRequest("Events are required")
            val secret = body["secret"]?.jsonPrimitive?.content ?: ""
            val isActive = body["is_active"]?.jsonPrimitive?.boolean ?: true

            if (events.isEmpty()) throw AppError.BadRequest("At least one event is required")
            for (ev in events) {
                if (ev !in knownEvents2) throw AppError.BadRequest("Unknown event: $ev")
            }

            val id = uuid()
            val isActiveInt = if (isActive) 1 else 0
            val eventsJson = eventsToJsonString2(events)

            state.db.connection().use { conn ->
                conn.createStatement().executeUpdate("""
                    INSERT INTO _webhooks (id, name, url, events, secret, is_active, created_at, updated_at)
                    VALUES ('$id', '${name.replace("'", "''")}', '${url.replace("'", "''")}',
                            '$eventsJson', '${secret.replace("'", "''")}', $isActiveInt,
                            datetime('now'), datetime('now'))
                """)
            }
            call.respond(status = HttpStatusCode.Created, mapOf("id" to id, "name" to name))
        }

        get("/api/webhooks/{id}") {
            checkAuth(state, call)
            val id = call.parameters["id"] ?: throw AppError.BadRequest("Webhook ID required")
            state.db.connection().use { conn ->
                val row = conn.createStatement().executeQuery(
                    "SELECT * FROM _webhooks WHERE id = '$id'"
                )
                if (!row.next()) throw AppError.NotFound("Webhook '$id' not found")
                call.respondJson(buildJsonObject {
                    put("id", row.getString("id"))
                    put("name", row.getString("name"))
                    put("url", row.getString("url"))
                    put("events", buildJsonArray {
                        for (e in jsonStringToEvents2(row.getString("events"))) {
                            add(e)
                        }
                    })
                    put("is_active", row.getInt("is_active") == 1)
                    put("created_at", row.getString("created_at"))
                    put("updated_at", row.getString("updated_at"))
                })
            }
        }

        patch("/api/webhooks/{id}") {
            checkAuth(state, call)
            val id = call.parameters["id"] ?: throw AppError.BadRequest("Webhook ID required")
            val body = kotlinx.serialization.json.Json.parseToJsonElement(call.receiveText()).jsonObject
            val name = body["name"]?.jsonPrimitive?.content ?: throw AppError.BadRequest("Name is required")
            val url = body["url"]?.jsonPrimitive?.content ?: throw AppError.BadRequest("URL is required")
            val events = body["events"]?.jsonArray?.map { it.jsonPrimitive.content }
                ?: throw AppError.BadRequest("Events are required")
            val secret = body["secret"]?.jsonPrimitive?.content ?: ""
            val isActive = body["is_active"]?.jsonPrimitive?.boolean ?: true
            val isActiveInt = if (isActive) 1 else 0
            val eventsJson = eventsToJsonString2(events)

            state.db.connection().use { conn ->
                val updated = conn.createStatement().executeUpdate("""
                    UPDATE _webhooks SET name='${name.replace("'", "''")}', url='${url.replace("'", "''")}',
                        events='$eventsJson', secret='${secret.replace("'", "''")}', is_active=$isActiveInt,
                        updated_at=datetime('now') WHERE id='$id'
                """)
                if (updated == 0) throw AppError.NotFound("Webhook '$id' not found")
            }
            call.respond(mapOf("id" to id, "name" to name))
        }

        delete("/api/webhooks/{id}") {
            checkAuth(state, call)
            val id = call.parameters["id"] ?: throw AppError.BadRequest("Webhook ID required")
            state.db.connection().use { conn ->
                val deleted = conn.createStatement().executeUpdate(
                    "DELETE FROM _webhooks WHERE id = '$id'"
                )
                if (deleted == 0) throw AppError.NotFound("Webhook '$id' not found")
            }
            call.respond(mapOf("deleted" to true))
        }

        get("/api/webhooks/{id}/logs") {
            checkAuth(state, call)
            val id = call.parameters["id"] ?: throw AppError.BadRequest("Webhook ID required")
            val rows = state.db.connection().use { conn ->
                conn.createStatement().executeQuery("""
                    SELECT * FROM _webhook_logs WHERE webhook_id = '$id'
                    ORDER BY created_at DESC LIMIT 50
                """).toList()
            }
            call.respond(rows)
        }

        // ---- Secrets ----
        get("/api/secrets") {
            checkAuth(state, call)
            val rows = state.db.connection().use { conn ->
                conn.createStatement().executeQuery(
                    "SELECT id, name, scope, created_at, updated_at FROM _secrets ORDER BY name"
                ).toList()
            }
            call.respondText(buildJsonArray {
                for (row in rows) {
                    addJsonObject {
                        put("id", (row["id"] as? String) ?: "")
                        put("name", (row["name"] as? String) ?: "")
                        put("scope", (row["scope"] as? String) ?: "")
                        put("created_at", (row["created_at"] as? String) ?: "")
                        put("updated_at", (row["updated_at"] as? String) ?: "")
                    }
                }
            }.toString(), ContentType.Application.Json)
        }

        post("/api/secrets") {
            checkAuth(state, call)
            val body = call.receive<Map<String, String>>()
            val name = body["name"] ?: throw AppError.BadRequest("Secret name is required")
            val value = body["value"] ?: throw AppError.BadRequest("Secret value is required")
            val scope = body["scope"] ?: "general"

            val id = uuid()
            val encrypted = aesEncrypt(state.secretsKey, value)
            state.db.connection().use { conn ->
                conn.createStatement().executeUpdate("""
                    INSERT INTO _secrets (id, name, value, scope, created_at, updated_at)
                    VALUES ('$id', '${name.replace("'", "''")}', '$encrypted',
                            '${scope.replace("'", "''")}', datetime('now'), datetime('now'))
                """)
            }
            call.respond(status = HttpStatusCode.Created, mapOf("id" to id, "name" to name))
        }

        get("/api/secrets/{id}") {
            checkAuth(state, call)
            val id = call.parameters["id"] ?: throw AppError.BadRequest("Secret ID required")
            state.db.connection().use { conn ->
                val row = conn.createStatement().executeQuery(
                    "SELECT * FROM _secrets WHERE id = '$id'"
                )
                if (!row.next()) throw AppError.NotFound("Secret '$id' not found")
                val decrypted = aesDecrypt(state.secretsKey, row.getString("value"))
                call.respond(mapOf(
                    "id" to row.getString("id"), "name" to row.getString("name"),
                    "value" to decrypted, "scope" to row.getString("scope"),
                    "created_at" to row.getString("created_at"), "updated_at" to row.getString("updated_at"),
                ))
            }
        }

        patch("/api/secrets/{id}") {
            checkAuth(state, call)
            val id = call.parameters["id"] ?: throw AppError.BadRequest("Secret ID required")
            val body = call.receive<Map<String, String>>()
            val value = body["value"] ?: throw AppError.BadRequest("Secret value is required")
            val name = body["name"] ?: ""
            val scope = body["scope"] ?: "general"
            val encrypted = aesEncrypt(state.secretsKey, value)

            state.db.connection().use { conn ->
                val updated = conn.createStatement().executeUpdate("""
                    UPDATE _secrets SET value='$encrypted', name='${name.replace("'", "''")}',
                        scope='${scope.replace("'", "''")}', updated_at=datetime('now') WHERE id='$id'
                """)
                if (updated == 0) throw AppError.NotFound("Secret '$id' not found")
            }
            call.respond(mapOf("id" to id, "name" to name))
        }

        delete("/api/secrets/{id}") {
            checkAuth(state, call)
            val id = call.parameters["id"] ?: throw AppError.BadRequest("Secret ID required")
            state.db.connection().use { conn ->
                val deleted = conn.createStatement().executeUpdate(
                    "DELETE FROM _secrets WHERE id = '$id'"
                )
                if (deleted == 0) throw AppError.NotFound("Secret '$id' not found")
            }
            call.respond(mapOf("deleted" to true))
        }

        // ---- WebSocket management ----
        get("/api/websockets") {
            checkAuth(state, call); call.respond(state.wsHub.getAll())
        }

        get("/api/websockets/{id}") {
            checkAuth(state, call)
            val id = call.parameters["id"] ?: throw AppError.BadRequest("Connection ID required")
            val conn = state.wsHub.getById(id) ?: throw AppError.NotFound("Connection '$id' not found")
            call.respond(conn)
        }

        delete("/api/websockets/{id}") {
            checkAuth(state, call)
            val id = call.parameters["id"] ?: throw AppError.BadRequest("Connection ID required")
            if (!state.wsHub.disconnect(id)) throw AppError.NotFound("Connection '$id' not found")
            call.respond(mapOf("deleted" to true))
        }

        post("/api/websockets/broadcast") {
            checkAuth(state, call)
            val body = call.receive<Map<String, String>>()
            val message = body["message"] ?: throw AppError.BadRequest("Message is required")
            state.wsHub.broadcast(message)
            call.respond(mapOf("broadcast" to true))
        }

        post("/api/websockets/{id}/send") {
            checkAuth(state, call)
            val id = call.parameters["id"] ?: throw AppError.BadRequest("Connection ID required")
            val body = call.receive<Map<String, String>>()
            val message = body["message"] ?: throw AppError.BadRequest("Message is required")
            if (!state.wsHub.sendTo(id, message)) throw AppError.NotFound("Connection '$id' not found")
            call.respond(mapOf("sent" to true))
        }

        get("/api/websockets/{id}/messages") {
            checkAuth(state, call)
            val id = call.parameters["id"] ?: throw AppError.BadRequest("Connection ID required")
            call.respond(state.wsHub.getMessages(id))
        }

        get("/api/websockets/messages") {
            checkAuth(state, call); call.respond(state.wsHub.getMessages())
        }

        // ---- Cache ----
        get("/api/cache") { checkAuth(state, call); call.respond(state.cache.list()) }
        get("/api/cache/stats") { checkAuth(state, call); call.respond(state.cache.stats()) }

        post("/api/cache") {
            checkAuth(state, call)
            val body = call.receive<Map<String, String>>()
            val key = body["key"] ?: throw AppError.BadRequest("Key is required")
            val value = body["value"] ?: throw AppError.BadRequest("Value is required")
            val ttl = body["ttl"]?.toLongOrNull() ?: 0L
            state.cache.set(key, value, ttl)
            call.respondJson(buildJsonObject {
                put("key", key)
                put("value", value)
                put("ttl", ttl)
            })
        }

        get("/api/cache/{key}") {
            checkAuth(state, call)
            val key = call.parameters["key"] ?: throw AppError.BadRequest("Cache key required")
            val entry = state.cache.get(key) ?: throw AppError.NotFound("Cache key '$key' not found")
            call.respond(entry)
        }

        delete("/api/cache/{key}") {
            checkAuth(state, call)
            val key = call.parameters["key"] ?: throw AppError.BadRequest("Cache key required")
            if (!state.cache.delete(key)) throw AppError.NotFound("Cache key '$key' not found")
            call.respond(mapOf("deleted" to true))
        }

        delete("/api/cache") {
            checkAuth(state, call); state.cache.flush(); call.respond(mapOf("flushed" to true))
        }

        // ---- Notifications ----
        get("/api/notifications") {
            checkAuth(state, call)
            val rows = state.db.connection().use { conn ->
                conn.createStatement().executeQuery(
                    "SELECT * FROM _notifications ORDER BY created_at DESC LIMIT 100"
                ).toList()
            }
            call.respondText(buildJsonArray {
                for (row in rows) {
                    addJsonObject {
                        put("id", (row["id"] as? String) ?: "")
                        put("title", (row["title"] as? String) ?: "")
                        put("body", (row["body"] as? String) ?: "")
                        put("type", (row["type"] as? String) ?: "")
                        put("is_read", (row["is_read"] as? Number)?.toInt() == 1)
                        put("created_at", (row["created_at"] as? String) ?: "")
                    }
                }
            }.toString(), ContentType.Application.Json)
        }

        post("/api/notifications") {
            checkAuth(state, call)
            val body = call.receive<Map<String, String>>()
            val title = body["title"] ?: throw AppError.BadRequest("Title is required")
            val bodyText = body["body"] ?: ""
            val type = body["type"] ?: "info"
            if (type !in validTypes2) throw AppError.BadRequest("Invalid type: $type")

            val id = uuid()
            state.db.connection().use { conn ->
                conn.createStatement().executeUpdate("""
                    INSERT INTO _notifications (id, title, body, type, created_at)
                    VALUES ('$id', '${title.replace("'", "''")}', '${bodyText.replace("'", "''")}',
                            '$type', datetime('now'))
                """)
            }
            state.notifHub.broadcast("""{"id":"$id","title":"${title.replace("\"", "\\\"")}","type":"$type"}""")
            call.respond(status = HttpStatusCode.Created, mapOf("id" to id, "title" to title))
        }

        get("/api/notifications/{id}") {
            checkAuth(state, call)
            val id = call.parameters["id"] ?: throw AppError.BadRequest("Notification ID required")
            state.db.connection().use { conn ->
                val row = conn.createStatement().executeQuery(
                    "SELECT * FROM _notifications WHERE id = '$id'"
                )
                if (!row.next()) throw AppError.NotFound("Notification '$id' not found")
                call.respondJson(buildJsonObject {
                    put("id", row.getString("id"))
                    put("title", row.getString("title"))
                    put("body", row.getString("body"))
                    put("type", row.getString("type"))
                    put("is_read", row.getInt("is_read") == 1)
                    put("created_at", row.getString("created_at"))
                })
            }
        }

        patch("/api/notifications/{id}") {
            checkAuth(state, call)
            val id = call.parameters["id"] ?: throw AppError.BadRequest("Notification ID required")
            state.db.connection().use { conn ->
                val updated = conn.createStatement().executeUpdate(
                    "UPDATE _notifications SET is_read = 1 WHERE id = '$id'"
                )
                if (updated == 0) throw AppError.NotFound("Notification '$id' not found")
            }
            call.respondJson(buildJsonObject { put("id", id); put("is_read", true) })
        }

        delete("/api/notifications/{id}") {
            checkAuth(state, call)
            val id = call.parameters["id"] ?: throw AppError.BadRequest("Notification ID required")
            state.db.connection().use { conn ->
                val deleted = conn.createStatement().executeUpdate(
                    "DELETE FROM _notifications WHERE id = '$id'"
                )
                if (deleted == 0) throw AppError.NotFound("Notification '$id' not found")
            }
            call.respond(mapOf("deleted" to true))
        }

        delete("/api/notifications") {
            checkAuth(state, call)
            state.db.connection().use { conn ->
                conn.createStatement().executeUpdate("DELETE FROM _notifications")
            }
            call.respond(mapOf("cleared" to true))
        }

        // ---- Logs ----
        get("/api/logs") {
            checkAuth(state, call)
            val rows = state.db.connection().use { conn ->
                conn.createStatement().executeQuery(
                    "SELECT * FROM _logs ORDER BY created_at DESC LIMIT 100"
                ).toList()
            }
            call.respondText(buildJsonArray {
                for (row in rows) {
                    addJsonObject {
                        put("id", (row["id"] as? String) ?: "")
                        put("level", (row["level"] as? String) ?: "")
                        put("message", (row["message"] as? String) ?: "")
                        put("meta", (row["meta"] as? String) ?: "")
                        put("created_at", (row["created_at"] as? String) ?: "")
                    }
                }
            }.toString(), ContentType.Application.Json)
        }

        post("/api/logs") {
            checkAuth(state, call)
            val body = call.receive<Map<String, String>>()
            val message = body["message"] ?: throw AppError.BadRequest("Log message is required")
            val level = body["level"] ?: "info"
            val meta = body["meta"] ?: "{}"
            if (level !in validLevels2) throw AppError.BadRequest("Invalid level: $level")

            val id = uuid()
            state.db.connection().use { conn ->
                conn.createStatement().executeUpdate("""
                    INSERT INTO _logs (id, level, message, meta, created_at)
                    VALUES ('$id', '$level', '${message.replace("'", "''")}',
                            '${meta.replace("'", "''")}', datetime('now'))
                """)
            }
            state.logHub.broadcast("""{"id":"$id","level":"$level","message":"${message.replace("\"", "\\\"")}"}""")
            call.respond(status = HttpStatusCode.Created, mapOf("id" to id))
        }

        delete("/api/logs") {
            checkAuth(state, call)
            state.db.connection().use { conn ->
                conn.createStatement().executeUpdate("DELETE FROM _logs")
            }
            call.respond(mapOf("cleared" to true))
        }

        // ---- PubSub ----
        get("/api/pubsub/topics") {
            checkAuth(state, call)
            val rows = state.db.connection().use { conn ->
                conn.createStatement().executeQuery(
                    "SELECT * FROM _pubsub_topics ORDER BY name"
                ).toList()
            }
            call.respondText(buildJsonArray {
                for (row in rows) {
                    addJsonObject {
                        put("id", (row["id"] as? String) ?: "")
                        put("name", (row["name"] as? String) ?: "")
                        put("created_at", (row["created_at"] as? String) ?: "")
                    }
                }
            }.toString(), ContentType.Application.Json)
        }

        post("/api/pubsub/topics") {
            checkAuth(state, call)
            val body = call.receive<Map<String, String>>()
            val name = body["name"] ?: throw AppError.BadRequest("Topic name is required")
            val id = uuid()
            state.db.connection().use { conn ->
                val existing = conn.createStatement().executeQuery(
                    "SELECT name FROM _pubsub_topics WHERE name = '${name.replace("'", "''")}'"
                )
                if (existing.next()) throw AppError.Conflict("Topic '$name' already exists")
                conn.createStatement().executeUpdate("""
                    INSERT INTO _pubsub_topics (id, name, created_at)
                    VALUES ('$id', '${name.replace("'", "''")}', datetime('now'))
                """)
            }
            call.respond(status = HttpStatusCode.Created, mapOf("id" to id, "name" to name))
        }

        get("/api/pubsub/topics/{name}") {
            checkAuth(state, call)
            val name = call.parameters["name"] ?: throw AppError.BadRequest("Topic name required")
            state.db.connection().use { conn ->
                val row = conn.createStatement().executeQuery(
                    "SELECT * FROM _pubsub_topics WHERE name = '${name.replace("'", "''")}'"
                )
                if (!row.next()) throw AppError.NotFound("Topic '$name' not found")
                call.respond(mapOf(
                    "id" to row.getString("id"), "name" to row.getString("name"),
                    "created_at" to row.getString("created_at"),
                ))
            }
        }

        delete("/api/pubsub/topics/{name}") {
            checkAuth(state, call)
            val name = call.parameters["name"] ?: throw AppError.BadRequest("Topic name required")
            state.db.connection().use { conn ->
                val deleted = conn.createStatement().executeUpdate(
                    "DELETE FROM _pubsub_topics WHERE name = '${name.replace("'", "''")}'"
                )
                if (deleted == 0) throw AppError.NotFound("Topic '$name' not found")
            }
            call.respond(mapOf("deleted" to true))
        }

        get("/api/pubsub/topics/{name}/messages") {
            checkAuth(state, call)
            val name = call.parameters["name"] ?: throw AppError.BadRequest("Topic name required")
            state.db.connection().use { conn ->
                val topicRow = conn.createStatement().executeQuery(
                    "SELECT id FROM _pubsub_topics WHERE name = '${name.replace("'", "''")}'"
                )
                if (!topicRow.next()) throw AppError.NotFound("Topic '$name' not found")
                val topicId = topicRow.getString("id")
                val rows = conn.createStatement().executeQuery("""
                    SELECT * FROM _pubsub_messages WHERE topic_id = '$topicId'
                    ORDER BY created_at DESC LIMIT 100
                """).toList()
                call.respondText(buildJsonArray {
                    for (row in rows) {
                        addJsonObject {
                            put("id", (row["id"] as? String) ?: "")
                            put("body", (row["body"] as? String) ?: "")
                            put("created_at", (row["created_at"] as? String) ?: "")
                        }
                    }
                }.toString(), ContentType.Application.Json)
            }
        }

        post("/api/pubsub/topics/{name}/messages") {
            checkAuth(state, call)
            val name = call.parameters["name"] ?: throw AppError.BadRequest("Topic name required")
            val body = call.receive<Map<String, String>>()
            val msgBody = body["body"] ?: throw AppError.BadRequest("Message body is required")

            state.db.connection().use { conn ->
                val topicRow = conn.createStatement().executeQuery(
                    "SELECT id FROM _pubsub_topics WHERE name = '${name.replace("'", "''")}'"
                )
                if (!topicRow.next()) throw AppError.NotFound("Topic '$name' not found")
                val topicId = topicRow.getString("id")
                val msgId = uuid()
                conn.createStatement().executeUpdate("""
                    INSERT INTO _pubsub_messages (id, topic_id, body, created_at)
                    VALUES ('$msgId', '$topicId', '${msgBody.replace("'", "''")}', datetime('now'))
                """)
            }
            state.pubsubHub.broadcast("""{"topic":"$name","body":"${msgBody.replace("\"", "\\\"")}"}""")
            call.respond(status = HttpStatusCode.Created, mapOf("body" to msgBody))
        }

        // ---- Cron Jobs ----
        get("/api/cronjobs") {
            checkAuth(state, call)
            val rows = state.db.connection().use { conn ->
                conn.createStatement().executeQuery("SELECT * FROM _cronjobs ORDER BY name").toList()
            }
            call.respondText(buildJsonArray {
                for (row in rows) {
                    addJsonObject {
                        put("id", (row["id"] as? String) ?: "")
                        put("name", (row["name"] as? String) ?: "")
                        put("schedule", (row["schedule"] as? String) ?: "")
                        put("command", (row["command"] as? String) ?: "")
                        put("method", (row["method"] as? String) ?: "")
                        put("is_active", (row["is_active"] as? Number)?.toInt() == 1)
                        put("last_run_at", (row["last_run_at"] as? String) ?: "")
                        put("last_run_status", (row["last_run_status"] as? String) ?: "")
                        put("created_at", (row["created_at"] as? String) ?: "")
                        put("updated_at", (row["updated_at"] as? String) ?: "")
                    }
                }
            }.toString(), ContentType.Application.Json)
        }

        post("/api/cronjobs") {
            checkAuth(state, call)
            val body = call.receive<Map<String, String>>()
            val name = body["name"] ?: throw AppError.BadRequest("Cron job name is required")
            val schedule = body["schedule"] ?: throw AppError.BadRequest("Schedule is required")
            val command = body["command"] ?: throw AppError.BadRequest("Command URL is required")
            val method = body["method"] ?: "GET"
            val headers = body["headers"] ?: ""
            val jobBody = body["body"] ?: ""

            val id = uuid()
            state.db.connection().use { conn ->
                conn.createStatement().executeUpdate("""
                    INSERT INTO _cronjobs (id, name, schedule, command, method, headers, body, created_at, updated_at)
                    VALUES ('$id', '${name.replace("'", "''")}', '${schedule.replace("'", "''")}',
                            '${command.replace("'", "''")}', '$method', '${headers.replace("'", "''")}',
                            '${jobBody.replace("'", "''")}', datetime('now'), datetime('now'))
                """)
            }
            call.respond(status = HttpStatusCode.Created, mapOf("id" to id, "name" to name))
        }

        get("/api/cronjobs/{id}") {
            checkAuth(state, call)
            val id = call.parameters["id"] ?: throw AppError.BadRequest("Cron job ID required")
            state.db.connection().use { conn ->
                val row = conn.createStatement().executeQuery(
                    "SELECT * FROM _cronjobs WHERE id = '$id'"
                )
                if (!row.next()) throw AppError.NotFound("Cron job '$id' not found")
                call.respondJson(buildJsonObject {
                    put("id", row.getString("id"))
                    put("name", row.getString("name"))
                    put("schedule", row.getString("schedule"))
                    put("command", row.getString("command"))
                    put("method", row.getString("method"))
                    put("is_active", row.getInt("is_active") == 1)
                    put("last_run_at", row.getString("last_run_at") ?: "")
                    put("last_run_status", row.getString("last_run_status") ?: "")
                    put("created_at", row.getString("created_at"))
                    put("updated_at", row.getString("updated_at"))
                })
            }
        }

        patch("/api/cronjobs/{id}") {
            checkAuth(state, call)
            val id = call.parameters["id"] ?: throw AppError.BadRequest("Cron job ID required")
            val body = call.receive<Map<String, String>>()
            val name = body["name"] ?: ""
            val schedule = body["schedule"] ?: ""
            val command = body["command"] ?: ""
            val method = body["method"] ?: "GET"
            val headers = body["headers"] ?: ""
            val jobBody = body["body"] ?: ""
            val isActive = if (body.containsKey("is_active")) (body["is_active"]?.toIntOrNull() ?: 1) else 1

            state.db.connection().use { conn ->
                val updated = conn.createStatement().executeUpdate("""
                    UPDATE _cronjobs SET name='${name.replace("'", "''")}', schedule='${schedule.replace("'", "''")}',
                        command='${command.replace("'", "''")}', method='$method',
                        headers='${headers.replace("'", "''")}', body='${jobBody.replace("'", "''")}',
                        is_active=$isActive, updated_at=datetime('now') WHERE id='$id'
                """)
                if (updated == 0) throw AppError.NotFound("Cron job '$id' not found")
            }
            call.respond(mapOf("id" to id, "name" to name))
        }

        delete("/api/cronjobs/{id}") {
            checkAuth(state, call)
            val id = call.parameters["id"] ?: throw AppError.BadRequest("Cron job ID required")
            state.db.connection().use { conn ->
                val deleted = conn.createStatement().executeUpdate(
                    "DELETE FROM _cronjobs WHERE id = '$id'"
                )
                if (deleted == 0) throw AppError.NotFound("Cron job '$id' not found")
            }
            call.respond(mapOf("deleted" to true))
        }

        post("/api/cronjobs/{id}/run") {
            checkAuth(state, call)
            val id = call.parameters["id"] ?: throw AppError.BadRequest("Cron job ID required")
            state.db.connection().use { conn ->
                val rs = conn.createStatement().executeQuery("SELECT * FROM _cronjobs WHERE id = '$id'")
                if (!rs.next()) throw AppError.NotFound("Cron job '$id' not found")
            }
            executeCronJobHandler(state, id)
            call.respond(mapOf("executed" to true))
        }

        get("/api/cronjobs/{id}/logs") {
            checkAuth(state, call)
            val id = call.parameters["id"] ?: throw AppError.BadRequest("Cron job ID required")
            val rows = state.db.connection().use { conn ->
                conn.createStatement().executeQuery("""
                    SELECT * FROM _cronjob_logs WHERE cronjob_id = '$id'
                    ORDER BY created_at DESC LIMIT 50
                """).toList()
            }
            call.respond(rows)
        }

        // ---- Permissions ----
        get("/api/permissions") {
            checkAuth(state, call); permissionsRoutes(state, call)
        }
        post("/api/permissions") {
            checkAuth(state, call); permissionsRoutes(state, call)
        }
        delete("/api/permissions") {
            checkAuth(state, call); permissionsRoutes(state, call)
        }

        // ---- Import/Export ----
        get("/api/export") {
            checkAuth(state, call); handleExportHandler(state, call)
        }
        post("/api/import") {
            checkAuth(state, call); handleImportHandler(state, call)
        }

        // ---- Backup ----
        get("/api/backup") {
            checkAuth(state, call); handleBackupHandler(state, call)
        }

        // ---- WebSocket realtime ----
        webSocket("/ws") {
            val requestPoint = call.request.origin
            val remoteAddr = requestPoint.remoteHost
            val userAgent = call.request.headers[io.ktor.http.HttpHeaders.UserAgent] ?: ""
            val wsId = uuid()
            val client = WebSocketHub.WSClient(wsId, this, remoteAddr, "/ws", userAgent)
            state.wsHub.register(client)
            try {
                for (frame in incoming) {
                    if (frame is Frame.Text) {
                        val text = frame.readText()
                        state.db.connection().use { conn ->
                            conn.createStatement().executeUpdate("""
                                INSERT INTO _ws_messages (id, connection_id, direction, content, created_at)
                                VALUES ('${uuid()}', '$wsId', 'incoming',
                                        '${text.replace("'", "''")}', datetime('now'))
                            """)
                        }
                        send(Frame.Text("""{"echo":"${text.replace("\"", "\\\"")}"}"""))
                    }
                }
            } finally {
                state.wsHub.unregister(wsId)
            }
        }

        // ---- SSE Streams ----
        get("/api/sse/notifications") {
            checkAuth(state, call); sseStream(state.notifHub, call)
        }
        get("/api/sse/logs") {
            checkAuth(state, call); sseStream(state.logHub, call)
        }
        get("/api/sse/pubsub") {
            checkAuth(state, call); sseStream(state.pubsubHub, call)
        }
    }
}

// ---- Auth helper ----
private suspend fun checkAuth(state: AppState, call: ApplicationCall): String {
    val authHeader = call.request.headers[HttpHeaders.Authorization] ?: throw AppError.Unauthorized()
    val token = authHeader.removePrefix("Bearer ").trim()
    val claims = validateToken(state.config.jwtSecret, token) ?: throw AppError.Unauthorized()
    return claims["user_id"] as String
}

// ---- Webhook event helpers ----
private val knownEvents2 = setOf(
    "collection.created", "collection.updated", "collection.deleted",
    "record.created", "record.updated", "record.deleted",
    "bucket.created", "bucket.deleted",
    "file.uploaded", "file.deleted",
    "notification.created", "log.created",
)

private val validTypes2 = setOf("info", "success", "warning", "error")
private val validLevels2 = setOf("debug", "info", "warn", "error")

private fun jsonStringToEvents2(jsonStr: String): List<String> {
    return try {
        @Suppress("UNCHECKED_CAST")
        Json.decodeFromString<List<String>>(jsonStr) as List<String>
    } catch (_: Exception) { emptyList() }
}

private fun eventsToJsonString2(events: List<String>): String {
    return Json.encodeToString(ListSerializer(String.serializer()), events)
}

// ---- SSE Stream Handler ----
private suspend fun sseStream(hub: SSEHub<String>, call: ApplicationCall) {
    val channel = Channel<String>(Channel.UNLIMITED)
    hub.subscribe(ChannelProducerScope(channel))

    call.respondBytesWriter(contentType = ContentType.Text.EventStream) {
        try {
            for (event in channel) {
                writeFully("data: $event\n\n".toByteArray())
                flush()
            }
        } catch (_: Exception) { }
    }
}

class ChannelProducerScope<T>(override val channel: Channel<T>) : kotlinx.coroutines.channels.ProducerScope<T> {
    override suspend fun send(element: T) { channel.send(element) }
    override fun trySend(element: T): kotlinx.coroutines.channels.ChannelResult<kotlin.Unit> = channel.trySend(element)
    override val isClosedForSend: kotlin.Boolean get() = channel.isClosedForSend
    override val onSend: kotlinx.coroutines.selects.SelectClause2<T, kotlinx.coroutines.channels.SendChannel<T>> get() = channel.onSend
    override fun invokeOnClose(handler: (Throwable?) -> Unit) { channel.invokeOnClose(handler) }
    override fun close(cause: Throwable?): Boolean = channel.close(cause)
    override val coroutineContext: kotlin.coroutines.CoroutineContext = kotlinx.coroutines.Dispatchers.Default
}

// ---- Permissions routes ----
private suspend fun permissionsRoutes(state: AppState, call: ApplicationCall) {
    when (call.request.httpMethod.value) {
        "GET" -> {
            val rows = state.db.connection().use { conn ->
                conn.createStatement().executeQuery("SELECT * FROM _permissions ORDER BY collection, user_id").toList()
            }
            call.respondText(buildJsonArray {
                for (row in rows) {
                    addJsonObject {
                        put("id", (row["id"] as? String) ?: "")
                        put("user_id", (row["user_id"] as? String) ?: "")
                        put("collection", (row["collection"] as? String) ?: "")
                        put("role", (row["role"] as? String) ?: "")
                        put("created_at", (row["created_at"] as? String) ?: "")
                        put("updated_at", (row["updated_at"] as? String) ?: "")
                    }
                }
            }.toString(), ContentType.Application.Json)
        }
        "POST" -> {
            val body = call.receive<Map<String, String>>()
            val userId = body["user_id"] ?: throw AppError.BadRequest("User ID is required")
            val collection = body["collection"] ?: throw AppError.BadRequest("Collection is required")
            val role = body["role"] ?: throw AppError.BadRequest("Role is required")
            if (role !in setOf("read", "write", "admin")) throw AppError.BadRequest("Invalid role: $role")

            val id = uuid()
            state.db.connection().use { conn ->
                val existing = conn.createStatement().executeQuery(
                    "SELECT id FROM _permissions WHERE user_id = '$userId' AND collection = '${collection.replace("'", "''")}'"
                )
                if (existing.next()) throw AppError.Conflict("Permission already exists")
                conn.createStatement().executeUpdate("""
                    INSERT INTO _permissions (id, user_id, collection, role, created_at, updated_at)
                    VALUES ('$id', '$userId', '${collection.replace("'", "''")}', '$role', datetime('now'), datetime('now'))
                """)
            }
            call.respond(status = HttpStatusCode.Created, mapOf("id" to id))
        }
        "DELETE" -> {
            val body = call.receive<Map<String, String>>()
            val userId = body["user_id"] ?: throw AppError.BadRequest("User ID is required")
            val collection = body["collection"] ?: throw AppError.BadRequest("Collection is required")
            state.db.connection().use { conn ->
                val deleted = conn.createStatement().executeUpdate("""
                    DELETE FROM _permissions WHERE user_id = '$userId' AND collection = '${collection.replace("'", "''")}'
                """)
                if (deleted == 0) throw AppError.NotFound("Permission not found")
            }
            call.respond(mapOf("deleted" to true))
        }
        else -> throw AppError.BadRequest("Unsupported method")
    }
}

// ---- Export handler ----
private suspend fun handleExportHandler(state: AppState, call: ApplicationCall) {
    val data = mutableMapOf<String, Any>()
    state.db.connection().use { conn ->
        val tables = listOf("_collections", "_buckets", "_files", "_webhooks", "_secrets", "_cronjobs", "_permissions")
        for (table in tables) {
            val rows = conn.createStatement().executeQuery("SELECT * FROM $table").toList()
            data[table.removePrefix("_")] = rows
        }
    }
    val exportObj = buildJsonObject {
        data.forEach { (key, value) ->
            put(key, when (value) {
                is List<*> -> JsonArray(value.map { item ->
                    when (item) {
                        is Map<*, *> -> JsonObject(item.entries.associate { (k, v2) ->
                            k.toString() to when (v2) {
                                null -> JsonNull
                                is Number -> JsonPrimitive(v2.toLong())
                                is Boolean -> JsonPrimitive(v2)
                                else -> JsonPrimitive(v2.toString())
                            }
                        })
                        else -> JsonPrimitive(item?.toString() ?: "")
                    }
                })
                else -> JsonPrimitive(value.toString())
            })
        }
    }
    call.respondText(
        buildJsonObject {
            put("export", exportObj)
            put("exported_at", java.time.LocalDateTime.now().toString())
        }.toString(),
        ContentType.Application.Json,
    )
}

// ---- Import handler ----
private suspend fun handleImportHandler(state: AppState, call: ApplicationCall) {
    val body = kotlinx.serialization.json.Json.parseToJsonElement(call.receiveText()).jsonObject
    val importData = body["data"]?.jsonObject
        ?.mapValues { (_, v) ->
            v.jsonArray.map { item -> item.jsonObject.mapValues { (_, el) ->
                when (el) {
                    is JsonPrimitive -> when {
                        el.isString -> el.content
                        el.booleanOrNull != null -> el.boolean
                        el.longOrNull != null -> el.long
                        el.doubleOrNull != null -> el.double
                        else -> el.content
                    }
                    is JsonNull -> null
                    else -> el.toString()
                }
            } }
        } ?: throw AppError.BadRequest("Import data is required")
    state.db.connection().use { conn ->
        for ((tableName, rows) in importData) {
            @Suppress("UNCHECKED_CAST")
            val rowList = rows as? List<Map<String, Any?>> ?: continue
            val fullTable = "_$tableName"
            for (row in rowList) {
                val keys = row.keys.joinToString(",")
                val values = row.values.joinToString(",") {
                    when (it) {
                        null -> "NULL"
                        is Number -> it.toString()
                        is Boolean -> if (it) "1" else "0"
                        else -> "'${it.toString().replace("'", "''")}'"
                    }
                }
                try {
                    conn.createStatement().executeUpdate(
                        "INSERT OR IGNORE INTO $fullTable ($keys) VALUES ($values)"
                    )
                } catch (_: Exception) { }
            }
        }
    }
    call.respond(mapOf("imported" to true))
}

// ---- Backup handler ----
private suspend fun handleBackupHandler(state: AppState, call: ApplicationCall) {
    val dbUrl = state.db.connection().metaData.url
    val dbFile = java.io.File(dbUrl.removePrefix("jdbc:sqlite:"))
    if (!dbFile.exists()) throw AppError.NotFound("Database file not found")
    call.response.header(HttpHeaders.ContentDisposition, "attachment; filename=\"backbone-backup.db\"")
    call.response.header(HttpHeaders.ContentType, ContentType.Application.OctetStream.toString())
    call.respondFile(dbFile)
}

// ---- Cron execution helper ----
private suspend fun executeCronJobHandler(state: AppState, jobId: String) {
    val row = state.db.connection().use { conn ->
        val rs = conn.createStatement().executeQuery("SELECT * FROM _cronjobs WHERE id = '$jobId'")
        if (!rs.next()) return
        mapOf(
            "id" to rs.getString("id"),
            "name" to rs.getString("name"),
            "command" to rs.getString("command"),
            "method" to rs.getString("method"),
            "headers" to rs.getString("headers"),
            "body" to rs.getString("body"),
        )
    }
    val startedAt = java.time.LocalDateTime.now().toString()
    val logId = uuid()
    try {
        val urlString = row["command"] as String
        val httpMethod = when ((row["method"] as String).uppercase()) {
            "POST" -> HttpMethod.Post
            "PUT" -> HttpMethod.Put
            "PATCH" -> HttpMethod.Patch
            "DELETE" -> HttpMethod.Delete
            else -> HttpMethod.Get
        }
        val headersStr = row["headers"] as? String ?: ""
        val headers = if (headersStr.isNotBlank()) {
            kotlinx.serialization.json.Json.decodeFromString<List<List<String>>>(headersStr)
        } else emptyList()
        val bodyStr = row["body"] as? String ?: ""
        val response = state.httpClient.request(urlString) {
            method = httpMethod
            for (h in headers) { if (h.size == 2) header(h[0], h[1]) }
            if (bodyStr.isNotBlank() && httpMethod != HttpMethod.Get) {
                setBody(bodyStr)
                contentType(ContentType.Application.Json)
            }
        }
        val finishedAt = java.time.LocalDateTime.now().toString()
        state.db.connection().use { conn ->
            conn.createStatement().executeUpdate("""
                INSERT INTO _cronjob_logs (id, cronjob_id, started_at, finished_at, duration_ms, status, output, error)
                VALUES ('$logId', '$jobId', '$startedAt', '$finishedAt', 0, 'success', '${response.status.value}', '')
            """)
            conn.createStatement().executeUpdate(
                "UPDATE _cronjobs SET last_run_at = datetime('now'), last_run_status = 'success' WHERE id = '$jobId'"
            )
        }
    } catch (e: Exception) {
        val finishedAt = java.time.LocalDateTime.now().toString()
        state.db.connection().use { conn ->
            conn.createStatement().executeUpdate("""
                INSERT INTO _cronjob_logs (id, cronjob_id, started_at, finished_at, duration_ms, status, output, error)
                VALUES ('$logId', '$jobId', '$startedAt', '$finishedAt', 0, 'failure', '', '${e.message?.replace("'", "''") ?: ""}')
            """)
            conn.createStatement().executeUpdate(
                "UPDATE _cronjobs SET last_run_at = datetime('now'), last_run_status = 'failure' WHERE id = '$jobId'"
            )
        }
    }
}

private suspend fun ApplicationCall.respondJson(body: JsonObject, status: HttpStatusCode = HttpStatusCode.OK) {
    respondText(body.toString(), ContentType.Application.Json, status)
}

// ---- Thumbnail handler (passthrough, no resize) ----
private suspend fun getThumbnailHandler(state: AppState, call: ApplicationCall) {
    val bucketName = call.parameters["name"] ?: throw AppError.BadRequest("Bucket name required")
    val id = call.parameters["id"] ?: throw AppError.BadRequest("File ID required")
    state.db.connection().use { conn ->
        val row = conn.createStatement().executeQuery(
            "SELECT * FROM _files WHERE id = '$id' AND bucket = '${bucketName.replace("'", "''")}'"
        )
        if (!row.next()) throw AppError.NotFound("File '$id' not found")
        val file = java.io.File(java.io.File(state.storageDir, bucketName), id)
        if (!file.exists()) throw AppError.NotFound("File data not found")
        call.response.header(HttpHeaders.ContentType, "image/jpeg")
        call.respondFile(file)
    }
}
