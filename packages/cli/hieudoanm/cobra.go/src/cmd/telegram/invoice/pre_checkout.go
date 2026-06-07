package invoice

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newPreCheckoutCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "pre-checkout",
		Short:   "Answer a pre-checkout query",
		Long:    `Answer a pre-checkout query from a user.`,
		Example: `  telegram invoice pre-checkout --pre-checkout-query-id "12345" --ok`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			preCheckoutQueryID, _ := cmd.Flags().GetString("pre-checkout-query-id")
			ok, _ := cmd.Flags().GetBool("ok")
			errorMessage, _ := cmd.Flags().GetString("error-message")

			if preCheckoutQueryID == "" {
				return fmt.Errorf("--pre-checkout-query-id is required")
			}

			body := map[string]interface{}{
				"pre_checkout_query_id": preCheckoutQueryID,
				"ok":                    ok,
			}
			if !ok && errorMessage != "" {
				body["error_message"] = errorMessage
			}

			url := internal.TelegramAPIURL(token, "answerPreCheckoutQuery")
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

	cmd.Flags().String("pre-checkout-query-id", "", "Pre-checkout query ID")
	cmd.Flags().Bool("ok", true, "Approve the pre-checkout query")
	cmd.Flags().String("error-message", "", "Error message (required if ok=false)")

	return cmd
}
