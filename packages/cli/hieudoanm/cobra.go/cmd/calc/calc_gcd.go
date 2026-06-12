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
			if calcJSON {
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

func gcd(a, b int64) int64 {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}

func parseTwoInts(sa, sb string) (int64, int64, error) {
	var a, b int64
	if _, err := fmt.Sscanf(sa, "%d", &a); err != nil {
		return 0, 0, fmt.Errorf("invalid integer %q", sa)
	}
	if _, err := fmt.Sscanf(sb, "%d", &b); err != nil {
		return 0, 0, fmt.Errorf("invalid integer %q", sb)
	}
	return a, b, nil
}
