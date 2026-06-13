package casino

import (
	tea "charm.land/bubbletea/v2"
	"github.com/spf13/cobra"
)

func newBaccaratPlayCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "play",
		Short: "Play a game of Baccarat",
		RunE: func(cmd *cobra.Command, args []string) error {
			m := baccaratModel{balance: 1000, bet: 25, betType: "player", state: baccaratBet}
			_, err := tea.NewProgram(m).Run()
			return err
		},
	}
}
