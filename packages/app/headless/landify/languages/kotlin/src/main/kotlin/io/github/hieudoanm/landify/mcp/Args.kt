package io.github.hieudoanm.landify.mcp

import io.github.hieudoanm.landify.config.Config
import io.github.hieudoanm.landify.config.loadYaml
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonElement

/** The "where does the config come from" pair shared by three tools. */
@Serializable
data class SourceArgs(
    val yaml: String = "",
    val path: String = "",
)

/** The arguments of the scaffold tool. */
@Serializable
data class ScaffoldArgs(
    val type: String = "",
    val path: String = "",
    val overwrite: Boolean = false,
)

/** The arguments of the build tool. */
@Serializable
data class BuildArgs(
    val yaml: String = "",
    val path: String = "",
    val theme: String = "",
    val output: String = "",
)

/** The arguments of the theme-tokens tool. */
@Serializable
data class ThemeTokensArgs(
    val yaml: String = "",
    val path: String = "",
    val theme: String = "",
)

/** The arguments of the themes tool. */
@Serializable
data class ThemesArgs(val query: String = "")

/**
 * A resolved config plus a label for where it came from, which every tool result
 * echoes back so a model can tell an inline draft from a file on disk.
 */
data class ConfigSource(val config: Config, val origin: String)

/**
 * Reads the config described by [args]. Both yaml and path set is an error: the
 * two would silently disagree about which content wins.
 */
fun resolveConfig(ws: Workspace, args: SourceArgs): ConfigSource {
    if (args.yaml.isNotBlank() && args.path.isNotBlank()) {
        throw IllegalArgumentException("pass either yaml or path, not both")
    }
    if (args.yaml.isNotBlank()) {
        return ConfigSource(loadConfig(args.yaml, "inline"), "inline")
    }

    val path = args.path.trim().ifEmpty { Workspace.DEFAULT_CONFIG_PATH }
    return ConfigSource(loadConfig(ws.read(path), path), path)
}

/** Parses YAML content, wrapping any failure as a tool-visible message. */
private fun loadConfig(text: String, origin: String): Config = try {
    loadYaml(text)
} catch (e: Exception) {
    throw IllegalArgumentException("parse $origin: ${e.message}")
}

/** Reads a string argument, or "" when absent. */
fun argsString(raw: JsonElement?, name: String): String =
    (raw as? kotlinx.serialization.json.JsonObject)?.get(name)?.let { element ->
        (element as? kotlinx.serialization.json.JsonPrimitive)?.content
    } ?: ""
