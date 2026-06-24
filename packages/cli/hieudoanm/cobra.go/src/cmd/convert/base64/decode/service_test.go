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
