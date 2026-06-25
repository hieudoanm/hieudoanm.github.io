package qrcode

import (
	"bytes"
	"encoding/json"
	"io"
	"os"
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

func TestCmd_RunE(t *testing.T) {
	cmd := NewCommand()

	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})

	if len(output) == 0 {
		t.Error("expected non-empty QR code output")
	}
}

func TestRunQRCode_JSON(t *testing.T) {
	output := captureOutput(func() {
		if err := runQRCode("hello", true); err != nil {
			t.Fatal(err)
		}
	})
	var result map[string]interface{}
	if err := json.Unmarshal([]byte(output), &result); err != nil {
		t.Fatalf("invalid JSON: %v\noutput: %s", err, output)
	}
	if result["data"] != "hello" {
		t.Errorf("expected data 'hello', got %v", result["data"])
	}
}
