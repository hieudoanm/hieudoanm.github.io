// Package telegram ...
package telegram

import (
	"fmt"

	"github.com/spf13/cobra"
)

// telegramWebhookCmd represents the telegramWebhook command
var telegramWebhookCmd = &cobra.Command{
	Use:   "webhook",
	Short: "Run the webhook operation for the telegram app",
	Long: `The webhook command is a specific utility to execute operations related to webhook within the telegram application.

As a component of the messaging tools, this command empowers you to interact directly with telegram's webhook features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("delete - Delete Webhook")
		fmt.Println("info   - Get Info of Webhook")
		fmt.Println("set    - Set Webhook")
	},
}

func init() {
	telegramWebhookCmd.AddCommand(telegramWebhookDeleteCmd)
	telegramWebhookCmd.AddCommand(telegramWebhookInfoCmd)
	telegramWebhookCmd.AddCommand(telegramWebhookSetCmd)
}
