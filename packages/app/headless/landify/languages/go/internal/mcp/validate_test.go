package mcp

import (
	"strings"
	"testing"
)

func TestValidateToolReportsEveryProblemAtOnce(t *testing.T) {
	ws, _ := testWorkspace(t)
	broken := `type: faq
site:
  name: ""
  description: ""
hero:
  headline: ""
faq:
  items: []
`

	var result validateResult
	decodeText(t, callToolText(t, ws, ToolValidate, `{"yaml":`+quote(broken)+`}`), &result)

	if result.Valid {
		t.Fatal("a config missing required fields should not be valid")
	}
	if result.Type != "faq" {
		t.Fatalf("expected the type to be reported, got %q", result.Type)
	}
	for _, want := range []string{"site.name is required", "hero.headline is required", "faq.items must contain at least one item"} {
		found := false
		for _, got := range result.Errors {
			if got == want {
				found = true
			}
		}
		if !found {
			t.Fatalf("expected %q among the reported errors, got %v", want, result.Errors)
		}
	}
}

func TestValidateToolAcceptsAValidInlineConfig(t *testing.T) {
	ws, _ := testWorkspace(t)

	text := callToolText(t, ws, ToolValidate, `{"yaml":`+quote(validYAML)+`}`)

	var result validateResult
	decodeText(t, text, &result)
	if !result.Valid {
		t.Fatalf("expected the fixture to be valid, got %v", result.Errors)
	}
	if result.Source != "inline" {
		t.Fatalf("expected the source to be inline, got %q", result.Source)
	}
	if result.Errors == nil {
		t.Fatal("a valid config should still carry an empty errors list, not a json null")
	}
}

func TestValidateToolReadsTheDefaultFile(t *testing.T) {
	ws, seed := testWorkspace(t)
	seed(DefaultConfigPath, validYAML)

	text := callToolText(t, ws, ToolValidate, `{}`)

	var result validateResult
	decodeText(t, text, &result)
	if !result.Valid {
		t.Fatalf("expected the default config to be valid, got %v", result.Errors)
	}
	if result.Source != DefaultConfigPath {
		t.Fatalf("expected the source to be %q, got %q", DefaultConfigPath, result.Source)
	}
}

func TestValidateToolRejectsAmbiguousAndMissingSources(t *testing.T) {
	tests := []struct {
		name      string
		arguments string
		wantErr   string
	}{
		{name: "yaml and path together", arguments: `{"yaml":"type: faq","path":"a.yaml"}`, wantErr: "not both"},
		{name: "a missing file", arguments: `{"path":"absent.yaml"}`, wantErr: "no such file"},
		{name: "unparseable yaml", arguments: `{"yaml":"type: ["}`, wantErr: "parse yaml"},
		{name: "an unknown field", arguments: `{"yaml":"type: faq\nnope: 1\n"}`, wantErr: "field nope not found"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ws, _ := testWorkspace(t)
			got := callToolError(t, ws, ToolValidate, tt.arguments)
			if !strings.Contains(got, tt.wantErr) {
				t.Fatalf("expected an error containing %q, got %s", tt.wantErr, got)
			}
		})
	}
}
