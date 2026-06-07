package sticker

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newSetThumbnailCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "set-thumbnail",
		Short:   "Set sticker set thumbnail",
		Long:    `Set the thumbnail of a sticker set.`,
		Example: `  telegram sticker set-thumbnail --name "my_set" --user-id 12345 --thumbnail FILE_ID`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			name, _ := cmd.Flags().GetString("name")
			userID, _ := cmd.Flags().GetInt64("user-id")
			thumbnail, _ := cmd.Flags().GetString("thumbnail")
			format, _ := cmd.Flags().GetString("format")

			if name == "" {
				return fmt.Errorf("--name is required (sticker set short name)")
			}
			if userID == 0 {
				return fmt.Errorf("--user-id is required")
			}
			if thumbnail == "" {
				return fmt.Errorf("--thumbnail is required")
			}
			if format == "" {
				format = "static"
			}

			body := map[string]interface{}{
				"name":      name,
				"user_id":   userID,
				"thumbnail": thumbnail,
				"format":    format,
			}

			url := internal.TelegramAPIURL(token, "setStickerSetThumbnail")
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

	cmd.Flags().String("name", "", "Sticker set short name")
	cmd.Flags().Int64("user-id", 0, "Sticker set owner ID")
	cmd.Flags().String("thumbnail", "", "Thumbnail file ID or URL")
	cmd.Flags().String("format", "static", "Thumbnail format: static/animated/video")

	return cmd
}
