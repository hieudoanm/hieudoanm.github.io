package calc

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"
)

func newDiscountCmd() *cobra.Command {
	var original, percent float64

	cmd := &cobra.Command{
		Use:   "discount",
		Short: "Calculate discount and sale price",
		Example: `  calc discount --original 100 --percent 20
  calc discount -o 100 -p 20`,
		RunE: func(cmd *cobra.Command, args []string) error {
			discount := original * percent / 100
			final := original - discount

			if calcJSON {
				out, _ := json.MarshalIndent(map[string]interface{}{
					"original":    original,
					"percent":     percent,
					"discount":    discount,
					"final_price": final,
				}, "", "  ")
				fmt.Println(string(out))
			} else {
				fmt.Println("=== Discount Calculator ===")
				fmt.Printf("Original price:  %12.2f\n", original)
				fmt.Printf("Discount:        %12.2f%%\n", percent)
				fmt.Printf("You save:        %12.2f\n", discount)
				fmt.Printf("Final price:     %12.2f\n", final)
			}
			return nil
		},
	}

	cmd.Flags().Float64VarP(&original, "original", "o", 0, "Original price")
	cmd.Flags().Float64VarP(&percent, "percent", "p", 0, "Discount percentage")
	return cmd
}
