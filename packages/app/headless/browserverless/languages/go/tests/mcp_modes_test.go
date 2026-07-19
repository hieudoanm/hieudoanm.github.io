package tests

import (
	"strings"
	"testing"
)

func TestMCPProxyModeAgainstRunningServer(t *testing.T) {
	binPath := buildFreshBinary(t)
	baseURL, stopServer := startServer(t, binPath)
	defer stopServer()

	fixture := newFixture(t)
	session := startMCP(t, binPath, "--addr", baseURL)

	result := session.callTool(t, 1, "browserverless_scrape", map[string]any{"url": fixture.URL})
	if result.IsError {
		t.Fatalf("proxied scrape errored: %s", result.Content[0].Text)
	}
	if !strings.Contains(result.Content[0].Text, "Integration Fixture Content") {
		t.Errorf("proxied scrape text = %q, want the rendered fixture", result.Content[0].Text)
	}
	if !strings.Contains(result.Content[0].Text, "Browserverless Fixture") {
		t.Errorf("proxied scrape text = %q, want the title carried by meta headers", result.Content[0].Text)
	}
}

func TestMCPUsageErrorsExitTwo(t *testing.T) {
	binPath := buildFreshBinary(t)

	tests := []struct {
		name    string
		args    []string
		wantMsg string
	}{
		{"no subcommand", []string{"mcp"}, "browserverless mcp"},
		{"unknown subcommand", []string{"mcp", "listen"}, "unknown command"},
		{"bad viewport", []string{"mcp", "serve", "--width", "0"}, "must be positive"},
		{"bad addr", []string{"mcp", "serve", "--addr", "127.0.0.1:8080"}, "--addr"},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			stdout, stderr, err := runCLI(t, binPath, test.args...)
			if err == nil {
				t.Fatal("want a non-zero exit, got success")
			}
			if !strings.Contains(stderr, test.wantMsg) {
				t.Errorf("stderr = %q, want it to mention %q", stderr, test.wantMsg)
			}
			if stdout != "" {
				t.Errorf("stdout = %q, want it empty on a usage error", stdout)
			}
		})
	}
}

func TestMCPHelpGoesToStdout(t *testing.T) {
	stdout, _, err := runCLI(t, buildFreshBinary(t), "mcp", "help")
	if err != nil {
		t.Fatalf("mcp help: %v", err)
	}
	if !strings.Contains(stdout, "browserverless mcp serve") {
		t.Errorf("help = %q, want the serve command", stdout)
	}
}
