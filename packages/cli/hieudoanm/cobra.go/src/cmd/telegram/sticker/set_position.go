package sticker

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newSetPositionCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "set-position",
		Short:   "Set sticker position in set",
		Long:    `Set the position of a sticker in the set.`,
		Example: `  telegram sticker set-position --sticker FILE_ID --position 2`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			sticker, _ := cmd.Flags().GetString("sticker")
			position, _ := cmd.Flags().GetInt("position")

			if sticker == "" {
				return fmt.Errorf("--sticker is required")
			}
			if position < 0 {
				return fmt.Errorf("--position must be non-negative")
			}

			body := map[string]interface{}{
				"sticker":  sticker,
				"position": position,
			}

			url := internal.TelegramAPIURL(token, "setStickerPositionInSet")
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
	cmd.Flags().Int("position", 0, "New position (0-based)")

	return cmd
}
