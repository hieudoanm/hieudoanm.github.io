package io.github.hieudoanm.kevin.cli

import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.testing.CliktCommandTestResult
import com.github.ajalt.clikt.testing.test
import io.github.hieudoanm.kevin.mcp.json
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import java.io.StringWriter
import java.nio.file.Files
import java.nio.file.Path
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

/** How `kevin mcp serve` parses its flags before it opens a session. */
class McpServeCommandTest {
    private val captured = mutableListOf<McpConfig>()

    private fun parse(vararg args: String): CliktCommandTestResult {
        captured.clear()
        return McpServeCommand { captured += it }.test(arrayOf(*args))
    }

    @Test
    fun `the defaults are an ephemeral in-process store`() {
        assertEquals(0, parse().statusCode)
        assertEquals(McpConfig(null, null), captured.single())
    }

    @Test
    fun `parses an address`() {
        assertEquals(0, parse("--addr", "localhost:6379").statusCode)
        assertEquals(McpConfig("localhost:6379", null), captured.single())
    }

    @Test
    fun `parses a data file`() {
        val data: Path = Files.createTempFile("kevin-mcp-cli", ".json")
        assertEquals(0, parse("--data", data.toString()).statusCode)
        assertEquals(McpConfig(null, data), captured.single())
    }

    @Test
    fun `rejects an address together with a data file`() {
        val data: Path = Files.createTempFile("kevin-mcp-cli", ".json")
        val result = parse("--addr", "localhost:6379", "--data", data.toString())
        assertEquals(1, result.statusCode)
        assertTrue(result.stderr.contains("mutually exclusive"), "got ${result.stderr}")
    }

    @Test
    fun `the mcp group has a serve subcommand`() {
        val help = McpCommand().subcommands(McpServeCommand()).test(arrayOf("--help")).output
        assertTrue(help.contains("serve"), "got $help")
    }
}

/** End-to-end stdio serving, with the streams supplied by the test. */
class StdioTransportTest {

    @Test
    fun `a session answers requests over a supplied stdio pair`() {
        val input = """
            {"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}
            {"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"kevin_set","arguments":{"key":"k","value":"v"}}}
            {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"kevin_get","arguments":{"key":"k"}}}
        """.trimIndent().reader().buffered()
        val output = StringWriter()

        serveStdio(McpConfig(), input, output)

        val lines = output.toString().lines().filter(String::isNotEmpty)
        assertEquals(3, lines.size, "got $lines")
        // The tool result is a JSON string, so its quotes arrive escaped in the frame.
        val body = json.parseToJsonElement(lines[2]).jsonObject["result"]!!.jsonObject
        val text = body["content"]!!.jsonArray.first().jsonObject["text"]!!.jsonPrimitive.content
        assertEquals("{\"found\":true,\"value\":\"v\"}", text)
    }
}
