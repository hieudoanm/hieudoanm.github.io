package io.github.hieudoanm.backbone.mcp

import io.github.hieudoanm.backbone.database.Database
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.add
import kotlinx.serialization.json.buildJsonArray
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import java.sql.Connection
import java.util.UUID

/**
 * Tool handlers backed by the real Backbone database.
 *
 * Every handler runs real SQL against the same SQLite file the Ktor routes use,
 * so a model and the REST API see one set of data. Statements are prepared
 * rather than interpolated, so a collection name or id containing a quote cannot
 * change the statement's meaning.
 */
class Handlers(private val db: Database) {
    /** Caps a single page so a model cannot request a whole table at once. */
    private val maxPerPage = 200

    /** Runs [body] with a connection, mapping any failure to an errored result. */
    private inline fun <T> query(label: String, body: (Connection) -> T): Result<T> =
        runCatching { db.connection().use(body) }
            .recoverCatching { throw IllegalStateException("$label: ${it.message}", it) }

    /**
     * Creates a collection's data table if it is missing, returning an error
     * message when that fails.
     *
     * The table must be created before a connection is checked out, because the
     * pool is small enough that holding one while asking for another would
     * deadlock. The failure is reported rather than swallowed: a caller that
     * carried on would fail later with `no such table` and no clue why.
     */
    private fun ensureDataTable(label: String, collection: String): String? =
        runCatching { db.ensureDataTable(collection) }.exceptionOrNull()
            ?.let { "$label: ${it.message}" }

    /** Tool definitions, sorted by name so tools/list output is stable. */
    val tools: List<Tool> = listOf(
        Tool(
            name = "backbone_collections_create",
            description = "Create a collection with an optional JSON schema",
            inputSchema = Schema(
                properties = mapOf(
                    "name" to PropertySchema("string", "Collection name"),
                    "schema" to PropertySchema("string", "Optional JSON schema for record fields"),
                ),
                required = listOf("name"),
            ),
        ),
        Tool(
            name = "backbone_collections_delete",
            description = "Delete a collection and every record it holds",
            inputSchema = Schema(
                properties = mapOf("name" to PropertySchema("string", "Collection name")),
                required = listOf("name"),
            ),
        ),
        Tool(
            name = "backbone_collections_list",
            description = "List all collections in the backbone database",
            inputSchema = Schema.empty(),
        ),
        Tool(
            name = "backbone_export",
            description = "Export every collection and record as JSON",
            inputSchema = Schema(
                properties = mapOf("format" to PropertySchema("string", "Export format", listOf("json"))),
                required = listOf("format"),
            ),
        ),
        Tool(
            name = "backbone_health",
            description = "Check if the backbone MCP server is operational",
            inputSchema = Schema.empty(),
        ),
        Tool(
            name = "backbone_import",
            description = "Import a previously exported JSON payload",
            inputSchema = Schema(
                properties = mapOf(
                    "format" to PropertySchema("string", "Import format", listOf("json")),
                    "data" to PropertySchema("string", "The export payload as JSON text"),
                ),
                required = listOf("format", "data"),
            ),
        ),
        Tool(
            name = "backbone_records_create",
            description = "Create a record, generating an id when none is given",
            inputSchema = Schema(
                properties = mapOf(
                    "collection" to PropertySchema("string", "Collection name"),
                    "id" to PropertySchema("string", "Optional record id; generated when absent"),
                    "data" to PropertySchema("object", "Record body as a JSON object"),
                ),
                required = listOf("collection", "data"),
            ),
        ),
        Tool(
            name = "backbone_records_delete",
            description = "Delete one record by id",
            inputSchema = Schema(
                properties = mapOf(
                    "collection" to PropertySchema("string", "Collection name"),
                    "id" to PropertySchema("string", "Record id"),
                ),
                required = listOf("collection", "id"),
            ),
        ),
        Tool(
            name = "backbone_records_get",
            description = "Fetch one record by id",
            inputSchema = Schema(
                properties = mapOf(
                    "collection" to PropertySchema("string", "Collection name"),
                    "id" to PropertySchema("string", "Record id"),
                ),
                required = listOf("collection", "id"),
            ),
        ),
        Tool(
            name = "backbone_records_list",
            description = "List records in a collection, with search and paging",
            inputSchema = Schema(
                properties = mapOf(
                    "collection" to PropertySchema("string", "Collection name"),
                    "page" to PropertySchema("integer", "1-based page number; default 1"),
                    "per_page" to PropertySchema("integer", "Records per page, 1-$maxPerPage; default 50"),
                    "search" to PropertySchema("string", "Free-text filter over record data"),
                ),
                required = listOf("collection"),
            ),
        ),
        Tool(
            name = "backbone_records_update",
            description = "Replace the body of an existing record",
            inputSchema = Schema(
                properties = mapOf(
                    "collection" to PropertySchema("string", "Collection name"),
                    "id" to PropertySchema("string", "Record id"),
                    "data" to PropertySchema("object", "The new record body as a JSON object"),
                ),
                required = listOf("collection", "id", "data"),
            ),
        ),
    )

    /** Dispatches a call by tool name. */
    fun call(name: String, arguments: JsonObject): ToolResult = when (name) {
        "backbone_health" -> health()
        "backbone_collections_list" -> collectionsList()
        "backbone_collections_create" -> collectionsCreate(arguments)
        "backbone_collections_delete" -> collectionsDelete(arguments)
        "backbone_records_list" -> recordsList(arguments)
        "backbone_records_get" -> recordsGet(arguments)
        "backbone_records_create" -> recordsCreate(arguments)
        "backbone_records_update" -> recordsUpdate(arguments)
        "backbone_records_delete" -> recordsDelete(arguments)
        "backbone_export" -> export(arguments)
        "backbone_import" -> import(arguments)
        else -> ToolResult.error("tool not found: $name")
    }

    private fun health(): ToolResult =
        query("health") { conn ->
            conn.createStatement().use { it.executeQuery("SELECT 1").use { it.next() } }
        }.fold(
            onSuccess = { ToolResult.text("backbone-mcp is operational and the database is reachable") },
            onFailure = { ToolResult.error("the database is not reachable: ${it.message}") },
        )

    private fun collectionsList(): ToolResult =
        query("list collections") { conn ->
            val rows = buildJsonArray {
                conn.prepareStatement("SELECT name, schema, created_at, updated_at FROM _collections ORDER BY name").use { statement ->
                    statement.executeQuery().use { rs ->
                        while (rs.next()) {
                            add(
                                buildJsonObject {
                                    put("name", rs.getString("name"))
                                    put("schema", rs.getString("schema"))
                                    put("created_at", rs.getString("created_at"))
                                    put("updated_at", rs.getString("updated_at"))
                                },
                            )
                        }
                    }
                }
            }
            ToolResult.text(buildJsonObject { put("collections", rows) }.prettyText())
        }.getOrElse { ToolResult.error(it.message ?: "list collections failed") }

    private fun collectionsCreate(arguments: JsonObject): ToolResult {
        val name = arguments.requiredString("name")?.trim()
        if (name.isNullOrEmpty()) return ToolResult.error("collection name must not be empty")
        val schema = arguments.stringOrNull("schema") ?: "{}"
        ensureDataTable("create collection", name)?.let { return ToolResult.error(it) }
        return query("create collection") { conn ->
            val exists = conn.prepareStatement("SELECT 1 FROM _collections WHERE name = ?").use { statement ->
                statement.setString(1, name)
                statement.executeQuery().use { it.next() }
            }
            if (exists) throw IllegalStateException("collection '$name' already exists")

            conn.prepareStatement(
                "INSERT INTO _collections (name, schema, created_at, updated_at) VALUES (?, ?, datetime('now'), datetime('now'))",
            ).use { statement ->
                statement.setString(1, name)
                statement.setString(2, schema)
                statement.executeUpdate()
            }
            buildJsonObject {
                put("name", name)
                put("schema", schema)
                put("created", true)
            }
        }.fold(
            onSuccess = { ToolResult.text(it.prettyText()) },
            onFailure = { ToolResult.error(it.message ?: "create collection failed") },
        )
    }

    private fun collectionsDelete(arguments: JsonObject): ToolResult {
        val name = arguments.requiredString("name")
            ?: return ToolResult.error("collection name is required")

        return query("delete collection") { conn ->
            val deleted = conn.prepareStatement("DELETE FROM _collections WHERE name = ?").use { statement ->
                statement.setString(1, name)
                statement.executeUpdate()
            }
            if (deleted == 0) throw NoSuchElementException("collection '$name' not found")
            val table = db.collectionTableName(name)
            conn.createStatement().use { it.executeUpdate("DROP TABLE IF EXISTS \"$table\"") }
            buildJsonObject {
                put("name", name)
                put("deleted", true)
            }
        }.fold(
            onSuccess = { ToolResult.text(it.prettyText()) },
            onFailure = { ToolResult.error(it.message ?: "delete collection failed") },
        )
    }

    private fun recordsList(arguments: JsonObject): ToolResult {
        val collection = arguments.requiredString("collection")
            ?: return ToolResult.error("collection is required")
        val page = arguments.intOrDefault("page", 1)
        val perPage = arguments.intOrDefault("per_page", 50)
        if (page < 1) return ToolResult.error("page must be 1 or greater")
        if (perPage !in 1..maxPerPage) return ToolResult.error("per_page must be between 1 and $maxPerPage")
        val search = arguments.stringOrNull("search").orEmpty()
        val table = db.collectionTableName(collection)
        val offset = (page - 1) * perPage
        ensureDataTable("list records", collection)?.let { return ToolResult.error(it) }
        return query("list records") { conn ->
            val where = if (search.isNotBlank()) "WHERE data LIKE ?" else ""
            fun bind(statement: java.sql.PreparedStatement) {
                if (search.isNotBlank()) statement.setString(1, "%$search%")
            }

            val total = conn.prepareStatement("SELECT COUNT(*) FROM \"$table\" $where").use { statement ->
                bind(statement)
                statement.executeQuery().use { rs -> rs.next(); rs.getInt(1) }
            }
            val records = buildJsonArray {
                conn.prepareStatement("SELECT id, data, created_at, updated_at FROM \"$table\" $where ORDER BY created_at DESC LIMIT ? OFFSET ?").use { statement ->
                    bind(statement)
                    statement.setInt(if (search.isNotBlank()) 2 else 1, perPage)
                    statement.setInt(if (search.isNotBlank()) 3 else 2, offset)
                    statement.executeQuery().use { rs ->
                        while (rs.next()) add(recordObject(rs.getString("id"), rs.getString("data"), rs.getString("created_at"), rs.getString("updated_at")))
                    }
                }
            }
            val totalPages = if (total == 0) 0 else (total + perPage - 1) / perPage
            buildJsonObject {
                put("records", records)
                put("total", total)
                put("page", page)
                put("per_page", perPage)
                put("total_pages", totalPages)
            }
        }.fold(
            onSuccess = { ToolResult.text(it.prettyText()) },
            onFailure = { ToolResult.error(it.message ?: "list records failed") },
        )
    }

    private fun recordsGet(arguments: JsonObject): ToolResult {
        val collection = arguments.requiredString("collection")
            ?: return ToolResult.error("collection is required")
        val id = arguments.requiredString("id") ?: return ToolResult.error("id is required")
        val table = db.collectionTableName(collection)

        return query("get record") { conn ->
            conn.prepareStatement("SELECT id, data, created_at, updated_at FROM \"$table\" WHERE id = ?").use { statement ->
                statement.setString(1, id)
                statement.executeQuery().use { rs ->
                    if (!rs.next()) throw NoSuchElementException("record '$id' not found")
                    recordObject(rs.getString("id"), rs.getString("data"), rs.getString("created_at"), rs.getString("updated_at"))
                }
            }
        }.fold(
            onSuccess = { ToolResult.text(it.prettyText()) },
            onFailure = { ToolResult.error(it.message ?: "get record failed") },
        )
    }

    private fun recordsCreate(arguments: JsonObject): ToolResult {
        val collection = arguments.requiredString("collection")
            ?: return ToolResult.error("collection is required")
        val data = arguments.requiredObject("data")
            ?: return ToolResult.error("data is required and must be a JSON object")
        val id = arguments.stringOrNull("id") ?: UUID.randomUUID().toString()
        val table = db.collectionTableName(collection)
        ensureDataTable("create record", collection)?.let { return ToolResult.error(it) }
        return query("create record") { conn ->
            val inserted = conn.prepareStatement(
                "INSERT OR REPLACE INTO \"$table\" (id, data, created_at, updated_at) VALUES (?, ?, datetime('now'), datetime('now'))",
            ).use { statement ->
                statement.setString(1, id)
                statement.setString(2, data.toString())
                statement.executeUpdate()
            }
            if (inserted == 0) throw IllegalStateException("record '$id' was not inserted")
            readRecord(conn, table, id)
        }.fold(
            onSuccess = { ToolResult.text(it.prettyText()) },
            onFailure = { ToolResult.error(it.message ?: "create record failed") },
        )
    }

    private fun recordsUpdate(arguments: JsonObject): ToolResult {
        val collection = arguments.requiredString("collection")
            ?: return ToolResult.error("collection is required")
        val id = arguments.requiredString("id") ?: return ToolResult.error("id is required")
        val data = arguments.requiredObject("data")
            ?: return ToolResult.error("data is required and must be a JSON object")
        val table = db.collectionTableName(collection)

        return query("update record") { conn ->
            val updated = conn.prepareStatement(
                "UPDATE \"$table\" SET data = ?, updated_at = datetime('now') WHERE id = ?",
            ).use { statement ->
                statement.setString(1, data.toString())
                statement.setString(2, id)
                statement.executeUpdate()
            }
            if (updated == 0) throw NoSuchElementException("record '$id' not found")
            readRecord(conn, table, id)
        }.fold(
            onSuccess = { ToolResult.text(it.prettyText()) },
            onFailure = { ToolResult.error(it.message ?: "update record failed") },
        )
    }

    private fun recordsDelete(arguments: JsonObject): ToolResult {
        val collection = arguments.requiredString("collection")
            ?: return ToolResult.error("collection is required")
        val id = arguments.requiredString("id") ?: return ToolResult.error("id is required")
        val table = db.collectionTableName(collection)

        return query("delete record") { conn ->
            val deleted = conn.prepareStatement("DELETE FROM \"$table\" WHERE id = ?").use { statement ->
                statement.setString(1, id)
                statement.executeUpdate()
            }
            if (deleted == 0) throw NoSuchElementException("record '$id' not found")
            buildJsonObject {
                put("id", id)
                put("deleted", true)
            }
        }.fold(
            onSuccess = { ToolResult.text(it.prettyText()) },
            onFailure = { ToolResult.error(it.message ?: "delete record failed") },
        )
    }

    /** Exports every collection and record, using the shape `GET /api/export` returns. */
    private fun export(arguments: JsonObject): ToolResult {
        val format = arguments.requiredString("format") ?: return ToolResult.error("format is required")
        if (format != "json") {
            return ToolResult.error("backbone_export supports only the json format in this build, not '$format'")
        }

        return query("export") { conn ->
            val records = mutableMapOf<String, JsonElement>()
            val collections = buildJsonArray {
                conn.prepareStatement("SELECT name, schema, created_at, updated_at FROM _collections ORDER BY name").use { statement ->
                    statement.executeQuery().use { rs ->
                        while (rs.next()) {
                            val name = rs.getString("name")
                            add(
                                buildJsonObject {
                                    put("name", name)
                                    put("schema", rs.getString("schema"))
                                    put("created_at", rs.getString("created_at"))
                                    put("updated_at", rs.getString("updated_at"))
                                },
                            )
                            val table = db.collectionTableName(name)
                            val rows = buildJsonArray {
                                conn.prepareStatement("SELECT id, data, created_at, updated_at FROM \"$table\"").use { inner ->
                                    inner.executeQuery().use { irs ->
                                        while (irs.next()) {
                                            add(recordObject(irs.getString("id"), irs.getString("data"), irs.getString("created_at"), irs.getString("updated_at")))
                                        }
                                    }
                                }
                            }
                            records[name] = rows
                        }
                    }
                }
            }
            buildJsonObject {
                put("collections", collections)
                put("records", buildJsonObject { records.forEach { (name, rows) -> put(name, rows) } })
            }
        }.fold(
            onSuccess = { ToolResult.text(it.prettyText()) },
            onFailure = { ToolResult.error(it.message ?: "export failed") },
        )
    }

    /** Applies an export payload, the inverse of [export]. Existing ids are overwritten. */
    private fun import(arguments: JsonObject): ToolResult {
        val format = arguments.requiredString("format") ?: return ToolResult.error("format is required")
        if (format != "json") {
            return ToolResult.error("backbone_import supports only the json format in this build, not '$format'")
        }
        val payload = arguments.stringOrNull("data") ?: return ToolResult.error("data is required")
        val parsed = runCatching { compact.parseToJsonElement(payload) }.getOrElse {
            return ToolResult.error("parse data: ${it.message}")
        }
        val root = parsed as? JsonObject ?: return ToolResult.error("parse data: payload must be an object")
        val collections = (root["collections"] as? JsonArray) ?: JsonArray(emptyList())
        val records = (root["records"] as? JsonObject) ?: JsonObject(emptyMap())

        // The pool allows one connection, so every table is created up front
        // rather than while the import statement holds one.
        for (element in collections) {
            val name = (element as? JsonObject)?.stringOrNull("name")
            if (name == null) continue
            ensureDataTable("import", name)?.let { return ToolResult.error(it) }
        }

        return query("import") { conn ->
            var createdCollections = 0
            var createdRecords = 0
            for (element in collections) {
                val collection = element as? JsonObject ?: continue
                val name = collection.stringOrNull("name") ?: continue
                val schema = collection.stringOrNull("schema") ?: "{}"
                val exists = conn.prepareStatement("SELECT 1 FROM _collections WHERE name = ?").use { statement ->
                    statement.setString(1, name)
                    statement.executeQuery().use { it.next() }
                }
                if (!exists) {
                    conn.prepareStatement(
                        "INSERT INTO _collections (name, schema, created_at, updated_at) VALUES (?, ?, datetime('now'), datetime('now'))",
                    ).use { statement ->
                        statement.setString(1, name)
                        statement.setString(2, schema)
                        statement.executeUpdate()
                    }
                    createdCollections++
                }
                val table = db.collectionTableName(name)
                val rows = records[name] as? JsonArray ?: continue
                for (row in rows) {
                    val record = row as? JsonObject ?: continue
                    val id = record.stringOrNull("id") ?: continue
                    val data = record["data"] ?: JsonPrimitive("{}")
                    conn.prepareStatement(
                        "INSERT OR REPLACE INTO \"$table\" (id, data, created_at, updated_at) VALUES (?, ?, datetime('now'), datetime('now'))",
                    ).use { statement ->
                        statement.setString(1, id)
                        statement.setString(2, data.toString())
                        statement.executeUpdate()
                    }
                    createdRecords++
                }
            }
            buildJsonObject {
                put("created_collections", createdCollections)
                put("created_records", createdRecords)
            }
        }.fold(
            onSuccess = { ToolResult.text(it.prettyText()) },
            onFailure = { ToolResult.error(it.message ?: "import failed") },
        )
    }

    /** Reads one record back after a write, so the caller sees stored values. */
    private fun readRecord(conn: Connection, table: String, id: String): JsonObject =
        conn.prepareStatement("SELECT id, data, created_at, updated_at FROM \"$table\" WHERE id = ?").use { statement ->
            statement.setString(1, id)
            statement.executeQuery().use { rs ->
                if (!rs.next()) throw NoSuchElementException("record '$id' not found after write")
                recordObject(rs.getString("id"), rs.getString("data"), rs.getString("created_at"), rs.getString("updated_at"))
            }
        }

    /**
     * Builds a record object. `data` is stored as text, so it is parsed back into
     * JSON when possible; a value that is not JSON is returned as a string rather
     * than failing the whole result.
     */
    private fun recordObject(id: String, data: String?, createdAt: String, updatedAt: String): JsonObject =
        buildJsonObject {
            put("id", id)
            put("data", parseOrString(data))
            put("created_at", createdAt)
            put("updated_at", updatedAt)
        }

    private fun parseOrString(data: String?): kotlinx.serialization.json.JsonElement =
        if (data.isNullOrBlank()) JsonPrimitive("{}")
        else runCatching { compact.parseToJsonElement(data) }.getOrElse { JsonPrimitive(data) }
}
