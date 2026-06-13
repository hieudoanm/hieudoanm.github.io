package casino

import (
	tea "charm.land/bubbletea/v2"
	"github.com/spf13/cobra"
)

func newBlackjackPlayCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "play",
		Short: "Play a full game of Blackjack against the dealer",
		RunE: func(cmd *cobra.Command, args []string) error {
			m := playModel{balance: 1000, bet: 25}
			_, err := tea.NewProgram(m).Run()
			return err
		},
	}
}
