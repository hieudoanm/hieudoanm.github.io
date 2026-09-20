package io.github.hieudoanm.landify.mcp

import io.github.hieudoanm.landify.validate.knownTypes
import java.io.BufferedReader
import java.io.StringReader
import java.io.StringWriter
import java.nio.file.Files
import java.nio.file.Path
import kotlin.io.path.createTempDirectory
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class McpServerTest {

    /** Feeds frames to a server over a temp-dir workspace and returns the replies. */
    private fun drive(input: String, root: Path = createTempDirectory()): List<String> {
        val writer = StringWriter()
        val server = Server()
        register(server, Workspace.of(root.toString()))
        server.run(BufferedReader(StringReader(input)), writer)
        return writer.toString().lines().map { it.trim() }.filter { it.isNotEmpty() }
    }

    /** The compact JSON-RPC error envelope the server emits for [code]. */
    private fun codeIs(code: Int): String = "\"code\":$code"

    /** The first text block of a tools/call reply. */
    private fun callResult(frame: String): String {
        val payload = McpJson.parseToJsonElement(frame)
            .let { it as kotlinx.serialization.json.JsonObject }
        val result = payload["result"] as kotlinx.serialization.json.JsonObject
        val content = result["content"] as kotlinx.serialization.json.JsonArray
        val first = content.first() as kotlinx.serialization.json.JsonObject
        return (first["text"] as kotlinx.serialization.json.JsonPrimitive).content
    }

    // A notification carries no id, so it must never be answered. Answering one
    // desynchronises the client, so this applies to every method, not just
    // unknown ones.
    @Test
    fun notificationsAreNeverAnsweredForAnyMethod() {
        val frames = listOf(
            """{"jsonrpc":"2.0","method":"initialize","params":{"protocolVersion":"2025-11-25"}}""",
            """{"jsonrpc":"2.0","method":"ping"}""",
            """{"jsonrpc":"2.0","method":"tools/list"}""",
            """{"jsonrpc":"2.0","method":"tools/call","params":{"name":"landify_types","arguments":{}}}""",
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

    // The version is echoed when the server speaks it, and the server's latest is
    // offered otherwise.
    @Test
    fun initializeNegotiatesTheProtocolVersion() {
        val echoed = drive(
            """{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"$PROTOCOL_VERSION"}}""" + "\n",
        )
        assertContains(echoed[0], PROTOCOL_VERSION)

        val fallback = drive(
            """{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"1999-01-01"}}""" + "\n",
        )
        assertContains(fallback[0], PROTOCOL_VERSION)
    }

    // Absent params are tolerated and name no tool, matching the other headless
    // MCP servers. A params of the wrong type is still rejected.
    @Test
    fun toolsCallParamsHandling() {
        val absent = drive("""{"jsonrpc":"2.0","id":1,"method":"tools/call"}""" + "\n")
        assertEquals(1, absent.size)
        assertContains(absent[0], codeIs(ErrorCode.METHOD_NOT_FOUND))

        val wrongType = drive("""{"jsonrpc":"2.0","id":1,"method":"tools/call","params":"nope"}""" + "\n")
        assertEquals(1, wrongType.size)
        assertContains(wrongType[0], codeIs(ErrorCode.INVALID_PARAMS))
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
        assertContains(frames[0], codeIs(ErrorCode.PARSE))
        assertContains(frames.last(), "\"id\":2")
    }

    // Every advertised tool is listed, so a model never hits a dead entry.
    @Test
    fun everyAdvertisedToolIsListed() {
        val list = drive("""{"jsonrpc":"2.0","id":1,"method":"tools/list"}""" + "\n")
        for (name in listOf(
            "landify_scaffold", "landify_validate", "landify_build",
            "landify_types", "landify_themes", "landify_theme_tokens",
        )) {
            assertContains(list[0], name)
        }
    }

    // types lists every supported page type with a real description, because a
    // model picking a layout has no other way to know which one fits.
    @Test
    fun typesDescribesEveryKnownType() {
        val frame = drive(
            """{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"landify_types","arguments":{}}}""" + "\n",
        )
        val text = callResult(frame[0])
        for (type in knownTypes()) {
            assertContains(text, type)
        }
        assertContains(text, "\"count\": 12")
    }

    // An unknown theme names the themes tool instead of inlining all 64 names.
    @Test
    fun anUnknownThemePointsAtTheThemesTool() {
        val frame = drive(
            """{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"landify_theme_tokens","arguments":{"theme":"nope"}}}""" + "\n",
        )
        assertContains(frame[0], "landify_themes")
    }

    // A config that fails validation is a normal result the model can read and
    // fix, not a transport failure.
    @Test
    fun anInvalidConfigIsReportedAsAResultNotAnError() {
        val frame = drive(
            """{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"landify_validate","arguments":{"yaml":"type: nope\n"}}}""" + "\n",
        )
        assertFalse(frame[0].contains("\"error\""))
        assertContains(callResult(frame[0]), "\"valid\": false")
    }

    // A path that leaves the sandbox is refused rather than served.
    @Test
    fun aPathOutsideTheRootIsRefused() {
        val frame = drive(
            """{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"landify_scaffold","arguments":{"type":"product","path":"../escape.yaml"}}}""" + "\n",
        )
        assertContains(frame[0], "\"isError\":true")
        assertContains(callResult(frame[0]), "escapes the server root")
    }

    // Scaffolding writes inside the root and refuses to clobber without
    // overwrite, so a model cannot silently destroy a config being edited.
    @Test
    fun scaffoldWritesOnceAndRefusesToClobber() {
        val root = createTempDirectory()
        val request = """{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"landify_scaffold","arguments":{"type":"product","path":"out/site.yaml"}}}"""

        drive(request + "\n", root)
        assertTrue(Files.exists(root.resolve("out/site.yaml")))

        val second = drive(request + "\n", root)
        assertContains(callResult(second[0]), "already exists")
    }

    // A minimal config that passes validation, used wherever the test is about
    // the tool rather than the schema. It uses the faq layout because that is
    // the one type needing no media assets.
    @Test
    fun buildRendersTheMarkupAndWritesTheOutput() {
        val root = createTempDirectory()
        val frame = drive(
            """{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"landify_build","arguments":{"yaml":${quote(VALID_YAML)},"output":"out/index.html"}}}""" + "\n",
            root,
        )
        assertFalse(frame[0].contains("\"isError\":true"), "build failed: $frame")

        val text = callResult(frame[0])
        assertContains(text, "<!doctype html>")
        assertContains(text, "\"written\": \"out/index.html\"")
        assertTrue(Files.exists(root.resolve("out/index.html")))
    }

    // The reported byte count matches the markup, so a caller can tell a
    // truncated page from a complete one.
    @Test
    fun buildReportsTheByteLengthOfTheMarkup() {
        val frame = drive(
            """{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"landify_build","arguments":{"yaml":${quote(VALID_YAML)}}}}""" + "\n",
        )
        val payload = McpJson.parseToJsonElement(callResult(frame[0]))
            .let { it as kotlinx.serialization.json.JsonObject }
        val html = (payload["html"] as kotlinx.serialization.json.JsonPrimitive).content
        assertEquals(html.toByteArray().size, (payload["bytes"] as kotlinx.serialization.json.JsonPrimitive).content.toInt())
    }

    /** Wraps a config in a JSON string so it can be embedded in a frame. */
    private fun quote(value: String): String =
        kotlinx.serialization.json.JsonPrimitive(value).toString()

    private companion object {
        const val VALID_YAML = """type: faq
site:
  name: Test Help
  description: Answers to common questions about the test page.
  nav:
    - label: Questions
      href: "#faq"
hero:
  headline: Questions, answered.
  subheadline: Straight answers to what people ask most often.
faq:
  items:
    - question: Does this need a build step?
      answer: No. Landify emits one flat HTML file with inline CSS.
cta:
  heading: Still curious?
  body: Ask a human and we answer within a day.
  button:
    label: Contact support
    href: mailto:support@example.com
footer:
  copyright: "(c) 2026 Test"
"""
    }
}
