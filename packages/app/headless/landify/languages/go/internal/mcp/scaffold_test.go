package mcp

import (
	"strings"
	"testing"

	"landify/internal/landify"
)

func TestScaffoldToolReturnsAValidStarterConfig(t *testing.T) {
	ws, _ := testWorkspace(t)

	for _, kind := range landify.KnownTypes() {
		t.Run(kind, func(t *testing.T) {
			text := callToolText(t, ws, ToolScaffold, `{"type":"`+kind+`"}`)

			var result scaffoldResult
			decodeText(t, text, &result)
			if result.Type != kind {
				t.Fatalf("expected type %q, got %q", kind, result.Type)
			}
			cfg, err := landify.Load([]byte(result.YAML))
			if err != nil {
				t.Fatalf("the scaffolded yaml should parse: %v", err)
			}
			if errs := landify.Errors(cfg); len(errs) > 0 {
				t.Fatalf("the scaffolded yaml should be valid, got %v", errs)
			}
		})
	}
}

func TestScaffoldToolWritesOnlyWhenAsked(t *testing.T) {
	tests := []struct {
		name      string
		arguments string
		seed      string
		want      string
		wantErr   string
	}{
		{
			name:      "returns yaml without writing",
			arguments: `{"type":"faq"}`,
			want:      "",
		},
		{
			name:      "writes to the named path",
			arguments: `{"type":"faq","path":"site.yaml"}`,
			want:      "type: faq",
		},
		{
			name:      "refuses to replace without overwrite",
			arguments: `{"type":"faq","path":"site.yaml"}`,
			seed:      "type: faq\nsite:\n  name: Mine\n",
			wantErr:   "already exists",
		},
		{
			name:      "replaces with overwrite",
			arguments: `{"type":"pricing","path":"site.yaml","overwrite":true}`,
			seed:      "type: faq\n",
			want:      "type: pricing",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ws, seed := testWorkspace(t)
			if tt.seed != "" {
				seed("site.yaml", tt.seed)
			}

			if tt.wantErr != "" {
				got := callToolError(t, ws, ToolScaffold, tt.arguments)
				if !strings.Contains(got, tt.wantErr) {
					t.Fatalf("expected an error containing %q, got %s", tt.wantErr, got)
				}
				return
			}

			callToolText(t, ws, ToolScaffold, tt.arguments)
			if tt.want == "" {
				return
			}
			assertFileContains(t, ws.Root(), "site.yaml", tt.want)
		})
	}
}

func TestScaffoldToolRejectsBadArguments(t *testing.T) {
	tests := []struct {
		name      string
		arguments string
		wantErr   string
	}{
		{name: "a missing type", arguments: `{}`, wantErr: "type is required"},
		{name: "a blank type", arguments: `{"type":"  "}`, wantErr: "type is required"},
		{name: "an unknown type", arguments: `{"type":"blog"}`, wantErr: "not supported"},
		{name: "a path outside the root", arguments: `{"type":"faq","path":"../x.yaml"}`, wantErr: "escapes the server root"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ws, _ := testWorkspace(t)
			got := callToolError(t, ws, ToolScaffold, tt.arguments)
			if !strings.Contains(got, tt.wantErr) {
				t.Fatalf("expected an error containing %q, got %s", tt.wantErr, got)
			}
		})
	}
}
