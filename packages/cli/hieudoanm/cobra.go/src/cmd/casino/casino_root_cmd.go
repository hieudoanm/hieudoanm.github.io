package casino

import (
	"github.com/spf13/cobra"
)

var jsonOutput bool

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
	cmd.PersistentFlags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")
	return cmd
}
