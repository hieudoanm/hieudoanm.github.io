package sticker

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newAddToSetCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "add-to-set",
		Short:   "Add a sticker to a set",
		Long:    `Add a new sticker to a set created by the bot.`,
		Example: `  telegram sticker add-to-set --user-id 12345 --name "my_set" --sticker '{"sticker":"FILE_ID","emoji_list":["😀"]}'`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			userID, _ := cmd.Flags().GetInt64("user-id")
			name, _ := cmd.Flags().GetString("name")
			stickerJSON, _ := cmd.Flags().GetString("sticker")

			if userID == 0 {
				return fmt.Errorf("--user-id is required")
			}
			if name == "" {
				return fmt.Errorf("--name is required")
			}
			if stickerJSON == "" {
				return fmt.Errorf("--sticker is required (JSON object)")
			}

			var sticker map[string]interface{}
			if err := json.Unmarshal([]byte(stickerJSON), &sticker); err != nil {
				return fmt.Errorf("invalid --sticker JSON: %w", err)
			}

			body := map[string]interface{}{
				"user_id": userID,
				"name":    name,
				"sticker": sticker,
			}

			url := internal.TelegramAPIURL(token, "addStickerToSet")
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

	cmd.Flags().Int64("user-id", 0, "Sticker set owner ID")
	cmd.Flags().String("name", "", "Sticker set short name")
	cmd.Flags().String("sticker", "", "JSON object with sticker data")

	return cmd
}
