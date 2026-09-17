package mcp

import (
	"os"
	"path/filepath"
	"strings"
	"testing"

	"landify/internal/landify"
)

func TestThemeTokensToolResolvesAPreset(t *testing.T) {
	ws, _ := testWorkspace(t)
	preset := landify.Themes()[0].Name

	var result themeTokensResult
	decodeText(t, callToolText(t, ws, ToolThemeTokens, `{"theme":"`+preset+`"}`), &result)

	if result.Theme != preset {
		t.Fatalf("expected the preset name, got %q", result.Theme)
	}
	if result.Source != "preset:"+preset {
		t.Fatalf("expected the preset source, got %q", result.Source)
	}
	if result.TokenNb != len(result.Tokens) {
		t.Fatalf("expected %d tokens to match the map, got %d", result.TokenNb, len(result.Tokens))
	}
	if result.Tokens["primary"] == "" {
		t.Fatalf("expected derived tokens, got %v", result.Tokens)
	}
}

func TestThemeTokensToolReadsTheConfigTheme(t *testing.T) {
	ws, seed := testWorkspace(t)
	seed("site.yaml", strings.Replace(validYAML, "type: faq", "type: faq\ntheme:\n  primary: '#123456'", 1))

	var result themeTokensResult
	decodeText(t, callToolText(t, ws, ToolThemeTokens, `{"path":"site.yaml"}`), &result)

	if result.Source != "site.yaml" {
		t.Fatalf("expected the path to be reported, got %q", result.Source)
	}
	if !strings.Contains(result.Theme, "#123456") {
		t.Fatalf("expected a custom theme labelled by its primary colour, got %q", result.Theme)
	}
}

func TestThemeTokensToolRejectsAnInvalidHex(t *testing.T) {
	ws, _ := testWorkspace(t)
	broken := strings.Replace(validYAML, "type: faq", "type: faq\ntheme:\n  primary: '#zzz'", 1)

	got := callToolError(t, ws, ToolThemeTokens, `{"yaml":`+quote(broken)+`}`)
	if !strings.Contains(got, "want #RRGGBB") {
		t.Fatalf("expected the colour format to be named, got %s", got)
	}
}

// A model can aim every file-touching tool at a path outside the root, so the
// guard is checked per tool rather than once.
func TestToolsNeverWriteOutsideTheRoot(t *testing.T) {
	tests := []struct {
		tool      string
		arguments string
	}{
		{tool: ToolScaffold, arguments: `{"type":"faq","path":"../escaped.yaml"}`},
		{tool: ToolBuild, arguments: `{"yaml":` + quote(validYAML) + `,"output":"../escaped.html"}`},
		{tool: ToolValidate, arguments: `{"path":"../outside.yaml"}`},
		{tool: ToolThemeTokens, arguments: `{"path":"../outside.yaml"}`},
	}

	for _, tt := range tests {
		t.Run(tt.tool, func(t *testing.T) {
			outside := t.TempDir()
			ws, err := NewWorkspace(t.TempDir())
			if err != nil {
				t.Fatalf("NewWorkspace: %v", err)
			}

			arguments := strings.Replace(tt.arguments, "../", "../"+filepath.Base(outside)+"/", 1)
			if got := callToolError(t, ws, tt.tool, arguments); !strings.Contains(got, "escapes the server root") {
				t.Fatalf("expected the escape to be refused, got %s", got)
			}

			entries, err := os.ReadDir(outside)
			if err != nil {
				t.Fatalf("read %s: %v", outside, err)
			}
			if len(entries) != 0 {
				t.Fatalf("expected the directory outside the root to stay empty, found %d entries", len(entries))
			}
		})
	}
}
