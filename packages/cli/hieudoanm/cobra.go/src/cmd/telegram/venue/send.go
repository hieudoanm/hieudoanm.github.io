package venue

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newSendCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "send",
		Short:   "Send a venue",
		Long:    `Send venue information to a Telegram chat.`,
		Example: `  telegram venue send --chat-id @channel --latitude 48.8566 --longitude 2.3522 --title "Eiffel Tower" --address "Champ de Mars"`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			chatID, _ := cmd.Flags().GetString("chat-id")
			latitude, _ := cmd.Flags().GetFloat64("latitude")
			longitude, _ := cmd.Flags().GetFloat64("longitude")
			title, _ := cmd.Flags().GetString("title")
			address, _ := cmd.Flags().GetString("address")
			foursquareID, _ := cmd.Flags().GetString("foursquare-id")
			foursquareType, _ := cmd.Flags().GetString("foursquare-type")
			googlePlaceID, _ := cmd.Flags().GetString("google-place-id")
			googlePlaceType, _ := cmd.Flags().GetString("google-place-type")
			disableNotification, _ := cmd.Flags().GetBool("disable-notification")
			protectContent, _ := cmd.Flags().GetBool("protect-content")
			replyToMessageID, _ := cmd.Flags().GetInt("reply-to-message-id")

			if chatID == "" {
				return fmt.Errorf("--chat-id is required")
			}
			if title == "" {
				return fmt.Errorf("--title is required")
			}
			if address == "" {
				return fmt.Errorf("--address is required")
			}

			body := map[string]interface{}{
				"chat_id":   chatID,
				"latitude":  latitude,
				"longitude": longitude,
				"title":     title,
				"address":   address,
			}
			if foursquareID != "" {
				body["foursquare_id"] = foursquareID
			}
			if foursquareType != "" {
				body["foursquare_type"] = foursquareType
			}
			if googlePlaceID != "" {
				body["google_place_id"] = googlePlaceID
			}
			if googlePlaceType != "" {
				body["google_place_type"] = googlePlaceType
			}
			if disableNotification {
				body["disable_notification"] = true
			}
			if protectContent {
				body["protect_content"] = true
			}
			if replyToMessageID != 0 {
				body["reply_to_message_id"] = replyToMessageID
			}

			url := internal.TelegramAPIURL(token, "sendVenue")
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

	cmd.Flags().String("chat-id", "", "Target chat ID or @username")
	cmd.Flags().Float64("latitude", 0, "Latitude")
	cmd.Flags().Float64("longitude", 0, "Longitude")
	cmd.Flags().String("title", "", "Venue name")
	cmd.Flags().String("address", "", "Venue address")
	cmd.Flags().String("foursquare-id", "", "Foursquare venue ID")
	cmd.Flags().String("foursquare-type", "", "Foursquare venue type")
	cmd.Flags().String("google-place-id", "", "Google Place ID")
	cmd.Flags().String("google-place-type", "", "Google Place type")
	cmd.Flags().Bool("disable-notification", false, "Send silently")
	cmd.Flags().Bool("protect-content", false, "Protect forwarded content")
	cmd.Flags().Int("reply-to-message-id", 0, "Reply to a message")

	return cmd
}
