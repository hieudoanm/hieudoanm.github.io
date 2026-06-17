package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals

class GhCommandTest {
    @Test
    fun testGhHelp() {
        val cmd = GhCommand()
        val result = cmd.test("--help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testGhLanguagesInvalidRepo() {
        val cmd = GhCommand()
        val result = cmd.test("languages --repo invalid --output /tmp/gh-test.svg")
        assertEquals(0, result.statusCode)
        assertContains(result.stderr, "format owner/repo")
    }
}
