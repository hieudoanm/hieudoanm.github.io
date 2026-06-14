package casino

import (
	"github.com/spf13/cobra"
)

func newPokerCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "poker",
		Short: "Poker: odds calculator and Texas Hold'em",
		Long:  `Poker subcommands: calculate Texas Hold'em odds, or play heads-up against an AI.`,
		Example: `  casino poker odds --hand "Ah Kh"
  casino poker play`,
	}
	cmd.AddCommand(
		newPokerOddsCmd(),
		newPokerPlayCmd(),
	)
	return cmd
}
