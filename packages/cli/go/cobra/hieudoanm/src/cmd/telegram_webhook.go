// Package cmd ...
package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

// webhookCmd represents the telegramWebhook command
var webhookCmd = &cobra.Command{
	Use:   "webhook",
	Short: "Run the webhook operation for the telegram app",
	Long: `The webhook command is a specific utility to execute operations related to webhook within the telegram application.

As a component of the messaging tools, this command empowers you to interact directly with telegram's webhook features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {

		// Get subcommands
		fmt.Println("delete   - Delete Webhook")
		fmt.Println("info - Get Info of Webhook")
		fmt.Println("set      - Set Webhook")
	},
}

func init() {
	telegramCmd.AddCommand(webhookCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// webhookCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// webhookCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
