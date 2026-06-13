package calc

type Period string
type SalaryMode string

const (
	Monthly Period = "monthly"
	Annual  Period = "annual"

	Gross SalaryMode = "gross"
	Net   SalaryMode = "net"
)

type TaxBracket struct {
	Limit float64
	Rate  float64
}

type TaxBreakdown struct {
	Rate    float64
	Taxable float64
	Tax     float64
}

const (
	PersonalDeduction  = 11_000_000
	DependentDeduction = 4_400_000
	InsuranceCap       = 36_000_000
)

var EmployeeInsurance = map[string]float64{
	"BHXH": 0.08,
	"BHYT": 0.015,
	"BHTN": 0.01,
}

var TaxBrackets = []TaxBracket{
	{5_000_000, 0.05},
	{5_000_000, 0.10},
	{8_000_000, 0.15},
	{14_000_000, 0.20},
	{20_000_000, 0.25},
	{28_000_000, 0.30},
	{1e18, 0.35},
}

func toMonthly(v float64, p Period) float64 {
	if p == Annual {
		return v / 12
	}
	return v
}

func sumRates(r map[string]float64) float64 {
	s := 0.0
	for _, v := range r {
		s += v
	}
	return s
}

func clampInsuranceBase(gross float64, enabled bool) float64 {
	if !enabled {
		return 0
	}
	if gross > InsuranceCap {
		return InsuranceCap
	}
	return gross
}

func calculateTax(taxable float64) ([]TaxBreakdown, float64) {
	var out []TaxBreakdown
	remain := taxable
	total := 0.0

	for _, b := range TaxBrackets {
		if remain <= 0 {
			break
		}
		apply := min(b.Limit, remain)
		tax := apply * b.Rate
		out = append(out, TaxBreakdown{b.Rate, apply, tax})
		total += tax
		remain -= apply
	}
	return out, total
}

func solveGrossFromNet(targetNet float64, dependents int, insurance bool) float64 {
	gross := targetNet
	for i := 0; i < 20; i++ {
		base := clampInsuranceBase(gross, insurance)
		ins := base * sumRates(EmployeeInsurance)
		deductions := PersonalDeduction + float64(dependents)*DependentDeduction + ins
		taxable := max(0, gross-deductions)
		_, tax := calculateTax(taxable)
		net := gross - ins - tax
		gross += targetNet - net
	}
	return gross
}

func min(a, b float64) float64 {
	if a < b {
		return a
	}
	return b
}

func max(a, b float64) float64 {
	if a > b {
		return a
	}
	return b
}
