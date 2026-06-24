package morse_test

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/morse"
)

func TestRun(t *testing.T) {
	cmd := morse.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := morse.Run(cmd, []string{"sos"}); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "... --- ..." {
		t.Errorf("Run = %q, want %q", got, "... --- ...")
	}
}
