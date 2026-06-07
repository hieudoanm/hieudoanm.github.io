package tournament

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"

	"github.com/hieudoanm/jack/src/libs/requests"
)

type TournamentRound struct {
	Groups  []string      `json:"groups"`
	Players []RoundPlayer `json:"players"`
}

type RoundPlayer struct {
	Username    string `json:"username"`
	IsAdvancing bool   `json:"is_advancing"`
}

func newRoundCmd() *cobra.Command {
	var tournamentID string
	var round int
	cmd := &cobra.Command{
		Use:     "round",
		Short:   "Show tournament round",
		Long:    `Fetch and display a tournament round's details.`,
		Example: `  chess com tournament round --tournament -33rd-chesscom-quick-knockouts-1401-1600 --round 1`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")
			url := fmt.Sprintf("https://api.chess.com/pub/tournament/%s/%d", tournamentID, round)
			body, err := requests.Get(url, requests.Options{})
			if err != nil {
				return fmt.Errorf("failed to fetch round: %w", err)
			}
			var r TournamentRound
			if err := json.Unmarshal(body, &r); err != nil {
				return fmt.Errorf("failed to parse round: %w", err)
			}
			if jsonOutput {
				b, _ := json.MarshalIndent(r, "", "  ")
				fmt.Println(string(b))
				return nil
			}
			fmt.Printf("Round %d: %d groups, %d players\n", round, len(r.Groups), len(r.Players))
			return nil
		},
	}
	cmd.Flags().StringVarP(&tournamentID, "tournament", "t", "", "Tournament URL ID")
	cmd.Flags().IntVarP(&round, "round", "r", 0, "Round number")
	return cmd
}
