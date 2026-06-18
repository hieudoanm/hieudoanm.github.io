package casino

import (
	"fmt"
	"strings"

	"github.com/spf13/cobra"
)

var (
	boardStr       string
	numOpponents   int
	numSimulations int
)

func newPokerOddsCmd() *cobra.Command {
	var hand string
	cmd := &cobra.Command{
		Use:   "odds [--hand <hole>]",
		Short: "Calculate Texas Hold'em poker odds",
		Long: `Calculate win/tie/lose odds using Monte Carlo simulation for Texas Hold'em.

Hole cards are required (e.g. "Ah Kh" or "As Ks").
Use --board to specify community cards (0-5 cards).`,
		Example: `  casino poker odds --hand "Ah Kh"
  casino poker odds --hand "Ah Kh" --board "2h 7s Tc"
  casino poker odds --hand "As Ks" --board "2h 7s Tc" --opponents 3`,
		RunE: func(cmd *cobra.Command, args []string) error {
			hole, err := FormatCards(hand)
			if err != nil {
				return fmt.Errorf("invalid hole cards: %w", err)
			}
			if len(hole) != 2 {
				return fmt.Errorf("exactly 2 hole cards required, got %d", len(hole))
			}

			var board []Card
			if boardStr != "" {
				board, err = FormatCards(boardStr)
				if err != nil {
					return fmt.Errorf("invalid board cards: %w", err)
				}
				if len(board) > 5 {
					return fmt.Errorf("board can have at most 5 cards, got %d", len(board))
				}
			}

			allCards := append(hole, board...)
			seen := map[Card]bool{}
			for _, c := range allCards {
				if seen[c] {
					return fmt.Errorf("duplicate card: %s", c)
				}
				seen[c] = true
			}

			result := CalculateOdds(hole, board, numOpponents, numSimulations)

			fmt.Println(strings.Repeat("─", 48))
			fmt.Printf("  Your hand:      %s %s\n", hole[0], hole[1])
			if len(board) > 0 {
				boardStr := ""
				for i, c := range board {
					if i > 0 {
						boardStr += " "
					}
					boardStr += c.String()
				}
				fmt.Printf("  Board:          %s\n", boardStr)
			}
			fmt.Printf("  Opponents:      %d\n", numOpponents)
			fmt.Printf("  Simulations:    %d\n", numSimulations)
			fmt.Println(strings.Repeat("─", 48))
			fmt.Printf("  Win:   %5.1f%%\n", result.Win)
			fmt.Printf("  Tie:   %5.1f%%\n", result.Tie)
			fmt.Printf("  Lose:  %5.1f%%\n", result.Lose)
			fmt.Println(strings.Repeat("─", 48))
			return nil
		},
	}

	cmd.Flags().StringVarP(&hand, "hand", "H", "", "Hole cards (e.g. \"Ah Kh\")")
	cmd.Flags().StringVarP(&boardStr, "board", "b", "", "Community cards (e.g. \"2h 7s Tc\")")
	cmd.Flags().IntVarP(&numOpponents, "opponents", "o", 1, "Number of opponents")
	cmd.Flags().IntVarP(&numSimulations, "simulations", "n", 10000, "Number of Monte Carlo simulations")
	return cmd
}
