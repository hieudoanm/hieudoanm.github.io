package poll

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newSendCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "send",
		Short: "Send a poll",
		Long:  `Send a native poll or quiz to a Telegram chat.`,
		Example: `  telegram poll send --chat-id @channel --question "Favorite color?" --options '[{"text":"Red"},{"text":"Blue"},{"text":"Green"}]'
  telegram poll send --chat-id @channel --question "Quiz" --options '[{"text":"A"},{"text":"B"}]' --type quiz --correct-option-ids 0`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			chatID, _ := cmd.Flags().GetString("chat-id")
			question, _ := cmd.Flags().GetString("question")
			optionsJSON, _ := cmd.Flags().GetString("options")
			pollType, _ := cmd.Flags().GetString("type")
			isAnonymous, _ := cmd.Flags().GetBool("is-anonymous")
			allowsMultipleAnswers, _ := cmd.Flags().GetBool("allows-multiple-answers")
			correctOptionIDs, _ := cmd.Flags().GetString("correct-option-ids")
			openPeriod, _ := cmd.Flags().GetInt("open-period")
			closeDate, _ := cmd.Flags().GetInt("close-date")
			isClosed, _ := cmd.Flags().GetBool("is-closed")
			disableNotification, _ := cmd.Flags().GetBool("disable-notification")
			protectContent, _ := cmd.Flags().GetBool("protect-content")
			replyToMessageID, _ := cmd.Flags().GetInt("reply-to-message-id")

			if chatID == "" {
				return fmt.Errorf("--chat-id is required")
			}
			if question == "" {
				return fmt.Errorf("--question is required")
			}
			if optionsJSON == "" {
				return fmt.Errorf("--options is required (JSON array)")
			}

			var options []map[string]interface{}
			if err := json.Unmarshal([]byte(optionsJSON), &options); err != nil {
				return fmt.Errorf("invalid --options JSON: %w", err)
			}

			body := map[string]interface{}{
				"chat_id":  chatID,
				"question": question,
				"options":  options,
			}
			if pollType != "" {
				body["type"] = pollType
			}
			if !isAnonymous {
				body["is_anonymous"] = false
			}
			if allowsMultipleAnswers {
				body["allows_multiple_answers"] = true
			}
			if correctOptionIDs != "" {
				var ids []int
				if err := json.Unmarshal([]byte(correctOptionIDs), &ids); err != nil {
					return fmt.Errorf("invalid --correct-option-ids JSON: %w", err)
				}
				body["correct_option_ids"] = ids
			}
			if openPeriod != 0 {
				body["open_period"] = openPeriod
			}
			if closeDate != 0 {
				body["close_date"] = closeDate
			}
			if isClosed {
				body["is_closed"] = true
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

			url := internal.TelegramAPIURL(token, "sendPoll")
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
	cmd.Flags().String("question", "", "Poll question")
	cmd.Flags().String("options", "", "JSON array of option objects")
	cmd.Flags().String("type", "", "Poll type: regular or quiz")
	cmd.Flags().Bool("is-anonymous", true, "Poll is anonymous")
	cmd.Flags().Bool("allows-multiple-answers", false, "Allow multiple answers")
	cmd.Flags().String("correct-option-ids", "", "JSON array of correct option indices (for quiz)")
	cmd.Flags().Int("open-period", 0, "Poll open period in seconds")
	cmd.Flags().Int("close-date", 0, "Poll close date in Unix time")
	cmd.Flags().Bool("is-closed", false, "Close the poll immediately")
	cmd.Flags().Bool("disable-notification", false, "Send silently")
	cmd.Flags().Bool("protect-content", false, "Protect forwarded content")
	cmd.Flags().Int("reply-to-message-id", 0, "Reply to a message")

	return cmd
}
