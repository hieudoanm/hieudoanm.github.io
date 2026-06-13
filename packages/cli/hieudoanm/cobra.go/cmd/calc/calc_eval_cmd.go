package calc

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"
)

func newEvalCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "eval <expression>",
		Short: "Evaluate a mathematical expression",
		Long: `Evaluate arbitrary math expressions with operators and functions.

Operators: +, -, *, /, ^ (power)
Functions: sqrt, sin, cos, tan, abs, floor, ceil, round, log, log10, exp
Constants: pi, e

Use parentheses for grouping.`,
		Example: `  calc eval "2 + 2"
  calc eval "sqrt(144) * 2"
  calc eval "pi * 5 ^ 2"
  calc eval "sin(45) ^ 2 + cos(45) ^ 2"`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			v, err := newEvaluator(args[0]).eval()
			if err != nil {
				return fmt.Errorf("eval: %w", err)
			}
			if jsonOutput {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"expression": args[0],
					"result":     v,
				}, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Println(v)
			}
			return nil
		},
	}
}
