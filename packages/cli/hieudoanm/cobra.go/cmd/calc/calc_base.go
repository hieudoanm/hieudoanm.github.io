package calc

import (
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/spf13/cobra"
)

func newBaseCmd() *cobra.Command {
	var value string
	var from, to string

	cmd := &cobra.Command{
		Use:   "base",
		Short: "Convert between number bases (bin/oct/dec/hex)",
		Example: `  calc base --value FF --from hex --to dec
  calc base --value 255 --from dec --to hex
  calc base --value 1010 --from bin --to dec`,
		RunE: func(cmd *cobra.Command, args []string) error {
			base := map[string]int{
				"bin": 2, "binary": 2,
				"oct": 8, "octal": 8,
				"dec": 10, "decimal": 10,
				"hex": 16, "hexadecimal": 16,
			}
			fromBase, ok := base[from]
			if !ok {
				return fmt.Errorf("unknown base: %s (use bin/oct/dec/hex)", from)
			}
			toBase, ok := base[to]
			if !ok {
				return fmt.Errorf("unknown base: %s (use bin/oct/dec/hex)", to)
			}

			n, err := strconv.ParseInt(value, fromBase, 64)
			if err != nil {
				return fmt.Errorf("invalid value %q for base %s: %w", value, from, err)
			}

			result := strconv.FormatInt(n, toBase)
			baseNames := map[int]string{2: "binary", 8: "octal", 10: "decimal", 16: "hexadecimal"}

			if calcJSON {
				out, _ := json.MarshalIndent(map[string]interface{}{
					"value":  value,
					"from":   baseNames[fromBase],
					"to":     baseNames[toBase],
					"result": result,
				}, "", "  ")
				fmt.Println(string(out))
			} else {
				fmt.Printf("%s (%s) = %s (%s)\n", value, baseNames[fromBase], result, baseNames[toBase])
			}
			return nil
		},
	}

	cmd.Flags().StringVarP(&value, "value", "v", "", "Value to convert")
	cmd.Flags().StringVarP(&from, "from", "f", "dec", "Source base (bin/oct/dec/hex)")
	cmd.Flags().StringVarP(&to, "to", "t", "hex", "Target base (bin/oct/dec/hex)")
	return cmd
}
