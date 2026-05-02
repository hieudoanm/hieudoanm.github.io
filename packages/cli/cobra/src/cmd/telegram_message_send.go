// Package cmd ...
package cmd

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/hieudoanm/src/libs/requests"

	"github.com/spf13/cobra"
)

// SendResponse ...
type SendResponse struct {
	Ok bool `json:"ok"`
}

// messageSendCmd represents the telegramMessageSend command
var messageSendCmd = &cobra.Command{
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
	telegramMessageCmd.AddCommand(messageSendCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// messageSendCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// messageSendCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
