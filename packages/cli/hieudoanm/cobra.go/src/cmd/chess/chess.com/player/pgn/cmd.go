package pgn

import (
	"fmt"
	"strings"

	"github.com/spf13/cobra"

	"github.com/hieudoanm/jack/src/libs/requests"
)

func NewCmd() *cobra.Command {
	var username, year, month string
	cmd := &cobra.Command{
		Use:   "pgn",
		Short: "Download PGN of monthly games",
		Long:  `Download the PGN for all games in a given month.`,
		Example: `  chess com player pgn --username hikaru --year 2024 --month 01
  chess com player pgn --username magnuscarlsen --year 2023 --month 12`,
		RunE: func(cmd *cobra.Command, args []string) error {
			url := fmt.Sprintf("https://api.chess.com/pub/player/%s/games/%s/%s/pgn", strings.ToLower(username), year, month)
			body, err := requests.Get(url, requests.Options{})
			if err != nil {
				return fmt.Errorf("failed to download PGN: %w", err)
			}
			fmt.Println(string(body))
			return nil
		},
	}
	cmd.Flags().StringVarP(&username, "username", "u", "", "Chess.com username")
	cmd.Flags().StringVarP(&year, "year", "y", "", "Year (YYYY)")
	cmd.Flags().StringVarP(&month, "month", "m", "", "Month (MM)")
	return cmd
}
