package elo

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/spf13/cobra"
)

func newTournamentCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "tournament",
		Short:   "Calculate total rating change across multiple games",
		Example: `  chess elo tournament --starting-rating 1800 --k-factor 20 --opponents "1900,1750,1850" --results "win,draw,loss"`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOut, _ := cmd.Flags().GetBool("json")
			start, _ := cmd.Flags().GetFloat64("starting-rating")
			k, _ := cmd.Flags().GetFloat64("k-factor")
			oppRaw, _ := cmd.Flags().GetString("opponents")
			resRaw, _ := cmd.Flags().GetString("results")

			oppRatings := parseFloats(oppRaw)
			results := strings.Split(resRaw, ",")
			for i := range results {
				results[i] = strings.TrimSpace(results[i])
			}

			if len(oppRatings) == 0 {
				return fmt.Errorf("--opponents is required (comma-separated ratings)")
			}
			if len(results) != len(oppRatings) {
				return fmt.Errorf("--results must have the same number of entries as --opponents")
			}

			games, totalDelta := tournamentGames(start, k, oppRatings, results)
			final := start + totalDelta

			type jsonGame struct {
				Opponent     float64 `json:"opponent"`
				Result       string  `json:"result"`
				Score        float64 `json:"score"`
				Expected     float64 `json:"expected"`
				RatingChange float64 `json:"rating_change"`
			}
			var jsonGames []jsonGame
			for _, g := range games {
				jsonGames = append(jsonGames, jsonGame{
					Opponent:     g.Opponent,
					Result:       g.Result,
					Score:        g.Score,
					Expected:     g.Expected,
					RatingChange: g.RatingChange,
				})
			}
			if jsonOut {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"starting_rating": start,
					"k_factor":        k,
					"games":           jsonGames,
					"total_change":    totalDelta,
					"final_rating":    final,
				}, "", "  ")
				fmt.Println(string(b))
				return nil
			}

			fmt.Println()
			fmt.Println("♞ Tournament Rating Change")
			fmt.Println("------------------------------------------------")
			fmt.Printf("Starting Rating : %.0f\n", start)
			fmt.Printf("K-Factor        : %.0f\n", k)
			fmt.Println()
			fmt.Printf("%-4s %-10s %-8s %-10s %-10s\n", "Game", "Opponent", "Result", "Expect", "Change")
			fmt.Println(strings.Repeat("-", 50))
			for i, g := range games {
				sign := "+"
				if g.RatingChange < 0 {
					sign = ""
				}
				fmt.Printf("%-4d %-10.0f %-8s %-10.3f %s%-7.1f\n", i+1, g.Opponent, g.Result, g.Expected, sign, g.RatingChange)
			}
			fmt.Println(strings.Repeat("-", 50))
			sign := "+"
			if totalDelta < 0 {
				sign = ""
			}
			fmt.Printf("Total Change    : %s%.1f\n", sign, totalDelta)
			fmt.Printf("Final Rating    : %.0f\n", final)

			return nil
		},
	}

	cmd.Flags().Float64("starting-rating", 0, "Starting rating before the tournament (required)")
	cmd.Flags().Float64("k-factor", 20, "K-factor (default 20)")
	cmd.Flags().String("opponents", "", "Comma-separated opponent ratings (required)")
	cmd.Flags().String("results", "", "Comma-separated results: win/draw/loss (required)")
	cmd.MarkFlagRequired("starting-rating")
	cmd.MarkFlagRequired("opponents")
	cmd.MarkFlagRequired("results")

	return cmd
}
