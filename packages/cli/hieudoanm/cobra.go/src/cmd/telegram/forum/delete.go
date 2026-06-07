package forum

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newDeleteCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "delete",
		Short:   "Delete a forum topic",
		Long:    `Delete a topic in a forum supergroup.`,
		Example: `  telegram forum delete --chat-id @channel --message-thread-id 42`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			chatID, _ := cmd.Flags().GetString("chat-id")
			messageThreadID, _ := cmd.Flags().GetInt("message-thread-id")

			if chatID == "" {
				return fmt.Errorf("--chat-id is required")
			}
			if messageThreadID == 0 {
				return fmt.Errorf("--message-thread-id is required")
			}

			body := map[string]interface{}{
				"chat_id":           chatID,
				"message_thread_id": messageThreadID,
			}

			url := internal.TelegramAPIURL(token, "deleteForumTopic")
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

	cmd.Flags().String("chat-id", "", "Target supergroup chat ID or @username")
	cmd.Flags().Int("message-thread-id", 0, "Topic message thread ID")

	return cmd
}
