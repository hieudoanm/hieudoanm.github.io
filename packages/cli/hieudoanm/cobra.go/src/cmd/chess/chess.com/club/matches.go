package club

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"

	"github.com/hieudoanm/jack/src/libs/requests"
)

type ClubMatch struct {
	Name      string `json:"name"`
	ID        string `json:"@id"`
	Opponent  string `json:"opponent"`
	Result    string `json:"result"`
	StartTime int64  `json:"start_time"`
	TimeClass string `json:"time_class"`
}

type ClubMatchesResponse struct {
	Finished   []ClubMatch `json:"finished"`
	InProgress []ClubMatch `json:"in_progress"`
	Registered []ClubMatch `json:"registered"`
}

func newMatchesCmd() *cobra.Command {
	var clubID string
	cmd := &cobra.Command{
		Use:   "matches",
		Short: "Show club matches",
		Long:  `List team matches for a club.`,
		Example: `  chess com club matches --club team-usa-southwest
  chess com club matches --club chess-com-developer-community`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")
			url := fmt.Sprintf("https://api.chess.com/pub/club/%s/matches", clubID)
			body, err := requests.Get(url, requests.Options{})
			if err != nil {
				return fmt.Errorf("failed to fetch matches: %w", err)
			}
			var resp ClubMatchesResponse
			if err := json.Unmarshal(body, &resp); err != nil {
				return fmt.Errorf("failed to parse matches: %w", err)
			}
			if jsonOutput {
				b, _ := json.MarshalIndent(resp, "", "  ")
				fmt.Println(string(b))
				return nil
			}
			fmt.Println()
			if len(resp.Registered) > 0 {
				fmt.Printf("Registered: %d\n", len(resp.Registered))
			}
			if len(resp.InProgress) > 0 {
				fmt.Printf("In progress: %d\n", len(resp.InProgress))
			}
			if len(resp.Finished) > 0 {
				fmt.Printf("Finished: %d\n", len(resp.Finished))
			}
			return nil
		},
	}
	cmd.Flags().StringVarP(&clubID, "club", "c", "", "Club URL ID")
	return cmd
}
