package bot

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newSetShortDescriptionCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "set-short-description",
		Short:   "Set bot short description",
		Long:    `Change the bot's short description (displayed on the bot profile).`,
		Example: `  telegram bot set-short-description --short-description "Does cool things" --language-code en`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			shortDescription, _ := cmd.Flags().GetString("short-description")
			languageCode, _ := cmd.Flags().GetString("language-code")

			if shortDescription == "" {
				return fmt.Errorf("--short-description is required")
			}

			body := map[string]interface{}{
				"short_description": shortDescription,
			}
			if languageCode != "" {
				body["language_code"] = languageCode
			}

			url := internal.TelegramAPIURL(token, "setMyShortDescription")
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

	cmd.Flags().String("short-description", "", "New short description (up to 120 chars)")
	cmd.Flags().String("language-code", "", "Language code (e.g. en)")

	return cmd
}
