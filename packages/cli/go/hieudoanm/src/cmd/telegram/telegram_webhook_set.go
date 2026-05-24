// Package telegram ...
package telegram

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/hieudoanm/src/libs/requests"
	"github.com/spf13/cobra"
)

// SetResponse ...
type SetResponse struct {
	Ok bool `json:"ok"`
}

// telegramWebhookSetCmd represents the telegramWebhookSet command
var telegramWebhookSetCmd = &cobra.Command{
	Use:   "set",
	Short: "Run the set operation for the telegram app",
	Long: `The set command is a specific utility to execute operations related to set within the telegram application.

As a component of the messaging tools, this command empowers you to interact directly with telegram's set features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {
		// Get Telegram Token
		fmt.Print("Telegram Token: ")
		var token string
		fmt.Scanln(&token)
		// Get Telegram Webhook
		fmt.Print("Telegram Webhook: ")
		var webhook string
		fmt.Scanln(&webhook)
		// Set webhook
		var url string = fmt.Sprintf("https://api.telegram.org/bot%s/setWebhook", token)
		requestBody := map[string]string{"url": webhook}
		var options = requests.Options{}
		options.Body = requestBody
		responseByte, postError := requests.Post(url, options)
		if postError != nil {
			fmt.Println("Error:", postError)
			return
		}
		// Parse response
		var setResponse SetResponse
		jsonError := json.Unmarshal(responseByte, &setResponse)
		if jsonError != nil {
			fmt.Println("Error:", jsonError)
			return
		}
		fmt.Println("Success")
	},
}
