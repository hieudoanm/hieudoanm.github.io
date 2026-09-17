package mcp

import (
	"strings"
	"testing"

	"landify/internal/landify"
)

func TestBuildToolRendersTheMarkup(t *testing.T) {
	ws, _ := testWorkspace(t)

	text := callToolText(t, ws, ToolBuild, `{"yaml":`+quote(validYAML)+`}`)

	var result buildResult
	decodeText(t, text, &result)
	if result.Type != "faq" {
		t.Fatalf("expected the rendered type to be reported, got %q", result.Type)
	}
	if result.Source != "inline" {
		t.Fatalf("expected the source to be inline, got %q", result.Source)
	}
	if !strings.Contains(result.HTML, "<!doctype html>") {
		t.Fatal("expected a complete document, not a fragment")
	}
	if result.Bytes != len(result.HTML) {
		t.Fatalf("expected %d bytes to match the markup length, got %d", result.Bytes, len(result.HTML))
	}
	if result.Written != "" {
		t.Fatalf("expected no file to be written without an output path, got %q", result.Written)
	}
}

func TestBuildToolAppliesTheThemeOverride(t *testing.T) {
	ws, _ := testWorkspace(t)

	text := callToolText(t, ws, ToolBuild, `{"yaml":`+quote(validYAML)+`,"theme":"ocean"}`)

	var result buildResult
	decodeText(t, text, &result)
	if result.Theme != "ocean" {
		t.Fatalf("expected the override to be reported, got %q", result.Theme)
	}
	if !strings.Contains(result.HTML, ":root") {
		t.Fatal("expected the theme tokens to be inlined into the page")
	}
}

func TestBuildToolWritesTheOutput(t *testing.T) {
	ws, _ := testWorkspace(t)

	text := callToolText(t, ws, ToolBuild, `{"yaml":`+quote(validYAML)+`,"output":"out/index.html"}`)

	var result buildResult
	decodeText(t, text, &result)
	if result.Written != "out/index.html" {
		t.Fatalf("expected the written path to be reported, got %q", result.Written)
	}
	assertFileContains(t, ws.Root(), "out/index.html", "<!doctype html>")
}

func TestBuildToolReportsValidationProblemsInsteadOfRendering(t *testing.T) {
	ws, _ := testWorkspace(t)
	broken := "type: faq\nsite:\n  name: \"\"\nhero:\n  headline: \"\"\nfaq:\n  items: []\n"

	var result validateResult
	decodeText(t, callToolText(t, ws, ToolBuild, `{"yaml":`+quote(broken)+`}`), &result)

	if result.Valid {
		t.Fatal("a config missing required fields should not build")
	}
	if len(result.Errors) == 0 {
		t.Fatal("expected the problems to be listed")
	}
}

func TestBuildToolRejectsBadArguments(t *testing.T) {
	tests := []struct {
		name      string
		arguments string
		wantErr   string
	}{
		{
			name:      "two sources at once",
			arguments: `{"yaml":"type: faq","path":"site.yaml"}`,
			wantErr:   "not both",
		},
		{
			name:      "an output outside the root",
			arguments: `{"yaml":"type: faq","output":"../escaped.html"}`,
			wantErr:   "escapes the server root",
		},
		{
			name:      "an unknown theme",
			arguments: `{"yaml":"type: faq","theme":"no-such-preset"}`,
			wantErr:   "unknown theme",
		},
		{
			name:      "arguments that are not an object",
			arguments: `"nope"`,
			wantErr:   "invalid arguments",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ws, _ := testWorkspace(t)
			got := callToolError(t, ws, ToolBuild, tt.arguments)
			if !strings.Contains(got, tt.wantErr) {
				t.Fatalf("expected an error containing %q, got %s", tt.wantErr, got)
			}
		})
	}
}

func TestBuildToolReportsAnUnknownPageType(t *testing.T) {
	ws, _ := testWorkspace(t)
	scaffold, err := landify.Placeholder("product")
	if err != nil {
		t.Fatalf("Placeholder: %v", err)
	}
	typed := strings.Replace(string(scaffold), "type: product", "type: blog", 1)

	var result validateResult
	decodeText(t, callToolText(t, ws, ToolBuild, `{"yaml":`+quote(typed)+`}`), &result)

	if result.Valid {
		t.Fatal("an unknown page type should not build")
	}
	if !strings.Contains(strings.Join(result.Errors, " "), "is not supported") {
		t.Fatalf("expected the unsupported type to be named, got %v", result.Errors)
	}
}

func TestBuildToolReadsAFileFromTheRoot(t *testing.T) {
	ws, seed := testWorkspace(t)
	seed("site.yaml", validYAML)

	var result buildResult
	decodeText(t, callToolText(t, ws, ToolBuild, `{"path":"site.yaml"}`), &result)

	if result.Source != "site.yaml" {
		t.Fatalf("expected the path to be echoed back, got %q", result.Source)
	}
	if !strings.Contains(result.HTML, "Questions, answered.") {
		t.Fatal("expected the file content to be rendered")
	}
}
