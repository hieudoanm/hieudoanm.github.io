package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class OpenrouterCommandTest {
    @Test
    fun testOpenrouterHelp() {
        val cmd = OpenrouterCommand()
        val result = cmd.test("--help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testOpenrouterModelsHelp() {
        val cmd = OpenrouterCommand()
        val result = cmd.test("models --help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testOpenrouterModelsSearchHelp() {
        val cmd = OpenrouterCommand()
        val result = cmd.test("models --search help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testOpenrouterModelsJsonHelp() {
        val cmd = OpenrouterCommand()
        val result = cmd.test("models --json --search test")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testOpenrouterServeHelp() {
        val cmd = OpenrouterCommand()
        val result = cmd.test("serve --help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testOpenrouterCodeHelp() {
        val cmd = OpenrouterCommand()
        val result = cmd.test("code --help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testOpenrouterHookHelp() {
        val cmd = OpenrouterCommand()
        val result = cmd.test("hook --help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testOpenrouterStatusHelp() {
        val cmd = OpenrouterCommand()
        val result = cmd.test("status --help")
        assertEquals(0, result.statusCode)
    }
}
