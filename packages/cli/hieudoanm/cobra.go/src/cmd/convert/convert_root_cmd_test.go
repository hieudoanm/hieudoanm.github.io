package convert

import (
	"testing"
)

func TestNewCommand_Structure(t *testing.T) {
	cmd := NewCommand()
	if cmd.Use != "convert" {
		t.Errorf("Use = %q, want %q", cmd.Use, "convert")
	}
	if cmd.Short != "Text conversion utilities" {
		t.Errorf("Short = %q, want %q", cmd.Short, "Text conversion utilities")
	}
	if cmd.Flag("json") == nil {
		t.Error("expected --json persistent flag")
	}
}

func TestNewCommand_HasAllSubcommands(t *testing.T) {
	cmd := NewCommand()
	names := make(map[string]bool)
	for _, sub := range cmd.Commands() {
		names[sub.Name()] = true
	}
	expected := []string{
		"braille", "morse", "base64", "url", "capitalise", "deburr",
		"kebabcase", "camelcase", "pascalcase", "slug", "lowercase",
		"snakecase", "uppercase", "count",
	}
	for _, name := range expected {
		if !names[name] {
			t.Errorf("missing subcommand: %s", name)
		}
	}
	if len(cmd.Commands()) != len(expected) {
		t.Errorf("expected %d subcommands, got %d", len(expected), len(cmd.Commands()))
	}
}

func TestNewCommand_SubcommandUseMatches(t *testing.T) {
	cmd := NewCommand()
	expectations := map[string]string{
		"braille":    "braille [text]",
		"morse":      "morse [text]",
		"base64":     "base64",
		"url":        "url [text]",
		"capitalise": "capitalise [text]",
		"deburr":     "deburr [text]",
		"kebabcase":  "kebabcase [text]",
		"camelcase":  "camelcase [text]",
		"pascalcase": "pascalcase [text]",
		"slug":       "slug [text]",
		"lowercase":  "lowercase [text]",
		"snakecase":  "snakecase [text]",
		"uppercase":  "uppercase [text]",
		"count":      "count <text>",
	}
	for _, sub := range cmd.Commands() {
		expected, ok := expectations[sub.Name()]
		if !ok {
			continue
		}
		if sub.Use != expected {
			t.Errorf("%s.Use = %q, want %q", sub.Name(), sub.Use, expected)
		}
	}
}

func TestCapitalise(t *testing.T) {
	if Capitalise("hello world") != "Hello World" {
		t.Errorf(`Capitalise("hello world") = %q`, Capitalise("hello world"))
	}
	if Capitalise("") != "" {
		t.Errorf(`Capitalise("") = %q`, Capitalise(""))
	}
}

func TestDeburr(t *testing.T) {
	if Deburr("héllo wörld") != "hello world" {
		t.Errorf(`Deburr("héllo wörld") = %q`, Deburr("héllo wörld"))
	}
	if Deburr("café") != "cafe" {
		t.Errorf(`Deburr("café") = %q`, Deburr("café"))
	}
}

func TestToKebabCase(t *testing.T) {
	if ToKebabCase("helloWorld") != "hello-world" {
		t.Errorf(`ToKebabCase("helloWorld") = %q`, ToKebabCase("helloWorld"))
	}
	if ToKebabCase("Hello World") != "hello-world" {
		t.Errorf(`ToKebabCase("Hello World") = %q`, ToKebabCase("Hello World"))
	}
}

func TestToSnakeCase(t *testing.T) {
	if ToSnakeCase("helloWorld") != "hello_world" {
		t.Errorf(`ToSnakeCase("helloWorld") = %q`, ToSnakeCase("helloWorld"))
	}
	if ToSnakeCase("Hello World") != "hello_world" {
		t.Errorf(`ToSnakeCase("Hello World") = %q`, ToSnakeCase("Hello World"))
	}
}

func TestToBraille(t *testing.T) {
	if ToBraille("hello") != "⠓⠑⠇⠇⠕" {
		t.Errorf(`ToBraille("hello") = %q`, ToBraille("hello"))
	}
	if ToBraille("Hello") != "⠓⠑⠇⠇⠕" {
		t.Errorf(`ToBraille("Hello") = %q`, ToBraille("Hello"))
	}
}

func TestToMorse(t *testing.T) {
	if ToMorse("sos") != "... --- ..." {
		t.Errorf(`ToMorse("sos") = %q`, ToMorse("sos"))
	}
	if ToMorse("SOS") != "... --- ..." {
		t.Errorf(`ToMorse("SOS") = %q`, ToMorse("SOS"))
	}
}
