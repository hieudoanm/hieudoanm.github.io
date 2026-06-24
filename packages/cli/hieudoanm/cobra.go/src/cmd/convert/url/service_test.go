package url_test

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/url"
)

func TestRun_Encode(t *testing.T) {
	cmd := url.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := url.Run(cmd, []string{"hello world"}, false); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "hello+world" {
		t.Errorf("encode = %q, want %q", got, "hello+world")
	}
}

func TestRun_Decode(t *testing.T) {
	cmd := url.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := url.Run(cmd, []string{"hello+world"}, true); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "hello world" {
		t.Errorf("decode = %q, want %q", got, "hello world")
	}
}

func TestRun_DecodeError(t *testing.T) {
	cmd := url.NewCommand()
	err := url.Run(cmd, []string{"%ZZinvalid"}, true)
	if err == nil {
		t.Error("expected error for invalid URL encoding")
	}
}
