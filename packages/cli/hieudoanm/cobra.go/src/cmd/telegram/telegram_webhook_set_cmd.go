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

func newWebhookSetCmd() *cobra.Command {
	return &cobra.Command{
		Use:     "set",
		Short:   "Set a Telegram webhook URL",
		Long:    `Prompt for a Telegram Bot API token and webhook URL, then register the webhook with Telegram.`,
		Example: `  telegram webhook set`,
		RunE: func(cmd *cobra.Command, args []string) error {
			fmt.Print("Telegram Token: ")
			var token string
			fmt.Scanln(&token)
			fmt.Print("Telegram Webhook: ")
			var webhook string
			fmt.Scanln(&webhook)
			var url string = fmt.Sprintf("https://api.telegram.org/bot%s/setWebhook", token)
			requestBody := map[string]string{"url": webhook}
			var options = requests.Options{}
			options.Body = requestBody
			responseByte, postError := requests.Post(url, options)
			if postError != nil {
				fmt.Println("Error:", postError)
				return nil
			}
			var setResponse SetResponse
			jsonError := json.Unmarshal(responseByte, &setResponse)
			if jsonError != nil {
				fmt.Println("Error:", jsonError)
				return nil
			}
			fmt.Println("Success")
			return nil
		},
	}
}
