package io.github.hieudoanm.landify.mcp

import io.github.hieudoanm.landify.validate.knownTypes

/**
 * Tool names exposed over MCP. They carry a server prefix so a model can tell
 * which server produced a result when several servers share one session.
 */
const val TOOL_SCAFFOLD = "landify_scaffold"
const val TOOL_VALIDATE = "landify_validate"
const val TOOL_BUILD = "landify_build"
const val TOOL_TYPES = "landify_types"
const val TOOL_THEMES = "landify_themes"
const val TOOL_THEME_TOKENS = "landify_theme_tokens"

/**
 * Adds the Landify tool surface to [server]. Every tool that touches the
 * filesystem goes through the same sandboxed workspace, so none of them can
 * reach outside the server root.
 */
fun register(server: Server, ws: Workspace) {
    server.addTool(scaffoldTool(), handleScaffold(ws))
    server.addTool(validateTool(), handleValidate(ws))
    server.addTool(buildTool(), handleBuild(ws))
    server.addTool(typesTool(), handleTypes())
    server.addTool(themesTool(), handleThemes())
    server.addTool(themeTokensTool(), handleThemeTokens(ws))
}

/** Inline config content, mutually exclusive with path. */
private fun yamlProperty() = PropertySchema(
    type = "string",
    description = "Inline landify.yaml content. Mutually exclusive with path.",
)

/** A config file inside the server root. */
private fun pathProperty() = PropertySchema(
    type = "string",
    description = "Path to a landify.yaml inside the server root. " +
        "Defaults to ${Workspace.DEFAULT_CONFIG_PATH} when neither path nor yaml is given.",
)

/** A built-in preset overriding the config's theme. */
private fun themeProperty() = PropertySchema(
    type = "string",
    description = "Built-in preset name overriding the config's theme: section. Omit to use the config's own theme.",
)

/** Where to write the rendered page. */
private fun outputProperty() = PropertySchema(
    type = "string",
    description = "Relative path to write the rendered page to. Omit to only return the markup.",
)

/** The yaml/path pair on its own, for tools that take no other config input. */
private fun withSourceProperties() = mapOf(
    "yaml" to yamlProperty(),
    "path" to pathProperty(),
)

private fun scaffoldTool() = Tool(
    name = TOOL_SCAFFOLD,
    description = "Return an annotated starter landify.yaml for one of the twelve page types, " +
        "optionally writing it to a file in the server root. Start from this, then edit and validate.",
    inputSchema = Schema(
        properties = mapOf(
            "type" to PropertySchema(
                type = "string",
                description = "Page type to scaffold.",
                enum = knownTypes(),
            ),
            "path" to PropertySchema(
                type = "string",
                description = "Relative path to write the starter config to. Omit to only return the YAML.",
            ),
            "overwrite" to PropertySchema(
                type = "boolean",
                description = "Allow replacing an existing file at path. Defaults to false.",
            ),
        ),
        required = listOf("type"),
    ),
)

private fun validateTool() = Tool(
    name = TOOL_VALIDATE,
    description = "Parse and schema-check a Landify config, reporting every problem at once. " +
        "Accepts inline YAML or a file in the server root. Unknown fields and typos are rejected.",
    inputSchema = Schema(properties = withSourceProperties()),
)

private fun buildTool() = Tool(
    name = TOOL_BUILD,
    description = "Render a Landify config to a self-contained HTML page and return the markup, " +
        "optionally writing it to a file. An invalid config is reported with the same errors landify validate gives.",
    inputSchema = Schema(
        properties = mapOf(
            "yaml" to yamlProperty(),
            "path" to pathProperty(),
            "theme" to themeProperty(),
            "output" to outputProperty(),
        ),
    ),
)

private fun typesTool() = Tool(
    name = TOOL_TYPES,
    description = "List the twelve supported page types and what each layout contains.",
    inputSchema = Schema(),
)

private fun themesTool() = Tool(
    name = TOOL_THEMES,
    description = "List the built-in theme presets with their one-line descriptions. " +
        "Pass a name to landify_build or landify_theme_tokens to apply one.",
    inputSchema = Schema(
        properties = mapOf(
            "query" to PropertySchema(
                type = "string",
                description = "Case-insensitive substring filter over preset names and descriptions. Omit to list all 64.",
            ),
        ),
    ),
)

private fun themeTokensTool() = Tool(
    name = TOOL_THEME_TOKENS,
    description = "Resolve a theme into the derived :root CSS custom properties (tints, shades and WCAG contrast pairs). " +
        "Use a named preset, or read the theme from a config.",
    inputSchema = Schema(
        properties = mapOf(
            "theme" to themeProperty(),
            "yaml" to yamlProperty(),
            "path" to pathProperty(),
        ),
    ),
)
