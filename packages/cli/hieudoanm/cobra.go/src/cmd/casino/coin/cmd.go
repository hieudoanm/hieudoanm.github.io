package coin

import (
	"encoding/json"
	"fmt"
	"math/rand"

	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	var count int
	cmd := &cobra.Command{
		Use:   "coin",
		Short: "Flip a coin",
		Long: `Simulate flipping one or more coins and display the results.

Shows heads/tails distribution when flipping multiple coins.`,
		Example: `  casino coin
  casino coin --count 10`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			results := make([]string, count)
			heads, tails := 0, 0
			for i := 0; i < count; i++ {
				if rand.Intn(2) == 0 {
					results[i] = "Heads"
					heads++
				} else {
					results[i] = "Tails"
					tails++
				}
			}

			if jsonOutput {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"results": results,
					"count":   count,
					"heads":   heads,
					"tails":   tails,
				}, "", "  ")
				fmt.Println(string(b))
			} else if count == 1 {
				fmt.Println(results[0])
			} else {
				for i, r := range results {
					fmt.Printf("%2d. %s\n", i+1, r)
				}
				fmt.Printf("\nHeads: %d (%d%%), Tails: %d (%d%%)\n",
					heads, heads*100/count, tails, tails*100/count)
			}
			return nil
		},
	}
	cmd.Flags().IntVarP(&count, "count", "n", 1, "Number of coin flips")
	return cmd
}
