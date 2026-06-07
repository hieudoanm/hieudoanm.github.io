package convert

import (
	"testing"
)

func TestNewPascalcaseCmd_Structure(t *testing.T) {
	cmd := newPascalcaseCmd()
	if cmd.Use != "pascalcase [text]" {
		t.Errorf("Use = %q, want %q", cmd.Use, "pascalcase [text]")
	}
	if cmd.Short != "Convert a string to PascalCase" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Convert a string to PascalCase")
	}
}

func TestNewPascalcaseCmd_RunE(t *testing.T) {
	cmd := newPascalcaseCmd()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"hello world"}); err != nil {
			t.Fatal(err)
		}
	})
	if output != "HelloWorld" {
		t.Errorf("RunE = %q, want %q", output, "HelloWorld")
	}
}
