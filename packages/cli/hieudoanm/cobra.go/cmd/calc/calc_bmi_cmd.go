package calc

import (
	"encoding/json"
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
		Use:   "bmi",
		Short: "Calculate Body Mass Index",
		Long: `Calculate Body Mass Index (BMI) from weight and height.

BMI is calculated as weight (kg) divided by height (m) squared.
The result includes a weight category: Underweight, Normal, Overweight, or Obese.`,
		Example: `  calc bmi --weight 70 --height 175`,
		RunE: func(cmd *cobra.Command, args []string) error {
			heightM := height / 100
			bmi := weight / (heightM * heightM)

			if jsonOutput {
				out, _ := json.MarshalIndent(map[string]interface{}{
					"weight":   weight,
					"height":   height,
					"bmi":      bmi,
					"category": bmiCategory(bmi),
				}, "", "  ")
				fmt.Println(string(out))
			} else {
				fmt.Println("=== BMI Calculator ===")
				fmt.Printf("Weight:        %12.1f kg\n", weight)
				fmt.Printf("Height:        %12.1f cm\n", height)
				fmt.Printf("BMI:           %12.1f\n", bmi)
				fmt.Printf("Category:      %12s\n", bmiCategory(bmi))
			}
			return nil
		},
	}

	cmd.Flags().Float64VarP(&weight, "weight", "w", 0, "Weight in kg")
	cmd.Flags().Float64VarP(&height, "height", "h", 0, "Height in cm")
	return cmd
}
