package openrouter

import (
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "openrouter",
		Short: "Interact with OpenRouter AI models and services",
	}
	cmd.AddCommand(openrouterServeCmd)
	cmd.AddCommand(openrouterStatusCmd)
	cmd.AddCommand(openrouterModelsCmd)
	cmd.AddCommand(openrouterHookCmd)
	cmd.AddCommand(openrouterCodeCmd)
	return cmd
}
