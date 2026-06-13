package calc

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"
)

func newPercentCmd() *cobra.Command {
	var value, of, plus, minus float64

	cmd := &cobra.Command{
		Use:   "percent",
		Short: "Calculate percentages",
		Long:  `Calculate what percent one number is of another, or add/subtract a percentage.`,
		Example: `  calc percent --value 20 --of 50
  calc percent --value 50 --plus 20
  calc percent --value 50 --minus 20`,
		RunE: func(cmd *cobra.Command, args []string) error {
			switch {
			case of != 0:
				pct := value / of * 100
				if calcJSON {
					out, _ := json.MarshalIndent(map[string]interface{}{
						"value":      value,
						"of":         of,
						"percentage": pct,
						"type":       "percentage_of",
					}, "", "  ")
					fmt.Println(string(out))
				} else {
					fmt.Printf("%.2f is %.2f%% of %.2f\n", value, pct, of)
				}
			case plus != 0:
				result := value * (1 + plus/100)
				if calcJSON {
					out, _ := json.MarshalIndent(map[string]interface{}{
						"value":  value,
						"change": plus,
						"result": result,
						"type":   "add_percentage",
					}, "", "  ")
					fmt.Println(string(out))
				} else {
					fmt.Printf("%.2f + %.2f%% = %.2f\n", value, plus, result)
				}
			case minus != 0:
				result := value * (1 - minus/100)
				if calcJSON {
					out, _ := json.MarshalIndent(map[string]interface{}{
						"value":  value,
						"change": minus,
						"result": result,
						"type":   "subtract_percentage",
					}, "", "  ")
					fmt.Println(string(out))
				} else {
					fmt.Printf("%.2f - %.2f%% = %.2f\n", value, minus, result)
				}
			default:
				return fmt.Errorf("use --of, --plus, or --minus")
			}
			return nil
		},
	}

	cmd.Flags().Float64VarP(&value, "value", "v", 0, "Base value")
	cmd.Flags().Float64VarP(&of, "of", "o", 0, "Calculate what % value is of this")
	cmd.Flags().Float64VarP(&plus, "plus", "p", 0, "Add percentage")
	cmd.Flags().Float64VarP(&minus, "minus", "m", 0, "Subtract percentage")
	return cmd
}
