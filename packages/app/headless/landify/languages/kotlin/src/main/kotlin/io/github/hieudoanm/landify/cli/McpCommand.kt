package io.github.hieudoanm.landify.cli

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.Context
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.option
import io.github.hieudoanm.landify.mcp.Server
import io.github.hieudoanm.landify.mcp.Workspace
import io.github.hieudoanm.landify.mcp.register
import java.io.BufferedReader
import java.io.InputStreamReader
import java.io.OutputStreamWriter

/** `landify mcp serve` — exposes Landify as tools over stdio. */
class McpServeCommand : CliktCommand(name = "serve") {
    private val root: String by option(
        "--root",
        help = "directory the server is allowed to read and write",
    ).default(Workspace.DEFAULT_ROOT)

    override fun help(context: Context): String = """
        Run the Landify MCP server on stdio.

        Speaks newline-delimited JSON-RPC 2.0: every response is one line of JSON
        on stdout, and all diagnostics go to stderr. File access is confined to
        --root, so a client cannot read or write anything outside that directory.
    """.trimIndent()

    override fun run() {
        val workspace = Workspace.of(root)
        val server = Server()
        register(server, workspace)
        server.run(
            BufferedReader(InputStreamReader(System.`in`)),
            OutputStreamWriter(System.out),
        )
    }
}

/** `landify mcp` — the parent of `mcp serve`, so both appear in help. */
class McpCommand : CliktCommand(name = "mcp") {
    override fun help(context: Context): String = """
        Model Context Protocol server that exposes Landify as tools.

        Runs an MCP server on stdio so an LLM client can scaffold, validate and
        build landing pages through the same code paths as the CLI.
    """.trimIndent()

    override fun run() = Unit
}
