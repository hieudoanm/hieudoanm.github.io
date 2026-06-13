package telegram

import (
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "telegram",
		Short: "Telegram bot and message tools",
	}
	cmd.AddCommand(telegramMessageCmd)
	cmd.AddCommand(telegramWebhookCmd)
	return cmd
}
