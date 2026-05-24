// Package telegram ...
package telegram

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/hieudoanm/src/libs/requests"
	"github.com/spf13/cobra"
)

// GetInfoResponse ...
type GetInfoResponse struct {
	Ok bool `json:"ok"`
}

// telegramWebhookInfoCmd represents the telegramWebhookGetInfo command
var telegramWebhookInfoCmd = &cobra.Command{
	Use:   "info",
	Short: "Run the info operation for the telegram app",
	Long: `The info command is a specific utility to execute operations related to info within the telegram application.

As a component of the messaging tools, this command empowers you to interact directly with telegram's info features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {
		// Get Telegram Token
		fmt.Print("Telegram Token: ")
		var token string
		fmt.Scanln(&token)
		// Get Webhook Info
		var url string = fmt.Sprintf("https://api.telegram.org/bot%s/getWebhookInfo", token)
		responseByte, postError := requests.Post(url, requests.Options{})
		if postError != nil {
			fmt.Println("Error: ", postError)
			return
		}
		// Parse response
		var getInfoResponse GetInfoResponse
		jsonError := json.Unmarshal(responseByte, &getInfoResponse)
		if jsonError != nil {
			fmt.Println("Error: ", jsonError)
			return
		}
		fmt.Println("Success")
	},
}
