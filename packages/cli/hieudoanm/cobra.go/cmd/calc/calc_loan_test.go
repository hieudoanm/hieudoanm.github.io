package calc

import (
	"math"
	"testing"
)

func TestLoanPayment(t *testing.T) {
	// $30k at 5% for 5 years = ~$566 monthly
	r := 5.0 / 100.0 / 12
	n := 5.0 * 12
	p := 30000.0
	payment := p * r * math.Pow(1+r, n) / (math.Pow(1+r, n) - 1)
	if math.Abs(payment-566.14) > 0.1 {
		t.Errorf("loan payment = %.2f, want ~566.14", payment)
	}
}
