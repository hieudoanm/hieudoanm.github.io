package message

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newDocumentCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "document",
		Short:   "Send a document",
		Long:    `Send a document or file to a Telegram chat.`,
		Example: `  telegram message document --chat-id @channel --document https://example.com/file.pdf --caption "Here is the file"`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			chatID, _ := cmd.Flags().GetString("chat-id")
			document, _ := cmd.Flags().GetString("document")
			caption, _ := cmd.Flags().GetString("caption")
			parseMode, _ := cmd.Flags().GetString("parse-mode")
			thumbnail, _ := cmd.Flags().GetString("thumbnail")
			disableContentTypeDetection, _ := cmd.Flags().GetBool("disable-content-type-detection")
			disableNotification, _ := cmd.Flags().GetBool("disable-notification")
			protectContent, _ := cmd.Flags().GetBool("protect-content")
			replyToMessageID, _ := cmd.Flags().GetInt("reply-to-message-id")

			if chatID == "" {
				return fmt.Errorf("--chat-id is required")
			}
			if document == "" {
				return fmt.Errorf("--document is required")
			}

			body := map[string]interface{}{
				"chat_id":  chatID,
				"document": document,
			}
			if caption != "" {
				body["caption"] = caption
			}
			if parseMode != "" {
				body["parse_mode"] = parseMode
			}
			if thumbnail != "" {
				body["thumbnail"] = thumbnail
			}
			if disableContentTypeDetection {
				body["disable_content_type_detection"] = true
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

			url := internal.TelegramAPIURL(token, "sendDocument")
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
	cmd.Flags().String("document", "", "Document URL, file_id, or file path")
	cmd.Flags().String("caption", "", "Caption for the document")
	cmd.Flags().String("parse-mode", "", "Parse mode: HTML, MarkdownV2, Markdown")
	cmd.Flags().String("thumbnail", "", "Thumbnail URL or file_id")
	cmd.Flags().Bool("disable-content-type-detection", false, "Disable file type detection")
	cmd.Flags().Bool("disable-notification", false, "Send silently")
	cmd.Flags().Bool("protect-content", false, "Protect forwarded content")
	cmd.Flags().Int("reply-to-message-id", 0, "Reply to a message")

	return cmd
}
