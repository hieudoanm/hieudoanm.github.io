package io.github.hieudoanm.cli.services

import com.google.gson.Gson
import java.io.File
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

data class HistoryEntry(
    val timestamp: String,
    val source: String,
    val command: String,
    val cwd: String? = null,
    val durationMs: Long? = null,
    val error: String? = null
)

data class CommandCount(
    val name: String,
    val count: Int
)

data class HistoryStats(
    val totalCLI: Int,
    val totalMCP: Int,
    val topCommands: List<CommandCount>,
    val topErrors: List<CommandCount>
)

object HistoryService {
    private val gson = Gson()
    private val lock = Any()

    private fun storagePath(): File {
        val home = System.getProperty("user.home")
        val dir = File(home, ".hieudoanm")
        dir.mkdirs()
        return File(dir, "history.jsonl")
    }

    fun append(entry: HistoryEntry) {
        synchronized(lock) {
            val file = storagePath()
            val line = gson.toJson(entry) + "\n"
            file.appendText(line)
        }
    }

    fun readAll(): List<HistoryEntry> {
        val file = storagePath()
        if (!file.exists()) return emptyList()
        return file.readLines()
            .map { it.trim() }
            .filter { it.isNotEmpty() }
            .mapNotNull { line ->
                try {
                    gson.fromJson(line, HistoryEntry::class.java)
                } catch (_: Exception) { null }
            }
    }

    fun list(count: Int): List<HistoryEntry> {
        val entries = readAll()
        val n = if (count <= 0 || count > entries.size) entries.size else count
        return entries.takeLast(n)
    }

    fun search(query: String, limit: Int): List<HistoryEntry> {
        val entries = readAll()
        val q = query.lowercase()
        return entries.reversed()
            .filter { it.command.lowercase().contains(q) }
            .take(if (limit > 0) limit else entries.size)
    }

    fun clear() {
        val file = storagePath()
        if (file.exists()) file.delete()
    }

    fun computeStats(): HistoryStats {
        val entries = readAll()
        var totalCLI = 0
        var totalMCP = 0
        val cmdCount = mutableMapOf<String, Int>()
        val errCount = mutableMapOf<String, Int>()

        for (e in entries) {
            if (e.source == "cli") totalCLI++ else totalMCP++
            cmdCount[e.command] = (cmdCount[e.command] ?: 0) + 1
            if (!e.error.isNullOrEmpty()) {
                errCount[e.command] = (errCount[e.command] ?: 0) + 1
            }
        }

        return HistoryStats(
            totalCLI = totalCLI,
            totalMCP = totalMCP,
            topCommands = topN(cmdCount, 10),
            topErrors = topN(errCount, 10)
        )
    }

    private fun topN(counts: Map<String, Int>, n: Int): List<CommandCount> {
        return counts.entries
            .map { CommandCount(it.key, it.value) }
            .sortedByDescending { it.count }
            .take(n)
    }
}
