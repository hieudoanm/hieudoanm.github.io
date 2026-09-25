package io.github.hieudoanm.landify.cli

import com.github.ajalt.clikt.core.BaseCliktCommand
import com.github.ajalt.clikt.core.CliktError
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.types.path
import io.github.hieudoanm.landify.render.LandifyException
import java.nio.file.Path

/** The config path used when `--file` is omitted, matching the Go original. */
const val DEFAULT_CONFIG = "landify.yaml"

/**
 * The `--file`/`-f` option shared by the subcommands that read a config.
 *
 * Clikt does not expose a parent's option to its subcommands, so each command
 * declares this one itself. That keeps `landify build -f custom.yaml` working
 * the way cobra's persistent root flag did, instead of forcing the flag in
 * front of the subcommand name.
 */
internal fun BaseCliktCommand<*>.fileOption() = option(
    "--file", "-f",
    help = "path to the YAML content file",
).path(mustExist = false, canBeDir = false).default(Path.of(DEFAULT_CONFIG))

/**
 * Runs [block], turning a [LandifyException] into a Clikt error.
 *
 * The domain layer throws plain exceptions so it stays usable from the terminal
 * editor and the desktop studio; this is the single place that maps them to
 * CLI exit codes.
 */
internal inline fun reporting(block: () -> Unit) {
    try {
        block()
    } catch (e: LandifyException) {
        throw CliktError(e.message)
    }
}