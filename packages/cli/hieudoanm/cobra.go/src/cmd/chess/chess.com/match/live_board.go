package match

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"

	"github.com/hieudoanm/jack/src/libs/requests"
)

func newLiveBoardCmd() *cobra.Command {
	var id string
	var board int
	cmd := &cobra.Command{
		Use:     "live-board",
		Short:   "Show live team match board",
		Long:    `Fetch and display a live team match board's details.`,
		Example: `  chess com match live-board --id 5833 --board 5`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")
			url := fmt.Sprintf("https://api.chess.com/pub/match/live/%s/%d", id, board)
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
			fmt.Printf("Live Board %d: %d games\n", board, len(resp.Games))
			return nil
		},
	}
	cmd.Flags().StringVar(&id, "id", "", "Match ID")
	cmd.Flags().IntVarP(&board, "board", "b", 0, "Board number")
	return cmd
}
