package time

import (
	"encoding/json"
	"strings"
	"testing"
)

func TestEpochCmd_KnownTimestamp(t *testing.T) {
	cmd := newEpochCmd()
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

func TestEpochCmd_JSONOutput(t *testing.T) {
	cmd := newEpochCmd()
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
