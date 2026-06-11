package casino

import (
	"github.com/spf13/cobra"
)

func newPokerCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "poker",
		Short: "Poker: odds calculator and Texas Hold'em",
	}
	cmd.AddCommand(
		newPokerOddsCmd(),
		newPokerPlayCmd(),
	)
	return cmd
}
