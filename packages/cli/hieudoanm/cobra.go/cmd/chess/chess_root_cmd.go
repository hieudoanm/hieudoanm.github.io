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
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
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
