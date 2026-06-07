package country

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/spf13/cobra"

	"github.com/hieudoanm/jack/src/libs/requests"
)

type CountryClubsResponse struct {
	Clubs []string `json:"clubs"`
}

func newClubsCmd() *cobra.Command {
	var code string
	cmd := &cobra.Command{
		Use:   "clubs",
		Short: "Show country clubs",
		Long:  `List clubs associated with a country.`,
		Example: `  chess com country clubs --code US
  chess com country clubs --code IT`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")
			url := fmt.Sprintf("https://api.chess.com/pub/country/%s/clubs", strings.ToUpper(code))
			body, err := requests.Get(url, requests.Options{})
			if err != nil {
				return fmt.Errorf("failed to fetch clubs: %w", err)
			}
			var resp CountryClubsResponse
			if err := json.Unmarshal(body, &resp); err != nil {
				return fmt.Errorf("failed to parse clubs: %w", err)
			}
			if jsonOutput {
				b, _ := json.MarshalIndent(resp, "", "  ")
				fmt.Println(string(b))
				return nil
			}
			if len(resp.Clubs) == 0 {
				fmt.Println("No clubs found")
				return nil
			}
			fmt.Println()
			for _, c := range resp.Clubs {
				fmt.Println(c)
			}
			return nil
		},
	}
	cmd.Flags().StringVarP(&code, "code", "c", "", "ISO 3166-1 alpha-2 country code")
	return cmd
}
