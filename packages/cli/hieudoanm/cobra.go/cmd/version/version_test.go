package version

import (
	"bytes"
	"encoding/json"
	"os"
	"testing"
)

func TestNewCommand(t *testing.T) {
	cmd := NewCommand()
	if cmd == nil {
		t.Fatal("NewCommand() returned nil")
	}
	if cmd.Use != "version" {
		t.Errorf("Use = %q, want %q", cmd.Use, "version")
	}
	if cmd.Flag("json") == nil {
		t.Error("expected --json flag")
	}
}

func TestVersionOutput(t *testing.T) {
	V = "1.2.3"
	cmd := NewCommand()

	var buf bytes.Buffer
	cmd.SetOut(&buf)

	cmd.Run(cmd, []string{})
	if buf.String() != "Version: 1.2.3\n" {
		t.Errorf("output = %q", buf.String())
	}
}

func TestVersionJSONOutput(t *testing.T) {
	V = "2.0.0"
	cmd := NewCommand()

	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	cmd.Flags().Set("json", "true")
	cmd.Run(cmd, []string{})

	w.Close()
	os.Stdout = old

	var buf bytes.Buffer
	_, _ = buf.ReadFrom(r)

	var result map[string]interface{}
	if err := json.Unmarshal(buf.Bytes(), &result); err != nil {
		t.Fatalf("JSON decode: %v", err)
	}
	if result["version"] != "2.0.0" {
		t.Errorf("version = %v", result["version"])
	}
}
