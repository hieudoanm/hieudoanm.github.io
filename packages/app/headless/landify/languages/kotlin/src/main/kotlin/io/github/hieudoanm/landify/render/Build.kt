package io.github.hieudoanm.landify.render

import io.github.hieudoanm.landify.config.Config
import io.github.hieudoanm.landify.config.loadYamlFile
import io.github.hieudoanm.landify.themes.themeByName
import io.github.hieudoanm.landify.themes.themeNames
import io.github.hieudoanm.landify.validate.errors
import io.github.hieudoanm.landify.validate.isValid
import java.nio.file.Path

/** A user-facing failure: a bad path, an unknown theme, or an invalid config. */
class LandifyException(message: String) : RuntimeException(message)

/**
 * The page HTML plus the output path, so the CLI can report both without
 * rendering twice.
 */
data class BuildResult(val output: Path, val html: String)

/**
 * Loads, validates, and renders [configPath], then writes the page to [output],
 * creating parent directories as needed.
 *
 * A non-empty [themeName] replaces the YAML's `theme:` section with a built-in
 * preset. Validation runs before rendering so an invalid config never produces
 * a half-written file.
 *
 * @throws LandifyException when the theme name is unknown, the config is
 *   invalid, or the file cannot be read or written.
 */
fun buildFile(configPath: Path, output: Path, themeName: String = ""): BuildResult {
    val config = readConfig(configPath)
    val themed = applyTheme(config, themeName)
    checkValid(themed, configPath)
    val result = BuildResult(output, render(themed))
    writeOutput(output, result.html)
    return result
}

/** Loads and validates [configPath], returning the parsed config. */
fun readConfig(configPath: Path): Config = runCatching {
    loadYamlFile(configPath)
}.getOrElse {
    throw LandifyException("read ${configPath.fileName}: ${it.message}")
}

/** Replaces the config's theme with the named preset when [themeName] is set. */
fun applyTheme(config: Config, themeName: String): Config {
    if (themeName.isEmpty()) return config
    val theme = themeByName(themeName)
        ?: throw LandifyException(
            "unknown theme \"$themeName\" (available: ${themeNames().joinToString(", ")})",
        )
    return config.copy(theme = theme)
}

/** Throws a combined error listing every problem, or returns quietly. */
fun checkValid(config: Config, configPath: Path) {
    val problems = errors(config)
    if (problems.isNotEmpty()) {
        throw LandifyException(
            "${configPath.fileName} is invalid:\n  - ${problems.joinToString("\n  - ")}",
        )
    }
}

/** Writes [html] to [output] with mode 0644, creating parent directories. */
fun writeOutput(output: Path, html: String) {
    runCatching {
        output.parent?.takeIf { it.toString().isNotEmpty() }?.let { Path.of(it.toString()).toFile().mkdirs() }
        output.toFile().writeText(html)
    }.getOrElse {
        throw LandifyException("write $output: ${it.message}")
    }
}

/**
 * Validates [configPath] and returns the config when it is valid.
 *
 * @throws LandifyException with every problem found, one per line.
 */
fun validateFile(configPath: Path): Config {
    val config = readConfig(configPath)
    if (!isValid(config)) checkValid(config, configPath)
    return config
}
