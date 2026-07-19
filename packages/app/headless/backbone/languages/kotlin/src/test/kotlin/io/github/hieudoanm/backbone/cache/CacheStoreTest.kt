package io.github.hieudoanm.backbone.cache

import io.github.hieudoanm.backbone.core.AppConfig
import io.github.hieudoanm.backbone.database.Database
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.TestInstance
import java.io.File
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertNull

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class CacheStoreTest {
    private lateinit var cache: CacheStore
    private lateinit var db: Database
    private lateinit var tempDir: File

    @BeforeAll
    fun setup() {
        tempDir = createTempDir("cache-test-")
        val config = AppConfig(
            port = 0, jwtSecret = "test-secret-32-characters-long!!!!",
            backboneData = tempDir.absolutePath, secretsKeyHex = null,
        )
        db = Database(config)
        cache = CacheStore(config, db)
    }

    @AfterAll
    fun teardown() {
        db.close()
        tempDir.deleteRecursively()
    }

    @BeforeAll
    fun cleanup() {
        cache.flush()
    }

    @AfterEach
    fun clearAfterEach() {
        cache.flush()
    }

    @Test
    fun `set and get round trip`() {
        cache.set("key1", "value1")
        val entry = cache.get("key1")
        assertNotNull(entry)
        assertEquals("key1", entry["key"])
        assertEquals("value1", entry["value"])
    }

    @Test
    fun `get returns null for missing key`() {
        assertNull(cache.get("nonexistent"))
    }

    @Test
    fun `delete removes entry`() {
        cache.set("todelete", "value")
        assertEquals(true, cache.delete("todelete"))
        assertNull(cache.get("todelete"))
    }

    @Test
    fun `delete returns false for missing key`() {
        assertEquals(false, cache.delete("nonexistent"))
    }

    @Test
    fun `flush clears all entries`() {
        cache.set("a", "1")
        cache.set("b", "2")
        assertEquals(2, cache.stats()["total_entries"])

        cache.flush()
        assertEquals(0, cache.stats()["total_entries"])
    }

    @Test
    fun `stats returns correct counts`() {
        cache.flush()
        cache.set("x", "10")
        val stats = cache.stats()
        assertEquals(1, stats["total_entries"])
    }
}
