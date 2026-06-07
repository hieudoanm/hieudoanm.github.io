package epoch

import (
	"bytes"
	"encoding/json"
	"io"
	"os"
	"strconv"
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
	if cmd.Use != "epoch [timestamp]" {
		t.Errorf("expected Use 'epoch [timestamp]', got %q", cmd.Use)
	}
	if cmd.Short != "Convert between epoch timestamps and human-readable dates" {
		t.Errorf("expected Short 'Convert between epoch timestamps and human-readable dates', got %q", cmd.Short)
	}
	if cmd.Flag("from") == nil {
		t.Error("expected --from flag")
	}
	if cmd.Flag("relative") == nil {
		t.Error("expected --relative flag")
	}
	if cmd.Flag("format") == nil {
		t.Error("expected --format flag")
	}
	if cmd.Flag("iso") == nil {
		t.Error("expected --iso flag")
	}
	if cmd.Flag("unix") == nil {
		t.Error("expected --unix flag")
	}
	if cmd.Flag("json") == nil {
		t.Error("expected --json flag")
	}
}

func TestNewCmd_FromDateJSON(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"--from", "2024-06-11", "--json"})
	output := captureOutput(func() {
		if err := cmd.Execute(); err != nil {
			t.Fatal(err)
		}
	})
	var result map[string]interface{}
	if err := json.Unmarshal([]byte(output), &result); err != nil {
		t.Fatalf("invalid JSON: %v\noutput: %s", err, output)
	}
	if _, ok := result["epoch"]; !ok {
		t.Error("expected epoch field")
	}
	if _, ok := result["rfc3339"]; !ok {
		t.Error("expected rfc3339 field")
	}
}

func TestNewCmd_FromDateNumeric(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"--from", "2024-06-11"})
	output := captureOutput(func() {
		if err := cmd.Execute(); err != nil {
			t.Fatal(err)
		}
	})
	n, err := strconv.ParseInt(strings.TrimSpace(output), 10, 64)
	if err != nil {
		t.Errorf("expected numeric output, got %q: %v", output, err)
	}
	if n <= 0 {
		t.Errorf("expected positive epoch, got %d", n)
	}
}

func TestNewCmd_RelativeJSON(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"--relative", "2 hours ago", "--json"})
	output := captureOutput(func() {
		if err := cmd.Execute(); err != nil {
			t.Fatal(err)
		}
	})
	var result map[string]interface{}
	if err := json.Unmarshal([]byte(output), &result); err != nil {
		t.Fatalf("invalid JSON: %v\noutput: %s", err, output)
	}
	if _, ok := result["epoch"]; !ok {
		t.Error("expected epoch field")
	}
	if _, ok := result["rfc3339"]; !ok {
		t.Error("expected rfc3339 field")
	}
}

func TestNewCmd_ISOOutput(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"1718100000", "--iso"})
	output := captureOutput(func() {
		if err := cmd.Execute(); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "2024") {
		t.Errorf("expected year 2024 in output, got: %s", output)
	}
	if !strings.Contains(output, "T") {
		t.Errorf("expected ISO 8601 format (with T), got: %s", output)
	}
}

func TestNewCmd_NoArgs(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{})
	output := captureOutput(func() {
		if err := cmd.Execute(); err != nil {
			t.Fatal(err)
		}
	})
	if output == "" {
		t.Error("expected non-empty output for current time")
	}
}

func TestNewCmd_InvalidArg(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"not-a-timestamp"})
	err := cmd.Execute()
	if err == nil {
		t.Fatal("expected error for invalid timestamp")
	}
}

func TestNewCmd_UnixFlag(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"1718100000", "--unix"})
	output := captureOutput(func() {
		if err := cmd.Execute(); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "1718100000") {
		t.Errorf("expected 1718100000 in output, got: %s", output)
	}
}

func TestNewCmd_KnownTimestamp(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"1718100000"})
	output := captureOutput(func() {
		if err := cmd.Execute(); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "2024") {
		t.Errorf("expected year 2024 in output, got: %s", output)
	}
	if !strings.Contains(output, "06") && !strings.Contains(output, "Jun") {
		t.Errorf("expected June in output, got: %s", output)
	}
	if !strings.Contains(output, "11") {
		t.Errorf("expected day 11 in output, got: %s", output)
	}
}

func TestNewCmd_JSONOutput(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"--json", "1718100000"})
	output := captureOutput(func() {
		if err := cmd.Execute(); err != nil {
			t.Fatal(err)
		}
	})
	var result map[string]interface{}
	if err := json.Unmarshal([]byte(output), &result); err != nil {
		t.Fatalf("invalid JSON output: %v\noutput: %s", err, output)
	}
	if result["epoch"] != float64(1718100000) {
		t.Errorf("expected epoch 1718100000, got %v", result["epoch"])
	}
	rfc3339, ok := result["rfc3339"].(string)
	if !ok {
		t.Fatalf("expected rfc3339 to be a string, got %T", result["rfc3339"])
	}
	if !strings.Contains(rfc3339, "2024") {
		t.Errorf("expected rfc3339 to contain 2024, got %s", rfc3339)
	}
}

func TestNewCmd_FormatFlag(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"1718100000", "--format", "2006-01-02"})
	output := captureOutput(func() {
		if err := cmd.Execute(); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "2024-06-11") {
		t.Errorf("expected formatted date 2024-06-11, got: %s", output)
	}
}

func TestNewCmd_NoArgsJSON(t *testing.T) {
	cmd := NewCmd()
	cmd.SetArgs([]string{"--json"})
	output := captureOutput(func() {
		if err := cmd.Execute(); err != nil {
			t.Fatal(err)
		}
	})
	var result map[string]interface{}
	if err := json.Unmarshal([]byte(output), &result); err != nil {
		t.Fatalf("invalid JSON: %v\noutput: %s", err, output)
	}
	if _, ok := result["epoch"]; !ok {
		t.Error("expected epoch field")
	}
	if _, ok := result["rfc3339"]; !ok {
		t.Error("expected rfc3339 field")
	}
}
