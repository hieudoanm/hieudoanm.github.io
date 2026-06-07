package chat

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newRevokeInviteLinkCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "revoke-invite-link",
		Short:   "Revoke an invite link",
		Long:    `Revoke an invite link for a chat.`,
		Example: `  telegram chat revoke-invite-link --chat-id @channel --invite-link https://t.me/+abc`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			chatID, _ := cmd.Flags().GetString("chat-id")
			inviteLink, _ := cmd.Flags().GetString("invite-link")

			if chatID == "" {
				return fmt.Errorf("--chat-id is required")
			}
			if inviteLink == "" {
				return fmt.Errorf("--invite-link is required")
			}

			body := map[string]interface{}{
				"chat_id":     chatID,
				"invite_link": inviteLink,
			}

			url := internal.TelegramAPIURL(token, "revokeChatInviteLink")
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
	cmd.Flags().String("invite-link", "", "The invite link to revoke")

	return cmd
}
