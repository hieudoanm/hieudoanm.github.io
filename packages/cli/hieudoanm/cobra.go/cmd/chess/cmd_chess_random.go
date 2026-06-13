// package chess ..
package chess

import (
	"fmt"
	"math/rand"
	"strings"

	"github.com/hieudoanm/hieudoanm/cmd/chess/lichess"

	"github.com/spf13/cobra"
)

func newRandomCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "random",
		Short: "Run the random operation for the chess960 app",
		Long: `The random command is a specific utility to execute operations related to random within the chess960 application.

As a component of the chess tools, this command empowers you to interact directly with chess960's random features via the CLI.`,
		RunE: func(cmd *cobra.Command, args []string) error {
			n := len(Positions)

			// ---- pick random position from data.Positions ----
			positionIndex := rand.Intn(n)
			position := Positions[positionIndex]
			fmt.Printf("Position %d: %s\n", positionIndex+1, position)

			// ---- convert to FEN ----
			// Assume rank 8 is the back rank, pawns on rank 7, empty elsewhere
			fen := fmt.Sprintf("%s/pppppppp/8/8/8/8/PPPPPPPP/%s w KQkq - 0 1",
				strings.ToLower(position), position)
			fmt.Println("FEN:", fen)

			// ---- lichess.org Cloud Eval ----
			eval, err := lichess.CloudEvalCP(fen, "chess960")
			if err != nil {
				return fmt.Errorf("❌ failed to evaluate position: %w", err)
			}

			fmt.Println("Evaluation (centipawns):", eval)
			return nil
		},
	}
}
