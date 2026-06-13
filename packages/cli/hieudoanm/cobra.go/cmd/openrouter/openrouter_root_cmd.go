package openrouter

import (
	"github.com/spf13/cobra"
)

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "openrouter",
		Short: "Interact with OpenRouter AI models and services",
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.PersistentFlags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")
	cmd.AddCommand(newServeCmd())
	cmd.AddCommand(newStatusCmd())
	cmd.AddCommand(newModelsCmd())
	cmd.AddCommand(newHookCmd())
	cmd.AddCommand(newCodeCmd())
	return cmd
}
