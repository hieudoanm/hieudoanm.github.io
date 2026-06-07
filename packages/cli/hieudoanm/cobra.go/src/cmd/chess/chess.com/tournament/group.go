package tournament

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"

	"github.com/hieudoanm/jack/src/libs/requests"
)

type RoundGroup struct {
	FairPlayRemovals []string      `json:"fair_play_removals"`
	Games            []GroupGame   `json:"games"`
	Players          []GroupPlayer `json:"players"`
}

type GroupGame struct {
	White        string `json:"white"`
	Black        string `json:"black"`
	URL          string `json:"url"`
	FEN          string `json:"fen"`
	PGN          string `json:"pgn"`
	Turn         string `json:"turn"`
	MoveBy       int64  `json:"move_by"`
	DrawOffer    string `json:"draw_offer"`
	LastActivity int64  `json:"last_activity"`
	StartTime    int64  `json:"start_time"`
	TimeControl  string `json:"time_control"`
	TimeClass    string `json:"time_class"`
	Rules        string `json:"rules"`
	ECO          string `json:"eco"`
	Tournament   string `json:"tournament"`
}

type GroupPlayer struct {
	Username    string `json:"username"`
	Points      int    `json:"points"`
	TieBreak    int    `json:"tie_break"`
	IsAdvancing bool   `json:"is_advancing"`
}

func newGroupCmd() *cobra.Command {
	var tournamentID string
	var round, group int
	cmd := &cobra.Command{
		Use:     "group",
		Short:   "Show tournament round group",
		Long:    `Fetch and display a tournament round group's details.`,
		Example: `  chess com tournament group --tournament -33rd-chesscom-quick-knockouts-1401-1600 --round 1 --group 1`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")
			url := fmt.Sprintf("https://api.chess.com/pub/tournament/%s/%d/%d", tournamentID, round, group)
			body, err := requests.Get(url, requests.Options{})
			if err != nil {
				return fmt.Errorf("failed to fetch group: %w", err)
			}
			var g RoundGroup
			if err := json.Unmarshal(body, &g); err != nil {
				return fmt.Errorf("failed to parse group: %w", err)
			}
			if jsonOutput {
				b, _ := json.MarshalIndent(g, "", "  ")
				fmt.Println(string(b))
				return nil
			}
			fmt.Printf("Group %d (round %d): %d games, %d players\n", group, round, len(g.Games), len(g.Players))
			return nil
		},
	}
	cmd.Flags().StringVarP(&tournamentID, "tournament", "t", "", "Tournament URL ID")
	cmd.Flags().IntVarP(&round, "round", "r", 0, "Round number")
	cmd.Flags().IntVarP(&group, "group", "g", 0, "Group number")
	return cmd
}
