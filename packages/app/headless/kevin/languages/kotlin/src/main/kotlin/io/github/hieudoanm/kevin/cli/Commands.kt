package io.github.hieudoanm.kevin.cli

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.UsageError
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.types.int
import com.github.ajalt.clikt.parameters.types.path
import java.nio.file.Path

/** The `kevin` root command. */
class Kevin : CliktCommand(name = "kevin") {
    override fun run() = Unit
}

/** The `kevin serve` command; [launch] is injected so tests can avoid binding a socket. */
class ServeCommand(private val launch: (ServeConfig) -> Unit = { ServeRunner(it).run() }) :
    CliktCommand(name = "serve") {
    private val port: Int by option("--port", "-p", help = "TCP port to listen on")
        .int()
        .default(6379)

    private val bind: String by option("--bind", help = "Address to bind to")
        .default("0.0.0.0")

    private val data: Path? by option("--data", help = "path to JSON data file for persistence")
        .path(mustExist = false, canBeDir = false)

    private val gui: Boolean by option("--gui", help = "open the key/value manager GUI alongside the server")
        .flag()

    private val tui: Boolean by option("--tui", help = "open the key/value manager TUI alongside the server")
        .flag()

    override fun run() {
        if (gui && tui) throw UsageError("--gui and --tui are mutually exclusive")
        launch(ServeConfig(port, bind, data, gui, tui))
    }
}
