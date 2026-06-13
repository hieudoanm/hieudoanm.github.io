// Package telegram ...
package telegram

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/hieudoanm/libs/requests"
	"github.com/spf13/cobra"
)

func newWebhookDeleteCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "delete",
		Short: "Run the delete operation for the telegram app",
		Long: `The delete command is a specific utility to execute operations related to delete within the telegram application.

As a component of the messaging tools, this command empowers you to interact directly with telegram's delete features via the CLI.`,
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
