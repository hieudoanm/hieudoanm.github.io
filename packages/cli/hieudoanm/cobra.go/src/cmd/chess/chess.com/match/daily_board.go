package match

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"

	"github.com/hieudoanm/jack/src/libs/requests"
)

func newDailyBoardCmd() *cobra.Command {
	var id string
	var board int
	cmd := &cobra.Command{
		Use:     "daily-board",
		Short:   "Show daily team match board",
		Long:    `Fetch and display a daily team match board's details.`,
		Example: `  chess com match daily-board --id 12803 --board 1`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")
			url := fmt.Sprintf("https://api.chess.com/pub/match/%s/%d", id, board)
			body, err := requests.Get(url, requests.Options{})
			if err != nil {
				return fmt.Errorf("failed to fetch board: %w", err)
			}
			var resp MatchBoardResponse
			if err := json.Unmarshal(body, &resp); err != nil {
				return fmt.Errorf("failed to parse board: %w", err)
			}
			if jsonOutput {
				b, _ := json.MarshalIndent(resp, "", "  ")
				fmt.Println(string(b))
				return nil
			}
			fmt.Printf("Board %d: %d games\n", board, len(resp.Games))
			return nil
		},
	}
	cmd.Flags().StringVar(&id, "id", "", "Match ID")
	cmd.Flags().IntVarP(&board, "board", "b", 0, "Board number")
	return cmd
}
