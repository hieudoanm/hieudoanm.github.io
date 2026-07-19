package io.github.hieudoanm.landify.mcp

import io.github.hieudoanm.landify.config.Theme
import io.github.hieudoanm.landify.color.tokens
import io.github.hieudoanm.landify.config.Config
import io.github.hieudoanm.landify.render.LandifyException
import io.github.hieudoanm.landify.render.placeholder
import io.github.hieudoanm.landify.render.render
import io.github.hieudoanm.landify.themes.themeByName
import io.github.hieudoanm.landify.validate.errors
import io.github.hieudoanm.landify.validate.normalizeType
import kotlinx.serialization.Serializable

/** The payload of the scaffold tool. */
@Serializable
data class ScaffoldResult(
    val type: String,
    val written: String = "",
    val yaml: String,
)

/** The payload of the validate tool. */
@Serializable
data class ValidateResult(
    val valid: Boolean,
    val type: String,
    val source: String,
    val errors: List<String>,
)

/** The payload of the build tool. */
@Serializable
data class BuildResult(
    val type: String,
    val theme: String = "",
    val source: String,
    val written: String = "",
    val bytes: Int,
    val html: String,
)

/** The payload of the theme-tokens tool. */
@Serializable
data class ThemeTokensResult(
    val theme: String,
    val source: String,
    val tokens: Map<String, String>,
    val tokenCount: Int,
)

/**
 * Returns a starter config for a page type and, when the caller names a path,
 * writes it there. Overwriting is opt-in so a model cannot silently destroy a
 * config the user is editing.
 */
fun handleScaffold(ws: Workspace): ToolHandler = ToolHandler { raw ->
    val args = decodeArgs<ScaffoldArgs>(raw)
    if (args.type.isBlank()) {
        return@ToolHandler errorResult("type is required and must not be blank")
    }

    val kind = normalizeType(args.type)
    val yaml = try {
        placeholder(kind)
    } catch (e: LandifyException) {
        return@ToolHandler errorResult("type \"${args.type}\" is not supported: ${e.message}")
    }

    val written = try {
        writeUnlessPresent(ws, args.path, yaml, args.overwrite)
    } catch (e: Exception) {
        return@ToolHandler errorResult(e.message ?: "could not write the scaffold")
    }
    textResult(marshal(ScaffoldResult(type = kind, written = written, yaml = yaml)))
}

/**
 * Writes [data] to [path] inside the root, creating parent directories, and
 * returns the path it wrote. A blank path writes nothing and returns "",
 * because "show me the yaml" is the common case for a model that only wants to
 * read the starter config.
 */
private fun writeUnlessPresent(ws: Workspace, path: String, data: String, overwrite: Boolean): String {
    if (path.isBlank()) return ""
    if (!overwrite && ws.exists(path)) {
        throw LandifyWorkspaceException("$path already exists; pass overwrite to replace it")
    }
    ws.write(path, data)
    return path
}

/**
 * Schema-checks a config and reports every problem at once, so a model can fix a
 * draft in one pass instead of discovering fields one at a time. A parse failure
 * is a tool error; a schema failure is a normal result.
 */
fun handleValidate(ws: Workspace): ToolHandler = ToolHandler { raw ->
    val source = try {
        resolveConfig(ws, decodeArgs<SourceArgs>(raw))
    } catch (e: Exception) {
        return@ToolHandler errorResult(e.message ?: "could not read the config")
    }
    textResult(marshal(validate(source.config, source.origin)))
}

/** Builds the validate payload, shared with build so both report identically. */
fun validate(config: Config, source: String): ValidateResult = ValidateResult(
    valid = errors(config).isEmpty(),
    type = normalizeType(config.pageType),
    source = source,
    errors = errors(config),
)

/**
 * Renders a config to HTML and returns the markup. The theme override mirrors
 * `landify build --theme`, and validation runs first so a broken config reports
 * every problem instead of a template error.
 */
fun handleBuild(ws: Workspace): ToolHandler = ToolHandler { raw ->
    val args = decodeArgs<BuildArgs>(raw)

    // Reject an unusable output path before rendering, so a bad path fails
    // immediately instead of after the whole page has been built.
    try {
        resolveOutput(ws, args.output)
    } catch (e: Exception) {
        return@ToolHandler errorResult(e.message ?: "invalid output path")
    }

    val source = try {
        resolveConfig(ws, SourceArgs(args.yaml, args.path))
    } catch (e: Exception) {
        return@ToolHandler errorResult(e.message ?: "could not read the config")
    }

    val themed = try {
        applyThemeOverride(source.config, args.theme)
    } catch (e: Exception) {
        return@ToolHandler errorResult(e.message ?: "unknown theme")
    }
    val problems = validate(themed.first, source.origin)
    if (!problems.valid) {
        return@ToolHandler textResult(marshal(problems))
    }

    val html = try {
        render(themed.first)
    } catch (e: Exception) {
        return@ToolHandler errorResult(e.message ?: "could not render the page")
    }
    val output = resolveOutput(ws, args.output)
    if (output.isNotEmpty()) {
        try {
            ws.write(args.output, html)
        } catch (e: Exception) {
            return@ToolHandler errorResult(e.message ?: "could not write the page")
        }
    }
    textResult(
        marshal(
            BuildResult(
                type = normalizeType(themed.first.pageType),
                theme = themed.second,
                source = source.origin,
                written = if (output.isEmpty()) "" else args.output,
                bytes = html.toByteArray().size,
                html = html,
            ),
        ),
    )
}

/** Checks that a caller-supplied output path is inside the root. */
private fun resolveOutput(ws: Workspace, output: String): String {
    if (output.isBlank()) return ""
    return ws.resolve(output.trim())
}

/**
 * Resolves a theme into the derived CSS custom properties. The theme comes from
 * a named preset when one is given, otherwise from the config, so a model can
 * check the palette of a draft before building it.
 */
fun handleThemeTokens(ws: Workspace): ToolHandler = ToolHandler { raw ->
    val args = decodeArgs<ThemeTokensArgs>(raw)
    val resolved = try {
        resolveTheme(ws, SourceArgs(args.yaml, args.path), args.theme)
    } catch (e: Exception) {
        return@ToolHandler errorResult(e.message ?: "could not resolve the theme")
    }

    val values = try {
        tokens(resolved.first).toMap()
    } catch (e: Exception) {
        return@ToolHandler errorResult("derive tokens: ${e.message}")
    }
    textResult(
        marshal(
            ThemeTokensResult(
                theme = themeName(resolved.first, args.theme),
                source = resolved.second,
                tokens = values,
                tokenCount = values.size,
            ),
        ),
    )
}

/**
 * Picks the theme to inspect and names where it came from. A named preset wins
 * over the config, matching the CLI's --theme flag.
 */
private fun resolveTheme(ws: Workspace, src: SourceArgs, override: String): Pair<Theme, String> {
    val name = override.trim()
    if (name.isEmpty()) {
        val source = resolveConfig(ws, src)
        return source.config.theme to source.origin
    }
    val theme = themeByName(name) ?: throw IllegalArgumentException(unknownThemeMessage(name))
    return theme to "preset:$name"
}

/** Names the preset that was asked for and points at the themes tool. */
private fun unknownThemeMessage(name: String): String =
    "unknown theme \"$name\"; call landify_themes to list the presets"

/**
 * Replaces the config's theme with a named preset when one is given, mirroring
 * the CLI's --theme flag. It also returns the preset name so the result can
 * report which theme actually rendered.
 */
private fun applyThemeOverride(config: Config, override: String): Pair<Config, String> {
    val name = override.trim()
    if (name.isEmpty()) return config to ""
    val theme = themeByName(name) ?: throw IllegalArgumentException(unknownThemeMessage(name))
    return config.copy(theme = theme) to name
}

/**
 * Labels a theme for a tool result. A preset keeps its catalogue name; a theme
 * read from a config has none, so it is described by its primary colour instead
 * — which is what a model needs to reason about a custom palette.
 */
private fun themeName(theme: Theme, override: String): String {
    if (override.isNotBlank()) return override.trim()
    if (theme.primary.isNotEmpty()) return "custom (primary ${theme.primary})"
    return "custom (default)"
}
