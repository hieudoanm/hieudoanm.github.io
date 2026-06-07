package message

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newPhotoCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "photo",
		Short:   "Send a photo",
		Long:    `Send a photo to a Telegram chat.`,
		Example: `  telegram message photo --chat-id @channel --photo https://example.com/image.jpg --caption "Look at this"`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			chatID, _ := cmd.Flags().GetString("chat-id")
			photo, _ := cmd.Flags().GetString("photo")
			caption, _ := cmd.Flags().GetString("caption")
			parseMode, _ := cmd.Flags().GetString("parse-mode")
			hasSpoiler, _ := cmd.Flags().GetBool("has-spoiler")
			disableNotification, _ := cmd.Flags().GetBool("disable-notification")
			protectContent, _ := cmd.Flags().GetBool("protect-content")
			replyToMessageID, _ := cmd.Flags().GetInt("reply-to-message-id")

			if chatID == "" {
				return fmt.Errorf("--chat-id is required")
			}
			if photo == "" {
				return fmt.Errorf("--photo is required")
			}

			body := map[string]interface{}{
				"chat_id": chatID,
				"photo":   photo,
			}
			if caption != "" {
				body["caption"] = caption
			}
			if parseMode != "" {
				body["parse_mode"] = parseMode
			}
			if hasSpoiler {
				body["has_spoiler"] = true
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

			url := internal.TelegramAPIURL(token, "sendPhoto")
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
	cmd.Flags().String("photo", "", "Photo URL, file_id, or file path")
	cmd.Flags().String("caption", "", "Caption for the photo")
	cmd.Flags().String("parse-mode", "", "Parse mode: HTML, MarkdownV2, Markdown")
	cmd.Flags().Bool("has-spoiler", false, "Cover with spoiler animation")
	cmd.Flags().Bool("disable-notification", false, "Send silently")
	cmd.Flags().Bool("protect-content", false, "Protect forwarded content")
	cmd.Flags().Int("reply-to-message-id", 0, "Reply to a message")

	return cmd
}
