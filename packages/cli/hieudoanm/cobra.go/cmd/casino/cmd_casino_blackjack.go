package casino

import (
	"github.com/spf13/cobra"
)

func newBlackjackCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "blackjack",
		Short: "Blackjack games",
	}
	cmd.AddCommand(
		newBlackjackCountCmd(),
		newBlackjackPlayCmd(),
	)
	return cmd
}
