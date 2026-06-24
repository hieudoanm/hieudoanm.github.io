package uppercase_test

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/uppercase"
)

func TestRun(t *testing.T) {
	cmd := uppercase.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := uppercase.Run(cmd, []string{"hello"}); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "HELLO" {
		t.Errorf("Run = %q, want %q", got, "HELLO")
	}
}
