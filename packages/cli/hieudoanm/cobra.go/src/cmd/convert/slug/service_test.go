package slug_test

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/slug"
)

func TestRun(t *testing.T) {
	cmd := slug.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := slug.Run(cmd, []string{"Hello World!"}); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "hello-world" {
		t.Errorf("Run = %q, want %q", got, "hello-world")
	}
}
