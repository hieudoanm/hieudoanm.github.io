package sticker

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newSetKeywordsCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "set-keywords",
		Short:   "Set sticker keywords",
		Long:    `Change the search keywords for a sticker.`,
		Example: `  telegram sticker set-keywords --sticker FILE_ID --keywords '["keyword1","keyword2"]'`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			sticker, _ := cmd.Flags().GetString("sticker")
			keywordsJSON, _ := cmd.Flags().GetString("keywords")

			if sticker == "" {
				return fmt.Errorf("--sticker is required")
			}
			if keywordsJSON == "" {
				return fmt.Errorf("--keywords is required (JSON array)")
			}

			var keywords []string
			if err := json.Unmarshal([]byte(keywordsJSON), &keywords); err != nil {
				return fmt.Errorf("invalid --keywords JSON: %w", err)
			}

			body := map[string]interface{}{
				"sticker":  sticker,
				"keywords": keywords,
			}

			url := internal.TelegramAPIURL(token, "setStickerKeywords")
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
	cmd.Flags().String("keywords", "", "JSON array of keyword strings")

	return cmd
}
