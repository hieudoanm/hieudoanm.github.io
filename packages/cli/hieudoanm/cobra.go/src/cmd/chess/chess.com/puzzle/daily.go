package puzzle

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"

	"github.com/hieudoanm/jack/src/libs/requests"
)

type PuzzleResponse struct {
	Title       string `json:"title"`
	URL         string `json:"url"`
	PublishTime int64  `json:"publish_time"`
	FEN         string `json:"fen"`
	PGN         string `json:"pgn"`
	Image       string `json:"image"`
}

func newDailyCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "daily",
		Short:   "Show daily puzzle",
		Long:    `Fetch and display the daily puzzle from Chess.com.`,
		Example: `  chess com puzzle daily`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")
			body, err := requests.Get("https://api.chess.com/pub/puzzle", requests.Options{})
			if err != nil {
				return fmt.Errorf("failed to fetch puzzle: %w", err)
			}
			var puzzle PuzzleResponse
			if err := json.Unmarshal(body, &puzzle); err != nil {
				return fmt.Errorf("failed to parse puzzle: %w", err)
			}
			if jsonOutput {
				b, _ := json.MarshalIndent(puzzle, "", "  ")
				fmt.Println(string(b))
				return nil
			}
			fmt.Println()
			fmt.Printf("Title: %s\n", puzzle.Title)
			fmt.Printf("URL  : %s\n", puzzle.URL)
			fmt.Printf("FEN  : %s\n", puzzle.FEN)
			return nil
		},
	}
	return cmd
}
