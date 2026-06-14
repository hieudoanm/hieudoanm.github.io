package chess

import (
	"github.com/spf13/cobra"
)

var jsonOutput bool

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
  chess com titled`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}

	cmd.PersistentFlags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")

	cmd.AddCommand(newComLeaderboardsCmd())
	cmd.AddCommand(newComPlayerCmd())
	cmd.AddCommand(newComTitledCmd())
	cmd.AddCommand(newEloCmd())
	cmd.AddCommand(newFenCmd())
	cmd.AddCommand(newPgnCmd())
	cmd.AddCommand(newPlayCmd())
	cmd.AddCommand(newRandomCmd())
	cmd.AddCommand(newSetupCmd())

	return cmd
}
