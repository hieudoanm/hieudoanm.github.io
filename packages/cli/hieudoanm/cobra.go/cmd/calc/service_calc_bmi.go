package calc

func bmiCategory(bmi float64) string {
	switch {
	case bmi < 18.5:
		return "Underweight"
	case bmi < 25:
		return "Normal"
	case bmi < 30:
		return "Overweight"
	default:
		return "Obese"
	}
}
