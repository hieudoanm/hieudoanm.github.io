// Package chess ...
package chess

import (
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "chess",
		Short: "Chess tools and utilities",
		Long:  `Chess tools including board analysis, FEN/PGN utilities, and Lichess integration.`,
	}

	cmd.AddCommand(comLeaderboardsCmd)
	cmd.AddCommand(comPlayerCmd)
	cmd.AddCommand(comTitledCmd)
	cmd.AddCommand(eloCmd)
	cmd.AddCommand(fenCmd)
	cmd.AddCommand(pgnCmd)
	cmd.AddCommand(playCmd)
	cmd.AddCommand(randomCmd)
	cmd.AddCommand(setupCmd)

	return cmd
}
