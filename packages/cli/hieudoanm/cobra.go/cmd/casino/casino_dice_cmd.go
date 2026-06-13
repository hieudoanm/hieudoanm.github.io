package casino

import (
	"fmt"
	"math/rand"

	"github.com/spf13/cobra"
)

func newDiceCmd() *cobra.Command {
	var sides, count int
	cmd := &cobra.Command{
		Use:   "dice",
		Short: "Roll dice",
		Example: `  casino dice
  casino dice --sides 20
  casino dice --count 4 --sides 6`,
		RunE: func(cmd *cobra.Command, args []string) error {
			results := make([]int, count)
			total := 0
			for i := 0; i < count; i++ {
				results[i] = rand.Intn(sides) + 1
				total += results[i]
			}

			if count == 1 {
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
