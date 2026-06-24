package decode

import (
	"reflect"
	"testing"
)

func TestSplitJWT_threeParts(t *testing.T) {
	parts := splitJWT("header.payload.signature")
	want := []string{"header", "payload"}
	if !reflect.DeepEqual(parts, want) {
		t.Errorf("got %v, want %v", parts, want)
	}
}

func TestSplitJWT_twoParts(t *testing.T) {
	parts := splitJWT("header.payload")
	want := []string{"header.payload"}
	if !reflect.DeepEqual(parts, want) {
		t.Errorf("got %v, want %v", parts, want)
	}
}

func TestSplitJWT_empty(t *testing.T) {
	parts := splitJWT("")
	want := []string{""}
	if !reflect.DeepEqual(parts, want) {
		t.Errorf("got %v, want %v", parts, want)
	}
}

func TestSplitJWT_noDots(t *testing.T) {
	parts := splitJWT("justatext")
	want := []string{"justatext"}
	if !reflect.DeepEqual(parts, want) {
		t.Errorf("got %v, want %v", parts, want)
	}
}

func TestSplitJWT_fourParts(t *testing.T) {
	parts := splitJWT("a.b.c.d")
	want := []string{"a", "b"}
	if !reflect.DeepEqual(parts, want) {
		t.Errorf("got %v, want %v", parts, want)
	}
}

func TestSplitJWT_singleDot(t *testing.T) {
	parts := splitJWT("a.b")
	want := []string{"a.b"}
	if !reflect.DeepEqual(parts, want) {
		t.Errorf("got %v, want %v", parts, want)
	}
}

func TestSplitJWT_doubleDot(t *testing.T) {
	parts := splitJWT("a..b")
	want := []string{"a", ""}
	if !reflect.DeepEqual(parts, want) {
		t.Errorf("got %v, want %v", parts, want)
	}
}

func TestSplitJWT_trailingDot(t *testing.T) {
	parts := splitJWT("a.b.c.")
	want := []string{"a", "b"}
	if !reflect.DeepEqual(parts, want) {
		t.Errorf("got %v, want %v", parts, want)
	}
}

func TestSplitJWT_leadingDot(t *testing.T) {
	parts := splitJWT(".a.b")
	want := []string{"", "a"}
	if !reflect.DeepEqual(parts, want) {
		t.Errorf("got %v, want %v", parts, want)
	}
}
