package elo

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"
)

func newChangeCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "rating-change",
		Short:   "Calculate rating change after a game",
		Example: `  chess elo rating-change --player-rating 1800 --opponent-rating 2000 --result win --k-factor 20`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOut, _ := cmd.Flags().GetBool("json")
			player, _ := cmd.Flags().GetFloat64("player-rating")
			opponent, _ := cmd.Flags().GetFloat64("opponent-rating")
			result, _ := cmd.Flags().GetString("result")
			k, _ := cmd.Flags().GetFloat64("k-factor")

			score, err := resultToScore(result)
			if err != nil {
				return fmt.Errorf("invalid result %q; use win/draw/loss", result)
			}

			delta, newRating := ratingChange(player, opponent, score, k)

			if jsonOut {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"player_rating":   player,
					"opponent_rating": opponent,
					"result":          result,
					"k_factor":        k,
					"expected_score":  expectedScore(player, opponent),
					"rating_change":   delta,
					"new_rating":      newRating,
				}, "", "  ")
				fmt.Println(string(b))
				return nil
			}

			sign := "+"
			if delta < 0 {
				sign = ""
			}
			fmt.Println()
			fmt.Println("♞ Rating Change")
			fmt.Println("------------------------------------------------")
			fmt.Printf("Player Rating   : %.0f\n", player)
			fmt.Printf("Opponent Rating : %.0f\n", opponent)
			fmt.Printf("Result          : %s\n", result)
			fmt.Printf("K-Factor        : %.0f\n", k)
			exp := expectedScore(player, opponent)
			fmt.Printf("Expected Score  : %.3f\n", exp)
			fmt.Println("------------------------------------------------")
			fmt.Printf("Rating Change   : %s%.1f\n", sign, delta)
			fmt.Printf("New Rating      : %.0f\n", newRating)

			return nil
		},
	}

	cmd.Flags().Float64("player-rating", 0, "Your current rating (required)")
	cmd.Flags().Float64("opponent-rating", 0, "Opponent's rating (required)")
	cmd.Flags().String("result", "", "Game result: win/draw/loss (required)")
	cmd.Flags().Float64("k-factor", 20, "K-factor (default 20)")
	cmd.MarkFlagRequired("player-rating")
	cmd.MarkFlagRequired("opponent-rating")
	cmd.MarkFlagRequired("result")

	return cmd
}
