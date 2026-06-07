package chat

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newUnbanCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "unban",
		Short:   "Unban a user from a chat",
		Long:    `Remove a user from the ban list of a group, supergroup, or channel.`,
		Example: `  telegram chat unban --chat-id @channel --user-id 123456789`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			chatID, _ := cmd.Flags().GetString("chat-id")
			userID, _ := cmd.Flags().GetInt64("user-id")
			onlyIfBanned, _ := cmd.Flags().GetBool("only-if-banned")

			if chatID == "" {
				return fmt.Errorf("--chat-id is required")
			}
			if userID == 0 {
				return fmt.Errorf("--user-id is required")
			}

			body := map[string]interface{}{
				"chat_id": chatID,
				"user_id": userID,
			}
			if onlyIfBanned {
				body["only_if_banned"] = true
			}

			url := internal.TelegramAPIURL(token, "unbanChatMember")
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
	cmd.Flags().Int64("user-id", 0, "User ID to unban")
	cmd.Flags().Bool("only-if-banned", false, "Only unban if already banned")

	return cmd
}
