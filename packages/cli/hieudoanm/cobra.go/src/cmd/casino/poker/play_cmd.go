package poker

import (
	tea "charm.land/bubbletea/v2"
	"github.com/spf13/cobra"
)

func newPokerPlayCmd() *cobra.Command {
	return &cobra.Command{
		Use:     "play",
		Short:   "Play heads-up Texas Hold'em against an AI opponent",
		Long:    `Play heads-up Texas Hold'em against an AI opponent with a Bubble Tea TUI. Supports check, bet, call, raise, and fold. Starts with $1000 each.`,
		Example: `  casino poker play`,
		RunE: func(cmd *cobra.Command, args []string) error {
			m := pokerPlayModel{
				heroChips:    1000,
				villainChips: 1000,
				street:       streetPreflop,
			}
			_, err := tea.NewProgram(m).Run()
			return err
		},
	}
}
