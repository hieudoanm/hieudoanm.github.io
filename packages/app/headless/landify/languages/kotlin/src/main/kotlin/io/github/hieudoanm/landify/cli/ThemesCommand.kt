package io.github.hieudoanm.landify.cli

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.Context
import io.github.hieudoanm.landify.themes.themes

/**
 * `landify themes` — lists every built-in preset, one per line, sorted by name.
 *
 * The output is tab-separated (`name<TAB>description`) so it pipes cleanly into
 * `cut -f1` for shell completion.
 */
class ThemesCommand : CliktCommand(name = "themes") {
    override fun help(context: Context): String = """
        List the built-in theme presets.

        Pass a name to landify build --theme to override the YAML theme section.
    """.trimIndent()

    override fun run() {
        themes().sortedBy { it.name }.forEach { echo("${it.name}\t${it.description}") }
    }
}
