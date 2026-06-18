package telegram

import (
	"github.com/spf13/cobra"
)

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "telegram",
		Short: "Telegram bot and message tools",
		Long:  `Tools for interacting with the Telegram Bot API: send messages and manage webhooks.`,
		Example: `  telegram message send
  telegram webhook set
  telegram webhook info
  telegram webhook delete`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.PersistentFlags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")
	cmd.AddCommand(newMessageCmd())
	cmd.AddCommand(newWebhookCmd())
	return cmd
}
