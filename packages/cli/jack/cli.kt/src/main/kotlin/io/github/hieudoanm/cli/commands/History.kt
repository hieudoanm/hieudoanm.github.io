package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.core.Context
import com.github.ajalt.clikt.parameters.arguments.argument
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.types.int
import com.google.gson.GsonBuilder
import io.github.hieudoanm.cli.services.HistoryService
import java.io.File

class HistoryCommand : CliktCommand(name = "history") {
    override fun help(context: Context) = "Command execution history"
    init {
        subcommands(HistoryList(), HistorySearch(), HistoryClear(), HistoryStats())
    }
    override fun run() = Unit
}

class HistoryList : CliktCommand(name = "list") {
    override fun help(context: Context) = "List recent history entries"
    private val limit by option("--limit", "-n", help = "Max entries to show").int().default(20)

    override fun run() {
        val entries = HistoryService.list(limit)
        if (entries.isEmpty()) {
            echo("no history entries")
            return
        }
        for (e in entries) {
            val line = buildString {
                append(e.timestamp)
                append("  ")
                append(e.command)
                if (!e.error.isNullOrEmpty()) {
                    append("  [${e.error}]")
                }
            }
            echo(line)
        }
    }
}

class HistorySearch : CliktCommand(name = "search") {
    override fun help(context: Context) = "Search history entries"
    private val query by argument()
    private val limit by option("--limit", "-n", help = "Max entries to show").int().default(20)

    override fun run() {
        val entries = HistoryService.search(query, limit)
        if (entries.isEmpty()) {
            echo("no matching entries")
            return
        }
        for (e in entries) {
            val line = buildString {
                append(e.timestamp)
                append("  ")
                append(e.command)
                if (!e.error.isNullOrEmpty()) {
                    append("  [${e.error}]")
                }
            }
            echo(line)
        }
    }
}

class HistoryClear : CliktCommand(name = "clear") {
    override fun help(context: Context) = "Clear all history"
    override fun run() {
        HistoryService.clear()
        echo("history cleared")
    }
}

class HistoryStats : CliktCommand(name = "stats") {
    override fun help(context: Context) = "Show history statistics"
    override fun run() {
        val stats = HistoryService.computeStats()
        echo("CLI commands:   ${stats.totalCLI}")
        echo("MCP tool calls: ${stats.totalMCP}")
        echo("")
        if (stats.topCommands.isNotEmpty()) {
            echo("Top commands:")
            for (cc in stats.topCommands) {
                echo("  ${"%5d".format(cc.count)}  ${cc.name}")
            }
        }
        if (stats.topErrors.isNotEmpty()) {
            echo("")
            echo("Top errors:")
            for (cc in stats.topErrors) {
                echo("  ${"%5d".format(cc.count)}  ${cc.name}")
            }
        }
    }
}
