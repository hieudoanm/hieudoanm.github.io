package jwt

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

const testJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

func TestDecodeCmd_RunE(t *testing.T) {
	cmd := newDecodeCmd()
	cmd.Flags().Set("token", testJWT)

	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})

	if !strings.Contains(output, "sub") {
		t.Error("expected JWT payload to contain 'sub' claim")
	}
	if !strings.Contains(output, "John Doe") {
		t.Error("expected JWT payload to contain 'John Doe'")
	}
}

func TestDecodeCmd_RunE_JSON(t *testing.T) {
	cmd := newDecodeCmd()
	cmd.Flags().Set("token", testJWT)
	cmd.Flags().Set("json", "true")

	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})

	var result map[string]interface{}
	if err := json.Unmarshal([]byte(output), &result); err != nil {
		t.Fatalf("expected valid JSON: %v\noutput: %s", err, output)
	}
	if _, ok := result["header"]; !ok {
		t.Error("expected header in JSON output")
	}
	if _, ok := result["payload"]; !ok {
		t.Error("expected payload in JSON output")
	}
}

func TestDecodeCmd_RunE_InvalidToken(t *testing.T) {
	cmd := newDecodeCmd()
	cmd.Flags().Set("token", "invalid.token")

	err := cmd.RunE(cmd, []string{})
	if err == nil {
		t.Fatal("expected error for invalid token")
	}
	if !strings.Contains(err.Error(), "parse failed") {
		t.Errorf("expected parse failed error, got %v", err)
	}
}

func TestNewDecodeCmd_Use(t *testing.T) {
	cmd := newDecodeCmd()
	if cmd.Use != "decode [--token <token>]" {
		t.Errorf("got Use %q, want %q", cmd.Use, "decode [--token <token>]")
	}
	if cmd.Short != "Decode a JWT token without signature verification" {
		t.Errorf("got Short %q, want %q", cmd.Short, "Decode a JWT token without signature verification")
	}
}

func TestNewDecodeCmd_Flags(t *testing.T) {
	cmd := newDecodeCmd()
	tests := []struct {
		name     string
		defValue string
		typ      string
	}{
		{"token", "", "string"},
		{"json", "false", "bool"},
	}
	for _, tt := range tests {
		f := cmd.Flag(tt.name)
		if f == nil {
			t.Errorf("missing flag: %s", tt.name)
			continue
		}
		if f.DefValue != tt.defValue {
			t.Errorf("flag %s: got DefValue %q, want %q", tt.name, f.DefValue, tt.defValue)
		}
		if f.Value.Type() != tt.typ {
			t.Errorf("flag %s: got type %q, want %q", tt.name, f.Value.Type(), tt.typ)
		}
	}
}

func TestEncodeCmd_RunE(t *testing.T) {
	cmd := newEncodeCmd()
	cmd.Flags().Set("key", "secret")
	cmd.Flags().Set("claims", `{"sub":"123","name":"test"}`)

	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})

	output = strings.TrimSpace(output)
	if !strings.Contains(output, ".") {
		t.Error("expected JWT token with dot separators")
	}
	parts := strings.Split(output, ".")
	if len(parts) != 3 {
		t.Errorf("expected 3 JWT segments, got %d", len(parts))
	}
}

func TestEncodeCmd_RunE_HS384(t *testing.T) {
	cmd := newEncodeCmd()
	cmd.Flags().Set("algorithm", "HS384")
	cmd.Flags().Set("key", "mysecret")
	cmd.Flags().Set("claims", `{"sub":"123"}`)

	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	output = strings.TrimSpace(output)
	if !strings.Contains(output, ".") {
		t.Error("expected JWT token with dot separators")
	}
	parts := strings.Split(output, ".")
	if len(parts) != 3 {
		t.Errorf("expected 3 JWT segments, got %d", len(parts))
	}
}

func TestEncodeCmd_RunE_HS512(t *testing.T) {
	cmd := newEncodeCmd()
	cmd.Flags().Set("algorithm", "HS512")
	cmd.Flags().Set("key", "mysecret")
	cmd.Flags().Set("claims", `{"sub":"123"}`)

	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{}); err != nil {
			t.Fatal(err)
		}
	})
	output = strings.TrimSpace(output)
	if !strings.Contains(output, ".") {
		t.Error("expected JWT token with dot separators")
	}
}

func TestEncodeCmd_RunE_InvalidAlgorithm(t *testing.T) {
	cmd := newEncodeCmd()
	cmd.Flags().Set("algorithm", "RS256")
	cmd.Flags().Set("key", "mysecret")
	cmd.Flags().Set("claims", `{"sub":"123"}`)

	err := cmd.RunE(cmd, []string{})
	if err == nil {
		t.Fatal("expected error for unsupported algorithm")
	}
	if !strings.Contains(err.Error(), "unsupported algorithm") {
		t.Errorf("expected unsupported algorithm error, got %v", err)
	}
}

func TestEncodeCmd_RunE_InvalidClaims(t *testing.T) {
	cmd := newEncodeCmd()
	cmd.Flags().Set("key", "mysecret")
	cmd.Flags().Set("claims", "not-json")

	err := cmd.RunE(cmd, []string{})
	if err == nil {
		t.Fatal("expected error for invalid claims")
	}
	if !strings.Contains(err.Error(), "invalid claims JSON") {
		t.Errorf("expected invalid claims JSON error, got %v", err)
	}
}

func TestNewEncodeCmd_Use(t *testing.T) {
	cmd := newEncodeCmd()
	if cmd.Use != "encode" {
		t.Errorf("got Use %q, want %q", cmd.Use, "encode")
	}
	if cmd.Short != "Encode and sign a JWT token" {
		t.Errorf("got Short %q, want %q", cmd.Short, "Encode and sign a JWT token")
	}
}

func TestNewEncodeCmd_Flags(t *testing.T) {
	cmd := newEncodeCmd()
	tests := []struct {
		name     string
		defValue string
		typ      string
	}{
		{"algorithm", "HS256", "string"},
		{"key", "", "string"},
		{"claims", "", "string"},
	}
	for _, tt := range tests {
		f := cmd.Flag(tt.name)
		if f == nil {
			t.Errorf("missing flag: %s", tt.name)
			continue
		}
		if f.DefValue != tt.defValue {
			t.Errorf("flag %s: got DefValue %q, want %q", tt.name, f.DefValue, tt.defValue)
		}
		if f.Value.Type() != tt.typ {
			t.Errorf("flag %s: got type %q, want %q", tt.name, f.Value.Type(), tt.typ)
		}
	}
}
