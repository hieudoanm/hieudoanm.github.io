package file

import (
	"os"
	"testing"
)

func TestParseMode755(t *testing.T) {
	mode, err := parseMode("755")
	if err != nil {
		t.Fatalf("parseMode(\"755\") unexpected error: %v", err)
	}
	if mode != os.FileMode(0755) {
		t.Errorf("got %o, want %o", mode, 0755)
	}
}

func TestParseMode644(t *testing.T) {
	mode, err := parseMode("644")
	if err != nil {
		t.Fatalf("parseMode(\"644\") unexpected error: %v", err)
	}
	if mode != os.FileMode(0644) {
		t.Errorf("got %o, want %o", mode, 0644)
	}
}

func TestParseMode600(t *testing.T) {
	mode, err := parseMode("600")
	if err != nil {
		t.Fatalf("parseMode(\"600\") unexpected error: %v", err)
	}
	if mode != os.FileMode(0600) {
		t.Errorf("got %o, want %o", mode, 0600)
	}
}

func TestParseMode777(t *testing.T) {
	mode, err := parseMode("777")
	if err != nil {
		t.Fatalf("parseMode(\"777\") unexpected error: %v", err)
	}
	if mode != os.FileMode(0777) {
		t.Errorf("got %o, want %o", mode, 0777)
	}
}

func TestParseModeInvalidString(t *testing.T) {
	_, err := parseMode("abc")
	if err == nil {
		t.Fatal("parseMode(\"abc\") expected error")
	}
}

func TestParseModeInvalidOctal(t *testing.T) {
	_, err := parseMode("888")
	if err == nil {
		t.Fatal("parseMode(\"888\") expected error")
	}
}

func TestParseModeEmptyString(t *testing.T) {
	_, err := parseMode("")
	if err == nil {
		t.Fatal("parseMode(\"\") expected error")
	}
}
