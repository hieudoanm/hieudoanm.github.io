package sticker

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newSetEmojiListCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "set-emoji-list",
		Short:   "Set sticker emoji list",
		Long:    `Change the list of emoji associated with a sticker.`,
		Example: `  telegram sticker set-emoji-list --sticker FILE_ID --emoji-list '["😀","😂"]'`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			sticker, _ := cmd.Flags().GetString("sticker")
			emojiListJSON, _ := cmd.Flags().GetString("emoji-list")

			if sticker == "" {
				return fmt.Errorf("--sticker is required")
			}
			if emojiListJSON == "" {
				return fmt.Errorf("--emoji-list is required (JSON array)")
			}

			var emojiList []string
			if err := json.Unmarshal([]byte(emojiListJSON), &emojiList); err != nil {
				return fmt.Errorf("invalid --emoji-list JSON: %w", err)
			}

			body := map[string]interface{}{
				"sticker":    sticker,
				"emoji_list": emojiList,
			}

			url := internal.TelegramAPIURL(token, "setStickerEmojiList")
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

	cmd.Flags().String("sticker", "", "File ID of the sticker")
	cmd.Flags().String("emoji-list", "", "JSON array of emoji strings")

	return cmd
}
