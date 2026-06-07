package convert

import (
	"testing"
)

func TestNewURLCmd_Structure(t *testing.T) {
	cmd := newURLCmd()
	if cmd.Use != "url [text]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "url [text]")
	}
	if cmd.Short != "Encode or decode a URL" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Encode or decode a URL")
	}
	if cmd.Flag("decode") == nil {
		t.Error("expected --decode flag")
	}
}

func TestNewURLCmd_RunE_Encode(t *testing.T) {
	cmd := newURLCmd()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"hello world"}); err != nil {
			t.Fatal(err)
		}
	})
	if output != "hello+world" {
		t.Errorf("encode = %q, want %q", output, "hello+world")
	}
}

func TestNewURLCmd_RunE_Decode(t *testing.T) {
	cmd := newURLCmd()
	if err := cmd.Flags().Set("decode", "true"); err != nil {
		t.Fatal(err)
	}
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"hello+world"}); err != nil {
			t.Fatal(err)
		}
	})
	if output != "hello world" {
		t.Errorf("decode = %q, want %q", output, "hello world")
	}
}

func TestNewURLCmd_RunE_DecodeError(t *testing.T) {
	cmd := newURLCmd()
	if err := cmd.Flags().Set("decode", "true"); err != nil {
		t.Fatal(err)
	}
	err := cmd.RunE(cmd, []string{"%ZZinvalid"})
	if err == nil {
		t.Error("expected error for invalid URL encoding")
	}
}
