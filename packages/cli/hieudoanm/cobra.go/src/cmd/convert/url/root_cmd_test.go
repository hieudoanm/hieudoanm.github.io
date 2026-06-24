package url_test

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/url"
)

func TestNewCommand_Structure(t *testing.T) {
	cmd := url.NewCommand()
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

func TestNewCommand_RunE_Encode(t *testing.T) {
	cmd := url.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := cmd.RunE(cmd, []string{"hello world"}); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "hello+world" {
		t.Errorf("encode = %q, want %q", got, "hello+world")
	}
}

func TestNewCommand_RunE_Decode(t *testing.T) {
	cmd := url.NewCommand()
	if err := cmd.Flags().Set("decode", "true"); err != nil {
		t.Fatal(err)
	}
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := cmd.RunE(cmd, []string{"hello+world"}); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "hello world" {
		t.Errorf("decode = %q, want %q", got, "hello world")
	}
}

func TestNewCommand_RunE_DecodeError(t *testing.T) {
	cmd := url.NewCommand()
	if err := cmd.Flags().Set("decode", "true"); err != nil {
		t.Fatal(err)
	}
	err := cmd.RunE(cmd, []string{"%ZZinvalid"})
	if err == nil {
		t.Error("expected error for invalid URL encoding")
	}
}
