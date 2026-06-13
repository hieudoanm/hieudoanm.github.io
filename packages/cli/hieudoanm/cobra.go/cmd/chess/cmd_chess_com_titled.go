package chess

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"

	"github.com/spf13/cobra"

	"github.com/hieudoanm/hieudoanm/libs/number"
	"github.com/hieudoanm/hieudoanm/libs/requests"
)

/* ----------------------------- Models ----------------------------- */

type TitledResponse struct {
	Players []string `json:"players"`
}

/* ----------------------------- Helpers ----------------------------- */

func fetchTitleCount(title string) (int, error) {
	url := fmt.Sprintf("https://api.chess.com/pub/titled/%s", title)

	body, err := requests.Get(url, requests.Options{})
	if err != nil {
		return 0, err
	}

	var res TitledResponse
	if err := json.Unmarshal(body, &res); err != nil {
		return 0, err
	}

	return len(res.Players), nil
}

/* ----------------------------- Command ----------------------------- */

var comTitledCmd = &cobra.Command{
	Use:   "titled",
	Short: "Run the titled operation for the chess.com app",
	Long: `The titled command is a specific utility to execute operations related to titled within the chess.com application.

As a component of the chess tools, this command empowers you to interact directly with chess.com's titled features via the CLI.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		fmt.Println()
		fmt.Printf("| %-6s | %7s |\n", "Titled", "Players")
		fmt.Printf("| %-6s | %7s |\n", strings.Repeat("-", 6), strings.Repeat("-", 7))

		for _, title := range Titles {
			count, err := fetchTitleCount(title)
			if err != nil {
				fmt.Fprintf(os.Stderr, "❌ Failed to fetch %s: %v\n", title, err)
				continue
			}

			fmt.Printf("| %-6s | %7s |\n", title, number.Comma(count))
		}
		fmt.Println()

		return nil
	},
}
