package json

import (
	"io"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestNewCmdFlags(t *testing.T) {
	cmd := NewCmd()
	if cmd == nil {
		t.Fatal("NewCmd() returned nil")
	}

	expectedFlags := map[string]struct {
		short string
		long  string
	}{
		"query": {short: "q", long: "query"},
		"diff":  {short: "", long: "diff"},
		"merge": {short: "", long: "merge"},
	}

	for name, expected := range expectedFlags {
		flag := cmd.Flag(name)
		if flag == nil {
			t.Errorf("missing flag: --%s", name)
			continue
		}
		if flag.Shorthand != expected.short {
			t.Errorf("flag %s shorthand = %q, want %q", name, flag.Shorthand, expected.short)
		}
	}
}

func TestNewCmdMetadata(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "json [file]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "json [file]")
	}
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

func TestNewCmdArgs(t *testing.T) {
	cmd := NewCmd()
	if cmd.Args == nil {
		t.Fatal("expected Args validator")
	}
	if err := cmd.Args(cmd, []string{}); err != nil {
		t.Errorf("expected no error for 0 args, got: %v", err)
	}
	if err := cmd.Args(cmd, []string{"a.json"}); err != nil {
		t.Errorf("expected no error for 1 arg, got: %v", err)
	}
	if err := cmd.Args(cmd, []string{"a.json", "b.json"}); err != nil {
		t.Errorf("expected no error for 2 args, got: %v", err)
	}
	if err := cmd.Args(cmd, []string{"a", "b", "c"}); err == nil {
		t.Error("expected error for 3 args")
	}
}

func TestCmdRunE_FileInput(t *testing.T) {
	dir := t.TempDir()
	f := filepath.Join(dir, "data.json")
	if err := os.WriteFile(f, []byte(`{"name":"test"}`), 0644); err != nil {
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
	if !strings.Contains(string(out), "test") {
		t.Errorf("output should contain 'test', got: %s", string(out))
	}
}

func TestCmdRunE_StdinInput(t *testing.T) {
	oldStdin := os.Stdin
	stdinR, stdinW, _ := os.Pipe()
	stdinW.Write([]byte(`{"name":"stdin_test"}`))
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
	if !strings.Contains(string(out), "stdin_test") {
		t.Errorf("output should contain 'stdin_test', got: %s", string(out))
	}
}

func TestCmdRunE_Query(t *testing.T) {
	dir := t.TempDir()
	f := filepath.Join(dir, "data.json")
	if err := os.WriteFile(f, []byte(`{"name":"john","age":30}`), 0644); err != nil {
		t.Fatal(err)
	}

	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	cmd := NewCmd()
	cmd.SetArgs([]string{f, "--query", ".name"})
	err := cmd.Execute()

	w.Close()
	os.Stdout = old

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	out, _ := io.ReadAll(r)
	if !strings.Contains(string(out), "john") {
		t.Errorf("output should contain 'john', got: %s", string(out))
	}
}

func TestCmdRunE_Diff(t *testing.T) {
	dir := t.TempDir()
	f1 := filepath.Join(dir, "a.json")
	f2 := filepath.Join(dir, "b.json")
	if err := os.WriteFile(f1, []byte(`{"a":1}`), 0644); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(f2, []byte(`{"a":2}`), 0644); err != nil {
		t.Fatal(err)
	}

	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	cmd := NewCmd()
	cmd.SetArgs([]string{f1, "--diff", f2})
	err := cmd.Execute()

	w.Close()
	os.Stdout = old

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	out, _ := io.ReadAll(r)
	if !strings.Contains(string(out), "a") {
		t.Errorf("output should contain diff, got: %s", string(out))
	}
}

func TestCmdRunE_Merge(t *testing.T) {
	dir := t.TempDir()
	base := filepath.Join(dir, "base.json")
	patch := filepath.Join(dir, "patch.json")
	if err := os.WriteFile(base, []byte(`{"a":1}`), 0644); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(patch, []byte(`{"b":2}`), 0644); err != nil {
		t.Fatal(err)
	}

	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	cmd := NewCmd()
	cmd.SetArgs([]string{base, "--merge", patch})
	err := cmd.Execute()

	w.Close()
	os.Stdout = old

	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	out, _ := io.ReadAll(r)
	if !strings.Contains(string(out), "1") || !strings.Contains(string(out), "2") {
		t.Errorf("output should contain merged values, got: %s", string(out))
	}
}

func TestCmdRunE_InvalidJSON(t *testing.T) {
	dir := t.TempDir()
	f := filepath.Join(dir, "bad.json")
	if err := os.WriteFile(f, []byte(`{invalid}`), 0644); err != nil {
		t.Fatal(err)
	}

	cmd := NewCmd()
	cmd.SetArgs([]string{f})
	err := cmd.Execute()
	if err == nil {
		t.Error("expected error for invalid JSON")
	}
}

func TestCmdRunE_MissingFile(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"/nonexistent/file.json"})
	err := cmd.Execute()
	if err == nil {
		t.Error("expected error for missing file")
	}
}

func TestCmdRunE_QueryMissingKey(t *testing.T) {
	dir := t.TempDir()
	f := filepath.Join(dir, "data.json")
	if err := os.WriteFile(f, []byte(`{"name":"test"}`), 0644); err != nil {
		t.Fatal(err)
	}

	cmd := NewCmd()
	cmd.SetArgs([]string{f, "--query", ".nonexistent"})
	err := cmd.Execute()
	if err == nil {
		t.Error("expected error for missing key in query")
	}
}
