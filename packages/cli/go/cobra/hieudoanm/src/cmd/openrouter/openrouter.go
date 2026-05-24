// package openrouter ...
package openrouter

import (
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "openrouter",
		Short: "OpenRouter CLI application",
		Long: `The OpenRouter CLI application is a comprehensive backend utility belonging to the AI suite of tools.

Use this root executable to manage configuring, running, and interacting with all OpenRouter-related operations securely and efficiently from your terminal.`,
	}

	cmd.AddCommand(openrouterChatCmd)
	cmd.AddCommand(openrouterHookCmd)
	cmd.AddCommand(openrouterModelsCmd)
	cmd.AddCommand(openrouterStatusCmd)
	cmd.AddCommand(openrouterServeCmd)

	return cmd
}
