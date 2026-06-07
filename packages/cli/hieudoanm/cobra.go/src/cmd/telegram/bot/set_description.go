package bot

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newSetDescriptionCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "set-description",
		Short:   "Set bot description",
		Long:    `Change the bot's description (short text shown on the bot profile).`,
		Example: `  telegram bot set-description --description "A helpful bot" --language-code en`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			description, _ := cmd.Flags().GetString("description")
			languageCode, _ := cmd.Flags().GetString("language-code")

			if description == "" {
				return fmt.Errorf("--description is required")
			}

			body := map[string]interface{}{
				"description": description,
			}
			if languageCode != "" {
				body["language_code"] = languageCode
			}

			url := internal.TelegramAPIURL(token, "setMyDescription")
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

	cmd.Flags().String("description", "", "New bot description (up to 512 chars)")
	cmd.Flags().String("language-code", "", "Language code (e.g. en)")

	return cmd
}
