package io.github.hieudoanm.cli.services

import com.google.gson.Gson
import com.google.gson.JsonObject
import com.google.gson.JsonParser
import java.io.BufferedReader
import java.io.StringReader
import java.io.StringWriter
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNotNull
import kotlin.test.assertNull
import kotlin.test.assertTrue

class McpTest {

    @Test
    fun testProtocolVersion() {
        assertEquals("2025-11-25", PROTOCOL_VERSION)
    }

    @Test
    fun testRequestDataClass() {
        val params = JsonParser.parseString("""{"key":"value"}""")
        val req = Request(
            jsonrpc = "2.0",
            id = JsonParser.parseString("1"),
            method = "tools/list",
            params = params
        )
        assertEquals("2.0", req.jsonrpc)
        assertEquals("tools/list", req.method)
        assertNotNull(req.id)
        assertEquals(1, req.id!!.asInt)
        assertNotNull(req.params)
        assertEquals("value", req.params!!.asJsonObject.get("key").asString)
    }

    @Test
    fun testRequestNullFields() {
        val req = Request(jsonrpc = "2.0", id = null, method = "ping", params = null)
        assertEquals("2.0", req.jsonrpc)
        assertEquals("ping", req.method)
        assertNull(req.id)
        assertNull(req.params)
    }

    @Test
    fun testResponseWithResult() {
        val resp = Response(
            jsonrpc = "2.0",
            id = JsonParser.parseString("1"),
            result = mapOf("status" to "ok")
        )
        assertEquals("2.0", resp.jsonrpc)
        assertNotNull(resp.id)
        assertNotNull(resp.result)
        assertNull(resp.error)
    }

    @Test
    fun testResponseWithError() {
        val resp = Response(
            jsonrpc = "2.0",
            id = JsonParser.parseString("1"),
            error = ErrorObject(code = -32601, message = "method not found")
        )
        assertEquals("2.0", resp.jsonrpc)
        assertNull(resp.result)
        assertNotNull(resp.error)
        assertEquals(-32601, resp.error!!.code)
        assertEquals("method not found", resp.error!!.message)
    }

    @Test
    fun testResponseNullId() {
        val resp = Response(jsonrpc = "2.0", id = null, error = ErrorObject(-32700, "parse error"))
        assertNull(resp.id)
    }

    @Test
    fun testErrorObject() {
        val err = ErrorObject(-32602, "invalid params")
        assertEquals(-32602, err.code)
        assertEquals("invalid params", err.message)
    }

    @Test
    fun testToolSchema() {
        val schema = Schema(
            type = "object",
            properties = mapOf(
                "name" to PropertySchema(type = "string", description = "A name")
            ),
            required = listOf("name")
        )
        val tool = ToolSchema(
            name = "test_tool",
            description = "A test tool",
            inputSchema = schema
        )
        assertEquals("test_tool", tool.name)
        assertEquals("A test tool", tool.description)
        assertEquals("object", tool.inputSchema.type)
        assertEquals(1, tool.inputSchema.properties?.size)
        assertEquals(1, tool.inputSchema.required?.size)
        assertEquals("string", tool.inputSchema.properties?.get("name")?.type)
        assertEquals("A name", tool.inputSchema.properties?.get("name")?.description)
    }

    @Test
    fun testSchemaWithoutProperties() {
        val schema = Schema(type = "object")
        assertEquals("object", schema.type)
        assertNull(schema.properties)
        assertNull(schema.required)
    }

    @Test
    fun testPropertySchemaWithDefaults() {
        val prop = PropertySchema(type = "integer", description = "count", default = JsonParser.parseString("42"))
        assertEquals("integer", prop.type)
        assertEquals("count", prop.description)
        assertNotNull(prop.default)
        assertEquals(42, prop.default!!.asInt)
        assertNull(prop.items)
    }

    @Test
    fun testPropertySchemaWithItems() {
        val items = PropertySchema(type = "string")
        val prop = PropertySchema(type = "array", items = items)
        assertEquals("array", prop.type)
        assertNotNull(prop.items)
        assertEquals("string", prop.items!!.type)
    }

    @Test
    fun testNewToolResultText() {
        val result = newToolResultText("hello world")
        val json = Gson().toJsonTree(result).asJsonObject
        val content = json.getAsJsonArray("content")
        assertEquals(1, content.size())
        val item = content[0].asJsonObject
        assertEquals("text", item.get("type").asString)
        assertEquals("hello world", item.get("text").asString)
        assertFalse(json.has("isError"))
    }

    @Test
    fun testNewToolResultError() {
        val result = newToolResultError("something failed")
        val json = Gson().toJsonTree(result).asJsonObject
        val content = json.getAsJsonArray("content")
        assertEquals(1, content.size())
        val item = content[0].asJsonObject
        assertEquals("text", item.get("type").asString)
        assertEquals("something failed", item.get("text").asString)
        assertTrue(json.get("isError").asBoolean)
    }

    @Test
    fun testToolResultTextBlank() {
        val result = newToolResultText("")
        val json = Gson().toJsonTree(result).asJsonObject
        val text = json.getAsJsonArray("content")[0].asJsonObject.get("text").asString
        assertEquals("", text)
    }

    @Test
    fun testToolResultErrorBlank() {
        val result = newToolResultError("")
        val json = Gson().toJsonTree(result).asJsonObject
        assertTrue(json.get("isError").asBoolean)
    }

    // --- McpServer tests ---

    private fun runMcp(input: String): String {
        val server = McpServer()
        val writer = StringWriter()
        server.run(reader = BufferedReader(StringReader(input)), writer = writer)
        return writer.toString()
    }

    private fun runMcpWithTools(input: String, block: McpServer.() -> Unit): String {
        val server = McpServer()
        server.block()
        val writer = StringWriter()
        server.run(reader = BufferedReader(StringReader(input)), writer = writer)
        return writer.toString()
    }

    @Test
    fun testMcpServerInitialize() {
        val input = """{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}""" + "\n"
        val output = runMcp(input)
        val json = JsonParser.parseString(output.trim()).asJsonObject
        assertEquals("2.0", json.get("jsonrpc").asString)
        assertEquals(1, json.get("id").asInt)
        val result = json.getAsJsonObject("result")
        assertEquals("2025-11-25", result.get("protocolVersion").asString)
        assertNotNull(result.getAsJsonObject("capabilities"))
        assertNotNull(result.getAsJsonObject("serverInfo"))
        assertEquals("hieudoanm-mcp", result.getAsJsonObject("serverInfo").get("name").asString)
    }

    @Test
    fun testMcpServerPing() {
        val input = """{"jsonrpc":"2.0","id":1,"method":"ping"}""" + "\n"
        val output = runMcp(input)
        val json = JsonParser.parseString(output.trim()).asJsonObject
        assertEquals("2.0", json.get("jsonrpc").asString)
        assertEquals(1, json.get("id").asInt)
        assertNotNull(json.getAsJsonObject("result"))
    }

    @Test
    fun testMcpServerToolsListEmpty() {
        val input = """{"jsonrpc":"2.0","id":1,"method":"tools/list"}""" + "\n"
        val output = runMcp(input)
        val json = JsonParser.parseString(output.trim()).asJsonObject
        val result = json.getAsJsonObject("result")
        val tools = result.getAsJsonArray("tools")
        assertEquals(0, tools.size())
    }

    @Test
    fun testMcpServerToolsListWithTools() {
        val input = """{"jsonrpc":"2.0","id":1,"method":"tools/list"}""" + "\n"
        val output = runMcpWithTools(input) {
            addTool("echo", "Echoes input", Schema("object")) { args ->
                val text = args?.asJsonObject?.get("text")?.asString ?: ""
                newToolResultText(text)
            }
        }
        val json = JsonParser.parseString(output.trim()).asJsonObject
        val result = json.getAsJsonObject("result")
        val tools = result.getAsJsonArray("tools")
        assertEquals(1, tools.size())
        val tool = tools[0].asJsonObject
        assertEquals("echo", tool.get("name").asString)
        assertEquals("Echoes input", tool.get("description").asString)
    }

    @Test
    fun testMcpServerCallToolSuccess() {
        val input = """{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"echo","arguments":{"text":"hello"}}}""" + "\n"
        val output = runMcpWithTools(input) {
            addTool("echo", "Echoes input", Schema("object")) { args ->
                val text = args?.asJsonObject?.get("text")?.asString ?: ""
                newToolResultText(text)
            }
        }
        val json = JsonParser.parseString(output.trim()).asJsonObject
        assertEquals("2.0", json.get("jsonrpc").asString)
        val result = json.getAsJsonObject("result")
        val content = result.getAsJsonArray("content")
        assertEquals("hello", content[0].asJsonObject.get("text").asString)
    }

    @Test
    fun testMcpServerCallToolMissingParams() {
        val input = """{"jsonrpc":"2.0","id":1,"method":"tools/call"}""" + "\n"
        val output = runMcp(input)
        val json = JsonParser.parseString(output.trim()).asJsonObject
        val error = json.getAsJsonObject("error")
        assertEquals(-32602, error.get("code").asInt)
        assertEquals("missing params", error.get("message").asString)
    }

    @Test
    fun testMcpServerCallToolMissingParamsWithIdNull() {
        val input = """{"jsonrpc":"2.0","id":null,"method":"tools/call"}""" + "\n"
        val output = runMcp(input)
        val json = JsonParser.parseString(output.trim()).asJsonObject
        assertTrue(json.get("id") == null || json.get("id").isJsonNull)
        val error = json.getAsJsonObject("error")
        assertEquals(-32602, error.get("code").asInt)
    }

    @Test
    fun testMcpServerCallToolNotFound() {
        val input = """{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"nonexistent"}}""" + "\n"
        val output = runMcp(input)
        val json = JsonParser.parseString(output.trim()).asJsonObject
        val error = json.getAsJsonObject("error")
        assertEquals(-32601, error.get("code").asInt)
        assertTrue(error.get("message").asString.contains("nonexistent"))
    }

    @Test
    fun testMcpServerMethodNotFoundNotification() {
        val input = """{"jsonrpc":"2.0","method":"unknown"}""" + "\n"
        val output = runMcp(input)
        // Notifications get no response
        assertEquals("", output.trim())
    }

    @Test
    fun testMcpServerMethodNotFoundWithId() {
        val input = """{"jsonrpc":"2.0","id":1,"method":"unknown"}""" + "\n"
        val output = runMcp(input)
        val json = JsonParser.parseString(output.trim()).asJsonObject
        assertEquals(1, json.get("id").asInt)
        val error = json.getAsJsonObject("error")
        assertEquals(-32601, error.get("code").asInt)
        assertTrue(error.get("message").asString.contains("unknown"))
    }

    @Test
    fun testMcpServerInvalidJson() {
        val input = "not valid json\n"
        val output = runMcp(input)
        val json = JsonParser.parseString(output.trim()).asJsonObject
        assertTrue(json.get("id") == null || json.get("id").isJsonNull)
        val error = json.getAsJsonObject("error")
        assertEquals(-32700, error.get("code").asInt)
    }

    @Test
    fun testMcpServerInvalidVersion() {
        val input = """{"jsonrpc":"1.0","id":1,"method":"ping"}""" + "\n"
        val output = runMcp(input)
        val json = JsonParser.parseString(output.trim()).asJsonObject
        val error = json.getAsJsonObject("error")
        assertEquals(-32600, error.get("code").asInt)
    }

    @Test
    fun testMcpServerBlankLine() {
        val input = "\n"
        val output = runMcp(input)
        // blank line is skipped, then EOF ends the loop
        assertEquals("", output.trim())
    }

    @Test
    fun testMcpServerMultipleMessages() {
        val input = """
            {"jsonrpc":"2.0","id":1,"method":"ping"}
            {"jsonrpc":"2.0","id":2,"method":"ping"}
        """.trimIndent() + "\n"
        val output = runMcp(input)
        val lines = output.trim().split("\n")
        assertEquals(2, lines.size)
        for (line in lines) {
            val json = JsonParser.parseString(line).asJsonObject
            assertEquals("2.0", json.get("jsonrpc").asString)
            assertNotNull(json.getAsJsonObject("result"))
        }
    }

    @Test
    fun testAddTool() {
        val server = McpServer()
        server.addTool("greet", "Greets the user", Schema("object")) {
            newToolResultText("hello")
        }
        // Call the tool to verify it was registered
        val input = """{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"greet"}}""" + "\n"
        val writer = StringWriter()
        server.run(reader = BufferedReader(StringReader(input)), writer = writer)
        val output = writer.toString()
        val json = JsonParser.parseString(output.trim()).asJsonObject
        val result = json.getAsJsonObject("result")
        assertEquals("hello", result.getAsJsonArray("content")[0].asJsonObject.get("text").asString)
    }

    @Test
    fun testMethodUnknown() {
        val input = """{"jsonrpc":"2.0","id":1,"method":"unknown_method_123"}""" + "\n"
        val output = runMcp(input)
        val json = JsonParser.parseString(output.trim()).asJsonObject
        val error = json.getAsJsonObject("error")
        assertEquals(-32601, error.get("code").asInt)
    }

    @Test
    fun testParamsNotObject() {
        val input = """{"jsonrpc":"2.0","id":1,"method":"tools/call","params":"invalid"}""" + "\n"
        val output = runMcp(input)
        val json = JsonParser.parseString(output.trim()).asJsonObject
        val error = json.getAsJsonObject("error")
        assertEquals(-32602, error.get("code").asInt)
    }

    @Test
    fun testCallToolWithNullArguments() {
        val input = """{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"echo"}}""" + "\n"
        val output = runMcpWithTools(input) {
            addTool("echo", "Echo", Schema("object")) { args ->
                val received = if (args != null) "has args" else "null args"
                newToolResultText(received)
            }
        }
        val json = JsonParser.parseString(output.trim()).asJsonObject
        val text = json.getAsJsonObject("result").getAsJsonArray("content")[0].asJsonObject.get("text").asString
        assertEquals("null args", text)
    }
}
