package bot

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newSetNameCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "set-name",
		Short:   "Set bot name",
		Long:    `Change the bot's name.`,
		Example: `  telegram bot set-name --name "MyBot" --language-code en`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			name, _ := cmd.Flags().GetString("name")
			languageCode, _ := cmd.Flags().GetString("language-code")

			if name == "" {
				return fmt.Errorf("--name is required")
			}

			body := map[string]interface{}{
				"name": name,
			}
			if languageCode != "" {
				body["language_code"] = languageCode
			}

			url := internal.TelegramAPIURL(token, "setMyName")
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

	cmd.Flags().String("name", "", "New bot name")
	cmd.Flags().String("language-code", "", "Language code (e.g. en)")

	return cmd
}
