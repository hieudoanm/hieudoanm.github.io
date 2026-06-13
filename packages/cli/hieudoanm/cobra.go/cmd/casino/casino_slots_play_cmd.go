package casino

import (
	tea "charm.land/bubbletea/v2"
	"github.com/spf13/cobra"
)

func newSlotsPlayCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "play",
		Short: "Play a slot machine",
		RunE: func(cmd *cobra.Command, args []string) error {
			m := slotsModel{balance: 1000, bet: 25, state: slotsSpin}
			_, err := tea.NewProgram(m).Run()
			return err
		},
	}
}
