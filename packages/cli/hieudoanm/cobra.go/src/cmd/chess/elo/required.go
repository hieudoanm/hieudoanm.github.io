package elo

import (
	"encoding/json"
	"fmt"
	"math"

	"github.com/spf13/cobra"
)

func newRequiredCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "required-score",
		Short: "Calculate score needed for a target performance rating",
		Long: `Determine what score you need against a given average opponent rating to reach a target TPR.

Uses: TPR = Avg(R_opp) + 400 * log10(S / (N - S)), solved for S.`,
		Example: `  chess elo required-score --avg-opponent-rating 2200 --games 9 --target-tpr 2400`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOut, _ := cmd.Flags().GetBool("json")
			avg, _ := cmd.Flags().GetFloat64("avg-opponent-rating")
			games, _ := cmd.Flags().GetFloat64("games")
			target, _ := cmd.Flags().GetFloat64("target-tpr")

			if games <= 0 {
				return fmt.Errorf("--games must be positive")
			}

			requiredScore, requiredPct := requiredScore(avg, games, target)

			if jsonOut {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"avg_opponent_rating": avg,
					"games":               games,
					"target_tpr":          target,
					"required_score":      math.Round(requiredScore*10) / 10,
					"required_pct":        math.Round(requiredPct*10) / 10,
				}, "", "  ")
				fmt.Println(string(b))
				return nil
			}

			fmt.Println()
			fmt.Println("♞ Required Score")
			fmt.Println("------------------------------------------------")
			fmt.Printf("Avg Opponent Rating : %.0f\n", avg)
			fmt.Printf("Games               : %.0f\n", games)
			fmt.Printf("Target TPR          : %.0f\n", target)
			fmt.Println("------------------------------------------------")
			fmt.Printf("Required Score      : %.1f\n", math.Round(requiredScore*10)/10)
			fmt.Printf("Required %%          : %.1f%%\n", math.Round(requiredPct*10)/10)

			return nil
		},
	}

	cmd.Flags().Float64("avg-opponent-rating", 0, "Average opponent rating (required)")
	cmd.Flags().Float64("games", 0, "Number of games (required)")
	cmd.Flags().Float64("target-tpr", 0, "Target tournament performance rating (required)")
	cmd.MarkFlagRequired("avg-opponent-rating")
	cmd.MarkFlagRequired("games")
	cmd.MarkFlagRequired("target-tpr")

	return cmd
}
