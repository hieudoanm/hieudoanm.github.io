package io.github.hieudoanm.cli.services

import com.google.gson.JsonObject
import com.google.gson.JsonParser
import java.io.BufferedReader
import java.io.StringReader
import java.io.StringWriter
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class McpNotificationTest {

    private fun drive(input: String): List<String> {
        val writer = StringWriter()
        McpServer().run(BufferedReader(StringReader(input)), writer)
        return writer.toString().lines().map { it.trim() }.filter { it.isNotEmpty() }
    }

    // A notification carries no id, so it must never be answered. Answering one
    // desynchronises the client, so this applies to every method, not just
    // unknown ones — that was the bug these cases cover.
    @Test
    fun notificationsAreNeverAnsweredForAnyMethod() {
        val frames = listOf(
            """{"jsonrpc":"2.0","method":"initialize","params":{"protocolVersion":"2025-11-25"}}""",
            """{"jsonrpc":"2.0","method":"ping"}""",
            """{"jsonrpc":"2.0","method":"tools/list"}""",
            """{"jsonrpc":"2.0","method":"tools/call","params":{"name":"echo","arguments":{}}}""",
            """{"jsonrpc":"2.0","method":"resources/list"}""",
            """{"jsonrpc":"2.0","id":null,"method":"ping"}""",
        )

        for (frame in frames) {
            assertTrue(drive("$frame\n").isEmpty(), "notification $frame was answered")
        }
    }

    // A notification that is also malformed stays silent: the notification check
    // must precede the jsonrpc version check.
    @Test
    fun aMalformedNotificationIsNotAnswered() {
        assertTrue(drive("{\"method\":\"ping\"}\n").isEmpty())
    }

    // Absent params are tolerated and name no tool, matching the other headless
    // MCP servers. A params of the wrong type is still rejected.
    @Test
    fun toolsCallParamsHandling() {
        val absent = drive("""{"jsonrpc":"2.0","id":1,"method":"tools/call"}""" + "\n")
        assertEquals(1, absent.size)
        assertTrue(absent[0].contains("-32601"), "expected tool not found, got ${absent[0]}")

        val wrongType = drive("""{"jsonrpc":"2.0","id":1,"method":"tools/call","params":"nope"}""" + "\n")
        assertEquals(1, wrongType.size)
        assertTrue(wrongType[0].contains("-32602"), "expected invalid params, got ${wrongType[0]}")
    }

    // The version is echoed when the server speaks it, and the server's latest is
    // offered otherwise.
    @Test
    fun initializeNegotiatesTheProtocolVersion() {
        val echoed = drive("""{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-11-25"}}""" + "\n")
        assertTrue(echoed[0].contains("2025-11-25"))

        val fallback = drive("""{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"1999-01-01"}}""" + "\n")
        assertTrue(fallback[0].contains("2025-11-25"), "expected a fallback, got ${fallback[0]}")
    }

    // A frame larger than the cap is reported as a parse error rather than being
    // buffered, and the stream resynchronises on the next newline.
    @Test
    fun anOverlongFrameIsAParseErrorAndTheStreamRecovers() {
        val oversized = """{"jsonrpc":"2.0","id":1,"method":"ping","params":{"pad":"""" +
            "x".repeat(MAX_FRAME_CHARS) + """"}}"""
        val input = oversized + "\n" + """{"jsonrpc":"2.0","id":2,"method":"ping"}""" + "\n"

        val frames = drive(input)
        assertTrue(frames.size >= 2, "expected a parse error and a reply, got $frames")
        assertTrue(frames[0].contains("-32700"), "expected a parse error, got ${frames[0]}")
        assertTrue(frames.last().contains("\"id\":2"), "the stream did not resynchronise: ${frames.last()}")
    }
}
