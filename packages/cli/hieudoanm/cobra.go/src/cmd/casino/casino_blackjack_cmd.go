package casino

import (
	"github.com/spf13/cobra"
)

func newBlackjackCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "blackjack",
		Short: "Blackjack games",
		Long:  `Blackjack subcommands: play a full game, or practice card counting.`,
		Example: `  casino blackjack play
  casino blackjack count`,
	}
	cmd.AddCommand(
		newBlackjackCountCmd(),
		newBlackjackPlayCmd(),
	)
	return cmd
}
