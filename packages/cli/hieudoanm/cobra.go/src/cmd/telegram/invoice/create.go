package invoice

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newCreateCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "create",
		Short:   "Create an invoice link",
		Long:    `Create a link for an invoice (Star Payments or custom provider).`,
		Example: `  telegram invoice create --title "Item" --description "Desc" --payload "{}" --currency XTR --prices '[{"label":"Item","amount":1}]'`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			title, _ := cmd.Flags().GetString("title")
			description, _ := cmd.Flags().GetString("description")
			payload, _ := cmd.Flags().GetString("payload")
			currency, _ := cmd.Flags().GetString("currency")
			pricesJSON, _ := cmd.Flags().GetString("prices")
			maxTipAmount, _ := cmd.Flags().GetInt("max-tip-amount")
			suggestedTipAmountsJSON, _ := cmd.Flags().GetString("suggested-tip-amounts")
			providerToken, _ := cmd.Flags().GetString("provider-token")
			needName, _ := cmd.Flags().GetBool("need-name")
			needPhone, _ := cmd.Flags().GetBool("need-phone")
			needEmail, _ := cmd.Flags().GetBool("need-email")
			needShippingAddress, _ := cmd.Flags().GetBool("need-shipping-address")
			sendPhoneToProvider, _ := cmd.Flags().GetBool("send-phone-to-provider")
			sendEmailToProvider, _ := cmd.Flags().GetBool("send-email-to-provider")
			isFlexible, _ := cmd.Flags().GetBool("is-flexible")

			if title == "" {
				return fmt.Errorf("--title is required")
			}
			if description == "" {
				return fmt.Errorf("--description is required")
			}
			if payload == "" {
				return fmt.Errorf("--payload is required")
			}
			if currency == "" {
				return fmt.Errorf("--currency is required")
			}
			if pricesJSON == "" {
				return fmt.Errorf("--prices is required (JSON array)")
			}

			var prices []interface{}
			if err := json.Unmarshal([]byte(pricesJSON), &prices); err != nil {
				return fmt.Errorf("invalid --prices JSON: %w", err)
			}

			body := map[string]interface{}{
				"title":       title,
				"description": description,
				"payload":     payload,
				"currency":    currency,
				"prices":      prices,
			}
			if maxTipAmount != 0 {
				body["max_tip_amount"] = maxTipAmount
			}
			if suggestedTipAmountsJSON != "" {
				var amounts []int
				if err := json.Unmarshal([]byte(suggestedTipAmountsJSON), &amounts); err != nil {
					return fmt.Errorf("invalid --suggested-tip-amounts JSON: %w", err)
				}
				body["suggested_tip_amounts"] = amounts
			}
			if providerToken != "" {
				body["provider_token"] = providerToken
			}
			if needName {
				body["need_name"] = true
			}
			if needPhone {
				body["need_phone_number"] = true
			}
			if needEmail {
				body["need_email"] = true
			}
			if needShippingAddress {
				body["need_shipping_address"] = true
			}
			if sendPhoneToProvider {
				body["send_phone_number_to_provider"] = true
			}
			if sendEmailToProvider {
				body["send_email_to_provider"] = true
			}
			if isFlexible {
				body["is_flexible"] = true
			}

			url := internal.TelegramAPIURL(token, "createInvoiceLink")
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
				var result map[string]interface{}
				if err := json.Unmarshal(responseByte, &result); err != nil {
					return err
				}
				if link, ok := result["result"].(string); ok {
					fmt.Println(link)
				} else {
					fmt.Println("Success")
				}
			}
			return nil
		},
	}

	cmd.Flags().String("title", "", "Product title")
	cmd.Flags().String("description", "", "Product description")
	cmd.Flags().String("payload", "", "Bot-defined payload JSON")
	cmd.Flags().String("currency", "XTR", "Currency (XTR for Stars, or fiat code)")
	cmd.Flags().String("prices", "", "JSON array of labeled price objects")
	cmd.Flags().Int("max-tip-amount", 0, "Maximum tip amount")
	cmd.Flags().String("suggested-tip-amounts", "", "JSON array of suggested tip amounts")
	cmd.Flags().String("provider-token", "", "Payment provider token")
	cmd.Flags().Bool("need-name", false, "Ask for user's full name")
	cmd.Flags().Bool("need-phone", false, "Ask for phone number")
	cmd.Flags().Bool("need-email", false, "Ask for email")
	cmd.Flags().Bool("need-shipping-address", false, "Ask for shipping address")
	cmd.Flags().Bool("send-phone-to-provider", false, "Send phone to provider")
	cmd.Flags().Bool("send-email-to-provider", false, "Send email to provider")
	cmd.Flags().Bool("is-flexible", false, "Final price depends on shipping")

	return cmd
}
