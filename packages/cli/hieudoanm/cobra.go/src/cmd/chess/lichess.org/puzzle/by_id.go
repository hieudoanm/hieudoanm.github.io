package puzzle

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/libs/requests"

	"github.com/spf13/cobra"
)

func newByIDCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "by-id [puzzle-id]",
		Short: "Fetch a puzzle by ID",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOut, _ := cmd.Flags().GetBool("json")
			id := args[0]

			body, err := requests.Get(fmt.Sprintf("https://lichess.org/api/puzzle/%s", id), requests.Options{})
			if err != nil {
				return fmt.Errorf("failed to fetch puzzle: %w", err)
			}

			var data PuzzleAndGame
			if err := json.Unmarshal(body, &data); err != nil {
				return fmt.Errorf("failed to parse puzzle: %w", err)
			}

			if jsonOut {
				b, _ := json.MarshalIndent(data, "", "  ")
				fmt.Println(string(b))
				return nil
			}

			fmt.Println()
			fmt.Printf("♞ Puzzle %s\n", data.Puzzle.ID)
			fmt.Println("------------------------------------------------")
			fmt.Printf("Rating  : %d (played %d times)\n", data.Puzzle.Rating, data.Puzzle.Plays)
			fmt.Printf("Themes  : %v\n", data.Puzzle.Themes)
			fmt.Printf("FEN     : %s\n", data.Puzzle.Fen)
			fmt.Printf("Moves   : %v\n", data.Puzzle.Solution)

			return nil
		},
	}
}
