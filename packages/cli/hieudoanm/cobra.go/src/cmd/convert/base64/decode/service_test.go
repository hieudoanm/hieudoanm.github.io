package decode_test

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/base64/decode"
)

func TestRun(t *testing.T) {
	cmd := decode.NewCmd()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := decode.Run(cmd, []string{"aGVsbG8="}, "", ""); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "hello" {
		t.Errorf("Run = %q, want %q", got, "hello")
	}
}

func TestRun_json(t *testing.T) {
	cmd := decode.NewCmd()
	cmd.Flags().Bool("json", false, "JSON output")
	cmd.Flags().Set("json", "true")
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := decode.Run(cmd, []string{"aGVsbG8="}, "", ""); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if !strings.HasPrefix(got, "{") {
		t.Errorf("expected JSON output, got %q", got)
	}
}
