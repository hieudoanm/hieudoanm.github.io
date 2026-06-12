package calc

import (
	"encoding/json"
	"fmt"
	"math/rand/v2"

	"github.com/spf13/cobra"
)

func newRandomCmd() *cobra.Command {
	var min, max float64
	var count int

	cmd := &cobra.Command{
		Use:   "random",
		Short: "Generate random numbers",
		Long:  `Generate random integers or floats within a range.`,
		Example: `  calc random --min 1 --max 100
  calc random --min 1 --max 100 --count 5
  calc random --min 0 --max 1 --float --count 3`,
		RunE: func(cmd *cobra.Command, args []string) error {
			if count < 1 {
				count = 1
			}

			nums := make([]float64, count)
			for i := range count {
				if calcJSON {
				}
				nums[i] = min + rand.Float64()*(max-min)
			}

			if calcJSON {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"min":    min,
					"max":    max,
					"count":  count,
					"values": nums,
				}, "", "  ")
				fmt.Println(string(b))
			} else {
				for _, v := range nums {
					fmt.Println(v)
				}
			}
			return nil
		},
	}

	cmd.Flags().Float64VarP(&min, "min", "m", 1, "Minimum value")
	cmd.Flags().Float64VarP(&max, "max", "x", 100, "Maximum value")
	cmd.Flags().IntVarP(&count, "count", "n", 1, "Number of values")
	return cmd
}
