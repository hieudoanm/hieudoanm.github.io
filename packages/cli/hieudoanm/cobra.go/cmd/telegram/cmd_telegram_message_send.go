// Package telegram ...
package telegram

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/hieudoanm/libs/requests"
	"github.com/spf13/cobra"
)

// DeleteResponse ...
type DeleteResponse struct {
	Ok bool `json:"ok"`
}

// SendResponse ...
type SendResponse struct {
	Ok bool `json:"ok"`
}

// telegramMessageSendCmd represents the telegramMessageSend command
var telegramMessageSendCmd = &cobra.Command{
	Use:   "send",
	Short: "Run the send operation for the telegram app",
	Long: `The send command is a specific utility to execute operations related to send within the telegram application.

As a component of the messaging tools, this command empowers you to interact directly with telegram's send features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {
		// Get Telegram Token
		fmt.Print("Telegram Token: ")
		var token string
		fmt.Scanln(&token)
		// Get Telegram Chat ID
		fmt.Print("Telegram Chat ID: ")
		var chatID string
		fmt.Scanln(&chatID)
		// Get Telegram Message
		fmt.Print("Telegram Message: ")
		var message string
		fmt.Scanln(&message)
		// Send Message
		var url string = fmt.Sprintf("https://api.telegram.org/bot%s/sendMessage", token)
		requestBody := map[string]string{"chat_id": chatID, "text": message}
		var options = requests.Options{}
		options.Body = requestBody
		responseByte, postError := requests.Post(url, options)
		if postError != nil {
			fmt.Println("Error: ", postError)
			return
		}
		// Parse response
		var sendResponse SendResponse
		jsonError := json.Unmarshal(responseByte, &sendResponse)
		if jsonError != nil {
			fmt.Println("Error: ", jsonError)
			return
		}
		fmt.Println("Success")
	},
}
