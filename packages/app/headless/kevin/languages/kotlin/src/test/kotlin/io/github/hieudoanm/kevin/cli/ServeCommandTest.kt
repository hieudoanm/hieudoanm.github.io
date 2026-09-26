package io.github.hieudoanm.kevin.cli

import com.github.ajalt.clikt.core.CliktError
import com.github.ajalt.clikt.testing.test
import java.nio.file.Files
import java.nio.file.Path
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertNull
import kotlin.test.assertTrue

class ServeCommandTest {
    private val captured = mutableListOf<ServeConfig>()

    private fun parse(vararg args: String): CliktError? {
        captured.clear()
        return try {
            ServeCommand { captured += it }.test("serve", *args)
            null
        } catch (error: CliktError) {
            error
        }
    }

    @Test
    fun `defaults match the reference server`() {
        assertNull(parse())
        assertEquals(ServeConfig(6379, "0.0.0.0", null, false, false), captured.single())
    }

    @Test
    fun `parses port, bind and data`() {
        val data: Path = Files.createTempFile("kevin-cli", ".json")
        assertNull(parse("--port", "7000", "--bind", "127.0.0.1", "--data", data.toString()))
        assertEquals(ServeConfig(7000, "127.0.0.1", data, false, false), captured.single())
    }

    @Test
    fun `parses the short port flag`() {
        assertNull(parse("-p", "1234"))
        assertEquals(1234, captured.single().port)
    }

    @Test
    fun `sets the gui and tui flags`() {
        assertNull(parse("--gui"))
        assertTrue(captured.single().gui)
        parse("--tui")
        assertTrue(captured.single().tui)
    }

    @Test
    fun `gui and tui are mutually exclusive`() {
        val error = assertFailsWith<CliktError> { ServeCommand { }.test("serve", "--gui", "--tui") }
        assertTrue(error.message?.contains("mutually exclusive") == true)
    }

    @Test
    fun `rejects a non-numeric port`() {
        assertFailsWith<CliktError> { ServeCommand { }.test("serve", "--port", "abc") }
    }

    @Test
    fun `data defaults to null when absent`() {
        assertNull(parse())
        assertNull(captured.single().data)
    }

    @Test
    fun `address joins bind and port`() {
        assertEquals("0.0.0.0:6379", ServeConfig().address)
        assertEquals("127.0.0.1:7000", ServeConfig(port = 7000, bind = "127.0.0.1").address)
    }
}
