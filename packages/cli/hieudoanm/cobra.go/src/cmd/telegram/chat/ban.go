package chat

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newBanCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "ban",
		Short: "Ban a user from a chat",
		Long:  `Ban a user from a group, supergroup, or channel.`,
		Example: `  telegram chat ban --chat-id @channel --user-id 123456789
  telegram chat ban --chat-id @channel --user-id 123456789 --until-date 1767225600`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			chatID, _ := cmd.Flags().GetString("chat-id")
			userID, _ := cmd.Flags().GetInt64("user-id")
			untilDate, _ := cmd.Flags().GetInt64("until-date")
			revokeMessages, _ := cmd.Flags().GetBool("revoke-messages")

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
			if untilDate != 0 {
				body["until_date"] = untilDate
			}
			if revokeMessages {
				body["revoke_messages"] = true
			}

			url := internal.TelegramAPIURL(token, "banChatMember")
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
	cmd.Flags().Int64("user-id", 0, "User ID to ban")
	cmd.Flags().Int64("until-date", 0, "Date when ban expires (Unix time)")
	cmd.Flags().Bool("revoke-messages", false, "Delete all user's messages")

	return cmd
}
