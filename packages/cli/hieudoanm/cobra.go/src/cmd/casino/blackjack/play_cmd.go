package blackjack

import (
	tea "charm.land/bubbletea/v2"
	"github.com/spf13/cobra"
)

func newBlackjackPlayCmd() *cobra.Command {
	return &cobra.Command{
		Use:     "play",
		Short:   "Play a full game of Blackjack against the dealer",
		Long:    `Play a full game of Blackjack against the dealer with a Bubble Tea TUI. Supports hit, stand, and double down. Starts with $1000 balance.`,
		Example: `  casino blackjack play`,
		RunE: func(cmd *cobra.Command, args []string) error {
			m := playModel{balance: 1000, bet: 25}
			_, err := tea.NewProgram(m).Run()
			return err
		},
	}
}
