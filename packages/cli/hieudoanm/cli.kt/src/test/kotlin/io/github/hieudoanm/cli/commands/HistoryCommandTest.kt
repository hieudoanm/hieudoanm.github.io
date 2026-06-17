package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals

class HistoryCommandTest {
    @Test
    fun testHistoryList() {
        val cmd = HistoryCommand()
        val result = cmd.test("list --limit 5")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testHistoryClear() {
        val cmd = HistoryCommand()
        val result = cmd.test("clear")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "cleared")
    }

    @Test
    fun testHistoryStats() {
        val cmd = HistoryCommand()
        val result = cmd.test("stats")
        assertEquals(0, result.statusCode)
    }
}
