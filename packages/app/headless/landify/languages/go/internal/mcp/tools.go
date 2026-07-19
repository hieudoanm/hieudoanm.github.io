package mcp

import "landify/internal/landify"

// Tool names exposed over MCP. They carry a server prefix so a model can tell
// which server produced a result when several servers share one session.
const (
	ToolScaffold    = "landify_scaffold"
	ToolValidate    = "landify_validate"
	ToolBuild       = "landify_build"
	ToolTypes       = "landify_types"
	ToolThemes      = "landify_themes"
	ToolThemeTokens = "landify_theme_tokens"
)

// Register adds the Landify tool surface to s. Every tool that touches the
// filesystem goes through the same sandboxed workspace, so none of them can
// reach outside the server root.
func Register(s *Server, ws *Workspace) {
	s.AddTool(scaffoldTool(), handleScaffold(ws))
	s.AddTool(validateTool(), handleValidate(ws))
	s.AddTool(buildTool(), handleBuild(ws))
	s.AddTool(typesTool(), handleTypes())
	s.AddTool(themesTool(), handleThemes())
	s.AddTool(themeTokensTool(), handleThemeTokens(ws))
}

func scaffoldTool() Tool {
	return Tool{
		Name:        ToolScaffold,
		Description: "Return an annotated starter landify.yaml for one of the twelve page types, optionally writing it to a file in the server root. Start from this, then edit and validate.",
		InputSchema: Schema{
			Type: "object",
			Properties: map[string]PropertySchema{
				"type": {
					Type:        "string",
					Description: "Page type to scaffold.",
					Enum:        landify.KnownTypes(),
				},
				"path": {
					Type:        "string",
					Description: "Relative path to write the starter config to. Omit to only return the YAML.",
				},
				"overwrite": {
					Type:        "boolean",
					Description: "Allow replacing an existing file at path. Defaults to false.",
				},
			},
			Required: []string{"type"},
		},
	}
}

func validateTool() Tool {
	return Tool{
		Name:        ToolValidate,
		Description: "Parse and schema-check a Landify config, reporting every problem at once. Accepts inline YAML or a file in the server root. Unknown fields and typos are rejected.",
		InputSchema: Schema{
			Type:       "object",
			Properties: withSourceProperties(),
		},
	}
}

func buildTool() Tool {
	return Tool{
		Name:        ToolBuild,
		Description: "Render a Landify config to a self-contained HTML page and return the markup, optionally writing it to a file. An invalid config is reported with the same errors landify validate gives.",
		InputSchema: Schema{
			Type: "object",
			Properties: map[string]PropertySchema{
				"yaml":   yamlProperty(),
				"path":   pathProperty(),
				"theme":  themeProperty(),
				"output": outputProperty(),
			},
		},
	}
}

func typesTool() Tool {
	return Tool{
		Name:        ToolTypes,
		Description: "List the twelve supported page types and what each layout contains.",
		InputSchema: Schema{
			Type:       "object",
			Properties: map[string]PropertySchema{},
		},
	}
}

func themesTool() Tool {
	return Tool{
		Name:        ToolThemes,
		Description: "List the built-in theme presets with their one-line descriptions. Pass a name to landify_build or landify_theme_tokens to apply one.",
		InputSchema: Schema{
			Type: "object",
			Properties: map[string]PropertySchema{
				"query": {
					Type:        "string",
					Description: "Case-insensitive substring filter over preset names and descriptions. Omit to list all 64.",
				},
			},
		},
	}
}

func themeTokensTool() Tool {
	return Tool{
		Name:        ToolThemeTokens,
		Description: "Resolve a theme into the derived :root CSS custom properties (tints, shades and WCAG contrast pairs). Use a named preset, or read the theme from a config.",
		InputSchema: Schema{
			Type: "object",
			Properties: map[string]PropertySchema{
				"theme": themeProperty(),
				"yaml":  yamlProperty(),
				"path":  pathProperty(),
			},
		},
	}
}

// yamlProperty, pathProperty and themeProperty are shared by every tool that
// takes a config. The schemas are written out by hand because MCP clients read
// them to build the tool descriptions a model sees.
func yamlProperty() PropertySchema {
	return PropertySchema{
		Type:        "string",
		Description: "Inline landify.yaml content. Mutually exclusive with path.",
	}
}

func pathProperty() PropertySchema {
	return PropertySchema{
		Type:        "string",
		Description: "Path to a landify.yaml inside the server root. Defaults to " + DefaultConfigPath + " when neither path nor yaml is given.",
	}
}

func themeProperty() PropertySchema {
	return PropertySchema{
		Type:        "string",
		Description: "Built-in preset name overriding the config's theme: section. Omit to use the config's own theme.",
	}
}

func outputProperty() PropertySchema {
	return PropertySchema{
		Type:        "string",
		Description: "Relative path to write the rendered page to. Omit to only return the markup.",
	}
}

// withSourceProperties returns the yaml/path pair on its own, for tools that
// take no other config input.
func withSourceProperties() map[string]PropertySchema {
	return map[string]PropertySchema{
		"yaml": yamlProperty(),
		"path": pathProperty(),
	}
}
