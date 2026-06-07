package game

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newSetScoreCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "set-score",
		Short:   "Set a game score",
		Long:    `Set the score for a user in a game.`,
		Example: `  telegram game set-score --user-id 12345 --score 100 --chat-id @channel --message-id 42`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			userID, _ := cmd.Flags().GetInt64("user-id")
			score, _ := cmd.Flags().GetInt("score")
			force, _ := cmd.Flags().GetBool("force")
			disableEditMessage, _ := cmd.Flags().GetBool("disable-edit-message")
			chatID, _ := cmd.Flags().GetString("chat-id")
			messageID, _ := cmd.Flags().GetInt("message-id")
			inlineMessageID, _ := cmd.Flags().GetString("inline-message-id")

			if userID == 0 {
				return fmt.Errorf("--user-id is required")
			}

			body := map[string]interface{}{
				"user_id": userID,
				"score":   score,
			}
			if force {
				body["force"] = true
			}
			if disableEditMessage {
				body["disable_edit_message"] = true
			}
			if chatID != "" {
				body["chat_id"] = chatID
			}
			if messageID != 0 {
				body["message_id"] = messageID
			}
			if inlineMessageID != "" {
				body["inline_message_id"] = inlineMessageID
			}

			url := internal.TelegramAPIURL(token, "setGameScore")
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

	cmd.Flags().Int64("user-id", 0, "Target user ID")
	cmd.Flags().Int("score", 0, "New score")
	cmd.Flags().Bool("force", false, "Force score update even if lower")
	cmd.Flags().Bool("disable-edit-message", false, "Do not auto-edit message")
	cmd.Flags().String("chat-id", "", "Chat ID (required for non-inline messages)")
	cmd.Flags().Int("message-id", 0, "Message ID (required for non-inline messages)")
	cmd.Flags().String("inline-message-id", "", "Inline message ID")

	return cmd
}
