package io.github.hieudoanm.landify.themes

import io.github.hieudoanm.landify.config.Theme

/** A stable preset name, its one-line description, and the colors it sets. */
data class NamedTheme(
    val name: String,
    val description: String,
    val theme: Theme,
)

/**
 * All 64 built-in presets in gallery order.
 *
 * The table lives in [presets1]..[presets7] purely to respect the 200-line
 * file limit; the order of that concatenation is the gallery order that
 * `landify themes` and the TUI theme picker show.
 */
fun themes(): List<NamedTheme> = presets1() + presets2() + presets3() +
    presets4() + presets5() + presets6() + presets7()

/** Looks a preset up case-insensitively, as `--theme <name>` accepts any case. */
fun themeByName(name: String): Theme? =
    themes().firstOrNull { it.name.equals(name, ignoreCase = true) }?.theme

/** Every preset name, sorted for stable help text and completion. */
fun themeNames(): List<String> = themes().map { it.name }.sorted()
