package gift

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
		Short:   "Send a gift",
		Long:    `Send a gift to a user by gift ID.`,
		Example: `  telegram gift send --user-id 12345 --gift-id "gift_id_here" --text "Congrats!"`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			userID, _ := cmd.Flags().GetInt64("user-id")
			giftID, _ := cmd.Flags().GetString("gift-id")
			text, _ := cmd.Flags().GetString("text")
			textParseMode, _ := cmd.Flags().GetString("text-parse-mode")
			protectContent, _ := cmd.Flags().GetBool("protect-content")

			if userID == 0 {
				return fmt.Errorf("--user-id is required")
			}
			if giftID == "" {
				return fmt.Errorf("--gift-id is required")
			}

			body := map[string]interface{}{
				"user_id": userID,
				"gift_id": giftID,
			}
			if text != "" {
				body["text"] = text
			}
			if textParseMode != "" {
				body["text_parse_mode"] = textParseMode
			}
			if protectContent {
				body["protect_content"] = true
			}

			url := internal.TelegramAPIURL(token, "sendGift")
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
	cmd.Flags().String("gift-id", "", "Gift identifier")
	cmd.Flags().String("text", "", "Text accompanying the gift")
	cmd.Flags().String("text-parse-mode", "", "Text parse mode: MarkdownV2/HTML")
	cmd.Flags().Bool("protect-content", false, "Protect forwarded content")

	return cmd
}
