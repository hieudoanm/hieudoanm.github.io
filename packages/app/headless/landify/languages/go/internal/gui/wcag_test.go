package gui

import (
	"math"
	"testing"

	"landify/internal/landify"
)

func TestContrast(t *testing.T) {
	cases := []struct {
		name string
		fg   string
		bg   string
		want float64
	}{
		{"white on black", "#ffffff", "#000000", 21.0},
		{"black on white", "#000000", "#ffffff", 21.0},
		{"same color", "#123456", "#123456", 1.0},
	}
	for _, tc := range cases {
		got, err := Contrast(tc.fg, tc.bg)
		if err != nil {
			t.Fatalf("%s: %v", tc.name, err)
		}
		if math.Abs(got-tc.want) > 0.01 {
			t.Errorf("%s: want %.2f, got %.2f", tc.name, tc.want, got)
		}
	}
}

func TestContrastInvalidHex(t *testing.T) {
	if _, err := Contrast("red", "#ffffff"); err == nil {
		t.Fatal("expected error for invalid color")
	}
	if _, err := Contrast("#fff", "#000000"); err == nil {
		t.Fatal("expected error for 3-digit hex")
	}
}

func TestWCAGLevel(t *testing.T) {
	cases := []struct {
		ratio float64
		want  string
	}{
		{7.5, "AAA"},
		{7.0, "AAA"},
		{4.6, "AA"},
		{3.1, "AA-lg"},
		{2.9, "fail"},
	}
	for _, tc := range cases {
		got := WCAGLevel(tc.ratio)
		if got != tc.want {
			t.Errorf("ratio %.2f: want %s, got %s", tc.ratio, tc.want, got)
		}
	}
}

func TestContrastReport(t *testing.T) {
	th := landify.DefaultTheme()
	report, err := ContrastReport(th)
	if err != nil {
		t.Fatal(err)
	}
	// The default theme must be valid enough to produce a full report.
	if len(report) == 0 {
		t.Fatal("expected a non-empty contrast report")
	}
	seen := map[string]bool{}
	for _, r := range report {
		if seen[r.Label] {
			t.Fatalf("duplicate report label %q", r.Label)
		}
		seen[r.Label] = true
	}
}

func TestRelativeLuminance(t *testing.T) {
	if l := relativeLuminance(255, 255, 255); math.Abs(l-1.0) > 0.001 {
		t.Errorf("white luminance: want 1.0, got %f", l)
	}
	if l := relativeLuminance(0, 0, 0); l != 0.0 {
		t.Errorf("black luminance: want 0.0, got %f", l)
	}
}
