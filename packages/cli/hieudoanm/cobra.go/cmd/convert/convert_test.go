package convert

import (
	"testing"
)

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
