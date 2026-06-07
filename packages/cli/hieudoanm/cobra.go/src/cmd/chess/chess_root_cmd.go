package chess

import (
	"github.com/hieudoanm/jack/src/cmd/chess/chess.com"
	"github.com/hieudoanm/jack/src/cmd/chess/chess960"
	"github.com/hieudoanm/jack/src/cmd/chess/elo"
	"github.com/hieudoanm/jack/src/cmd/chess/lichess.org"
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "chess",
		Short: "Chess tools and utilities",
		Long:  `Chess tools including board analysis, FEN/PGN utilities, and Lichess integration.`,
		Example: `  chess fen eval --fen "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  chess fen svg --fen "..." --out board.svg
  chess pgn fen --pgn-file game.pgn
  chess pgn uci --pgn "1.e4 e5 2.Nf3"
  chess play
  chess elo
  chess random
  chess setup
  chess com player --username hikaru
  chess com leaderboards
  chess chess960 random
  chess chess960 validate BBNNQRKR
  chess com player --username hikaru
  chess com leaderboards
  chess com titled`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}

	cmd.PersistentFlags().BoolP("json", "j", false, "Output in JSON format")

	cmd.AddCommand(lichess.NewCmd())
	cmd.AddCommand(chess960.NewCmd())
	cmd.AddCommand(chesscom.NewCmd())
	cmd.AddCommand(elo.NewCmd())
	cmd.AddCommand(newFenCmd())
	cmd.AddCommand(newPgnCmd())
	cmd.AddCommand(newPlayCmd())
	cmd.AddCommand(newSetupCmd())

	return cmd
}
