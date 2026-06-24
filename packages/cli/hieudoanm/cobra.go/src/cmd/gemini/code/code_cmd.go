package code

import (
	"log"

	tea "charm.land/bubbletea/v2"
	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "code",
		Short: "Gemini-powered AI coding assistant",
		Long: `An interactive TUI coding assistant powered by Google Gemini.

Provides a chat interface with markdown rendering and code block support.`,
		Example: `  gemini code`,
		RunE: func(cmd *cobra.Command, args []string) error {
			if _, err := tea.NewProgram(codeInitialModel()).Run(); err != nil {
				log.Fatal(err)
			}
			return nil
		},
	}
}


