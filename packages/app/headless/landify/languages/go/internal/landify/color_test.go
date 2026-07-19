package landify

import (
	"math"
	"testing"
)

func TestContrastRatio(t *testing.T) {
	for _, tc := range []struct {
		a, b string
		want float64
	}{
		{"#000000", "#ffffff", 21},
		{"#ffffff", "#ffffff", 1},
		{"#777777", "#777777", 1},
	} {
		got, err := contrastRatio(tc.a, tc.b)
		if err != nil {
			t.Fatalf("contrastRatio(%q, %q): %v", tc.a, tc.b, err)
		}
		if math.Abs(got-tc.want) > 0.01 {
			t.Errorf("contrastRatio(%q, %q) = %.2f, want %.2f", tc.a, tc.b, got, tc.want)
		}
	}
	// The ratio does not depend on which color is listed first.
	pairs := [][2]string{{"#1e293b", "#f8fafc"}, {"#0d9488", "#ffffff"}}
	for _, pair := range pairs {
		forward, err := contrastRatio(pair[0], pair[1])
		if err != nil {
			t.Fatal(err)
		}
		backward, err := contrastRatio(pair[1], pair[0])
		if err != nil {
			t.Fatal(err)
		}
		if forward != backward {
			t.Errorf("contrastRatio(%q, %q) = %.4f but reversed = %.4f", pair[0], pair[1], forward, backward)
		}
	}
	if _, err := contrastRatio("#fff", "#ffffff"); err == nil {
		t.Error("contrastRatio should reject a short hex color")
	}
}

func TestReadableOn(t *testing.T) {
	t.Run("keeps a color that already reads", func(t *testing.T) {
		got, err := readableOn("#181d25", "#ffffff", 4.5)
		if err != nil {
			t.Fatal(err)
		}
		if got != "#181d25" {
			t.Errorf("readableOn = %q, want the input unchanged", got)
		}
	})
	t.Run("darkens a light accent on a light background", func(t *testing.T) {
		got, err := readableOn("#0d9488", "#ffffff", 4.5)
		if err != nil {
			t.Fatal(err)
		}
		ratio, err := contrastRatio(got, "#ffffff")
		if err != nil {
			t.Fatal(err)
		}
		if ratio < 4.5 {
			t.Errorf("readableOn returned %s, only %.2f:1 on white", got, ratio)
		}
		if got == "#0d9488" {
			t.Error("readableOn should have darkened a low-contrast accent")
		}
	})
	t.Run("lightens a dark accent on a dark background", func(t *testing.T) {
		got, err := readableOn("#334155", "#0f172a", 4.5)
		if err != nil {
			t.Fatal(err)
		}
		ratio, err := contrastRatio(got, "#0f172a")
		if err != nil {
			t.Fatal(err)
		}
		if ratio < 4.5 {
			t.Errorf("readableOn returned %s, only %.2f:1 on the dark base", got, ratio)
		}
	})
	if _, err := readableOn("nope", "#ffffff", 4.5); err == nil {
		t.Error("readableOn should reject an unparsable color")
	}
}

func TestBlend(t *testing.T) {
	got, err := blend("#000000", "#ffffff", 0.5)
	if err != nil {
		t.Fatal(err)
	}
	if got != "#808080" {
		t.Errorf("blend = %q, want #808080", got)
	}
	end, err := blend("#123456", "#abcdef", 1)
	if err != nil {
		t.Fatal(err)
	}
	if end != "#abcdef" {
		t.Errorf("blend at 1 = %q, want the second color", end)
	}
	if _, err := blend("#fff", "#abcdef", 0.5); err == nil {
		t.Error("blend should reject an unparsable color")
	}
}
