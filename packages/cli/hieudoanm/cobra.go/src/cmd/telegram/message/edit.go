package message

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newEditCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "edit",
		Short:   "Edit a message text",
		Long:    `Edit the text of a message sent by the bot.`,
		Example: `  telegram message edit --chat-id 123456 --message-id 42 --text "New text"`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			chatID, _ := cmd.Flags().GetString("chat-id")
			messageID, _ := cmd.Flags().GetInt("message-id")
			text, _ := cmd.Flags().GetString("text")
			parseMode, _ := cmd.Flags().GetString("parse-mode")

			if chatID == "" {
				return fmt.Errorf("--chat-id is required")
			}
			if messageID == 0 {
				return fmt.Errorf("--message-id is required")
			}
			if text == "" {
				return fmt.Errorf("--text is required")
			}

			body := map[string]interface{}{
				"chat_id":    chatID,
				"message_id": messageID,
				"text":       text,
			}
			if parseMode != "" {
				body["parse_mode"] = parseMode
			}

			url := internal.TelegramAPIURL(token, "editMessageText")
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
	cmd.Flags().Int("message-id", 0, "Message ID to edit")
	cmd.Flags().String("text", "", "New message text")
	cmd.Flags().String("parse-mode", "", "Parse mode: HTML, MarkdownV2, Markdown")

	return cmd
}
