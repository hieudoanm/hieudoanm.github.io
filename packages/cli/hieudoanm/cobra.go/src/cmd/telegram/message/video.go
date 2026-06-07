package message

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newVideoCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "video",
		Short:   "Send a video",
		Long:    `Send a video to a Telegram chat.`,
		Example: `  telegram message video --chat-id @channel --video https://example.com/video.mp4 --caption "Check this out"`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			chatID, _ := cmd.Flags().GetString("chat-id")
			video, _ := cmd.Flags().GetString("video")
			caption, _ := cmd.Flags().GetString("caption")
			parseMode, _ := cmd.Flags().GetString("parse-mode")
			duration, _ := cmd.Flags().GetInt("duration")
			width, _ := cmd.Flags().GetInt("width")
			height, _ := cmd.Flags().GetInt("height")
			thumbnail, _ := cmd.Flags().GetString("thumbnail")
			supportsStreaming, _ := cmd.Flags().GetBool("supports-streaming")
			hasSpoiler, _ := cmd.Flags().GetBool("has-spoiler")
			disableNotification, _ := cmd.Flags().GetBool("disable-notification")
			protectContent, _ := cmd.Flags().GetBool("protect-content")
			replyToMessageID, _ := cmd.Flags().GetInt("reply-to-message-id")

			if chatID == "" {
				return fmt.Errorf("--chat-id is required")
			}
			if video == "" {
				return fmt.Errorf("--video is required")
			}

			body := map[string]interface{}{
				"chat_id": chatID,
				"video":   video,
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
			if supportsStreaming {
				body["supports_streaming"] = true
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

			url := internal.TelegramAPIURL(token, "sendVideo")
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
	cmd.Flags().String("video", "", "Video URL, file_id, or file path")
	cmd.Flags().String("caption", "", "Caption for the video")
	cmd.Flags().String("parse-mode", "", "Parse mode: HTML, MarkdownV2, Markdown")
	cmd.Flags().Int("duration", 0, "Duration in seconds")
	cmd.Flags().Int("width", 0, "Video width")
	cmd.Flags().Int("height", 0, "Video height")
	cmd.Flags().String("thumbnail", "", "Thumbnail URL or file_id")
	cmd.Flags().Bool("supports-streaming", false, "Video supports streaming")
	cmd.Flags().Bool("has-spoiler", false, "Cover with spoiler animation")
	cmd.Flags().Bool("disable-notification", false, "Send silently")
	cmd.Flags().Bool("protect-content", false, "Protect forwarded content")
	cmd.Flags().Int("reply-to-message-id", 0, "Reply to a message")

	return cmd
}
