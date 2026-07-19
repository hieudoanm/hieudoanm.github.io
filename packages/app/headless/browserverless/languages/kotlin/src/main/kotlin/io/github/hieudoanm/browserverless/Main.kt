package io.github.hieudoanm.browserverless

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.Context
import com.github.ajalt.clikt.core.main
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.options.versionOption
import io.github.hieudoanm.browserverless.cli.McpCommand

/**
 * `browserverless` — headless rendering, plus the MCP server that exposes it.
 */
class BrowserverlessCommand : CliktCommand(name = "browserverless") {
    override fun help(context: Context): String = """
        Headless rendering with a Servo-backed engine.

        The JVM has no in-process embedding, so rendering runs in a separate
        `browserverless serve` process that this CLI talks to.
    """.trimIndent()

    override fun run() = Unit
}

/** Registers the command tree and runs it. */
fun main(args: Array<String>) = BrowserverlessCommand()
    .subcommands(McpCommand())
    .versionOption(VERSION, names = setOf("--version"))
    .main(args)
