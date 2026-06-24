package lowercase_test

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/lowercase"
)

func TestRun(t *testing.T) {
	cmd := lowercase.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := lowercase.Run(cmd, []string{"HELLO"}); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "hello" {
		t.Errorf("Run = %q, want %q", got, "hello")
	}
}
