package calc

import (
	"testing"
)

func TestDiscount(t *testing.T) {
	original := 100.0
	percent := 20.0
	discount := original * percent / 100
	final := original - discount
	if discount != 20 {
		t.Errorf("discount = %.2f, want 20", discount)
	}
	if final != 80 {
		t.Errorf("final = %.2f, want 80", final)
	}
}
