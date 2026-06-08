package tax

import (
	"math"
	"testing"
)

func TestToMonthly(t *testing.T) {
	if toMonthly(120, Annual) != 10 {
		t.Error("toMonthly Annual failed")
	}
	if toMonthly(10, Monthly) != 10 {
		t.Error("toMonthly Monthly failed")
	}
}

func TestClampInsuranceBase(t *testing.T) {
	if clampInsuranceBase(50_000_000, true) != InsuranceCap {
		t.Errorf("Expected insurance cap %v, got %v", InsuranceCap, clampInsuranceBase(50_000_000, true))
	}
	if clampInsuranceBase(10_000_000, true) != 10_000_000 {
		t.Error("Should not clamp below cap")
	}
	if clampInsuranceBase(10_000_000, false) != 0 {
		t.Error("Should return 0 if insurance disabled")
	}
}

func TestCalculateTax(t *testing.T) {
	// 1. Taxable 0
	breakdown, total := calculateTax(0)
	if total != 0 || len(breakdown) != 0 {
		t.Errorf("calculateTax(0) failed: total=%v, len=%v", total, len(breakdown))
	}

	// 2. Taxable 10,000,000
	// Bracket 1: 5M * 5% = 250k
	// Bracket 2: 5M * 10% = 500k
	// Total: 750k
	breakdown, total = calculateTax(10_000_000)
	if total != 750_000 {
		t.Errorf("calculateTax(10M) failed: total=%v; expected 750,000", total)
	}
	if len(breakdown) != 2 {
		t.Errorf("calculateTax(10M) expected 2 brackets, got %d", len(breakdown))
	}
}

func TestSolveGrossFromNet(t *testing.T) {
	targetNet := 20_000_000.0
	gross := solveGrossFromNet(targetNet, 0, true)

	// Verify back
	base := clampInsuranceBase(gross, true)
	ins := base * sumRates(EmployeeInsurance)
	deductions := PersonalDeduction + ins
	taxable := math.Max(0, gross-deductions)
	_, tax := calculateTax(taxable)
	net := gross - ins - tax

	if math.Abs(net-targetNet) > 1 {
		t.Errorf("solveGrossFromNet failed: target=%v, got=%v (gross=%v)", targetNet, net, gross)
	}
}
