package study

import (
	"fmt"

	"github.com/hieudoanm/jack/src/libs/requests"

	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "study [study-id]",
		Short: "Export a study as PGN",
		Long:  `Fetch a Lichess study and output its PGN.`,
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			studyID := args[0]

			body, err := requests.Get(
				fmt.Sprintf("https://lichess.org/api/study/%s.pgn", studyID),
				requests.Options{},
			)
			if err != nil {
				return fmt.Errorf("failed to fetch study: %w", err)
			}

			fmt.Println(string(body))

			return nil
		},
	}
}
