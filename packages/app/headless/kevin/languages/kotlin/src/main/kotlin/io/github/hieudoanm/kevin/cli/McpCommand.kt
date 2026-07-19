package io.github.hieudoanm.kevin.cli

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.UsageError
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.types.path
import io.github.hieudoanm.kevin.mcp.McpServer
import io.github.hieudoanm.kevin.mcp.Session
import io.github.hieudoanm.kevin.mcp.Tools
import java.io.BufferedReader
import java.io.Writer
import java.nio.file.Path
import java.util.logging.Level
import java.util.logging.Logger

/** Parsed `kevin mcp serve` options. */
internal data class McpConfig(
    val addr: String? = null,
    val data: Path? = null,
)

/** The `kevin mcp` command group. */
internal class McpCommand : CliktCommand(name = "mcp") {
    override fun run() = Unit
}

/**
 * The `kevin mcp serve` command.
 *
 * [run] is injected so tests can drive the session without binding the real
 * stdio transport.
 */
internal class McpServeCommand(
    private val run: (McpConfig) -> Unit = { serveStdio(it) },
) : CliktCommand(name = "serve") {
    private val addr: String? by option(
        "--addr",
        help = "address of a running kevin serve to proxy over TCP (e.g. localhost:6379)",
    )

    private val data: Path? by option(
        "--data",
        help = "path to JSON data file for persistence (in-process only)",
    ).path(mustExist = false, canBeDir = false)

    override fun run() {
        if (addr != null && data != null) {
            throw UsageError("--addr and --data are mutually exclusive")
        }
        run(McpConfig(addr, data))
    }
}

/**
 * Serves MCP over stdio until stdin reaches EOF.
 *
 * Logs go to stderr, which is where `java.util.logging` writes by default, so
 * stdout carries only protocol frames.
 */
internal fun serveStdio(
    config: McpConfig,
    input: BufferedReader = System.`in`.bufferedReader(),
    output: Writer = System.out.writer(),
    logger: Logger = Logger.getLogger("kevin.mcp"),
) {
    Session.open(config.addr, config.data, logger).use { session ->
        val server = McpServer()
        Tools.register(server, session.store)
        logger.log(Level.INFO, "mcp server ready transport=stdio store=${session.describe()}")
        server.runWith(input, output)
    }
}
