// Package cmd ...
package cmd

import (
	"encoding/json"
	"fmt"
	"hieudoanm-cli/utils"

	"github.com/spf13/cobra"
)

// DeleteResponse ...
type DeleteResponse struct {
	Ok bool `json:"ok"`
}

// telegramWebhookDeleteCmd represents the telegramWebhookDelete command
var telegramWebhookDeleteCmd = &cobra.Command{
	Use:   "delete",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		utils.LogProgramName()
		// Get Telegram Token
		fmt.Print("Telegram Token: ")
		var token string
		fmt.Scanln(&token)
		// Delete Webhook
		var url string = fmt.Sprintf("https://api.telegram.org/bot%s/deleteWebhook", token)
		requestBody := map[string]string{}
		responseByte, postError := utils.Post(url, requestBody)
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
	telegramWebhookCmd.AddCommand(telegramWebhookDeleteCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// telegramWebhookDeleteCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// telegramWebhookDeleteCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
