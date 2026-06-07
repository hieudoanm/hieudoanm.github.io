package webhook

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

type SetResponse struct {
	Ok bool `json:"ok"`
}

func newSetCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "set",
		Short:   "Set a Telegram webhook URL",
		Long:    `Register a webhook URL to receive Telegram updates.`,
		Example: `  telegram webhook set --url https://example.com/webhook`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			webhookURL, _ := cmd.Flags().GetString("url")
			if webhookURL == "" {
				return fmt.Errorf("--url is required")
			}

			url := internal.TelegramAPIURL(token, "setWebhook")
			body := map[string]string{"url": webhookURL}
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
				var setResponse SetResponse
				if err := json.Unmarshal(responseByte, &setResponse); err != nil {
					return err
				}
				if setResponse.Ok {
					fmt.Println("Success")
				} else {
					fmt.Println("Failed")
				}
			}
			return nil
		},
	}

	cmd.Flags().String("url", "", "Webhook URL (HTTPS)")

	return cmd
}
