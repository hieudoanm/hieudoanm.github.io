package openrouter

import (
	"github.com/spf13/cobra"
)

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "openrouter",
		Short: "Interact with OpenRouter AI models and services",
		Long:  `Interact with OpenRouter AI models: serve a local API proxy, probe model availability, list free models, and run an AI coding assistant TUI.`,
		Example: `  openrouter serve
  openrouter status
  openrouter models
  openrouter code`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.PersistentFlags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")
	cmd.AddCommand(newServeCmd())
	cmd.AddCommand(newStatusCmd())
	cmd.AddCommand(newModelsCmd())
	cmd.AddCommand(newHookCmd())
	cmd.AddCommand(newCodeCmd())
	return cmd
}
