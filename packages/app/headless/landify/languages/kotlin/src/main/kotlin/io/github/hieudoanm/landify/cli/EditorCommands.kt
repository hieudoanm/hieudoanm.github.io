package io.github.hieudoanm.landify.cli

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.CliktError
import com.github.ajalt.clikt.core.Context
import com.github.ajalt.clikt.parameters.arguments.argument
import com.github.ajalt.clikt.parameters.arguments.optional
import com.github.ajalt.clikt.parameters.types.path
import io.github.hieudoanm.landify.studio.runStudio
import io.github.hieudoanm.landify.tui.runEditor
import java.nio.file.Path

/**
 * `landify tui` — the terminal editor, shipped in every build.
 *
 * Takes an optional positional path, defaulting to the same `landify.yaml` the
 * other commands read.
 */
class TuiCommand : CliktCommand(name = "tui") {
    override fun help(context: Context): String = """
        Open the terminal editor.

        A YAML pane plus a : command line (save, reload, validate, build,
        generate, theme, help, quit). Esc enters and leaves command mode.
    """.trimIndent()

    private val path: Path? by argument(name = "path").path(
        mustExist = false,
        canBeDir = false,
    ).optional()

    override fun run() = reporting {
        runEditor(path ?: Path.of(DEFAULT_CONFIG))
    }
}

/**
 * `landify studio` — the Compose desktop editor.
 *
 * Like `tui` it takes an optional path; a missing file starts from a blank
 * product scaffold.
 */
class StudioCommand : CliktCommand(name = "studio") {
    override fun help(context: Context): String =
        "Open the desktop editor: a YAML pane, live validation, and a preview."

    private val path: Path? by argument(name = "path").path(
        mustExist = false,
        canBeDir = false,
    ).optional()

    override fun run() {
        try {
            runStudio(path ?: Path.of(DEFAULT_CONFIG))
        } catch (e: Exception) {
            throw CliktError(e.message ?: "studio could not start")
        }
    }
}
