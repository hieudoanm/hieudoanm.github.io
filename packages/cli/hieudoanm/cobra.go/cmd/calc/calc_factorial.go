package calc

import (
	"encoding/json"
	"fmt"
	"math/big"

	"github.com/spf13/cobra"
)

func newFactorialCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "factorial <n>",
		Short: "Compute factorial of a number (n!)",
		Long:  `Calculate the factorial of a non-negative integer using arbitrary-precision arithmetic.`,
		Example: `  calc factorial 10
  calc factorial 100`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			var n int64
			if _, err := fmt.Sscanf(args[0], "%d", &n); err != nil {
				return fmt.Errorf("invalid integer %q", args[0])
			}
			if n < 0 {
				return fmt.Errorf("factorial of negative number is undefined")
			}

			result := new(big.Int).MulRange(1, n)

			if calcJSON {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"n":         n,
					"factorial": result.String(),
				}, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Println(result.String())
			}
			return nil
		},
	}
}
