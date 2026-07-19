package main

import (
	"bytes"
	"strings"
	"testing"
)

func TestRootCLIDispatchesMCP(t *testing.T) {
	var stdout, stderr bytes.Buffer

	if code := run([]string{"mcp", "help"}, &stdout, &stderr); code != 0 {
		t.Fatalf("exit code = %d, want 0", code)
	}
	if !strings.Contains(stdout.String(), "browserverless mcp serve") {
		t.Errorf("help output missing the serve command:\n%s", stdout.String())
	}
	if stderr.Len() != 0 {
		t.Errorf("stderr = %q, want it empty", stderr.String())
	}
}

func TestMCPGroupRejectsUnknownCommands(t *testing.T) {
	tests := []struct {
		name string
		args []string
	}{
		{"no subcommand", []string{"mcp"}},
		{"unknown subcommand", []string{"mcp", "listen"}},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			var stdout, stderr bytes.Buffer

			if code := run(test.args, &stdout, &stderr); code != 2 {
				t.Errorf("exit code = %d, want 2", code)
			}
			if !strings.Contains(stderr.String(), "browserverless mcp") {
				t.Errorf("stderr = %q, want usage guidance", stderr.String())
			}
		})
	}
}

func TestMCPServeValidatesFlags(t *testing.T) {
	tests := []struct {
		name    string
		args    []string
		wantMsg string
	}{
		{"zero width", []string{"mcp", "serve", "--width", "0"}, "--width and --height must be positive"},
		{"negative height", []string{"mcp", "serve", "--height", "-5"}, "--width and --height must be positive"},
		{"zero timeout", []string{"mcp", "serve", "--timeout", "0"}, "--timeout must be positive"},
		{"addr without scheme", []string{"mcp", "serve", "--addr", "127.0.0.1:8080"}, "--addr"},
		{"addr with bad scheme", []string{"mcp", "serve", "--addr", "ftp://host"}, "--addr"},
		{"stray argument", []string{"mcp", "serve", "extra"}, "unexpected argument"},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			var stdout, stderr bytes.Buffer

			if code := run(test.args, &stdout, &stderr); code != 2 {
				t.Errorf("exit code = %d, want 2", code)
			}
			if !strings.Contains(stderr.String(), test.wantMsg) {
				t.Errorf("stderr = %q, want it to mention %q", stderr.String(), test.wantMsg)
			}
			if stdout.Len() != 0 {
				t.Errorf("stdout = %q, want protocol output untouched on a usage error", stdout.String())
			}
		})
	}
}

func TestMCPServeIgnoresViewportFlagsWhenProxying(t *testing.T) {
	// Viewport flags only shape in-process rendering, so proxying must not
	// reject them.
	if err := validateMCPServe("http://127.0.0.1:8080", 0, 0, 0); err != nil {
		t.Errorf("validateMCPServe with --addr = %v, want nil", err)
	}
}

func TestUsageMentionsMCP(t *testing.T) {
	var stdout, stderr bytes.Buffer

	if code := run([]string{"help"}, &stdout, &stderr); code != 0 {
		t.Fatalf("exit code = %d, want 0", code)
	}
	for _, want := range []string{"mcp", "Mcp:", "browserverless mcp serve"} {
		if !strings.Contains(stdout.String(), want) {
			t.Errorf("usage missing %q", want)
		}
	}
}
