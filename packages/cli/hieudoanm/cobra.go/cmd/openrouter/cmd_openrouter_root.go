package openrouter

import (
	"github.com/spf13/cobra"
)

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "openrouter",
		Short: "Interact with OpenRouter AI models and services",
	}
	cmd.PersistentFlags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")
	cmd.AddCommand(newServeCmd())
	cmd.AddCommand(newStatusCmd())
	cmd.AddCommand(newModelsCmd())
	cmd.AddCommand(newHookCmd())
	cmd.AddCommand(newCodeCmd())
	return cmd
}
