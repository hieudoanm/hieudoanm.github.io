package blackjack

import (
	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "blackjack",
		Short: "Blackjack games",
		Long:  `Blackjack subcommands: play a full game, or practice card counting.`,
		Example: `  casino blackjack play
  casino blackjack count`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(
		newBlackjackCheatsheetCmd(),
		newBlackjackCountCmd(),
		newBlackjackPlayCmd(),
	)
	return cmd
}
