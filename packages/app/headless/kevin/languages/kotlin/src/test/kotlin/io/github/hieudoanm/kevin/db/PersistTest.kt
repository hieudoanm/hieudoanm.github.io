package io.github.hieudoanm.kevin.db

import java.nio.file.Files
import java.nio.file.Path
import kotlin.io.path.readText
import kotlin.io.path.writeText
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNull
import kotlin.test.assertTrue
import kotlin.time.Duration.Companion.seconds

class PersistTest {
    private val path: Path = Files.createTempFile("kevin", ".json")
    private var clock = 0L
    private val db = Db { clock }

    @Test
    fun `save and load round-trip values`() {
        db.set("a", "1")
        db.set("b", "2")
        db.save(path)

        val restored = Db()
        restored.load(path)
        assertEquals("1", restored.get("a"))
        assertEquals("2", restored.get("b"))
    }

    @Test
    fun `save omits the expires field when nothing expires`() {
        db.set("a", "1")
        db.save(path)
        assertFalse(path.readText().contains("expires"))
    }

    @Test
    fun `save includes the expires field for expiring keys`() {
        db.setWithTtl("a", "1", 60.seconds)
        db.save(path)
        assertTrue(path.readText().contains("expires"))
    }

    @Test
    fun `load purges already expired keys`() {
        db.setWithTtl("gone", "1", 10.seconds)
        db.set("kept", "2")
        db.save(path)

        clock += 20_000
        val restored = Db { clock }
        restored.load(path)
        assertNull(restored.get("gone"))
        assertEquals("2", restored.get("kept"))
    }

    @Test
    fun `load keeps unexpired keys`() {
        db.setWithTtl("live", "1", 60.seconds)
        db.save(path)

        clock += 10_000
        val restored = Db { clock }
        restored.load(path)
        assertEquals("1", restored.get("live"))
    }

    @Test
    fun `load leaves the store untouched when the file is missing`() {
        db.set("a", "1")
        db.load(path.resolveSibling("absent.json"))
        assertEquals("1", db.get("a"))
    }

    @Test
    fun `load replaces the previous contents`() {
        db.set("old", "1")
        db.save(path)

        val restored = Db()
        restored.set("stale", "2")
        restored.load(path)
        assertNull(restored.get("stale"))
        assertEquals("1", restored.get("old"))
    }

    @Test
    fun `save does not leave a temp file behind`() {
        db.set("a", "1")
        db.save(path)
        assertFalse(Files.exists(Path.of("$path.tmp")))
    }

    @Test
    fun `save overwrites an existing file`() {
        path.writeText("not json")
        db.set("a", "1")
        db.save(path)

        val restored = Db()
        restored.load(path)
        assertEquals("1", restored.get("a"))
    }
}
