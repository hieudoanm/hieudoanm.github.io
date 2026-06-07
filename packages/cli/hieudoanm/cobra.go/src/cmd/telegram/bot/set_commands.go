package bot

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newSetCommandsCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "set-commands",
		Short:   "Set bot commands",
		Long:    `Set the list of the bot's commands for the command menu.`,
		Example: `  telegram bot set-commands --commands '[{"command":"start","description":"Start the bot"},{"command":"help","description":"Get help"}]'`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			commandsJSON, _ := cmd.Flags().GetString("commands")
			scope, _ := cmd.Flags().GetString("scope")
			languageCode, _ := cmd.Flags().GetString("language-code")

			if commandsJSON == "" {
				return fmt.Errorf("--commands is required (JSON array)")
			}

			var commands []map[string]interface{}
			if err := json.Unmarshal([]byte(commandsJSON), &commands); err != nil {
				return fmt.Errorf("invalid --commands JSON: %w", err)
			}

			body := map[string]interface{}{
				"commands": commands,
			}
			if scope != "" {
				var scopeObj map[string]interface{}
				if err := json.Unmarshal([]byte(scope), &scopeObj); err != nil {
					return fmt.Errorf("invalid --scope JSON: %w", err)
				}
				body["scope"] = scopeObj
			}
			if languageCode != "" {
				body["language_code"] = languageCode
			}

			url := internal.TelegramAPIURL(token, "setMyCommands")
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

	cmd.Flags().String("commands", "", "JSON array of command objects")
	cmd.Flags().String("scope", "", "JSON object with command scope")
	cmd.Flags().String("language-code", "", "Language code (e.g. en)")

	return cmd
}
