package braille_test

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/braille"
)

func TestRun(t *testing.T) {
	cmd := braille.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := braille.Run(cmd, []string{"hello"}); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "⠓⠑⠇⠇⠕" {
		t.Errorf("Run = %q, want %q", got, "⠓⠑⠇⠇⠕")
	}
}
