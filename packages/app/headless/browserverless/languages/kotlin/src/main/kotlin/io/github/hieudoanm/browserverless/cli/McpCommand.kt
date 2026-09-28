package io.github.hieudoanm.browserverless.cli

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.Context
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.options.required
import com.github.ajalt.clikt.parameters.types.long
import io.github.hieudoanm.browserverless.mcp.HttpRenderer
import io.github.hieudoanm.browserverless.mcp.Server
import java.io.BufferedReader
import java.io.InputStreamReader
import java.io.OutputStreamWriter

/** `browserverless mcp serve` — exposes browserverless as tools over stdio. */
class McpServeCommand : CliktCommand(name = "serve") {
    private val addr: String by option(
        "--addr",
        help = "base URL of a running `browserverless serve`; required, because the JVM has no in-process engine",
    ).required()

    private val timeout: Long by option(
        "--timeout",
        help = "default render deadline in milliseconds",
    ).long().default(30_000)

    override fun help(context: Context): String = """
        Run the browserverless MCP server on stdio.

        Speaks newline-delimited JSON-RPC 2.0: every response is one line of JSON
        on stdout, and all diagnostics go to stderr.

        Renders are proxied to a running `browserverless serve`, which owns the
        engine:
            browserverless serve --bind 127.0.0.1:8080
            browserverless mcp serve --addr http://127.0.0.1:8080
    """.trimIndent()

    override fun run() {
        val server = Server(HttpRenderer(addr, defaultTimeoutMs = timeout))
        server.run(
            BufferedReader(InputStreamReader(System.`in`)),
            OutputStreamWriter(System.out),
        )
    }
}

/** `browserverless mcp` — the parent of `mcp serve`, so both appear in help. */
class McpCommand : CliktCommand(name = "mcp") {
    override fun help(context: Context): String = """
        Model Context Protocol server that exposes browserverless as tools.

        Runs an MCP server on stdio so an LLM client can scrape and screenshot
        pages through the same rendering engine as the CLI.
    """.trimIndent()

    // `serve` must be registered here or `browserverless mcp serve` is
    // unreachable and the parent would silently do nothing.
    init {
        subcommands(McpServeCommand())
    }

    override fun run() = Unit
}
