package calc

import (
	"math"
	"testing"
)

func TestFindUnit(t *testing.T) {
	if u := findUnit("cm"); u == nil || u.cat != "length" {
		t.Error("findUnit('cm') should find length unit")
	}
	if u := findUnit("kg"); u == nil || u.cat != "weight" {
		t.Error("findUnit('kg') should find weight unit")
	}
	if u := findUnit("f"); u == nil || u.cat != "temperature" {
		t.Error("findUnit('f') should find temperature unit")
	}
	if u := findUnit("nonexistent"); u != nil {
		t.Error("findUnit('nonexistent') should return nil")
	}
}

func TestUnitConversion(t *testing.T) {
	// 12 inches = 0.3048 meters
	inch := findUnit("in")
	meter := findUnit("m")
	if inch == nil || meter == nil {
		t.Fatal("could not find inch or m")
	}
	base := inch.toBase(12)
	result := meter.fromBase(base)
	if math.Abs(result-0.3048) > 1e-4 {
		t.Errorf("12 in = %f m, want 0.3048", result)
	}

	// 32 F = 0 C
	f := findUnit("f")
	c := findUnit("c")
	if f == nil || c == nil {
		t.Fatal("could not find f or c")
	}
	base = f.toBase(32)
	result = c.fromBase(base)
	if math.Abs(result) > 0.01 {
		t.Errorf("32F = %f C, want 0", result)
	}
}
