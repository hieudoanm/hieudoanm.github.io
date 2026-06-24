package encode_test

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/base64/encode"
)

func TestRun(t *testing.T) {
	cmd := encode.NewCmd()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := encode.Run(cmd, []string{"hello"}, "", ""); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "aGVsbG8=" {
		t.Errorf("Run = %q, want %q", got, "aGVsbG8=")
	}
}

func TestRun_json(t *testing.T) {
	cmd := encode.NewCmd()
	cmd.Flags().Bool("json", false, "JSON output")
	cmd.Flags().Set("json", "true")
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := encode.Run(cmd, []string{"hello"}, "", ""); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if !strings.HasPrefix(got, "{") {
		t.Errorf("expected JSON output, got %q", got)
	}
}
