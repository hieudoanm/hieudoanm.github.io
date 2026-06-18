package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals

class GeminiCommandTest {
    @Test
    fun testGeminiHelp() {
        val cmd = GeminiCommand()
        val result = cmd.test("--help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testGeminiCodeHelp() {
        val cmd = GeminiCommand()
        val result = cmd.test("code --help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testGeminiCodeMissingApiKey() {
        val cmd = GeminiCommand()
        val result = cmd.test("code hello")
        assertEquals(0, result.statusCode)
        if (System.getenv("GEMINI_API_KEY").isNullOrEmpty()) {
            assertContains(result.stderr, "GEMINI_API_KEY")
        }
    }
}
