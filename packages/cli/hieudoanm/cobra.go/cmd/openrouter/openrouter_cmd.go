package openrouter

import (
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "openrouter",
		Short: "Interact with OpenRouter AI models and services",
	}
	cmd.AddCommand(openrouterChatCmd)
	cmd.AddCommand(openrouterServeCmd)
	cmd.AddCommand(openrouterStatusCmd)
	cmd.AddCommand(openrouterModelsCmd)
	cmd.AddCommand(openrouterHookCmd)
	return cmd
}
