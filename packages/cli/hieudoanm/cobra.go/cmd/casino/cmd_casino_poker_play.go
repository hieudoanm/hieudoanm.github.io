package casino

import (
	tea "charm.land/bubbletea/v2"
	"github.com/spf13/cobra"
)

func newPokerPlayCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "play",
		Short: "Play heads-up Texas Hold'em against an AI opponent",
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
