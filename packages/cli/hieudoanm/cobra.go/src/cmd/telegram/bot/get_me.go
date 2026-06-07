package bot

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newGetMeCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "get-me",
		Short:   "Get bot info",
		Long:    `Get basic information about the bot (via getMe).`,
		Example: `  telegram bot get-me`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			url := internal.TelegramAPIURL(token, "getMe")
			responseByte, postErr := requests.Get(url, requests.Options{})
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
				var result map[string]interface{}
				if err := json.Unmarshal(responseByte, &result); err != nil {
					return err
				}
				if info, ok := result["result"].(map[string]interface{}); ok {
					fmt.Printf("ID: %v\n", info["id"])
					fmt.Printf("Username: @%v\n", info["username"])
					fmt.Printf("First name: %v\n", info["first_name"])
					if isBot, ok := info["is_bot"]; ok {
						fmt.Printf("Is bot: %v\n", isBot)
					}
				} else {
					fmt.Println("Success")
				}
			}
			return nil
		},
	}

	return cmd
}
