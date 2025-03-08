// Package cmd ...
package cmd

import (
	"encoding/json"
	"fmt"
	"nothing-cli/utils"

	"github.com/spf13/cobra"
)

// SendResponse ...
type SendResponse struct {
	Ok bool `json:"ok"`
}

// telegramMessageSendCmd represents the telegramMessageSend command
var telegramMessageSendCmd = &cobra.Command{
	Use:   "send",
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
	telegramMessageCmd.AddCommand(telegramMessageSendCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// telegramMessageSendCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// telegramMessageSendCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
