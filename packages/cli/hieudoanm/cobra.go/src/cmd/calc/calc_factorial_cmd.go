package calc

import (
	"encoding/json"
	"fmt"
	"math/big"

	"github.com/spf13/cobra"
)

func newFactorialCmd() *cobra.Command {
	var number int
	cmd := &cobra.Command{
		Use:   "factorial [--number <n>]",
		Short: "Compute factorial of a number (n!)",
		Long:  `Calculate the factorial of a non-negative integer using arbitrary-precision arithmetic.`,
		Example: `  calc factorial --number 10
  calc factorial --number 100`,
		RunE: func(cmd *cobra.Command, args []string) error {
			n := int64(number)
			if n < 0 {
				return fmt.Errorf("factorial of negative number is undefined")
			}

			result := new(big.Int).MulRange(1, n)

			if ok, _ := cmd.Flags().GetBool("json"); ok {
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

	cmd.Flags().IntVarP(&number, "number", "n", 0, "Non-negative integer")
	return cmd
}
