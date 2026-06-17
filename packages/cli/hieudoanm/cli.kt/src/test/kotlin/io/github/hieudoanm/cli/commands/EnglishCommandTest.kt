package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertEquals

class EnglishCommandTest {
    @Test
    fun testEnglishHelp() {
        val cmd = EnglishCommand()
        val result = cmd.test("--help")
        assertEquals(0, result.statusCode)
    }
}
