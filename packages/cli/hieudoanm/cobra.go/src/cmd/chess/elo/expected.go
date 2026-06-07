package elo

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"
)

func newExpectedCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "expected-score",
		Short:   "Calculate expected score between two players",
		Example: `  chess elo expected-score --player-rating 1800 --opponent-rating 2000`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOut, _ := cmd.Flags().GetBool("json")
			player, _ := cmd.Flags().GetFloat64("player-rating")
			opponent, _ := cmd.Flags().GetFloat64("opponent-rating")

			expected := expectedScore(player, opponent)

			if jsonOut {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"player_rating":   player,
					"opponent_rating": opponent,
					"expected_score":  expected,
					"expected_pct":    expected * 100,
				}, "", "  ")
				fmt.Println(string(b))
				return nil
			}

			fmt.Println()
			fmt.Println("♞ Expected Score")
			fmt.Println("------------------------------------------------")
			fmt.Printf("Player Rating   : %.0f\n", player)
			fmt.Printf("Opponent Rating : %.0f\n", opponent)
			fmt.Println("------------------------------------------------")
			fmt.Printf("Expected Score  : %.3f\n", expected)
			fmt.Printf("Expected %%      : %.1f%%\n", expected*100)

			return nil
		},
	}

	cmd.Flags().Float64("player-rating", 0, "Your current rating (required)")
	cmd.Flags().Float64("opponent-rating", 0, "Opponent's rating (required)")
	cmd.MarkFlagRequired("player-rating")
	cmd.MarkFlagRequired("opponent-rating")

	return cmd
}
