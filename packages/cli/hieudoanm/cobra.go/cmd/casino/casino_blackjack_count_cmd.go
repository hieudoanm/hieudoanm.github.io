package casino

import (
	"fmt"

	tea "charm.land/bubbletea/v2"
	"github.com/spf13/cobra"
)

func newBlackjackCountCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "count",
		Short: "Practice card counting",
		Long:  `A terminal-based Blackjack card counting game with a Bubble Tea TUI interface.`,
		RunE: func(cmd *cobra.Command, args []string) error {
			p := tea.NewProgram(NewModel())
			if _, err := p.Run(); err != nil {
				return fmt.Errorf("error running program: %s", err)
			}
			return nil
		},
	}
}
