// Package telegram ...
package telegram

import (
	"fmt"

	"github.com/spf13/cobra"
)

func newMessageCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "message",
		Short: "Run the message operation for the telegram app",
		Long: `The message command is a specific utility to execute operations related to message within the telegram application.

As a component of the messaging tools, this command empowers you to interact directly with telegram's message features via the CLI.`,
		RunE: func(cmd *cobra.Command, args []string) error {
			fmt.Println("send - Send Telegram Message")
			return nil
		},
	}
	cmd.AddCommand(newMessageSendCmd())
	return cmd
}
