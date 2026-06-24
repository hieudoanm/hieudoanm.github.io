package kebabcase_test

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/kebabcase"
)

func TestRun(t *testing.T) {
	cmd := kebabcase.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := kebabcase.Run(cmd, []string{"helloWorld"}); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "hello-world" {
		t.Errorf("Run = %q, want %q", got, "hello-world")
	}
}
