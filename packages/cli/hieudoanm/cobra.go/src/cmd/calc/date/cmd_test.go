package date

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
	if cmd.Use != "date" {
		t.Errorf("Use = %q, want %q", cmd.Use, "date")
	}
	if cmd.Short != "Date arithmetic and difference" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Date arithmetic and difference")
	}
	if f := cmd.Flags().Lookup("add"); f == nil {
		t.Error("expected --add flag")
	}
	if f := cmd.Flags().Lookup("add-months"); f == nil {
		t.Error("expected --add-months flag")
	}
	if f := cmd.Flags().Lookup("add-years"); f == nil {
		t.Error("expected --add-years flag")
	}
	if f := cmd.Flags().Lookup("diff"); f == nil {
		t.Error("expected --diff flag")
	}
	if f := cmd.Flags().Lookup("format"); f == nil {
		t.Error("expected --format flag")
	}
}

func TestCmd_RunE_AddDays(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("add", "7")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if output == "" {
		t.Error("expected non-empty output")
	}
}

func TestCmd_RunE_InvalidDate(t *testing.T) {
	cmd := NewCmd()
	err := cmd.RunE(cmd, []string{"not-a-date"})
	if err == nil {
		t.Fatal("expected error for invalid date")
	}
	if !strings.Contains(err.Error(), "invalid date") {
		t.Errorf("expected invalid date error, got %v", err)
	}
}

func TestCmd_RunE_Diff(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("diff", "2026-01-01")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"2026-06-01"}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "days") {
		t.Errorf("expected days in output, got %q", output)
	}
}

func TestCmd_RunE_Json(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("add", "7")
	cmd.Flags().Set("json", "true")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	var result map[string]interface{}
	if err := json.Unmarshal([]byte(strings.TrimSpace(output)), &result); err != nil {
		t.Fatalf("invalid json output: %v", err)
	}
	if result["date"] == "" {
		t.Error("expected date in json output")
	}
}

func TestCmd_RunE_AddMonths(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("add-months", "3")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if output == "" {
		t.Error("expected non-empty output")
	}
}

func TestCmd_RunE_AddYears(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("add-years", "5")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if output == "" {
		t.Error("expected non-empty output")
	}
}

func TestCmd_RunE_DiffToday(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("diff", "2026-01-01")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "days") {
		t.Errorf("expected days in output, got %q", output)
	}
}

func TestCmd_RunE_DiffJson(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("diff", "2026-01-01")
	cmd.Flags().Set("json", "true")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"2026-06-01"}); err != nil {
			t.Fatal(err)
		}
	})
	var result map[string]interface{}
	if err := json.Unmarshal([]byte(strings.TrimSpace(output)), &result); err != nil {
		t.Fatalf("invalid json output: %v", err)
	}
	if result["days"] == nil {
		t.Error("expected days in json output")
	}
}

func TestCmd_RunE_Format(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("format", "January 2, 2006")
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	if output == "" {
		t.Error("expected non-empty output")
	}
}

func TestCmd_RunE_InvalidSecondDate(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("diff", "2026-01-01")
	err := cmd.RunE(cmd, []string{"2026-06-01", "not-a-date"})
	if err == nil || !strings.Contains(err.Error(), "invalid date") {
		t.Errorf("expected invalid date error, got %v", err)
	}
}
