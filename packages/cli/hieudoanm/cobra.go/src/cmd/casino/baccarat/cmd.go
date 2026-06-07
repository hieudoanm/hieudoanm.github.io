package baccarat

import (
	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "baccarat",
		Short: "Baccarat games",
		Long:  `Baccarat subcommands: play a game, or analyze betting strategy.`,
		Example: `  casino baccarat play
  casino baccarat strategy`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(
		newBaccaratPlayCmd(),
		newBaccaratStrategyCmd(),
	)
	return cmd
}
