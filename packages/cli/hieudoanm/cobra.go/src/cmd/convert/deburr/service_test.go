package deburr_test

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/deburr"
)

func TestRun(t *testing.T) {
	cmd := deburr.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := deburr.Run(cmd, []string{"héllo"}); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "hello" {
		t.Errorf("Run = %q, want %q", got, "hello")
	}
}
