package casino

import (
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "casino",
		Short: "Casino games: blackjack, poker odds, and more",
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(
		newBlackjackCmd(),
		newPokerCmd(),
		newBaccaratCmd(),
		newSlotsCmd(),
		newCoinCmd(),
		newDiceCmd(),
		newRouletteCmd(),
	)
	cmd.PersistentFlags().BoolP("json", "j", false, "Output in JSON format")
	return cmd
}
