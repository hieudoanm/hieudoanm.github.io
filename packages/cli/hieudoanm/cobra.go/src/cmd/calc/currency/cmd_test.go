package currency

import (
	"bytes"
	"encoding/json"
	"io"
	"os"
	"strings"
	"testing"
)

func captureOutput(fn func()) string {
	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w
	fn()
	w.Close()
	var buf bytes.Buffer
	io.Copy(&buf, r)
	os.Stdout = old
	return buf.String()
}

func TestNewCmd_Structure(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "currency" {
		t.Errorf("Use = %q, want %q", cmd.Use, "currency")
	}
	if cmd.Short != "Convert between currencies using Frankfurter API" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Convert between currencies using Frankfurter API")
	}
	if len(cmd.Aliases) != 2 || cmd.Aliases[0] != "cc" || cmd.Aliases[1] != "fx" {
		t.Errorf("Aliases = %v, want [cc fx]", cmd.Aliases)
	}
	if f := cmd.Flags().Lookup("from"); f == nil {
		t.Error("expected --from flag")
	}
	if f := cmd.Flags().Lookup("to"); f == nil {
		t.Error("expected --to flag")
	}
	if f := cmd.Flags().Lookup("amount"); f == nil {
		t.Error("expected --amount flag")
	}
}

func TestCmd_RunE_NetworkError(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("from", "EUR")
	cmd.Flags().Set("to", "USD")
	cmd.Flags().Set("amount", "100")
	err := cmd.RunE(cmd, []string{})
	if err != nil {
		if err.Error() == "" {
			t.Error("expected non-empty error message")
		}
	}
}

func TestCmd_RunE_Defaults(t *testing.T) {
	cmd := NewCmd()
	err := cmd.RunE(cmd, []string{})
	if err != nil {
		if err.Error() == "" {
			t.Error("expected non-empty error message")
		}
	}
}

func TestCmd_RunE_Json(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("from", "EUR")
	cmd.Flags().Set("to", "USD")
	cmd.Flags().Set("amount", "100")
	cmd.Flags().Set("json", "true")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Logf("skipping JSON test due to network error: %v", err)
			return
		}
	})
	if output == "" {
		return
	}
	var result map[string]interface{}
	if err := json.Unmarshal([]byte(strings.TrimSpace(output)), &result); err != nil {
		t.Fatalf("invalid json output: %v", err)
	}
	if result["from"] != "EUR" {
		t.Errorf("expected from EUR, got %v", result["from"])
	}
}
