package mcp

import (
	"encoding/json"
	"fmt"
	"strings"

	"landify/internal/landify"
)

// buildResult is the payload of the build tool.
type buildResult struct {
	Type    string `json:"type"`
	Theme   string `json:"theme,omitempty"`
	Source  string `json:"source"`
	Written string `json:"written,omitempty"`
	Bytes   int    `json:"bytes"`
	HTML    string `json:"html"`
}

// themeTokensResult is the payload of the theme-tokens tool.
type themeTokensResult struct {
	Theme   string            `json:"theme"`
	Source  string            `json:"source"`
	Tokens  map[string]string `json:"tokens"`
	TokenNb int               `json:"token_count"`
}

// handleBuild renders a config to HTML and returns the markup. The theme
// override mirrors `landify build --theme`, and validation runs first so a
// broken config reports every problem instead of a template error.
func handleBuild(ws *Workspace) ToolHandler {
	return func(raw json.RawMessage) *ToolResult {
		var args struct {
			sourceArgs
			Theme  string `json:"theme"`
			Output string `json:"output"`
		}
		if err := unmarshalArgs(raw, &args); err != nil {
			return NewToolResultError(err.Error())
		}
		// Reject an unusable output path before rendering, so a bad path fails
		// immediately instead of after the whole page has been built.
		if _, err := resolveOutput(ws, args.Output); err != nil {
			return NewToolResultError(err.Error())
		}

		source, err := resolve(ws, args.sourceArgs)
		if err != nil {
			return NewToolResultError(err.Error())
		}
		theme, err := applyThemeOverride(source.cfg, args.Theme)
		if err != nil {
			return NewToolResultError(err.Error())
		}
		if errs := landify.Errors(source.cfg); len(errs) > 0 {
			return NewToolResultText(marshal(validateResult{
				Valid:  false,
				Type:   landify.NormalizeType(source.cfg.Type),
				Source: source.origin,
				Errors: nonNil(errs),
			}))
		}

		html, err := landify.Render(source.cfg)
		if err != nil {
			return NewToolResultError(err.Error())
		}
		result := buildResult{
			Type:   landify.NormalizeType(source.cfg.Type),
			Source: source.origin,
			Bytes:  len(html),
			HTML:   string(html),
		}
		if theme != "" {
			result.Theme = theme
		}
		output, err := resolveOutput(ws, args.Output)
		if err != nil {
			return NewToolResultError(err.Error())
		}
		if output != "" {
			if err := ws.Write(args.Output, html); err != nil {
				return NewToolResultError(err.Error())
			}
			result.Written = args.Output
		}
		return NewToolResultText(marshal(result))
	}
}

// resolveOutput checks that a caller-supplied output path is inside the root,
// returning "" when the caller did not ask for a file.
func resolveOutput(ws *Workspace, output string) (string, error) {
	trimmed := strings.TrimSpace(output)
	if trimmed == "" {
		return "", nil
	}
	return ws.Resolve(trimmed)
}

// handleThemeTokens resolves a theme into the derived CSS custom properties.
// The theme comes from a named preset when one is given, otherwise from the
// config, so a model can check the palette of a draft before building it.
func handleThemeTokens(ws *Workspace) ToolHandler {
	return func(raw json.RawMessage) *ToolResult {
		var args struct {
			sourceArgs
			Theme string `json:"theme"`
		}
		if err := unmarshalArgs(raw, &args); err != nil {
			return NewToolResultError(err.Error())
		}

		theme, origin, err := resolveTheme(ws, args.sourceArgs, args.Theme)
		if err != nil {
			return NewToolResultError(err.Error())
		}
		tokens, err := landify.Tokens(theme)
		if err != nil {
			return NewToolResultError(err.Error())
		}
		return NewToolResultText(marshal(themeTokensResult{
			Theme:   themeName(theme, args.Theme),
			Source:  origin,
			Tokens:  tokens,
			TokenNb: len(tokens),
		}))
	}
}

// resolveTheme picks the theme to inspect and names where it came from. A named
// preset wins over the config, matching the CLI's --theme flag.
func resolveTheme(ws *Workspace, src sourceArgs, override string) (landify.Theme, string, error) {
	name := strings.TrimSpace(override)
	if name == "" {
		source, err := resolve(ws, src)
		if err != nil {
			return landify.Theme{}, "", err
		}
		return source.cfg.Theme, source.origin, nil
	}
	theme, ok := landify.ThemeByName(name)
	if !ok {
		return landify.Theme{}, "", unknownThemeError(name)
	}
	return theme, "preset:" + name, nil
}

// unknownThemeError names the preset that was asked for and points at the
// themes tool rather than inlining all 64 names, which would be unreadable.
func unknownThemeError(name string) error {
	return fmt.Errorf("unknown theme %q; call landify_themes to list the presets", name)
}

// applyThemeOverride replaces cfg's theme with a named preset when one is
// given, mirroring the CLI's --theme flag. It returns the preset name so the
// result can report which theme actually rendered.
func applyThemeOverride(cfg *landify.Config, override string) (string, error) {
	name := strings.TrimSpace(override)
	if name == "" {
		return "", nil
	}
	theme, ok := landify.ThemeByName(name)
	if !ok {
		return "", unknownThemeError(name)
	}
	cfg.Theme = theme
	return themeName(theme, name), nil
}

// themeName labels a theme for a tool result. A preset keeps its catalogue
// name; a theme read from a config has none, so it is described by its primary
// colour instead — which is what a model needs to reason about a custom palette.
func themeName(theme landify.Theme, override string) string {
	if strings.TrimSpace(override) != "" {
		return strings.TrimSpace(override)
	}
	if theme.Primary != "" {
		return "custom (primary " + theme.Primary + ")"
	}
	return "custom (default)"
}
