package calc

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"
)

func newLcmCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "lcm <a> <b>",
		Short: "Least common multiple of two numbers",
		Example: `  calc lcm 12 18
  calc lcm 7 5`,
		Args: cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			a, b, err := parseTwoInts(args[0], args[1])
			if err != nil {
				return err
			}
			result := a / gcd(a, b) * b
			if calcJSON {
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
}
