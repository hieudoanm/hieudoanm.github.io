package chess

import (
	"github.com/spf13/cobra"
)

func newPgnCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "pgn",
		Short: "Run the pgn operation for the chess.graphics app",
		Long: `The pgn command is a specific utility to execute operations related to pgn within the chess.graphics application.

As a component of the chess tools, this command empowers you to interact directly with chess.graphics's pgn features via the CLI.`,
	}
	cmd.AddCommand(newPgn2fenCmd())
	cmd.AddCommand(newPgn2uciCmd())
	return cmd
}
