package mcp

import (
	"strings"
	"testing"
)

func TestEveryToolDeclaresAnObjectSchema(t *testing.T) {
	ws, _ := testWorkspace(t)
	server := NewServerWithIO(nil)
	Register(server, ws)

	server.mu.Lock()
	tools := make([]Tool, 0, len(server.tools))
	for _, tool := range server.tools {
		tools = append(tools, tool)
	}
	server.mu.Unlock()

	if len(tools) != 6 {
		t.Fatalf("expected 6 registered tools, got %d", len(tools))
	}
	for _, tool := range tools {
		t.Run(tool.Name, func(t *testing.T) {
			if !strings.HasPrefix(tool.Name, "landify_") {
				t.Fatalf("tool %q should carry the server prefix", tool.Name)
			}
			if tool.Description == "" {
				t.Fatal("tool should have a description so the model can choose it")
			}
			if tool.InputSchema.Type != "object" {
				t.Fatalf("expected an object schema, got %q", tool.InputSchema.Type)
			}
			for _, required := range tool.InputSchema.Required {
				if _, ok := tool.InputSchema.Properties[required]; !ok {
					t.Fatalf("required property %q is not described", required)
				}
			}
		})
	}
}
