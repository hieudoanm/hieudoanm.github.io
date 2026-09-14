package id

import "testing"

func TestGenerate(t *testing.T) {
	a := Generate()
	if len(a) != 32 {
		t.Fatalf("expected 32 hex chars, got %d: %s", len(a), a)
	}
	b := Generate()
	if a == b {
		t.Fatal("expected different IDs")
	}
}
