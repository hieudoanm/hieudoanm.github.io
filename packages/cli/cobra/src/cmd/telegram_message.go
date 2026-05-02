// Package cmd ...
package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

// telegramMessageCmd represents the telegramMessage command
var telegramMessageCmd = &cobra.Command{
	Use:   "message",
	Short: "Run the message operation for the telegram app",
	Long: `The message command is a specific utility to execute operations related to message within the telegram application.

As a component of the messaging tools, this command empowers you to interact directly with telegram's message features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {

		fmt.Println("send - Send Telegram Message")
	},
}

func init() {
	telegramCmd.AddCommand(telegramMessageCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// telegramMessageCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// telegramMessageCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
