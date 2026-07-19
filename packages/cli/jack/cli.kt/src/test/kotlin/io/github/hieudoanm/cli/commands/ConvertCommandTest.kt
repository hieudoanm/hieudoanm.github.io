package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import java.io.File

class ConvertCommandTest {
    @Test
    fun testBase64Encode() {
        val cmd = ConvertCommand()
        val result = cmd.test("base64 encode 'hello world'")
        assertEquals(0, result.statusCode)
        assertEquals("aGVsbG8gd29ybGQ=", result.stdout.trim())
    }

    @Test
    fun testBase64Decode() {
        val cmd = ConvertCommand()
        val result = cmd.test("base64 decode aGVsbG8gd29ybGQ=")
        assertEquals(0, result.statusCode)
        assertEquals("hello world", result.stdout.trim())
    }

    @Test
    fun testCamelcase() {
        val cmd = ConvertCommand()
        val result = cmd.test("camelcase 'hello world'")
        assertEquals(0, result.statusCode)
        assertEquals("helloWorld", result.stdout.trim())
    }

    @Test
    fun testCamelcaseSnake() {
        val cmd = ConvertCommand()
        val result = cmd.test("camelcase 'hello_world_test'")
        assertEquals(0, result.statusCode)
        assertEquals("helloWorldTest", result.stdout.trim())
    }

    @Test
    fun testKebabcase() {
        val cmd = ConvertCommand()
        val result = cmd.test("kebabcase 'helloWorld'")
        assertEquals(0, result.statusCode)
        assertEquals("hello-world", result.stdout.trim())
    }

    @Test
    fun testSnakecase() {
        val cmd = ConvertCommand()
        val result = cmd.test("snakecase 'helloWorld'")
        assertEquals(0, result.statusCode)
        assertEquals("hello_world", result.stdout.trim())
    }

    @Test
    fun testPascalcase() {
        val cmd = ConvertCommand()
        val result = cmd.test("pascalcase 'hello world'")
        assertEquals(0, result.statusCode)
        assertEquals("HelloWorld", result.stdout.trim())
    }

    @Test
    fun testSlug() {
        val cmd = ConvertCommand()
        val result = cmd.test("slug 'Hello World!'")
        assertEquals(0, result.statusCode)
        assertEquals("hello-world", result.stdout.trim())
    }

    @Test
    fun testLowercase() {
        val cmd = ConvertCommand()
        val result = cmd.test("lowercase 'HELLO'")
        assertEquals(0, result.statusCode)
        assertEquals("hello", result.stdout.trim())
    }

    @Test
    fun testUppercase() {
        val cmd = ConvertCommand()
        val result = cmd.test("uppercase 'hello'")
        assertEquals(0, result.statusCode)
        assertEquals("HELLO", result.stdout.trim())
    }

    @Test
    fun testMorse() {
        val cmd = ConvertCommand()
        val result = cmd.test("morse 'sos'")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "...")
        assertContains(result.stdout, "---")
    }

    @Test
    fun testBraille() {
        val cmd = ConvertCommand()
        val result = cmd.test("braille 'abc'")
        assertEquals(0, result.statusCode)
        assertTrue(result.stdout.isNotBlank())
    }

    @Test
    fun testCapitalise() {
        val cmd = ConvertCommand()
        val result = cmd.test("capitalise 'hello world'")
        assertEquals(0, result.statusCode)
        assertEquals("Hello World", result.stdout.trim())
    }

    @Test
    fun testDeburr() {
        val cmd = ConvertCommand()
        val result = cmd.test("deburr 'café'")
        assertEquals(0, result.statusCode)
        assertEquals("cafe", result.stdout.trim())
    }

    @Test
    fun testCount() {
        val cmd = ConvertCommand()
        val result = cmd.test("count 'hello world'")
        assertEquals(0, result.statusCode)
        val parts = result.stdout.trim().split("\\s+".toRegex())
        assertEquals(3, parts.size)
    }

    @Test
    fun testUrlEncode() {
        val cmd = ConvertCommand()
        val result = cmd.test("url 'hello world'")
        assertEquals(0, result.statusCode)
        assertEquals("hello+world", result.stdout.trim())
    }

    @Test
    fun testUrlDecode() {
        val cmd = ConvertCommand()
        val result = cmd.test("url 'hello+world' --decode")
        assertEquals(0, result.statusCode)
        assertEquals("hello world", result.stdout.trim())
    }

    @Test
    fun testBase64EncodeFile() {
        val path = "/tmp/test-base64-encode.txt"
        File(path).writeText("hello")
        val cmd = ConvertCommand()
        val result = cmd.test("base64 encode '' --file $path")
        assertEquals(0, result.statusCode)
        assertEquals("aGVsbG8=", result.stdout.trim())
    }

    @Test
    fun testBase64EncodeOutputFile() {
        val out = "/tmp/test-base64-out.txt"
        val cmd = ConvertCommand()
        val result = cmd.test("base64 encode 'hello' --output $out")
        assertEquals(0, result.statusCode)
        assertEquals("aGVsbG8=", File(out).readText().trim())
    }

    @Test
    fun testBase64DecodeCleaned() {
        val cmd = ConvertCommand()
        val result = cmd.test("base64 decode 'data:image/png;base64,aGVsbG8='")
        assertEquals(0, result.statusCode)
        assertEquals("hello", result.stdout.trim())
    }

    @Test
    fun testCamelcaseWithNumbers() {
        val cmd = ConvertCommand()
        val result = cmd.test("camelcase 'hello2world'")
        assertEquals(0, result.statusCode)
        assertEquals("hello2world", result.stdout.trim())
    }

    @Test
    fun testCamelcaseWithUnderscore() {
        val cmd = ConvertCommand()
        val result = cmd.test("camelcase 'hello_world'")
        assertEquals(0, result.statusCode)
        assertEquals("helloWorld", result.stdout.trim())
    }

    @Test
    fun testSlugMultipleSpaces() {
        val cmd = ConvertCommand()
        val result = cmd.test("slug 'hello   world'")
        assertEquals(0, result.statusCode)
        assertEquals("hello-world", result.stdout.trim())
    }

    @Test
    fun testCountJson() {
        val cmd = ConvertCommand()
        val result = cmd.test("count 'hello world' --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "characters")
        assertContains(result.stdout, "words")
        assertContains(result.stdout, "lines")
    }

    @Test
    fun testCountEmpty() {
        val cmd = ConvertCommand()
        val result = cmd.test("count ''")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testCapitaliseEmptyWord() {
        val cmd = ConvertCommand()
        val result = cmd.test("capitalise 'hello  world'")
        assertEquals(0, result.statusCode)
        assertEquals("Hello  World", result.stdout.trim())
    }
}
