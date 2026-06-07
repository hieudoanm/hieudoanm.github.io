package chat

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newPinCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "pin",
		Short: "Pin a message in a chat",
		Long:  `Pin a message in a group, supergroup, or channel.`,
		Example: `  telegram chat pin --chat-id @channel --message-id 42
  telegram chat pin --chat-id @channel --message-id 42 --disable-notification`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			chatID, _ := cmd.Flags().GetString("chat-id")
			messageID, _ := cmd.Flags().GetInt("message-id")
			disableNotification, _ := cmd.Flags().GetBool("disable-notification")

			if chatID == "" {
				return fmt.Errorf("--chat-id is required")
			}
			if messageID == 0 {
				return fmt.Errorf("--message-id is required")
			}

			body := map[string]interface{}{
				"chat_id":    chatID,
				"message_id": messageID,
			}
			if disableNotification {
				body["disable_notification"] = true
			}

			url := internal.TelegramAPIURL(token, "pinChatMessage")
			responseByte, postErr := requests.Post(url, requests.Options{Body: body})
			if postErr != nil {
				return postErr
			}

			if jsonOutput {
				var result map[string]interface{}
				if err := json.Unmarshal(responseByte, &result); err != nil {
					return err
				}
				out, _ := json.MarshalIndent(result, "", "  ")
				fmt.Println(string(out))
			} else {
				fmt.Println("Success")
			}
			return nil
		},
	}

	cmd.Flags().String("chat-id", "", "Target chat ID or @username")
	cmd.Flags().Int("message-id", 0, "Message ID to pin")
	cmd.Flags().Bool("disable-notification", false, "Don't notify chat members")

	return cmd
}
