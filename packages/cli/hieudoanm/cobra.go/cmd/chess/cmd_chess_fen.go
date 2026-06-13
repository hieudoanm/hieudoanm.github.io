package chess

import (
	"github.com/spf13/cobra"
)

func newFenCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "fen",
		Short: "Run the fen operation for the chess app",
		Long: `The fen command is a specific utility to execute operations related to fen within the chess application.

As a component of the chess tools, this command empowers you to interact directly with chess's fen features via the CLI.`,
	}

	cmd.AddCommand(newFenEvalCmd())
	cmd.AddCommand(newFen2svgCmd())
	cmd.Flags().BoolP("list", "l", false, "List popular chess platforms")

	return cmd
}
