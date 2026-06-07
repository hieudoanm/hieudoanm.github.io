package chat

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newLeaveCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "leave",
		Short:   "Leave a chat",
		Long:    `Leave a group, supergroup, or channel.`,
		Example: `  telegram chat leave --chat-id @channel`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			chatID, _ := cmd.Flags().GetString("chat-id")
			if chatID == "" {
				return fmt.Errorf("--chat-id is required")
			}

			body := map[string]interface{}{
				"chat_id": chatID,
			}

			url := internal.TelegramAPIURL(token, "leaveChat")
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

	return cmd
}
