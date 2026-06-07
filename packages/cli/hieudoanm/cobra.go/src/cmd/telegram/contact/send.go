package contact

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newSendCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "send",
		Short:   "Send a contact",
		Long:    `Send a phone contact to a Telegram chat.`,
		Example: `  telegram contact send --chat-id @channel --phone-number "+1234567890" --first-name "John" --last-name "Doe"`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			chatID, _ := cmd.Flags().GetString("chat-id")
			phoneNumber, _ := cmd.Flags().GetString("phone-number")
			firstName, _ := cmd.Flags().GetString("first-name")
			lastName, _ := cmd.Flags().GetString("last-name")
			vcard, _ := cmd.Flags().GetString("vcard")
			disableNotification, _ := cmd.Flags().GetBool("disable-notification")
			protectContent, _ := cmd.Flags().GetBool("protect-content")
			replyToMessageID, _ := cmd.Flags().GetInt("reply-to-message-id")

			if chatID == "" {
				return fmt.Errorf("--chat-id is required")
			}
			if phoneNumber == "" {
				return fmt.Errorf("--phone-number is required")
			}
			if firstName == "" {
				return fmt.Errorf("--first-name is required")
			}

			body := map[string]interface{}{
				"chat_id":      chatID,
				"phone_number": phoneNumber,
				"first_name":   firstName,
			}
			if lastName != "" {
				body["last_name"] = lastName
			}
			if vcard != "" {
				body["vcard"] = vcard
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

			url := internal.TelegramAPIURL(token, "sendContact")
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
	cmd.Flags().String("phone-number", "", "Contact's phone number")
	cmd.Flags().String("first-name", "", "Contact's first name")
	cmd.Flags().String("last-name", "", "Contact's last name")
	cmd.Flags().String("vcard", "", "Additional vCard data")
	cmd.Flags().Bool("disable-notification", false, "Send silently")
	cmd.Flags().Bool("protect-content", false, "Protect forwarded content")
	cmd.Flags().Int("reply-to-message-id", 0, "Reply to a message")

	return cmd
}
