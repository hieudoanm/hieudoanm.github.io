package casino

import (
	"fmt"
	"math/rand"

	"github.com/spf13/cobra"
)

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
