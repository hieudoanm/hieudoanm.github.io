package dice

import (
	"encoding/json"
	"fmt"
	"math/rand"

	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	var sides, count int
	cmd := &cobra.Command{
		Use:   "dice",
		Short: "Roll dice",
		Long: `Roll one or more dice with a configurable number of sides.

Shows individual die results and the total when rolling multiple dice.`,
		Example: `  casino dice
  casino dice --sides 20
  casino dice --count 4 --sides 6`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			results := make([]int, count)
			var total int
			for i := 0; i < count; i++ {
				results[i] = rand.Intn(sides) + 1
				total += results[i]
			}

			if jsonOutput {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"results": results,
					"count":   count,
					"sides":   sides,
					"total":   total,
				}, "", "  ")
				fmt.Println(string(b))
			} else if count == 1 {
				fmt.Printf("🎲 %d\n", results[0])
			} else {
				fmt.Printf("Rolling %dd%d:\n", count, sides)
				for i, r := range results {
					fmt.Printf("  Die %d: %d\n", i+1, r)
				}
				fmt.Printf("\nTotal: %d\n", total)
			}
			return nil
		},
	}
	cmd.Flags().IntVarP(&sides, "sides", "s", 6, "Number of sides per die")
	cmd.Flags().IntVarP(&count, "count", "n", 1, "Number of dice to roll")
	return cmd
}
