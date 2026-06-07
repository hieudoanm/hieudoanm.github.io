package country

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/spf13/cobra"

	"github.com/hieudoanm/jack/src/libs/requests"
)

type CountryProfile struct {
	ID   string `json:"@id"`
	Name string `json:"name"`
	Code string `json:"code"`
}

func newProfileCmd() *cobra.Command {
	var code string
	cmd := &cobra.Command{
		Use:   "profile",
		Short: "Show country profile",
		Long:  `Fetch and display a country's profile information.`,
		Example: `  chess com country profile --code US
  chess com country profile --code IT`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")
			url := fmt.Sprintf("https://api.chess.com/pub/country/%s", strings.ToUpper(code))
			body, err := requests.Get(url, requests.Options{})
			if err != nil {
				return fmt.Errorf("failed to fetch country: %w", err)
			}
			var profile CountryProfile
			if err := json.Unmarshal(body, &profile); err != nil {
				return fmt.Errorf("failed to parse country: %w", err)
			}
			if jsonOutput {
				b, _ := json.MarshalIndent(profile, "", "  ")
				fmt.Println(string(b))
				return nil
			}
			fmt.Printf("Country: %s (%s)\n", profile.Name, profile.Code)
			return nil
		},
	}
	cmd.Flags().StringVarP(&code, "code", "c", "", "ISO 3166-1 alpha-2 country code")
	return cmd
}
