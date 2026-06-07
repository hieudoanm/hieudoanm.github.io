package country

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/spf13/cobra"

	"github.com/hieudoanm/jack/src/libs/requests"
)

type CountryPlayersResponse struct {
	Players []string `json:"players"`
}

func newPlayersCmd() *cobra.Command {
	var code string
	cmd := &cobra.Command{
		Use:   "players",
		Short: "Show country players",
		Long:  `List recently active players from a country.`,
		Example: `  chess com country players --code US
  chess com country players --code IT`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")
			url := fmt.Sprintf("https://api.chess.com/pub/country/%s/players", strings.ToUpper(code))
			body, err := requests.Get(url, requests.Options{})
			if err != nil {
				return fmt.Errorf("failed to fetch players: %w", err)
			}
			var resp CountryPlayersResponse
			if err := json.Unmarshal(body, &resp); err != nil {
				return fmt.Errorf("failed to parse players: %w", err)
			}
			if jsonOutput {
				b, _ := json.MarshalIndent(resp, "", "  ")
				fmt.Println(string(b))
				return nil
			}
			if len(resp.Players) == 0 {
				fmt.Println("No players found")
				return nil
			}
			fmt.Println()
			for _, p := range resp.Players {
				fmt.Println(p)
			}
			return nil
		},
	}
	cmd.Flags().StringVarP(&code, "code", "c", "", "ISO 3166-1 alpha-2 country code")
	return cmd
}
