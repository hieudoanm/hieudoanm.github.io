package crosstable

import (
	"encoding/json"
	"fmt"
	"net/url"

	"github.com/hieudoanm/jack/src/libs/requests"

	"github.com/spf13/cobra"
)

type Crosstable struct {
	Users   map[string]float64 `json:"users"`
	NbGames int                `json:"nbGames"`
}

func NewCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "crosstable [user1] [user2]",
		Short: "Head-to-head statistics between two users",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOut, _ := cmd.Flags().GetBool("json")
			u1, u2 := args[0], args[1]

			apiURL := fmt.Sprintf("https://lichess.org/api/crosstable/%s/%s", url.PathEscape(u1), url.PathEscape(u2))
			body, err := requests.Get(apiURL, requests.Options{})
			if err != nil {
				return fmt.Errorf("failed to fetch crosstable: %w", err)
			}

			var ct Crosstable
			if err := json.Unmarshal(body, &ct); err != nil {
				return fmt.Errorf("failed to parse crosstable: %w", err)
			}

			if jsonOut {
				b, _ := json.MarshalIndent(ct, "", "  ")
				fmt.Println(string(b))
				return nil
			}

			fmt.Println()
			fmt.Printf("♞ %s vs %s\n", u1, u2)
			fmt.Println("------------------------------------------------")
			fmt.Printf("Games   : %d\n", ct.NbGames)
			for name, score := range ct.Users {
				fmt.Printf("  %s: %.1f\n", name, score)
			}

			return nil
		},
	}
}
