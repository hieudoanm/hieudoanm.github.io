package telegram

import (
	"github.com/spf13/cobra"
)

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "telegram",
		Short: "Telegram bot and message tools",
	}
	cmd.PersistentFlags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")
	cmd.AddCommand(newMessageCmd())
	cmd.AddCommand(newWebhookCmd())
	return cmd
}
