package yml

import (
	"io"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestNewCmd(t *testing.T) {
	cmd := NewCmd()
	if cmd == nil {
		t.Fatal("NewCmd() returned nil")
	}
	if cmd.Use != "yml <file>" {
		t.Errorf("Use = %q", cmd.Use)
	}
	for _, name := range []string{"validate", "lint", "json"} {
		if cmd.Flag(name) == nil {
			t.Errorf("missing flag: --%s", name)
		}
	}
}

func TestNewCmdArgs(t *testing.T) {
	cmd := NewCmd()
	if err := cmd.Args(cmd, []string{}); err != nil {
		t.Errorf("expected no error for 0 args, got: %v", err)
	}
	if err := cmd.Args(cmd, []string{"file.yml"}); err != nil {
		t.Errorf("expected no error for 1 arg, got: %v", err)
	}
	if err := cmd.Args(cmd, []string{"a", "b"}); err == nil {
		t.Error("expected error for 2 args")
	}
}

func TestNewCmdMetadata(t *testing.T) {
	cmd := NewCmd()
	if cmd.Short == "" {
		t.Error("Short description should not be empty")
	}
	if cmd.Long == "" {
		t.Error("Long description should not be empty")
	}
	if cmd.Example == "" {
		t.Error("Example should not be empty")
	}
}

func TestCmdRunE_Stdin(t *testing.T) {
	oldStdin := os.Stdin
	stdinR, stdinW, _ := os.Pipe()
	stdinW.Write([]byte("name: test\nage: 30\n"))
	stdinW.Close()
	os.Stdin = stdinR

	oldStdout := os.Stdout
	stdoutR, stdoutW, _ := os.Pipe()
	os.Stdout = stdoutW

	cmd := NewCmd()
	cmd.SetArgs([]string{})
	err := cmd.Execute()

	stdoutW.Close()
	os.Stdout = oldStdout
	os.Stdin = oldStdin

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	out, _ := io.ReadAll(stdoutR)
	if !strings.Contains(string(out), "test") {
		t.Errorf("output should contain 'test', got: %s", string(out))
	}
}

func TestCmdRunE_File(t *testing.T) {
	dir := t.TempDir()
	f := filepath.Join(dir, "config.yml")
	if err := os.WriteFile(f, []byte("key: value\n"), 0644); err != nil {
		t.Fatal(err)
	}

	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	cmd := NewCmd()
	cmd.SetArgs([]string{f})
	err := cmd.Execute()

	w.Close()
	os.Stdout = old

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	out, _ := io.ReadAll(r)
	if !strings.Contains(string(out), "key") {
		t.Errorf("output should contain 'key', got: %s", string(out))
	}
}

func TestCmdRunE_JsonOutput(t *testing.T) {
	oldStdin := os.Stdin
	stdinR, stdinW, _ := os.Pipe()
	stdinW.Write([]byte("name: test\n"))
	stdinW.Close()
	os.Stdin = stdinR

	oldStdout := os.Stdout
	stdoutR, stdoutW, _ := os.Pipe()
	os.Stdout = stdoutW

	cmd := NewCmd()
	cmd.SetArgs([]string{"--json"})
	err := cmd.Execute()

	stdoutW.Close()
	os.Stdout = oldStdout
	os.Stdin = oldStdin

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	out, _ := io.ReadAll(stdoutR)
	if !strings.Contains(string(out), "test") {
		t.Errorf("output should contain 'test', got: %s", string(out))
	}
	if !strings.Contains(string(out), "\"name\"") {
		t.Errorf("output should be JSON formatted, got: %s", string(out))
	}
}

func TestCmdRunE_Validate(t *testing.T) {
	dir := t.TempDir()
	f := filepath.Join(dir, "config.yml")
	if err := os.WriteFile(f, []byte("key: value\n"), 0644); err != nil {
		t.Fatal(err)
	}

	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	cmd := NewCmd()
	cmd.SetArgs([]string{f, "--validate"})
	err := cmd.Execute()

	w.Close()
	os.Stdout = old

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	out, _ := io.ReadAll(r)
	if !strings.Contains(string(out), "Valid") {
		t.Errorf("output should contain 'Valid', got: %s", string(out))
	}
}

func TestCmdRunE_ValidateJSON(t *testing.T) {
	dir := t.TempDir()
	f := filepath.Join(dir, "config.yml")
	if err := os.WriteFile(f, []byte("key: value\n"), 0644); err != nil {
		t.Fatal(err)
	}

	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	cmd := NewCmd()
	cmd.SetArgs([]string{f, "--validate", "--json"})
	err := cmd.Execute()

	w.Close()
	os.Stdout = old

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	out, _ := io.ReadAll(r)
	if !strings.Contains(string(out), "valid") {
		t.Errorf("output should contain 'valid', got: %s", string(out))
	}
}

func TestCmdRunE_Lint(t *testing.T) {
	dir := t.TempDir()
	f := filepath.Join(dir, "config.yml")
	if err := os.WriteFile(f, []byte("key: value\n"), 0644); err != nil {
		t.Fatal(err)
	}

	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	cmd := NewCmd()
	cmd.SetArgs([]string{f, "--lint"})
	err := cmd.Execute()

	w.Close()
	os.Stdout = old

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	out, _ := io.ReadAll(r)
	if !strings.Contains(string(out), "No lint") {
		t.Errorf("output should contain 'No lint issues', got: %s", string(out))
	}
}

func TestCmdRunE_LintJSON(t *testing.T) {
	dir := t.TempDir()
	f := filepath.Join(dir, "config.yml")
	if err := os.WriteFile(f, []byte("key: value\n"), 0644); err != nil {
		t.Fatal(err)
	}

	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	cmd := NewCmd()
	cmd.SetArgs([]string{f, "--lint", "--json"})
	err := cmd.Execute()

	w.Close()
	os.Stdout = old

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	out, _ := io.ReadAll(r)
	if !strings.Contains(string(out), "no issues") {
		t.Errorf("output should contain 'no issues', got: %s", string(out))
	}
}

func TestCmdRunE_MissingFile(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"/nonexistent/file.yml"})
	err := cmd.Execute()
	if err == nil {
		t.Error("expected error for missing file")
	}
}

func TestCmdRunE_InvalidYAML(t *testing.T) {
	oldStdin := os.Stdin
	stdinR, stdinW, _ := os.Pipe()
	stdinW.Write([]byte(": invalid yaml [\n"))
	stdinW.Close()
	os.Stdin = stdinR

	cmd := NewCmd()
	cmd.SetArgs([]string{})
	err := cmd.Execute()

	os.Stdin = oldStdin

	if err == nil {
		t.Error("expected error for invalid YAML")
	}
}
