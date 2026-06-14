package gemini

import (
	"github.com/spf13/cobra"
)

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "gemini",
		Short:   "Interact with Google Gemini AI models",
		Long:    `Interact with Google Gemini AI models. Provides a TUI coding assistant with support for multiple Gemini models, chat history, and slash commands.`,
		Example: `  gemini code`,
		RunE:    func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.PersistentFlags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")
	cmd.AddCommand(newCodeCmd())
	return cmd
}
