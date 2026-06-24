package age

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

func TestRunAge(t *testing.T) {
	output := captureOutput(func() {
		if err := runAge("1990-01-15", false); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "years") {
		t.Errorf("expected output with years, got: %s", output)
	}
}

func TestRunAge_JSON(t *testing.T) {
	output := captureOutput(func() {
		if err := runAge("1990-01-15", true); err != nil {
			t.Fatal(err)
		}
	})
	var result map[string]interface{}
	if err := json.Unmarshal([]byte(output), &result); err != nil {
		t.Fatalf("invalid JSON: %v\noutput: %s", err, output)
	}
	if result["birthdate"] != "1990-01-15" {
		t.Errorf("expected birthdate '1990-01-15', got %v", result["birthdate"])
	}
	if _, ok := result["years"]; !ok {
		t.Error("expected years field")
	}
}

func TestRunAge_FutureDate(t *testing.T) {
	err := runAge("2099-01-01", false)
	if err == nil {
		t.Fatal("expected error for future date")
	}
}
