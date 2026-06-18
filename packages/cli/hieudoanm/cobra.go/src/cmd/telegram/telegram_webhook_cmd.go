// Package telegram ...
package telegram

import (
	"fmt"

	"github.com/spf13/cobra"
)

func newWebhookCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "webhook",
		Short: "Manage Telegram webhooks",
		Long:  `Manage Telegram Bot webhooks: set, check info, or delete.`,
		Example: `  telegram webhook set
  telegram webhook info
  telegram webhook delete`,
		RunE: func(cmd *cobra.Command, args []string) error {
			fmt.Println("delete - Delete Webhook")
			fmt.Println("info   - Get Info of Webhook")
			fmt.Println("set    - Set Webhook")
			return nil
		},
	}
	cmd.AddCommand(newWebhookDeleteCmd())
	cmd.AddCommand(newWebhookInfoCmd())
	cmd.AddCommand(newWebhookSetCmd())
	return cmd
}
