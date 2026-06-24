package snakecase_test

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/snakecase"
)

func TestRun(t *testing.T) {
	cmd := snakecase.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := snakecase.Run(cmd, []string{"helloWorld"}); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "hello_world" {
		t.Errorf("Run = %q, want %q", got, "hello_world")
	}
}
