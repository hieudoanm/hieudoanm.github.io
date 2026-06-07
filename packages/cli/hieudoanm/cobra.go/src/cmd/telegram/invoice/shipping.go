package invoice

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newShippingCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "shipping",
		Short:   "Answer a shipping query",
		Long:    `Answer a shipping query from a user.`,
		Example: `  telegram invoice shipping --shipping-query-id "12345" --ok --shipping-options '[{"id":"standard","title":"Standard","prices":[{"label":"Shipping","amount":500}]}]'`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			shippingQueryID, _ := cmd.Flags().GetString("shipping-query-id")
			ok, _ := cmd.Flags().GetBool("ok")
			shippingOptionsJSON, _ := cmd.Flags().GetString("shipping-options")
			errorMessage, _ := cmd.Flags().GetString("error-message")

			if shippingQueryID == "" {
				return fmt.Errorf("--shipping-query-id is required")
			}

			body := map[string]interface{}{
				"shipping_query_id": shippingQueryID,
				"ok":                ok,
			}
			if ok && shippingOptionsJSON != "" {
				var options []interface{}
				if err := json.Unmarshal([]byte(shippingOptionsJSON), &options); err != nil {
					return fmt.Errorf("invalid --shipping-options JSON: %w", err)
				}
				body["shipping_options"] = options
			}
			if !ok && errorMessage != "" {
				body["error_message"] = errorMessage
			}

			url := internal.TelegramAPIURL(token, "answerShippingQuery")
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

	cmd.Flags().String("shipping-query-id", "", "Shipping query ID")
	cmd.Flags().Bool("ok", true, "Accept the shipping query")
	cmd.Flags().String("shipping-options", "", "JSON array of shipping options (required if ok=true)")
	cmd.Flags().String("error-message", "", "Error message (required if ok=false)")

	return cmd
}
