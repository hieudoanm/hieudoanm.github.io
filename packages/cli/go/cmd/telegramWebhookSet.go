// Package cmd ...
package cmd

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"

	"nothing-cli/utils"
)

// SetResponse ...
type SetResponse struct {
	Ok bool `json:"ok"`
}

// telegramWebhookSetCmd represents the telegramWebhookSet command
var telegramWebhookSetCmd = &cobra.Command{
	Use:   "set",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
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
		responseByte, postError := utils.Post(url, requestBody)
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

func init() {
	telegramWebhookCmd.AddCommand(telegramWebhookSetCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// telegramWebhookSetCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// telegramWebhookSetCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
