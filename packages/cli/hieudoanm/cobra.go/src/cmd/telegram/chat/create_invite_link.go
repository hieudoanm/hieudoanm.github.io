package chat

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newCreateInviteLinkCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "create-invite-link",
		Short:   "Create an invite link",
		Long:    `Create an additional invite link for a chat.`,
		Example: `  telegram chat create-invite-link --chat-id @channel --name "Guests" --member-limit 10`,
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

			if name, _ := cmd.Flags().GetString("name"); name != "" {
				body["name"] = name
			}
			if expireDate, _ := cmd.Flags().GetInt64("expire-date"); expireDate != 0 {
				body["expire_date"] = expireDate
			}
			if memberLimit, _ := cmd.Flags().GetInt("member-limit"); memberLimit != 0 {
				body["member_limit"] = memberLimit
			}
			if createsJoinRequest, _ := cmd.Flags().GetBool("creates-join-request"); createsJoinRequest {
				body["creates_join_request"] = true
			}

			url := internal.TelegramAPIURL(token, "createChatInviteLink")
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
				var result map[string]interface{}
				if err := json.Unmarshal(responseByte, &result); err != nil {
					return err
				}
				if link, ok := result["result"].(map[string]interface{}); ok {
					fmt.Printf("Invite link: %v\n", link["invite_link"])
				} else {
					fmt.Println("Success")
				}
			}
			return nil
		},
	}

	cmd.Flags().String("chat-id", "", "Target chat ID or @username")
	cmd.Flags().String("name", "", "Invite link name")
	cmd.Flags().Int64("expire-date", 0, "Expiration Unix timestamp")
	cmd.Flags().Int("member-limit", 0, "Maximum number of users (1-99999)")
	cmd.Flags().Bool("creates-join-request", false, "Users must request admin approval")

	return cmd
}
