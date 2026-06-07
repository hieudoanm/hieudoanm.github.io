package inline

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newAnswerCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "answer",
		Short:   "Answer an inline query",
		Long:    `Send answers to an inline query.`,
		Example: `  telegram inline answer --inline-query-id "12345" --results '[{"type":"article","id":"1","title":"Result","input_message_content":{"message_text":"Hello"}}]'`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			inlineQueryID, _ := cmd.Flags().GetString("inline-query-id")
			resultsJSON, _ := cmd.Flags().GetString("results")
			cacheTime, _ := cmd.Flags().GetInt("cache-time")
			isPersonal, _ := cmd.Flags().GetBool("is-personal")
			nextOffset, _ := cmd.Flags().GetString("next-offset")
			buttonJSON, _ := cmd.Flags().GetString("button")

			if inlineQueryID == "" {
				return fmt.Errorf("--inline-query-id is required")
			}
			if resultsJSON == "" {
				return fmt.Errorf("--results is required (JSON array)")
			}

			var results []interface{}
			if err := json.Unmarshal([]byte(resultsJSON), &results); err != nil {
				return fmt.Errorf("invalid --results JSON: %w", err)
			}

			body := map[string]interface{}{
				"inline_query_id": inlineQueryID,
				"results":         results,
			}
			if cacheTime != 0 {
				body["cache_time"] = cacheTime
			}
			if isPersonal {
				body["is_personal"] = true
			}
			if nextOffset != "" {
				body["next_offset"] = nextOffset
			}
			if buttonJSON != "" {
				var button map[string]interface{}
				if err := json.Unmarshal([]byte(buttonJSON), &button); err != nil {
					return fmt.Errorf("invalid --button JSON: %w", err)
				}
				body["button"] = button
			}

			apiURL := internal.TelegramAPIURL(token, "answerInlineQuery")
			responseByte, postErr := requests.Post(apiURL, requests.Options{Body: body})
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

	cmd.Flags().String("inline-query-id", "", "Inline query ID")
	cmd.Flags().String("results", "", "JSON array of result objects")
	cmd.Flags().Int("cache-time", 300, "Cache time in seconds")
	cmd.Flags().Bool("is-personal", false, "Results are personal to the user")
	cmd.Flags().String("next-offset", "", "Offset for pagination")
	cmd.Flags().String("button", "", "JSON object with button data")

	return cmd
}
