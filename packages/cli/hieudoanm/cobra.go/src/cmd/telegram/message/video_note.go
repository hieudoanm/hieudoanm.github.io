package message

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newVideoNoteCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "video-note",
		Short:   "Send a video note",
		Long:    `Send a video note (rounded video message) to a Telegram chat.`,
		Example: `  telegram message video-note --chat-id @channel --video-note https://example.com/video.mp4`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			chatID, _ := cmd.Flags().GetString("chat-id")
			videoNote, _ := cmd.Flags().GetString("video-note")
			duration, _ := cmd.Flags().GetInt("duration")
			length, _ := cmd.Flags().GetInt("length")
			thumbnail, _ := cmd.Flags().GetString("thumbnail")
			disableNotification, _ := cmd.Flags().GetBool("disable-notification")
			protectContent, _ := cmd.Flags().GetBool("protect-content")
			replyToMessageID, _ := cmd.Flags().GetInt("reply-to-message-id")

			if chatID == "" {
				return fmt.Errorf("--chat-id is required")
			}
			if videoNote == "" {
				return fmt.Errorf("--video-note is required")
			}

			body := map[string]interface{}{
				"chat_id":    chatID,
				"video_note": videoNote,
			}
			if duration != 0 {
				body["duration"] = duration
			}
			if length != 0 {
				body["length"] = length
			}
			if thumbnail != "" {
				body["thumbnail"] = thumbnail
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

			url := internal.TelegramAPIURL(token, "sendVideoNote")
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
	cmd.Flags().String("video-note", "", "Video note URL, file_id, or file path")
	cmd.Flags().Int("duration", 0, "Duration in seconds")
	cmd.Flags().Int("length", 0, "Video width and height in pixels")
	cmd.Flags().String("thumbnail", "", "Thumbnail URL or file_id")
	cmd.Flags().Bool("disable-notification", false, "Send silently")
	cmd.Flags().Bool("protect-content", false, "Protect forwarded content")
	cmd.Flags().Int("reply-to-message-id", 0, "Reply to a message")

	return cmd
}
