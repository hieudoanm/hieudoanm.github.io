package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import com.google.gson.JsonArray
import com.google.gson.JsonNull
import com.google.gson.JsonObject
import com.google.gson.JsonPrimitive
import io.github.hieudoanm.cli.services.ErrorObject
import io.github.hieudoanm.cli.services.PropertySchema
import io.github.hieudoanm.cli.services.Request
import io.github.hieudoanm.cli.services.Response
import io.github.hieudoanm.cli.services.Schema
import io.github.hieudoanm.cli.services.ToolSchema
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull

class McpCommandTest {
    @Test
    fun testMcpHelp() {
        val cmd = McpCommand()
        val result = cmd.test("--help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testJsonToCliArgsNull() {
        val args = jsonToCliArgs("test.cmd", null)
        assertEquals(listOf("hieudoanm", "test", "cmd"), args)
    }

    @Test
    fun testJsonToCliArgsEmptyObject() {
        val args = jsonToCliArgs("test", JsonObject())
        assertEquals(listOf("hieudoanm", "test"), args)
    }

    @Test
    fun testJsonToCliArgsBooleanTrue() {
        val obj = JsonObject().apply { addProperty("verbose", true) }
        val args = jsonToCliArgs("test", obj)
        assertEquals(listOf("hieudoanm", "test", "--verbose"), args)
    }

    @Test
    fun testJsonToCliArgsBooleanFalse() {
        val obj = JsonObject().apply { addProperty("verbose", false) }
        val args = jsonToCliArgs("test", obj)
        assertEquals(listOf("hieudoanm", "test"), args)
    }

    @Test
    fun testJsonToCliArgsString() {
        val obj = JsonObject().apply { addProperty("name", "hello") }
        val args = jsonToCliArgs("test", obj)
        assertEquals(listOf("hieudoanm", "test", "--name", "hello"), args)
    }

    @Test
    fun testJsonToCliArgsNumber() {
        val obj = JsonObject().apply { addProperty("count", 42) }
        val args = jsonToCliArgs("test", obj)
        assertEquals(listOf("hieudoanm", "test", "--count", "42"), args)
    }

    @Test
    fun testJsonToCliArgsArray() {
        val arr = JsonArray().apply { add("a"); add("b") }
        val obj = JsonObject().apply { add("tags", arr) }
        val args = jsonToCliArgs("test", obj)
        assertEquals(listOf("hieudoanm", "test", "--tags", "a", "--tags", "b"), args)
    }

    @Test
    fun testJsonToCliArgsArgsArray() {
        val arr = JsonArray().apply { add("arg1"); add("arg2") }
        val obj = JsonObject().apply { add("_args", arr) }
        val args = jsonToCliArgs("test", obj)
        assertEquals(listOf("hieudoanm", "test", "arg1", "arg2"), args)
    }

    @Test
    fun testJsonToCliArgsMixed() {
        val obj = JsonObject().apply {
            addProperty("verbose", true)
            addProperty("name", "test")
            addProperty("count", 7)
            val arr = JsonArray().apply { add("a"); add("b") }
            add("_args", arr)
        }
        val args = jsonToCliArgs("test", obj)
        assertEquals(listOf("hieudoanm", "test", "--verbose", "--name", "test", "--count", "7", "a", "b"), args)
    }

    @Test
    fun testJsonToCliArgsNonObject() {
        val args = jsonToCliArgs("test", JsonArray())
        assertEquals(listOf("hieudoanm", "test"), args)
    }

    @Test
    fun testJsonToCliArgsNullElement() {
        val obj = JsonObject().apply { add("key", JsonNull.INSTANCE) }
        val args = jsonToCliArgs("test", obj)
        assertEquals(listOf("hieudoanm", "test"), args)
    }

    @Test
    fun testJsonToCliArgsNestedTool() {
        val args = jsonToCliArgs("tools.calc.bmi", null)
        assertEquals(listOf("hieudoanm", "tools", "calc", "bmi"), args)
    }

    @Test
    fun testRequestDataClass() {
        val req = Request(jsonrpc = "2.0", id = JsonPrimitive(1), method = "test", params = null)
        assertEquals("2.0", req.jsonrpc)
        assertEquals(1, req.id?.asInt)
        assertEquals("test", req.method)
    }

    @Test
    fun testRequestDefaults() {
        val req = Request(jsonrpc = "2.0", id = null, method = "ping", params = null)
        assertEquals("2.0", req.jsonrpc)
    }

    @Test
    fun testResponseDataClass() {
        val resp = Response(jsonrpc = "2.0", id = JsonPrimitive(1), result = "ok", error = null)
        assertEquals("2.0", resp.jsonrpc)
        assertEquals("ok", resp.result)
    }

    @Test
    fun testResponseWithError() {
        val err = ErrorObject(code = -32601, message = "Method not found")
        val resp = Response(jsonrpc = "2.0", id = null, result = null, error = err)
        assertEquals(-32601, resp.error?.code)
        assertEquals("Method not found", resp.error?.message)
    }

    @Test
    fun testErrorObject() {
        val err = ErrorObject(code = -32700, message = "Parse error")
        assertEquals(-32700, err.code)
        assertEquals("Parse error", err.message)
    }

    @Test
    fun testToolSchemaWithDefaults() {
        val schema = Schema(type = "object", properties = null, required = null)
        assertEquals("object", schema.type)
    }

    @Test
    fun testToolSchemaWithProperties() {
        val prop = PropertySchema(type = "string", description = "Name", default = JsonPrimitive("hello"))
        val props = mapOf("name" to prop)
        val schema = Schema(type = "object", properties = props, required = listOf("name"))
        val tool = ToolSchema(name = "greet", description = "Greets someone", inputSchema = schema)
        assertEquals("greet", tool.name)
        assertEquals("object", tool.inputSchema.type)
        assertEquals("string", tool.inputSchema.properties?.get("name")?.type)
        assertEquals("Name", tool.inputSchema.properties?.get("name")?.description)
        assertNotNull(tool.inputSchema.properties?.get("name")?.default)
        assertEquals(listOf("name"), tool.inputSchema.required)
    }

    @Test
    fun testPropertySchemaNested() {
        val nested = PropertySchema(type = "string")
        val outer = PropertySchema(type = "array", items = nested)
        assertEquals("array", outer.type)
        assertEquals("string", outer.items?.type)
    }
}
