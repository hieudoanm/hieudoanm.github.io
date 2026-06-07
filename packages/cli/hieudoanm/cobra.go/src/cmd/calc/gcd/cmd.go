package gcd

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/calc/internal"
	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	var a, b int
	cmd := &cobra.Command{
		Use:   "gcd [--a <a> --b <b>]",
		Short: "Greatest common divisor of two numbers",
		Long:  `Compute the greatest common divisor (GCD) of two integers using the Euclidean algorithm.`,
		Example: `  calc gcd --a 12 --b 18
  calc gcd --a 100 --b 75`,
		RunE: func(cmd *cobra.Command, args []string) error {
			result := internal.Gcd(int64(a), int64(b))
			if ok, _ := cmd.Flags().GetBool("json"); ok {
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

	cmd.Flags().IntVarP(&a, "a", "a", 0, "First number")
	cmd.Flags().IntVarP(&b, "b", "b", 0, "Second number")
	cmd.Flags().Bool("json", false, "Output in JSON format")
	return cmd
}
