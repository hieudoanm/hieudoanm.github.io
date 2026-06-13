package calc

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"
)

func newLcmCmd() *cobra.Command {
	var a, b int
	cmd := &cobra.Command{
		Use:   "lcm [--a <a> --b <b>]",
		Short: "Least common multiple of two numbers",
		Example: `  calc lcm --a 12 --b 18
  calc lcm --a 7 --b 5`,
		RunE: func(cmd *cobra.Command, args []string) error {
			ai, bi := int64(a), int64(b)
			result := ai / gcd(ai, bi) * bi
			if jsonOutput {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"a":   a,
					"b":   b,
					"lcm": result,
				}, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Println(result)
			}
			return nil
		},
	}

	cmd.Flags().IntVarP(&a, "a", "a", 0, "First number")
	cmd.Flags().IntVarP(&b, "b", "b", 0, "Second number")
	return cmd
}
