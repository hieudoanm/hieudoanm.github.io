package casino

import (
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "casino",
		Short: "Casino games: blackjack, poker odds, and more",
	}
	cmd.AddCommand(
		newBlackjackCmd(),
		newPokerCmd(),
		newBaccaratCmd(),
		newSlotsCmd(),
	)
	return cmd
}
