package io.github.hieudoanm.kevin.cli

import io.github.hieudoanm.kevin.db.Db
import io.github.hieudoanm.kevin.db.load
import io.github.hieudoanm.kevin.db.save
import java.net.Socket
import java.nio.file.Files
import java.nio.file.Path
import java.util.logging.Level
import java.util.logging.Logger
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class ServeRunnerTest {
    private val logger = Logger.getLogger("kevin-test").apply { level = Level.OFF }
    private val kv = Db()

    private fun config(data: Path? = null) = ServeConfig(port = 0, bind = "127.0.0.1", data = data)

    private fun ServeSession.send(vararg commands: String): List<String> {
        Socket("127.0.0.1", port).use { socket ->
            socket.getOutputStream().bufferedWriter().use {
                it.write(commands.joinToString("\r\n", postfix = "\r\n"))
            }
            return socket.getInputStream().bufferedReader().use { reader ->
                commands.indices.map { reader.readLine().orEmpty() }
            }
        }
    }

    @Test
    fun `the tui runs alongside a reachable server`() {
        var replies = emptyList<String>()
        ServeRunner(config(), kv, logger, tuiLauncher = { session ->
            replies = session.send("SET from-tui 1", "GET from-tui")
        }).run()
        assertEquals(listOf("OK", "1"), replies)
        assertEquals("1", kv.get("from-tui"))
    }

    @Test
    fun `the gui runs instead of the tui`() {
        var guiRan = false
        var tuiRan = false
        ServeRunner(
            config = config().copy(gui = true),
            kv = kv,
            logger = logger,
            guiLauncher = { guiRan = true },
            tuiLauncher = { tuiRan = true },
        ).run()
        assertTrue(guiRan)
        assertTrue(!tuiRan)
    }

    @Test
    fun `the tui sees keys added by a client`() {
        ServeRunner(config(), kv, logger, tuiLauncher = { session ->
            session.send("SET live 1")
            assertTrue(session.kv.exists("live"))
        }).run()
    }

    @Test
    fun `the data file is loaded before the manager starts and saved on exit`() {
        val data = Files.createTempFile("kevin-runner", ".json")
        kv.set("persisted", "yes")
        kv.save(data)

        var seenAtLaunch: String? = null
        val reloaded = Db()
        ServeRunner(config(data), reloaded, logger, tuiLauncher = { seenAtLaunch = it.kv.get("persisted") }).run()

        assertEquals("yes", seenAtLaunch)
        val after = Db()
        after.load(data)
        assertEquals("yes", after.get("persisted"))
    }

    @Test
    fun `a missing data file is not fatal`() {
        val missing = Files.createTempDirectory("kevin").resolve("absent.json")
        var ran = false
        ServeRunner(config(missing), kv, logger, tuiLauncher = { ran = true }).run()
        assertTrue(ran)
    }

    @Test
    fun `the session reports the bound port`() {
        var port = -1
        ServeRunner(config(), kv, logger, tuiLauncher = { port = it.port }).run()
        assertTrue(port > 0)
    }
}
