package io.github.hieudoanm.cli.services

import com.google.gson.Gson
import com.google.gson.JsonParser
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
}
