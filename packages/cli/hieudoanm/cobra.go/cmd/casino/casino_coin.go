package casino

import (
	"fmt"
	"math/rand"

	"github.com/spf13/cobra"
)

func newCoinCmd() *cobra.Command {
	var count int
	cmd := &cobra.Command{
		Use:   "coin",
		Short: "Flip a coin",
		Example: `  casino coin
  casino coin --count 10`,
		RunE: func(cmd *cobra.Command, args []string) error {
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

			if count == 1 {
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

func newRouletteCmd() *cobra.Command {
	var spins int
	cmd := &cobra.Command{
		Use:   "roulette",
		Short: "Spin the roulette wheel",
		Example: `  casino roulette
  casino roulette --spins 5`,
		RunE: func(cmd *cobra.Command, args []string) error {
			numbers := []int{0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36,
				11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9,
				22, 18, 29, 7, 28, 12, 35, 3, 26}

			for i := 0; i < spins; i++ {
				n := numbers[rand.Intn(len(numbers))]
				color := "Green"
				if n == 0 {
					color = "Green"
				} else if n%2 == 0 {
					color = "Red"
				} else {
					color = "Black"
				}

				parity := "Even"
				if n == 0 {
					parity = "Neither"
				} else if n%2 == 0 {
					parity = "Even"
				} else {
					parity = "Odd"
				}

				half := "1-18"
				if n > 18 {
					half = "19-36"
				}

				if spins == 1 {
					fmt.Printf("🎰 %d (%s, %s, %s)\n", n, color, parity, half)
				} else {
					fmt.Printf("  %2d. %d (%s, %s, %s)\n", i+1, n, color, parity, half)
				}
			}
			return nil
		},
	}
	cmd.Flags().IntVarP(&spins, "spins", "n", 1, "Number of spins")
	return cmd
}
