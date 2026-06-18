package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import com.google.gson.JsonArray
import com.google.gson.JsonNull
import com.google.gson.JsonObject
import com.google.gson.JsonPrimitive
import kotlin.test.Test
import kotlin.test.assertEquals

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
}
