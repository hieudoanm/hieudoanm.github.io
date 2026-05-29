// Package telegram ...
package telegram

import (
	"github.com/spf13/cobra"
)

// NewCommand returns the telegram root cobra command.
func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "telegram",
		Short: "Telegram CLI application (messaging tools)",
		Long: `The telegram CLI application is a comprehensive backend utility belonging to the messaging suite of tools.

Use this root executable to manage configuring, running, and interacting with all telegram-related operations securely and efficiently from your terminal.`,
	}

	cmd.AddCommand(telegramMessageCmd)
	cmd.AddCommand(telegramWebhookCmd)

	return cmd
}
