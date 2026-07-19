package mcp

import (
	"encoding/json"
	"strings"
	"testing"
)

const usersTable = "Table users {\n  id integer [pk]\n  email varchar(255) [unique]\n}"

func TestRunToolConvertsFormats(t *testing.T) {
	tests := []struct {
		name string
		tool string
		want string
	}{
		{name: "sql", tool: "dbml_sql", want: "CREATE TABLE users"},
		{name: "mermaid", tool: "dbml_mermaid", want: "erDiagram"},
		{name: "svg", tool: "dbml_svg", want: "<svg"},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			got, err := runTool(test.tool, map[string]interface{}{"dbml": usersTable})
			if err != nil {
				t.Fatalf("runTool(%q) error: %v", test.tool, err)
			}
			if !strings.Contains(got, test.want) {
				t.Errorf("runTool(%q) = %q, want containing %q", test.tool, got, test.want)
			}
		})
	}
}

func TestRunToolParseSummarizesSchema(t *testing.T) {
	got, err := runTool("dbml_parse", map[string]interface{}{"dbml": usersTable})
	if err != nil {
		t.Fatalf("runTool error: %v", err)
	}

	var summary struct {
		Tables []tableSummary `json:"tables"`
	}
	if err := json.Unmarshal([]byte(got), &summary); err != nil {
		t.Fatalf("summary is not valid JSON: %v", err)
	}
	if len(summary.Tables) != 1 || summary.Tables[0].Name != "users" {
		t.Fatalf("unexpected summary: %+v", summary)
	}
}

func TestRunToolErrors(t *testing.T) {
	tests := []struct {
		name string
		tool string
		args map[string]interface{}
	}{
		{name: "missing dbml", tool: "dbml_sql", args: map[string]interface{}{}},
		{name: "blank dbml", tool: "dbml_sql", args: map[string]interface{}{"dbml": "  "}},
		{name: "unknown tool", tool: "dbml_nope", args: map[string]interface{}{"dbml": usersTable}},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			if _, err := runTool(test.tool, test.args); err == nil {
				t.Fatal("expected error, got nil")
			}
		})
	}
}

func TestListToolsIncludesConversions(t *testing.T) {
	names := make(map[string]bool)
	for _, tool := range listTools() {
		name, _ := tool["name"].(string)
		names[name] = true
	}

	for _, want := range []string{"dbml_sql", "dbml_mermaid", "dbml_svg", "dbml_parse"} {
		if !names[want] {
			t.Errorf("tool %q not listed", want)
		}
	}
}
