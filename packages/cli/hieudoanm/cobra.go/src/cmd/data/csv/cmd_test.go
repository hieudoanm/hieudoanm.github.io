package csv

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
	if cmd.Use != "csv <file>" {
		t.Errorf("Use = %q", cmd.Use)
	}
	if cmd.HasFlags() {
		flag := cmd.Flag("json")
		if flag == nil {
			t.Error("expected --json flag")
		}
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
	if err := cmd.Args(cmd, []string{"file.csv"}); err != nil {
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
	if cmd.Use != "csv <file>" {
		t.Errorf("Use = %q, want %q", cmd.Use, "csv <file>")
	}
}

func TestCmdRunE_Stdin(t *testing.T) {
	oldStdin := os.Stdin
	stdinR, stdinW, _ := os.Pipe()
	stdinW.Write([]byte("a,b,c\n1,2,3\n"))
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
	if !strings.Contains(string(out), "1 | 2 | 3") {
		t.Errorf("output should contain piped record, got: %s", string(out))
	}
}

func TestCmdRunE_File(t *testing.T) {
	dir := t.TempDir()
	f := filepath.Join(dir, "test.csv")
	if err := os.WriteFile(f, []byte("x,y,z\n4,5,6\n"), 0644); err != nil {
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
	if !strings.Contains(string(out), "4 | 5 | 6") {
		t.Errorf("output should contain record, got: %s", string(out))
	}
}

func TestCmdRunE_JsonOutput(t *testing.T) {
	oldStdin := os.Stdin
	stdinR, stdinW, _ := os.Pipe()
	stdinW.Write([]byte("a,b\n1,2\n"))
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
	if !strings.Contains(string(out), "\"a\"") {
		t.Errorf("output should contain JSON, got: %s", string(out))
	}
}

func TestCmdRunE_MissingFile(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"/nonexistent/file.csv"})
	err := cmd.Execute()
	if err == nil {
		t.Error("expected error for missing file")
	}
}
