package puzzle

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"

	"github.com/hieudoanm/jack/src/libs/requests"
)

func newRandomCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "random",
		Short:   "Show random puzzle",
		Long:    `Fetch and display a randomly selected daily puzzle from Chess.com.`,
		Example: `  chess com puzzle random`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")
			body, err := requests.Get("https://api.chess.com/pub/puzzle/random", requests.Options{})
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
