package convert

import (
	"encoding/base64"
	"os"
	"path/filepath"
	"testing"

	"github.com/spf13/cobra"
)

func TestNewBase64Cmd_Structure(t *testing.T) {
	cmd := newBase64Cmd()
	if cmd.Use != "base64" {
		t.Errorf("Use = %q, want %q", cmd.Use, "base64")
	}
	if cmd.Short != "Base64 encode/decode" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Base64 encode/decode")
	}
	if cmd.RunE == nil {
		t.Error("RunE should not be nil")
	}
}

func TestNewBase64Cmd_Subcommands(t *testing.T) {
	cmd := newBase64Cmd()
	names := make(map[string]*cobra.Command)
	for _, sub := range cmd.Commands() {
		names[sub.Name()] = sub
	}
	for _, name := range []string{"encode", "decode"} {
		if names[name] == nil {
			t.Errorf("missing subcommand: %s", name)
		}
	}
}

func TestNewBase64EncodeCmd_Structure(t *testing.T) {
	cmd := newBase64EncodeCmd()
	if cmd.Use != "encode [text]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "encode [text]")
	}
	if cmd.Short != "Encode text/file to base64" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Encode text/file to base64")
	}
	if cmd.Flag("file") == nil {
		t.Error("expected --file flag")
	}
	if cmd.Flag("output") == nil {
		t.Error("expected --output flag")
	}
}

func TestNewBase64EncodeCmd_RunE(t *testing.T) {
	cmd := newBase64EncodeCmd()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"hello world"}); err != nil {
			t.Fatal(err)
		}
	})
	expected := "aGVsbG8gd29ybGQ="
	if output != expected {
		t.Errorf("encode = %q, want %q", output, expected)
	}
}

func TestNewBase64DecodeCmd_Structure(t *testing.T) {
	cmd := newBase64DecodeCmd()
	if cmd.Use != "decode [text]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "decode [text]")
	}
	if cmd.Short != "Decode base64 to text/file" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Decode base64 to text/file")
	}
	if cmd.Flag("file") == nil {
		t.Error("expected --file flag")
	}
	if cmd.Flag("output") == nil {
		t.Error("expected --output flag")
	}
}

func TestNewBase64DecodeCmd_RunE(t *testing.T) {
	cmd := newBase64DecodeCmd()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"aGVsbG8gd29ybGQ="}); err != nil {
			t.Fatal(err)
		}
	})
	if output != "hello world" {
		t.Errorf("decode = %q, want %q", output, "hello world")
	}
}

func TestNewBase64DecodeCmd_RunE_DataURL(t *testing.T) {
	cmd := newBase64DecodeCmd()
	output := captureOutput(func() {
		err := cmd.RunE(cmd, []string{"data:image/png;base64,aGVsbG8="})
		if err != nil {
			t.Fatal(err)
		}
	})
	if output != "hello" {
		t.Errorf("decode data URL = %q, want %q", output, "hello")
	}
}

func TestNewBase64EncodeCmd_RunE_WithFile(t *testing.T) {
	dir := t.TempDir()
	in := filepath.Join(dir, "input.txt")
	os.WriteFile(in, []byte("hello file"), 0644)

	cmd := newBase64EncodeCmd()
	cmd.Flags().Set("file", in)
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, nil); err != nil {
			t.Fatal(err)
		}
	})
	expected := base64.StdEncoding.EncodeToString([]byte("hello file"))
	if output != expected {
		t.Errorf("encode file = %q, want %q", output, expected)
	}
}

func TestNewBase64EncodeCmd_RunE_WithOutput(t *testing.T) {
	dir := t.TempDir()
	out := filepath.Join(dir, "encoded.txt")

	cmd := newBase64EncodeCmd()
	cmd.Flags().Set("output", out)
	if err := cmd.RunE(cmd, []string{"hello"}); err != nil {
		t.Fatal(err)
	}
	data, err := os.ReadFile(out)
	if err != nil {
		t.Fatal(err)
	}
	if string(data) != "aGVsbG8=" {
		t.Errorf("output file = %q, want %q", string(data), "aGVsbG8=")
	}
}

func TestNewBase64EncodeCmd_RunE_FileError(t *testing.T) {
	cmd := newBase64EncodeCmd()
	cmd.Flags().Set("file", "/nonexistent/file.bin")
	err := cmd.RunE(cmd, nil)
	if err == nil {
		t.Error("expected error for nonexistent file")
	}
}

func TestNewBase64DecodeCmd_RunE_WithFile(t *testing.T) {
	dir := t.TempDir()
	in := filepath.Join(dir, "encoded.txt")
	os.WriteFile(in, []byte("aGVsbG8gZmlsZQ=="), 0644)

	cmd := newBase64DecodeCmd()
	cmd.Flags().Set("file", in)
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, nil); err != nil {
			t.Fatal(err)
		}
	})
	if output != "hello file" {
		t.Errorf("decode file = %q, want %q", output, "hello file")
	}
}

func TestNewBase64DecodeCmd_RunE_InvalidInput(t *testing.T) {
	cmd := newBase64DecodeCmd()
	err := cmd.RunE(cmd, []string{"!!!invalid base64!!!&*"})
	if err == nil {
		t.Error("expected error for invalid base64")
	}
}

func TestNewBase64DecodeCmd_RunE_WithOutput(t *testing.T) {
	dir := t.TempDir()
	out := filepath.Join(dir, "decoded.txt")

	cmd := newBase64DecodeCmd()
	cmd.Flags().Set("output", out)
	if err := cmd.RunE(cmd, []string{"aGVsbG8="}); err != nil {
		t.Fatal(err)
	}
	data, err := os.ReadFile(out)
	if err != nil {
		t.Fatal(err)
	}
	if string(data) != "hello" {
		t.Errorf("output file = %q, want %q", string(data), "hello")
	}
}

func TestStripDataURL(t *testing.T) {
	tests := []struct {
		input    string
		expected string
	}{
		{"data:image/png;base64,aGVsbG8=", "aGVsbG8="},
		{"aGVsbG8=", "aGVsbG8="},
		{"data:base64,hello", "hello"},
		{"", ""},
	}
	for _, tt := range tests {
		if got := stripDataURL(tt.input); got != tt.expected {
			t.Errorf("stripDataURL(%q) = %q, want %q", tt.input, got, tt.expected)
		}
	}
}

func TestEncodeBase64(t *testing.T) {
	tests := []struct {
		name     string
		input    []byte
		expected string
	}{
		{"empty", []byte(""), ""},
		{"hello", []byte("hello"), "aGVsbG8="},
		{"hello world", []byte("hello world"), "aGVsbG8gd29ybGQ="},
		{"binary", []byte{0x00, 0xFF, 0xAB}, "AP+r"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := encodeBase64(tt.input); got != tt.expected {
				t.Errorf("encodeBase64(%v) = %q, want %q", tt.input, got, tt.expected)
			}
		})
	}
}

func TestDecodeBase64(t *testing.T) {
	tests := []struct {
		name    string
		input   []byte
		want    string
		wantErr bool
	}{
		{"empty", []byte(""), "", false},
		{"hello", []byte("aGVsbG8="), "hello", false},
		{"data url", []byte("data:image/png;base64,aGVsbG8="), "hello", false},
		{"with newlines", []byte("aGVs\nbG8="), "hello", false},
		{"with whitespace", []byte("  aGVsbG8=  "), "hello", false},
		{"invalid input", []byte("!!!invalid!!!"), "", true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := decodeBase64(tt.input)
			if tt.wantErr {
				if err == nil {
					t.Error("expected error, got nil")
				}
				return
			}
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if string(got) != tt.want {
				t.Errorf("decodeBase64(%q) = %q, want %q", string(tt.input), string(got), tt.want)
			}
		})
	}
}

func TestNewBase64Cmd_RunE(t *testing.T) {
	cmd := newBase64Cmd()
	err := cmd.RunE(cmd, nil)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
}

func TestNewBase64EncodeCmd_RunE_NoArgs(t *testing.T) {
	cmd := newBase64EncodeCmd()
	err := cmd.RunE(cmd, nil)
	if err == nil {
		t.Error("expected error for no args and no --file")
	}
}

func TestNewBase64EncodeCmd_RunE_FileAndOutput(t *testing.T) {
	dir := t.TempDir()
	in := filepath.Join(dir, "input.txt")
	out := filepath.Join(dir, "output.txt")
	os.WriteFile(in, []byte("hello file"), 0644)

	cmd := newBase64EncodeCmd()
	cmd.Flags().Set("file", in)
	cmd.Flags().Set("output", out)
	if err := cmd.RunE(cmd, nil); err != nil {
		t.Fatal(err)
	}
	data, err := os.ReadFile(out)
	if err != nil {
		t.Fatal(err)
	}
	expected := base64.StdEncoding.EncodeToString([]byte("hello file"))
	if string(data) != expected {
		t.Errorf("output file = %q, want %q", string(data), expected)
	}
}

func TestNewBase64DecodeCmd_RunE_FileNotFound(t *testing.T) {
	cmd := newBase64DecodeCmd()
	cmd.Flags().Set("file", "/nonexistent/file.bin")
	err := cmd.RunE(cmd, nil)
	if err == nil {
		t.Error("expected error for nonexistent file")
	}
}

func TestNewBase64DecodeCmd_RunE_NoArgs(t *testing.T) {
	cmd := newBase64DecodeCmd()
	err := cmd.RunE(cmd, nil)
	if err == nil {
		t.Error("expected error for no args and no --file")
	}
}

func TestNewBase64DecodeCmd_RunE_FileAndOutput(t *testing.T) {
	dir := t.TempDir()
	in := filepath.Join(dir, "encoded.txt")
	out := filepath.Join(dir, "decoded.txt")
	os.WriteFile(in, []byte("aGVsbG8gZmlsZQ=="), 0644)

	cmd := newBase64DecodeCmd()
	cmd.Flags().Set("file", in)
	cmd.Flags().Set("output", out)
	if err := cmd.RunE(cmd, nil); err != nil {
		t.Fatal(err)
	}
	data, err := os.ReadFile(out)
	if err != nil {
		t.Fatal(err)
	}
	if string(data) != "hello file" {
		t.Errorf("output file = %q, want %q", string(data), "hello file")
	}
}

func TestNewBase64DecodeCmd_RunE_FileInvalidContent(t *testing.T) {
	dir := t.TempDir()
	in := filepath.Join(dir, "invalid.txt")
	os.WriteFile(in, []byte("!!!not base64!!!"), 0644)

	cmd := newBase64DecodeCmd()
	cmd.Flags().Set("file", in)
	err := cmd.RunE(cmd, nil)
	if err == nil {
		t.Error("expected error for invalid base64 in file")
	}
}

func TestNewBase64DecodeCmd_RunE_FileWithNewlines(t *testing.T) {
	dir := t.TempDir()
	in := filepath.Join(dir, "encoded.txt")
	os.WriteFile(in, []byte("aGVs\nbG8=\n"), 0644)

	cmd := newBase64DecodeCmd()
	cmd.Flags().Set("file", in)
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, nil); err != nil {
			t.Fatal(err)
		}
	})
	if output != "hello" {
		t.Errorf("decode file with newlines = %q, want %q", output, "hello")
	}
}
