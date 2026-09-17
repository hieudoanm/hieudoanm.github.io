package io.github.hieudoanm.landify.cli

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.Context
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.types.int
import com.github.ajalt.clikt.parameters.types.path
import io.github.hieudoanm.landify.render.LandifyException
import io.github.hieudoanm.landify.serve.StaticServer
import java.io.IOException
import java.nio.file.Path

/**
 * `landify serve` — previews the built page over HTTP.
 *
 * Blocks until interrupted, then shuts the listener down so the port is
 * released without killing the JVM abruptly.
 */
class ServeCommand : CliktCommand(name = "serve") {
    override fun help(context: Context): String = """
        Serve a directory over HTTP.

        Serves index.html (and any other files) from a directory so the built
        landing page can be previewed in a browser. Stops on Ctrl+C.
    """.trimIndent()

    private val dir: Path by option(
        "--dir", "-d",
        help = "directory to serve",
    ).path(mustExist = true, canBeDir = true, canBeFile = false).default(Path.of("."))

    private val bind: String by option(
        "--bind", "-b",
        help = "address to bind",
    ).default("127.0.0.1")

    private val port: Int by option(
        "--port", "-p",
        help = "port to listen on",
    ).int().default(8080)

    override fun run() = reporting {
        val server = StaticServer(dir, bind, port)
        Runtime.getRuntime().addShutdownHook(Thread { server.stop() })
        try {
            server.start()
        } catch (e: IOException) {
            throw LandifyException("listen on $bind:$port: ${e.message}")
        }
        // Report the bound port, not the requested one: `--port 0` lets the OS
        // choose, and only the bound port is usable.
        echo("Serving $dir on http://$bind:${server.boundPort}")
        server.awaitShutdown()
    }
}
