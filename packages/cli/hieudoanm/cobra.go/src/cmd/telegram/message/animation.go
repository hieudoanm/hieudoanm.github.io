package message

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newAnimationCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "animation",
		Short:   "Send an animation (GIF)",
		Long:    `Send an animation or GIF to a Telegram chat.`,
		Example: `  telegram message animation --chat-id @channel --animation https://example.com/animation.gif --caption "Funny GIF"`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			chatID, _ := cmd.Flags().GetString("chat-id")
			animation, _ := cmd.Flags().GetString("animation")
			caption, _ := cmd.Flags().GetString("caption")
			parseMode, _ := cmd.Flags().GetString("parse-mode")
			duration, _ := cmd.Flags().GetInt("duration")
			width, _ := cmd.Flags().GetInt("width")
			height, _ := cmd.Flags().GetInt("height")
			thumbnail, _ := cmd.Flags().GetString("thumbnail")
			hasSpoiler, _ := cmd.Flags().GetBool("has-spoiler")
			disableNotification, _ := cmd.Flags().GetBool("disable-notification")
			protectContent, _ := cmd.Flags().GetBool("protect-content")
			replyToMessageID, _ := cmd.Flags().GetInt("reply-to-message-id")

			if chatID == "" {
				return fmt.Errorf("--chat-id is required")
			}
			if animation == "" {
				return fmt.Errorf("--animation is required")
			}

			body := map[string]interface{}{
				"chat_id":   chatID,
				"animation": animation,
			}
			if caption != "" {
				body["caption"] = caption
			}
			if parseMode != "" {
				body["parse_mode"] = parseMode
			}
			if duration != 0 {
				body["duration"] = duration
			}
			if width != 0 {
				body["width"] = width
			}
			if height != 0 {
				body["height"] = height
			}
			if thumbnail != "" {
				body["thumbnail"] = thumbnail
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

			url := internal.TelegramAPIURL(token, "sendAnimation")
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
	cmd.Flags().String("animation", "", "Animation URL, file_id, or file path")
	cmd.Flags().String("caption", "", "Caption for the animation")
	cmd.Flags().String("parse-mode", "", "Parse mode: HTML, MarkdownV2, Markdown")
	cmd.Flags().Int("duration", 0, "Duration in seconds")
	cmd.Flags().Int("width", 0, "Animation width")
	cmd.Flags().Int("height", 0, "Animation height")
	cmd.Flags().String("thumbnail", "", "Thumbnail URL or file_id")
	cmd.Flags().Bool("has-spoiler", false, "Cover with spoiler animation")
	cmd.Flags().Bool("disable-notification", false, "Send silently")
	cmd.Flags().Bool("protect-content", false, "Protect forwarded content")
	cmd.Flags().Int("reply-to-message-id", 0, "Reply to a message")

	return cmd
}
