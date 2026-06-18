// Package telegram ...
package telegram

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

// SendResponse ...
type SendResponse struct {
	Ok bool `json:"ok"`
}

func newMessageSendCmd() *cobra.Command {
	return &cobra.Command{
		Use:     "send",
		Short:   "Send a Telegram message",
		Long:    `Prompt for a Telegram Bot API token, chat ID, and message text, then send the message via the Telegram Bot API.`,
		Example: `  telegram message send`,
		RunE: func(cmd *cobra.Command, args []string) error {
			fmt.Print("Telegram Token: ")
			var token string
			fmt.Scanln(&token)
			fmt.Print("Telegram Chat ID: ")
			var chatID string
			fmt.Scanln(&chatID)
			fmt.Print("Telegram Message: ")
			var message string
			fmt.Scanln(&message)
			var url string = fmt.Sprintf("https://api.telegram.org/bot%s/sendMessage", token)
			requestBody := map[string]string{"chat_id": chatID, "text": message}
			var options = requests.Options{}
			options.Body = requestBody
			responseByte, postError := requests.Post(url, options)
			if postError != nil {
				fmt.Println("Error: ", postError)
				return nil
			}
			var sendResponse SendResponse
			jsonError := json.Unmarshal(responseByte, &sendResponse)
			if jsonError != nil {
				fmt.Println("Error: ", jsonError)
				return nil
			}
			fmt.Println("Success")
			return nil
		},
	}
}
