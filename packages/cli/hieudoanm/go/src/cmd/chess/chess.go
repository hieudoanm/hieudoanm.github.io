// Package chess ...
package chess

import (
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "colors",
		Short: "Colors CLI application (design tools)",
		Long: `The colors CLI application is a comprehensive backend utility belonging to the design suite of tools.

Use this root executable to manage configuring, running, and interacting with all colors-related operations securely and efficiently from your terminal.`,
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
