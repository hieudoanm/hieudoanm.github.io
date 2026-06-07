package message

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newAudioCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "audio",
		Short:   "Send an audio file",
		Long:    `Send an audio file to a Telegram chat.`,
		Example: `  telegram message audio --chat-id @channel --audio https://example.com/song.mp3 --caption "Listen to this"`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			chatID, _ := cmd.Flags().GetString("chat-id")
			audio, _ := cmd.Flags().GetString("audio")
			caption, _ := cmd.Flags().GetString("caption")
			parseMode, _ := cmd.Flags().GetString("parse-mode")
			duration, _ := cmd.Flags().GetInt("duration")
			performer, _ := cmd.Flags().GetString("performer")
			title, _ := cmd.Flags().GetString("title")
			thumbnail, _ := cmd.Flags().GetString("thumbnail")
			disableNotification, _ := cmd.Flags().GetBool("disable-notification")
			protectContent, _ := cmd.Flags().GetBool("protect-content")
			replyToMessageID, _ := cmd.Flags().GetInt("reply-to-message-id")

			if chatID == "" {
				return fmt.Errorf("--chat-id is required")
			}
			if audio == "" {
				return fmt.Errorf("--audio is required")
			}

			body := map[string]interface{}{
				"chat_id": chatID,
				"audio":   audio,
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
			if performer != "" {
				body["performer"] = performer
			}
			if title != "" {
				body["title"] = title
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

			url := internal.TelegramAPIURL(token, "sendAudio")
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
	cmd.Flags().String("audio", "", "Audio URL, file_id, or file path")
	cmd.Flags().String("caption", "", "Caption for the audio")
	cmd.Flags().String("parse-mode", "", "Parse mode: HTML, MarkdownV2, Markdown")
	cmd.Flags().Int("duration", 0, "Duration in seconds")
	cmd.Flags().String("performer", "", "Performer name")
	cmd.Flags().String("title", "", "Track title")
	cmd.Flags().String("thumbnail", "", "Thumbnail URL or file_id")
	cmd.Flags().Bool("disable-notification", false, "Send silently")
	cmd.Flags().Bool("protect-content", false, "Protect forwarded content")
	cmd.Flags().Int("reply-to-message-id", 0, "Reply to a message")

	return cmd
}
