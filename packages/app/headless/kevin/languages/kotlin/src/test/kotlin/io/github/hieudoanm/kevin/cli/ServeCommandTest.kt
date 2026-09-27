package io.github.hieudoanm.kevin.cli

import com.github.ajalt.clikt.testing.CliktCommandTestResult
import com.github.ajalt.clikt.testing.test
import java.nio.file.Files
import java.nio.file.Path
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull
import kotlin.test.assertTrue

class ServeCommandTest {
    private val captured = mutableListOf<ServeConfig>()

    /** Clikt 5 reports failures through the result, so assert the status code. */
    private fun parse(vararg args: String): CliktCommandTestResult {
        captured.clear()
        return ServeCommand { captured += it }.test(arrayOf(*args))
    }

    @Test
    fun `defaults match the reference server`() {
        assertEquals(0, parse().statusCode)
        assertEquals(ServeConfig(6379, "0.0.0.0", null, false, false), captured.single())
    }

    @Test
    fun `parses port, bind and data`() {
        val data: Path = Files.createTempFile("kevin-cli", ".json")
        assertEquals(0, parse("--port", "7000", "--bind", "127.0.0.1", "--data", data.toString()).statusCode)
        assertEquals(ServeConfig(7000, "127.0.0.1", data, false, false), captured.single())
    }

    @Test
    fun `parses the short port flag`() {
        assertEquals(0, parse("-p", "1234").statusCode)
        assertEquals(1234, captured.single().port)
    }

    @Test
    fun `sets the gui and tui flags`() {
        assertEquals(0, parse("--gui").statusCode)
        assertTrue(captured.single().gui)
        parse("--tui")
        assertTrue(captured.single().tui)
    }

    @Test
    fun `gui and tui are mutually exclusive`() {
        val result = ServeCommand { }.test(arrayOf("--gui", "--tui"))
        assertEquals(1, result.statusCode)
        assertTrue(result.stderr.contains("mutually exclusive"), "got ${result.stderr}")
    }

    @Test
    fun `rejects a non-numeric port`() {
        assertEquals(1, ServeCommand { }.test(arrayOf("--port", "abc")).statusCode)
    }

    @Test
    fun `data defaults to null when absent`() {
        assertEquals(0, parse().statusCode)
        assertNull(captured.single().data)
    }

    @Test
    fun `address joins bind and port`() {
        assertEquals("0.0.0.0:6379", ServeConfig().address)
        assertEquals("127.0.0.1:7000", ServeConfig(port = 7000, bind = "127.0.0.1").address)
    }
}
