package online

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/spf13/cobra"

	"github.com/hieudoanm/jack/src/libs/requests"
)

type OnlineResponse struct {
	Online bool `json:"online"`
}

func NewCmd() *cobra.Command {
	var username string
	cmd := &cobra.Command{
		Use:   "online",
		Short: "Check if a player is online",
		Long:  `Check if a Chess.com player has been online in the last 5 minutes.`,
		Example: `  chess com player online --username hikaru
  chess com player online --username magnuscarlsen`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")
			url := fmt.Sprintf("https://api.chess.com/pub/player/%s/is-online", strings.ToLower(username))
			body, err := requests.Get(url, requests.Options{})
			if err != nil {
				return fmt.Errorf("failed to fetch online status: %w", err)
			}
			var resp OnlineResponse
			if err := json.Unmarshal(body, &resp); err != nil {
				return fmt.Errorf("failed to parse response: %w", err)
			}
			if jsonOutput {
				b, _ := json.MarshalIndent(resp, "", "  ")
				fmt.Println(string(b))
				return nil
			}
			if resp.Online {
				fmt.Printf("%s is online\n", username)
			} else {
				fmt.Printf("%s is offline\n", username)
			}
			return nil
		},
	}
	cmd.Flags().StringVarP(&username, "username", "u", "", "Chess.com username")
	return cmd
}
