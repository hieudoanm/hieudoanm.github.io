package location

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
		Short:   "Send a location",
		Long:    `Send a geographic location to a Telegram chat.`,
		Example: `  telegram location send --chat-id @channel --latitude 48.8566 --longitude 2.3522`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			chatID, _ := cmd.Flags().GetString("chat-id")
			latitude, _ := cmd.Flags().GetFloat64("latitude")
			longitude, _ := cmd.Flags().GetFloat64("longitude")
			horizontalAccuracy, _ := cmd.Flags().GetFloat64("horizontal-accuracy")
			livePeriod, _ := cmd.Flags().GetInt("live-period")
			heading, _ := cmd.Flags().GetInt("heading")
			proximityAlertRadius, _ := cmd.Flags().GetInt("proximity-alert-radius")
			disableNotification, _ := cmd.Flags().GetBool("disable-notification")
			protectContent, _ := cmd.Flags().GetBool("protect-content")
			replyToMessageID, _ := cmd.Flags().GetInt("reply-to-message-id")

			if chatID == "" {
				return fmt.Errorf("--chat-id is required")
			}

			body := map[string]interface{}{
				"chat_id":   chatID,
				"latitude":  latitude,
				"longitude": longitude,
			}
			if horizontalAccuracy != 0 {
				body["horizontal_accuracy"] = horizontalAccuracy
			}
			if livePeriod != 0 {
				body["live_period"] = livePeriod
			}
			if heading != 0 {
				body["heading"] = heading
			}
			if proximityAlertRadius != 0 {
				body["proximity_alert_radius"] = proximityAlertRadius
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

			url := internal.TelegramAPIURL(token, "sendLocation")
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
	cmd.Flags().Float64("horizontal-accuracy", 0, "Horizontal accuracy in meters")
	cmd.Flags().Int("live-period", 0, "Live location period in seconds")
	cmd.Flags().Int("heading", 0, "Direction in degrees (1-360)")
	cmd.Flags().Int("proximity-alert-radius", 0, "Proximity alert radius in meters")
	cmd.Flags().Bool("disable-notification", false, "Send silently")
	cmd.Flags().Bool("protect-content", false, "Protect forwarded content")
	cmd.Flags().Int("reply-to-message-id", 0, "Reply to a message")

	return cmd
}
