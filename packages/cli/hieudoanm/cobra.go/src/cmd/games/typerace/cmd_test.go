package typerace

import (
	"testing"
)

func TestNewCommand(t *testing.T) {
	cmd := NewCommand()
	if cmd.Use != "typerace" {
		t.Errorf("NewCommand().Use = %q, want %q", cmd.Use, "typerace")
	}
	if cmd.Short == "" {
		t.Error("NewCommand().Short should not be empty")
	}
}

func TestPassagesNotEmpty(t *testing.T) {
	if len(passages) == 0 {
		t.Fatal("passages slice is empty")
	}
	for i, p := range passages {
		if p == "" {
			t.Errorf("passages[%d] is empty", i)
		}
	}
}
