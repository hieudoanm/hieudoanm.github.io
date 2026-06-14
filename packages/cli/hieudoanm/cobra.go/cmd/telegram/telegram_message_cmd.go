// Package telegram ...
package telegram

import (
	"fmt"

	"github.com/spf13/cobra"
)

func newMessageCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "message",
		Short:   "Send Telegram messages",
		Long:    `Send messages via the Telegram Bot API.`,
		Example: `  telegram message send`,
		RunE: func(cmd *cobra.Command, args []string) error {
			fmt.Println("send - Send Telegram Message")
			return nil
		},
	}
	cmd.AddCommand(newMessageSendCmd())
	return cmd
}
