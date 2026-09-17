package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import io.github.hieudoanm.cli.services.HistoryEntry
import io.github.hieudoanm.cli.services.HistoryService
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals

class HistoryCommandTest {
    @Test
    fun testHistoryList() {
        HistoryService.clear()
        val cmd = HistoryCommand()
        val result = cmd.test("list --limit 5")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "no history entries")
    }

    @Test
    fun testHistoryListWithEntries() {
        HistoryService.clear()
        HistoryService.append(HistoryEntry("2024-01-01T00:00:00", "cli", "test command"))
        val cmd = HistoryCommand()
        val result = cmd.test("list --limit 5")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "test command")
    }

    @Test
    fun testHistoryListWithError() {
        HistoryService.clear()
        HistoryService.append(HistoryEntry("2024-01-01T00:00:00", "cli", "failing cmd", error = "error msg"))
        val cmd = HistoryCommand()
        val result = cmd.test("list --limit 5")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "error msg")
    }

    @Test
    fun testHistoryClear() {
        val cmd = HistoryCommand()
        val result = cmd.test("clear")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "cleared")
    }

    @Test
    fun testHistorySearch() {
        HistoryService.clear()
        HistoryService.append(HistoryEntry("2024-01-01T00:00:00", "cli", "calculate bmi"))
        val cmd = HistoryCommand()
        val result = cmd.test("search calculate --limit 10")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "calculate bmi")
    }

    @Test
    fun testHistorySearchWithError() {
        HistoryService.clear()
        HistoryService.append(HistoryEntry("2024-01-01T00:00:00", "cli", "calculate bmi", error = "some error"))
        val cmd = HistoryCommand()
        val result = cmd.test("search calculate --limit 10")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "some error")
    }

    @Test
    fun testHistorySearchNoMatch() {
        HistoryService.clear()
        HistoryService.append(HistoryEntry("2024-01-01T00:00:00", "cli", "convert units"))
        val cmd = HistoryCommand()
        val result = cmd.test("search nonexistent --limit 10")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "no matching entries")
    }

    @Test
    fun testHistoryStatsWithData() {
        HistoryService.clear()
        HistoryService.append(HistoryEntry("2024-01-01T00:00:00", "cli", "calc bmi"))
        HistoryService.append(HistoryEntry("2024-01-02T00:00:00", "cli", "convert"))
        HistoryService.append(HistoryEntry("2024-01-03T00:00:00", "cli", "calc bmi", error = "err"))
        val cmd = HistoryCommand()
        val result = cmd.test("stats")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "CLI commands:   3")
        assertContains(result.stdout, "Top commands:")
        assertContains(result.stdout, "Top errors:")
    }

    @Test
    fun testHistoryStatsEmpty() {
        HistoryService.clear()
        val cmd = HistoryCommand()
        val result = cmd.test("stats")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "CLI commands:   0")
    }
}
