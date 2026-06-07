package sticker

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newSetTitleCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "set-title",
		Short:   "Set sticker set title",
		Long:    `Set the title of a created sticker set.`,
		Example: `  telegram sticker set-title --name "my_set" --title "New Title"`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			name, _ := cmd.Flags().GetString("name")
			title, _ := cmd.Flags().GetString("title")

			if name == "" {
				return fmt.Errorf("--name is required (sticker set short name)")
			}
			if title == "" {
				return fmt.Errorf("--title is required")
			}

			body := map[string]interface{}{
				"name":  name,
				"title": title,
			}

			url := internal.TelegramAPIURL(token, "setStickerSetTitle")
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
	cmd.Flags().String("title", "", "New sticker set title")

	return cmd
}
