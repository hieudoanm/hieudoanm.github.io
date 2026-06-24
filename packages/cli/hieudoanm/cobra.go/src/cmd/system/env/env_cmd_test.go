package env

import (
	"io"
	"os"
	"strings"
	"testing"
)

func captureOutput(fn func()) string {
	r, w, _ := os.Pipe()
	orig := os.Stdout
	os.Stdout = w
	fn()
	w.Close()
	out, _ := io.ReadAll(r)
	os.Stdout = orig
	return string(out)
}

func TestNewCmd_Structure(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "env [key]" {
		t.Errorf("Use = %q, want 'env [key]'", cmd.Use)
	}
	if cmd.Short != "List or search environment variables" {
		t.Errorf("Short = %q, want 'List or search environment variables'", cmd.Short)
	}
	if f := cmd.Flags().Lookup("sort"); f == nil {
		t.Error("expected --sort flag")
	} else if f.DefValue != "false" {
		t.Errorf("--sort default = %q, want 'false'", f.DefValue)
	}
	if f := cmd.Flags().Lookup("json"); f == nil {
		t.Error("expected --json flag")
	} else if f.DefValue != "false" {
		t.Errorf("--json default = %q, want 'false'", f.DefValue)
	}
}

func TestNewCmd_RunE(t *testing.T) {
	cmd := NewCmd()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"PATH"}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "PATH=") {
		t.Errorf("expected PATH= in output, got %q", output)
	}
}

func TestNewCmd_RunE_JSON(t *testing.T) {
	cmd := NewCmd()
	if err := cmd.Flags().Set("json", "true"); err != nil {
		t.Fatal(err)
	}
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"HOME"}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, `"key"`) {
		t.Errorf("expected JSON key field, got %q", output)
	}
}
