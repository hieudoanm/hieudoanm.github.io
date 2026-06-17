package io.github.hieudoanm.cli.services

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class HistoryTest {
    @Test
    fun testAppendAndReadAll() {
        HistoryService.clear()
        HistoryService.append(HistoryEntry("2024-01-01T00:00:00", "cli", "test command"))
        val entries = HistoryService.readAll()
        assertEquals(1, entries.size)
        assertEquals("test command", entries[0].command)
    }

    @Test
    fun testList() {
        HistoryService.clear()
        HistoryService.append(HistoryEntry("2024-01-01T00:00:00", "cli", "cmd1"))
        HistoryService.append(HistoryEntry("2024-01-02T00:00:00", "cli", "cmd2"))
        HistoryService.append(HistoryEntry("2024-01-03T00:00:00", "cli", "cmd3"))
        val listed = HistoryService.list(2)
        assertEquals(2, listed.size)
        assertEquals("cmd2", listed[0].command)
        assertEquals("cmd3", listed[1].command)
    }

    @Test
    fun testSearch() {
        HistoryService.clear()
        HistoryService.append(HistoryEntry("2024-01-01T00:00:00", "cli", "calculate bmi"))
        HistoryService.append(HistoryEntry("2024-01-02T00:00:00", "cli", "convert units"))
        HistoryService.append(HistoryEntry("2024-01-03T00:00:00", "mcp", "calculate tax"))
        val results = HistoryService.search("calculate", 5)
        assertEquals(2, results.size)
        assertTrue(results.all { it.command.contains("calculate") })
    }

    @Test
    fun testSearchLimit() {
        HistoryService.clear()
        HistoryService.append(HistoryEntry("2024-01-01T00:00:00", "cli", "cmd alpha"))
        HistoryService.append(HistoryEntry("2024-01-02T00:00:00", "cli", "cmd beta"))
        HistoryService.append(HistoryEntry("2024-01-03T00:00:00", "cli", "cmd gamma"))
        val results = HistoryService.search("cmd", 1)
        assertEquals(1, results.size)
    }

    @Test
    fun testStats() {
        HistoryService.clear()
        HistoryService.append(HistoryEntry("2024-01-01T00:00:00", "cli", "calc bmi"))
        HistoryService.append(HistoryEntry("2024-01-02T00:00:00", "cli", "convert"))
        HistoryService.append(HistoryEntry("2024-01-03T00:00:00", "mcp", "calculate"))
        val stats = HistoryService.computeStats()
        assertEquals(2, stats.totalCLI)
        assertEquals(1, stats.totalMCP)
    }

    @Test
    fun testClear() {
        HistoryService.clear()
        HistoryService.append(HistoryEntry("2024-01-01T00:00:00", "cli", "temp"))
        HistoryService.clear()
        val entries = HistoryService.readAll()
        assertEquals(0, entries.size)
    }

    @Test
    fun testReadAllEmpty() {
        HistoryService.clear()
        assertEquals(0, HistoryService.readAll().size)
    }

    @Test
    fun testHistoryEntryWithAllFields() {
        val entry = HistoryEntry(
            timestamp = "2024-06-17T12:00:00",
            source = "cli",
            command = "test --verbose",
            cwd = "/home/user",
            durationMs = 1500L,
            error = "something went wrong"
        )
        assertNotNull(entry.timestamp)
        assertEquals("2024-06-17T12:00:00", entry.timestamp)
        assertEquals("cli", entry.source)
        assertEquals("test --verbose", entry.command)
        assertEquals("/home/user", entry.cwd)
        assertEquals(1500L, entry.durationMs)
        assertEquals("something went wrong", entry.error)
    }

    @Test
    fun testHistoryEntryDefaultValues() {
        val entry = HistoryEntry(timestamp = "now", source = "cli", command = "hi")
        assertEquals("now", entry.timestamp)
        assertEquals("cli", entry.source)
        assertEquals("hi", entry.command)
        assertEquals(null, entry.cwd)
        assertEquals(null, entry.durationMs)
        assertEquals(null, entry.error)
    }
}
