package convert

import (
	"testing"
)

func TestResolveText_WithArgs(t *testing.T) {
	text, err := resolveText([]string{"hello"})
	if err != nil {
		t.Fatal(err)
	}
	if text != "hello" {
		t.Errorf("resolveText = %q, want %q", text, "hello")
	}
}

func TestResolveText_MultipleArgs(t *testing.T) {
	text, err := resolveText([]string{"first", "second"})
	if err != nil {
		t.Fatal(err)
	}
	if text != "first" {
		t.Errorf("resolveText = %q, want %q", text, "first")
	}
}

func TestResolveText_EmptyArgs(t *testing.T) {
	_, err := resolveText([]string{})
	if err == nil {
		t.Skip("interactive survey succeeded (running in a terminal)")
	}
}
