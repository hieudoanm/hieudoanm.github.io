package calc

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"
)

func newGcdCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "gcd <a> <b>",
		Short: "Greatest common divisor of two numbers",
		Example: `  calc gcd 12 18
  calc gcd 100 75`,
		Args: cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			a, b, err := parseTwoInts(args[0], args[1])
			if err != nil {
				return err
			}
			result := gcd(a, b)
			if jsonOutput {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"a":   a,
					"b":   b,
					"gcd": result,
				}, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Println(result)
			}
			return nil
		},
	}
}
