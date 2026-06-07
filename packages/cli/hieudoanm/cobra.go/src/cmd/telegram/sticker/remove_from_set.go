package sticker

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newRemoveFromSetCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "remove-from-set",
		Short:   "Remove a sticker from a set",
		Long:    `Remove a sticker from a set.`,
		Example: `  telegram sticker remove-from-set --sticker FILE_ID`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			sticker, _ := cmd.Flags().GetString("sticker")

			if sticker == "" {
				return fmt.Errorf("--sticker is required")
			}

			body := map[string]interface{}{
				"sticker": sticker,
			}

			url := internal.TelegramAPIURL(token, "removeStickerFromSet")
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

	cmd.Flags().String("sticker", "", "File ID of the sticker to remove")

	return cmd
}
