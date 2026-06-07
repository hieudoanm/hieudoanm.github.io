package archives

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/spf13/cobra"

	"github.com/hieudoanm/jack/src/libs/requests"
)

type ArchivesResponse struct {
	Archives []string `json:"archives"`
}

func NewCmd() *cobra.Command {
	var username string
	cmd := &cobra.Command{
		Use:   "archives",
		Short: "List monthly game archives",
		Long:  `List available monthly archives for a player's completed games.`,
		Example: `  chess com player archives --username hikaru
  chess com player archives --username magnuscarlsen`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")
			url := fmt.Sprintf("https://api.chess.com/pub/player/%s/games/archives", strings.ToLower(username))
			body, err := requests.Get(url, requests.Options{})
			if err != nil {
				return fmt.Errorf("failed to fetch archives: %w", err)
			}
			var resp ArchivesResponse
			if err := json.Unmarshal(body, &resp); err != nil {
				return fmt.Errorf("failed to parse archives: %w", err)
			}
			if jsonOutput {
				b, _ := json.MarshalIndent(resp, "", "  ")
				fmt.Println(string(b))
				return nil
			}
			if len(resp.Archives) == 0 {
				fmt.Println("No archives found")
				return nil
			}
			fmt.Println()
			for _, a := range resp.Archives {
				fmt.Println(a)
			}
			return nil
		},
	}
	cmd.Flags().StringVarP(&username, "username", "u", "", "Chess.com username")
	return cmd
}
