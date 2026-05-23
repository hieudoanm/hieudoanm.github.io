package io.github.hieudoanm.backbone.database

import io.github.hieudoanm.backbone.core.AppConfig
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.TestInstance
import java.io.File
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class DatabaseTest {
    private lateinit var db: Database
    private lateinit var tempDir: File

    @BeforeAll
    fun setup() {
        tempDir = createTempDir("db-test-")
        val config = AppConfig(
            port = 0, jwtSecret = "test-secret-32-characters-long!!!!",
            backboneData = tempDir.absolutePath, secretsKeyHex = null,
        )
        db = Database(config)
    }

    @AfterAll
    fun teardown() {
        db.close()
        tempDir.deleteRecursively()
    }

    @Test
    fun `tables are created on init`() {
        val tables = listOf(
            "_users", "_collections", "_buckets", "_files",
            "_webhooks", "_webhook_logs", "_secrets", "_cronjobs",
            "_cronjob_logs", "_ws_connections", "_ws_messages", "_cache",
            "_notifications", "_logs", "_pubsub_topics", "_pubsub_messages",
            "_permissions",
        )
        db.connection().use { conn ->
            val meta = conn.metaData
            for (table in tables) {
                val rs = meta.getTables(null, null, table, null)
                assertTrue(rs.next(), "Table $table should exist")
            }
        }
    }

    @Test
    fun `insert and query users`() {
        db.connection().use { conn ->
            conn.createStatement().executeUpdate("""
                INSERT INTO _users (id, email, password, created_at, updated_at)
                VALUES ('u1', 'test@example.com', 'hash123', datetime('now'), datetime('now'))
            """)
            val rows = conn.createStatement().executeQuery(
                "SELECT * FROM _users WHERE id = 'u1'"
            ).toList()
            assertEquals(1, rows.size)
            assertEquals("test@example.com", rows[0]["email"])
        }
    }

    @Test
    fun `ensureDataTable creates collection table`() {
        db.ensureDataTable("testcol")
        val tableName = db.collectionTableName("testcol")
        assertEquals("_data_testcol", tableName)

        db.connection().use { conn ->
            conn.createStatement().executeUpdate("""
                INSERT INTO $tableName (id, data, created_at, updated_at)
                VALUES ('r1', '{"title":"hello"}', datetime('now'), datetime('now'))
            """)
            val rows = conn.createStatement().executeQuery("SELECT * FROM $tableName").toList()
            assertEquals(1, rows.size)
            assertEquals("r1", rows[0]["id"])
        }
    }

    @Test
    fun `toList returns empty list for empty table`() {
        db.connection().use { conn ->
            val rows = conn.createStatement().executeQuery(
                "SELECT * FROM _users WHERE id = 'nonexist'"
            ).toList()
            assertEquals(0, rows.size)
        }
    }
}
