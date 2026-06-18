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

func newWebhookInfoCmd() *cobra.Command {
	return &cobra.Command{
		Use:     "info",
		Short:   "Get current webhook info",
		Long:    `Prompt for a Telegram Bot API token and fetch the current webhook configuration.`,
		Example: `  telegram webhook info`,
		RunE: func(cmd *cobra.Command, args []string) error {
			fmt.Print("Telegram Token: ")
			var token string
			fmt.Scanln(&token)
			var url string = fmt.Sprintf("https://api.telegram.org/bot%s/getWebhookInfo", token)
			responseByte, postError := requests.Post(url, requests.Options{})
			if postError != nil {
				fmt.Println("Error: ", postError)
				return nil
			}
			var getInfoResponse GetInfoResponse
			jsonError := json.Unmarshal(responseByte, &getInfoResponse)
			if jsonError != nil {
				fmt.Println("Error: ", jsonError)
				return nil
			}
			fmt.Println("Success")
			return nil
		},
	}
}
