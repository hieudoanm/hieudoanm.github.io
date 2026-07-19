package io.github.hieudoanm.landify.cli

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.Context

/**
 * The `landify` root command.
 *
 * Clikt prints the help text automatically when no subcommand is given, so
 * this class only carries the description. The command tree is attached in
 * [io.github.hieudoanm.landify.main] via `subcommands(...)`, because Clikt
 * builds that tree fluently rather than through an overridable hook.
 */
class LandifyCommand : CliktCommand(name = "landify") {
    override fun help(context: Context): String =
        """
        Build a flat, dependency-free landing page from a single YAML file.
        No build tooling is required to serve the result — just HTML and CSS.
        """.trimIndent()

    /** Unreachable: Clikt prints help when a subcommand is required but absent. */
    override fun run() = Unit
}
