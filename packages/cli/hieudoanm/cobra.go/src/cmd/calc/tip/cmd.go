package tip

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	var bill, tipPercent float64
	var split int

	cmd := &cobra.Command{
		Use:   "tip",
		Short: "Calculate tip and split bill",
		Long: `Calculate the tip amount, total bill, and per-person share when splitting.

Enter the bill amount, tip percentage, and number of people to split.`,
		Example: `  calc tip --bill 50 --percent 15 --split 4
  calc tip -b 50 -p 15 -s 4`,
		RunE: func(cmd *cobra.Command, args []string) error {
			if split < 1 {
				split = 1
			}
			tip := bill * tipPercent / 100
			total := bill + tip
			perPerson := total / float64(split)

			if ok, _ := cmd.Flags().GetBool("json"); ok {
				out, err := json.MarshalIndent(map[string]interface{}{
					"bill":        bill,
					"tip_percent": tipPercent,
					"tip":         tip,
					"total":       total,
					"split":       split,
					"per_person":  perPerson,
				}, "", "  ")
				if err != nil {
					return err
				}
				fmt.Println(string(out))
			} else {
				fmt.Println("=== Tip Calculator ===")
				fmt.Printf("Bill:          %12.2f\n", bill)
				fmt.Printf("Tip %%:          %11.0f%%\n", tipPercent)
				fmt.Printf("Tip amount:    %12.2f\n", tip)
				fmt.Printf("Total:         %12.2f\n", total)
				fmt.Printf("Split:         %12d\n", split)
				fmt.Printf("Per person:    %12.2f\n", perPerson)
			}
			return nil
		},
	}

	cmd.Flags().Float64VarP(&bill, "bill", "b", 0, "Bill amount")
	cmd.Flags().Float64VarP(&tipPercent, "percent", "p", 15, "Tip percentage")
	cmd.Flags().IntVarP(&split, "split", "s", 1, "Number of people splitting")
	cmd.Flags().Bool("json", false, "Output in JSON format")
	return cmd
}
