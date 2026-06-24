package setup

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"

	"github.com/hieudoanm/jack/src/cmd/chess/chess960/random"
	"github.com/hieudoanm/jack/src/cmd/chess/lichess.org"
	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "setup",
		Short: "Set up a specific Chess960 starting position",
		Long:  `Select a Chess960 starting position by number, display the FEN, and fetch a cloud evaluation from Lichess.`,
		Example: `  chess setup
  chess setup 518`,
		RunE: func(cmd *cobra.Command, args []string) error {
			reader := bufio.NewReader(os.Stdin)

			positionIndex := 518

			fmt.Print("Position (default 518): ")

			input, _ := reader.ReadString('\n')
			input = strings.TrimSpace(input)

			if input != "" {
				val, err := strconv.Atoi(input)
				if err != nil {
					return fmt.Errorf("❌ invalid number")
				}
				positionIndex = val
			}

			if positionIndex < 1 || positionIndex > len(random.Positions) {
				return fmt.Errorf("❌ position must be between 1 and %d", len(random.Positions))
			}

			var position = random.Positions[positionIndex-1]
			fmt.Printf("Position %d: %s\n", positionIndex, position)

			fen := fmt.Sprintf("%s/pppppppp/8/8/8/8/PPPPPPPP/%s w KQkq - 0 1",
				strings.ToLower(position), position)
			fmt.Println("FEN:", fen)

			eval, err := lichess.CloudEvalCP(fen, "chess960")
			if err != nil {
				return fmt.Errorf("❌ failed to evaluate position: %w", err)
			}

			fmt.Println("Evaluation (centipawns):", eval)
			return nil
		},
	}
}
