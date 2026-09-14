package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals

class TelegramCommandTest {
    @Test
    fun testTelegramHelp() {
        val cmd = TelegramCommand()
        val result = cmd.test("--help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testTelegramMessageHelp() {
        val cmd = TelegramCommand()
        val result = cmd.test("message --help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testTelegramMessageSendHelp() {
        val cmd = TelegramCommand()
        val result = cmd.test("message send --help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testTelegramWebhookHelp() {
        val cmd = TelegramCommand()
        val result = cmd.test("webhook --help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testTelegramWebhookSetHelp() {
        val cmd = TelegramCommand()
        val result = cmd.test("webhook set --help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testTelegramWebhookInfoHelp() {
        val cmd = TelegramCommand()
        val result = cmd.test("webhook info --help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testTelegramWebhookDeleteHelp() {
        val cmd = TelegramCommand()
        val result = cmd.test("webhook delete --help")
        assertEquals(0, result.statusCode)
    }
}
