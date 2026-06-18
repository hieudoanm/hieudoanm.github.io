// Package telegram ...
package telegram

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/hieudoanm/src/libs/requests"
	"github.com/spf13/cobra"
)

func newWebhookDeleteCmd() *cobra.Command {
	return &cobra.Command{
		Use:     "delete",
		Short:   "Delete the Telegram webhook",
		Long:    `Prompt for a Telegram Bot API token and delete the currently registered webhook.`,
		Example: `  telegram webhook delete`,
		RunE: func(cmd *cobra.Command, args []string) error {
			fmt.Print("Telegram Token: ")
			var token string
			fmt.Scanln(&token)
			var url string = fmt.Sprintf("https://api.telegram.org/bot%s/deleteWebhook", token)
			responseByte, postError := requests.Post(url, requests.Options{})
			if postError != nil {
				fmt.Println("Error: ", postError)
				return nil
			}
			var deleteResponse DeleteResponse
			jsonError := json.Unmarshal(responseByte, &deleteResponse)
			if jsonError != nil {
				fmt.Println("Error: ", jsonError)
				return nil
			}
			fmt.Println("Success")
			return nil
		},
	}
}
