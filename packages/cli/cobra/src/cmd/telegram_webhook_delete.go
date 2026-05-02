// Package cmd ...
package cmd

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/hieudoanm/src/libs/requests"
	"github.com/spf13/cobra"
)

// DeleteResponse ...
type DeleteResponse struct {
	Ok bool `json:"ok"`
}

// webhookDeleteCmd represents the telegramWebhookDelete command
var webhookDeleteCmd = &cobra.Command{
	Use:   "delete",
	Short: "Run the delete operation for the telegram app",
	Long: `The delete command is a specific utility to execute operations related to delete within the telegram application.

As a component of the messaging tools, this command empowers you to interact directly with telegram's delete features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {

		// Get Telegram Token
		fmt.Print("Telegram Token: ")
		var token string
		fmt.Scanln(&token)
		// Delete Webhook
		var url string = fmt.Sprintf("https://api.telegram.org/bot%s/deleteWebhook", token)
		responseByte, postError := requests.Post(url, requests.Options{})
		if postError != nil {
			fmt.Println("Error: ", postError)
			return
		}
		// Parse response
		var deleteResponse DeleteResponse
		jsonError := json.Unmarshal(responseByte, &deleteResponse)
		if jsonError != nil {
			fmt.Println("Error: ", jsonError)
			return
		}
		fmt.Println("Success")
	},
}

func init() {
	webhookCmd.AddCommand(webhookDeleteCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// webhookDeleteCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// webhookDeleteCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
