package calc

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"
)

func newBmiCmd() *cobra.Command {
	var weight, height float64

	cmd := &cobra.Command{
		Use:     "bmi",
		Short:   "Calculate Body Mass Index",
		Example: `  calc bmi --weight 70 --height 175`,
		RunE: func(cmd *cobra.Command, args []string) error {
			heightM := height / 100
			bmi := weight / (heightM * heightM)

			if calcJSON {
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
