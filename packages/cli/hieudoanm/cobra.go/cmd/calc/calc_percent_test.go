package calc

import (
	"testing"
)

func TestPercentOf(t *testing.T) {
	value := 20.0
	of := 50.0
	pct := value / of * 100
	if pct != 40 {
		t.Errorf("20/50*100 = %f, want 40", pct)
	}
}

func TestPercentPlus(t *testing.T) {
	value := 50.0
	pct := 20.0
	result := value * (1 + pct/100)
	if result != 60 {
		t.Errorf("50 + 20%% = %f, want 60", result)
	}
}

func TestPercentMinus(t *testing.T) {
	value := 50.0
	pct := 20.0
	result := value * (1 - pct/100)
	if result != 40 {
		t.Errorf("50 - 20%% = %f, want 40", result)
	}
}
