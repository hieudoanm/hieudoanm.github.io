package calc

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"
)

func newUnitCmd() *cobra.Command {
	var value float64
	var from, to string

	cmd := &cobra.Command{
		Use:   "unit",
		Short: "Convert between units (length, weight, temp, speed)",
		Long:  `Convert values between different units of measurement.`,
		Example: `  calc unit --value 12 --from inch --to cm
  calc unit -v 32 -f f -t c
  calc unit -v 100 -f kg -t lb`,
		RunE: func(cmd *cobra.Command, args []string) error {
			fromUnit := findUnit(from)
			if fromUnit == nil {
				return fmt.Errorf("unknown unit: %s", from)
			}
			toUnit := findUnit(to)
			if toUnit == nil {
				return fmt.Errorf("unknown unit: %s", to)
			}
			if fromUnit.cat != toUnit.cat {
				return fmt.Errorf("cannot convert %s (%s) to %s (%s)", from, fromUnit.cat, to, toUnit.cat)
			}

			base := fromUnit.toBase(value)
			result := toUnit.fromBase(base)
			if jsonOutput {
				out, _ := json.MarshalIndent(map[string]interface{}{
					"value":    value,
					"from":     from,
					"to":       to,
					"result":   result,
					"category": fromUnit.cat,
				}, "", "  ")
				fmt.Println(string(out))
			} else {
				fmt.Printf("%g %s = %g %s\n", value, from, result, to)
			}
			return nil
		},
	}

	cmd.Flags().Float64VarP(&value, "value", "v", 0, "Value to convert")
	cmd.Flags().StringVarP(&from, "from", "f", "", "Source unit")
	cmd.Flags().StringVarP(&to, "to", "t", "", "Target unit")
	return cmd
}
