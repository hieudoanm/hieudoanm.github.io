package calc

import (
	"fmt"

	"github.com/spf13/cobra"
)

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

func newBmiCmd() *cobra.Command {
	var weight, height float64

	cmd := &cobra.Command{
		Use:     "bmi",
		Short:   "Calculate Body Mass Index",
		Example: `  calc bmi --weight 70 --height 175`,
		RunE: func(cmd *cobra.Command, args []string) error {
			heightM := height / 100
			bmi := weight / (heightM * heightM)

			fmt.Println("=== BMI Calculator ===")
			fmt.Printf("Weight:        %12.1f kg\n", weight)
			fmt.Printf("Height:        %12.1f cm\n", height)
			fmt.Printf("BMI:           %12.1f\n", bmi)
			fmt.Printf("Category:      %12s\n", bmiCategory(bmi))
			return nil
		},
	}

	cmd.Flags().Float64VarP(&weight, "weight", "w", 0, "Weight in kg")
	cmd.Flags().Float64VarP(&height, "height", "h", 0, "Height in cm")
	return cmd
}
