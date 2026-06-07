package message

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newMediaGroupCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "media-group",
		Short:   "Send a media group",
		Long:    `Send a group of photos, videos, or mixed media as an album. The --media flag accepts a JSON array of media items.`,
		Example: `  telegram message media-group --chat-id @channel --media '[{"type":"photo","media":"https://example.com/a.jpg"},{"type":"photo","media":"https://example.com/b.jpg"}]'`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			chatID, _ := cmd.Flags().GetString("chat-id")
			mediaJSON, _ := cmd.Flags().GetString("media")
			disableNotification, _ := cmd.Flags().GetBool("disable-notification")
			protectContent, _ := cmd.Flags().GetBool("protect-content")
			replyToMessageID, _ := cmd.Flags().GetInt("reply-to-message-id")

			if chatID == "" {
				return fmt.Errorf("--chat-id is required")
			}
			if mediaJSON == "" {
				return fmt.Errorf("--media is required (JSON array)")
			}

			var media []map[string]interface{}
			if err := json.Unmarshal([]byte(mediaJSON), &media); err != nil {
				return fmt.Errorf("invalid --media JSON: %w", err)
			}

			body := map[string]interface{}{
				"chat_id": chatID,
				"media":   media,
			}
			if disableNotification {
				body["disable_notification"] = true
			}
			if protectContent {
				body["protect_content"] = true
			}
			if replyToMessageID != 0 {
				body["reply_to_message_id"] = replyToMessageID
			}

			url := internal.TelegramAPIURL(token, "sendMediaGroup")
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
	cmd.Flags().String("media", "", "JSON array of media items")
	cmd.Flags().Bool("disable-notification", false, "Send silently")
	cmd.Flags().Bool("protect-content", false, "Protect forwarded content")
	cmd.Flags().Int("reply-to-message-id", 0, "Reply to a message")

	return cmd
}
