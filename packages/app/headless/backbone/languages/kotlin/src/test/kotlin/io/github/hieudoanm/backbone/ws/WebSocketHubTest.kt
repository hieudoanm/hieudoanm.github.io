package io.github.hieudoanm.backbone.ws

import io.github.hieudoanm.backbone.core.AppConfig
import io.github.hieudoanm.backbone.database.Database
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.TestInstance
import java.io.File
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class WebSocketHubTest {
    private lateinit var hub: WebSocketHub
    private lateinit var db: Database
    private lateinit var tempDir: File

    @BeforeAll
    fun setup() {
        tempDir = createTempDir("ws-test-")
        val config = AppConfig(
            port = 0, jwtSecret = "test-secret-32-characters-long!!!!",
            backboneData = tempDir.absolutePath, secretsKeyHex = null,
        )
        db = Database(config)
        hub = WebSocketHub(db)
    }

    @AfterAll
    fun teardown() {
        db.close()
        tempDir.deleteRecursively()
    }

    @Test
    fun `getAll returns empty list initially`() {
        val all = hub.getAll()
        assertEquals(0, all.size)
    }

    @Test
    fun `getById returns null for unknown`() {
        assertNull(hub.getById("nonexistent"))
    }
}
