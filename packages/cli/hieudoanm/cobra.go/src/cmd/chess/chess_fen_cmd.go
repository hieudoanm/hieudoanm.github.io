package chess

import (
	"github.com/spf13/cobra"
)

func newFenCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "fen",
		Short: "FEN-based chess analysis tools",
		Long:  `Analyze FEN strings with cloud evaluation and render boards to SVG.`,
		Example: `  chess fen eval --fen "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  chess fen svg --fen "..." --out board.svg`,
	}

	cmd.AddCommand(newFenEvalCmd())
	cmd.AddCommand(newFen2svgCmd())
	cmd.Flags().BoolP("list", "l", false, "List popular chess platforms")

	return cmd
}
