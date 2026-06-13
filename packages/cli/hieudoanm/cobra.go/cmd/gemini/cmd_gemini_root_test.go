package gemini

import (
	"testing"
)

func TestNewCommand(t *testing.T) {
	cmd := NewCommand()
	if cmd.Use != "gemini" {
		t.Errorf("expected Use 'gemini', got %q", cmd.Use)
	}

	sub, _, err := cmd.Find([]string{"code"})
	if err != nil {
		t.Errorf("expected subcommand 'code', got error: %v", err)
	}
	if sub.Use != "code" {
		t.Errorf("expected subcommand Use 'code', got %q", sub.Use)
	}
}

func TestGeminiCodeCmd(t *testing.T) {
	cmd := newCodeCmd()
	if cmd.Use != "code" {
		t.Errorf("expected Use 'code', got %q", cmd.Use)
	}
	if cmd.Short != "Gemini-powered AI coding assistant" {
		t.Errorf("expected Short %q, got %q", "Gemini-powered AI coding assistant", cmd.Short)
	}
}

func TestModelName_knownIDs(t *testing.T) {
	tests := []struct {
		id   string
		want string
	}{
		{"gemini-3.5-flash", "Gemini 3.5 Flash"},
		{"gemini-2.5-flash", "Gemini 2.5 Flash"},
		{"gemini-2.5-flash-lite", "Gemini 2.5 Flash-Lite"},
		{"gemini-2.0-flash", "Gemini 2.0 Flash"},
	}

	for _, tt := range tests {
		got := modelName(tt.id)
		if got != tt.want {
			t.Errorf("modelName(%q) = %q, want %q", tt.id, got, tt.want)
		}
	}
}

func TestModelName_unknownID(t *testing.T) {
	id := "models/unknown-model"
	got := modelName(id)
	if got != id {
		t.Errorf("modelName(%q) = %q, want %q (fallback to ID)", id, got, id)
	}
}

func TestModelName_emptyString(t *testing.T) {
	got := modelName("")
	if got != "" {
		t.Errorf("modelName(\"\") = %q, want \"\"", got)
	}
}
