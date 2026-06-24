package pascalcase_test

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/convert/pascalcase"
)

func TestRun(t *testing.T) {
	cmd := pascalcase.NewCommand()
	var buf strings.Builder
	cmd.SetOut(&buf)
	if err := pascalcase.Run(cmd, []string{"hello world"}); err != nil {
		t.Fatal(err)
	}
	got := strings.TrimSpace(buf.String())
	if got != "HelloWorld" {
		t.Errorf("Run = %q, want %q", got, "HelloWorld")
	}
}
