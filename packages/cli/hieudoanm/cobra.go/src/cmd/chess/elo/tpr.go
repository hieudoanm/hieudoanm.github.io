package elo

import (
	"encoding/json"
	"fmt"
	"math"

	"github.com/spf13/cobra"
)

func newTPRCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "tpr",
		Short: "Calculate tournament performance rating",
		Long: `Estimate your playing strength based on opponent ratings and results.

Uses the formula: TPR = Avg(R_opp) + 400 * log10(score / (games - score))`,
		Example: `  chess elo tpr --ratings "1800,1900,2000,2100" --score 3 --games 4`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOut, _ := cmd.Flags().GetBool("json")
			ratingsRaw, _ := cmd.Flags().GetString("ratings")
			score, _ := cmd.Flags().GetFloat64("score")
			games, _ := cmd.Flags().GetInt("games")

			ratings := parseFloats(ratingsRaw)
			if len(ratings) == 0 {
				return fmt.Errorf("--ratings is required (comma-separated)")
			}

			if games > len(ratings) {
				games = len(ratings)
			}

			if score < 0 || score > float64(games) {
				return fmt.Errorf("score must be between 0 and %d", games)
			}

			avg, tpr := performanceRating(ratings, score, games)

			if jsonOut {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"opponent_ratings":    ratings,
					"score":               score,
					"games":               games,
					"avg_opponent_rating": avg,
					"tpr":                 math.Round(tpr),
				}, "", "  ")
				fmt.Println(string(b))
				return nil
			}

			fmt.Println()
			fmt.Println("♞ Tournament Performance Rating")
			fmt.Println("------------------------------------------------")
			fmt.Printf("Opponent Ratings  : %v\n", ratings)
			fmt.Printf("Score             : %.0f/%d\n", score, games)
			fmt.Printf("Avg Opponent      : %.0f\n", avg)
			fmt.Println("------------------------------------------------")
			fmt.Printf("TPR               : %.0f\n", math.Round(tpr))

			return nil
		},
	}

	cmd.Flags().String("ratings", "", "Comma-separated opponent ratings (required)")
	cmd.Flags().Float64("score", 0, "Your total score (required)")
	cmd.Flags().Int("games", 0, "Total number of games (required)")
	cmd.MarkFlagRequired("ratings")
	cmd.MarkFlagRequired("score")
	cmd.MarkFlagRequired("games")

	return cmd
}
