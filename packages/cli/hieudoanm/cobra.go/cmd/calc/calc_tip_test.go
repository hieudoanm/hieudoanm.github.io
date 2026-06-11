package calc

import (
	"testing"
)

func TestTipCalculation(t *testing.T) {
	bill := 50.0
	tipPct := 15.0
	split := 4
	tip := bill * tipPct / 100
	total := bill + tip
	perPerson := total / float64(split)
	if tip != 7.5 {
		t.Errorf("tip = %.2f, want 7.5", tip)
	}
	if total != 57.5 {
		t.Errorf("total = %.2f, want 57.5", total)
	}
	if perPerson != 14.375 {
		t.Errorf("perPerson = %.4f, want 14.375", perPerson)
	}
}
