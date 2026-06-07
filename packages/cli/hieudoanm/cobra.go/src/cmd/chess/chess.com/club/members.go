package club

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"

	"github.com/hieudoanm/jack/src/libs/requests"
)

type ClubMember struct {
	Username string `json:"username"`
	Joined   int64  `json:"joined"`
}

type ClubMembersResponse struct {
	Weekly  []ClubMember `json:"weekly"`
	Monthly []ClubMember `json:"monthly"`
	AllTime []ClubMember `json:"all_time"`
}

func newMembersCmd() *cobra.Command {
	var clubID string
	cmd := &cobra.Command{
		Use:   "members",
		Short: "Show club members",
		Long:  `List club members grouped by activity level.`,
		Example: `  chess com club members --club chess-com-developer-community
  chess com club members --club team-usa-southwest`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")
			url := fmt.Sprintf("https://api.chess.com/pub/club/%s/members", clubID)
			body, err := requests.Get(url, requests.Options{})
			if err != nil {
				return fmt.Errorf("failed to fetch members: %w", err)
			}
			var resp ClubMembersResponse
			if err := json.Unmarshal(body, &resp); err != nil {
				return fmt.Errorf("failed to parse members: %w", err)
			}
			if jsonOutput {
				b, _ := json.MarshalIndent(resp, "", "  ")
				fmt.Println(string(b))
				return nil
			}
			fmt.Println()
			fmt.Printf("Weekly  : %d members\n", len(resp.Weekly))
			fmt.Printf("Monthly : %d members\n", len(resp.Monthly))
			fmt.Printf("All time: %d members\n", len(resp.AllTime))
			return nil
		},
	}
	cmd.Flags().StringVarP(&clubID, "club", "c", "", "Club URL ID")
	return cmd
}
