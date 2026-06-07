package match

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/spf13/cobra"

	"github.com/hieudoanm/jack/src/libs/requests"
)

func newDailyCmd() *cobra.Command {
	var id string
	cmd := &cobra.Command{
		Use:     "daily",
		Short:   "Show daily team match",
		Long:    `Fetch and display a daily team match's details.`,
		Example: `  chess com match daily --id 12803`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")
			url := fmt.Sprintf("https://api.chess.com/pub/match/%s", id)
			body, err := requests.Get(url, requests.Options{})
			if err != nil {
				return fmt.Errorf("failed to fetch match: %w", err)
			}
			var match MatchResponse
			if err := json.Unmarshal(body, &match); err != nil {
				return fmt.Errorf("failed to parse match: %w", err)
			}
			if jsonOutput {
				b, _ := json.MarshalIndent(match, "", "  ")
				fmt.Println(string(b))
				return nil
			}
			fmt.Println()
			fmt.Printf("Match: %s\n", match.Name)
			fmt.Println(strings.Repeat("-", 50))
			fmt.Printf("Status : %s\n", match.Status)
			fmt.Printf("Boards : %d\n", match.Boards)
			fmt.Printf("Team 1 : %s (%.1f)\n", match.Teams.Team1.Name, match.Teams.Team1.Score)
			fmt.Printf("Team 2 : %s (%.1f)\n", match.Teams.Team2.Name, match.Teams.Team2.Score)
			return nil
		},
	}
	cmd.Flags().StringVar(&id, "id", "", "Match ID")
	return cmd
}
