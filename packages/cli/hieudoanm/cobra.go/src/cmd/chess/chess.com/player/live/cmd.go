package live

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"

	"github.com/spf13/cobra"

	"github.com/hieudoanm/jack/src/libs/requests"
)

type LiveGamesResponse struct {
	Games []LiveGame `json:"games"`
}

type LiveGamePlayer struct {
	Username string `json:"username"`
	Rating   int    `json:"rating"`
	Result   string `json:"result"`
	ID       string `json:"@id"`
	UUID     string `json:"uuid"`
}

type LiveGame struct {
	URL         string             `json:"url"`
	PGN         string             `json:"pgn"`
	TimeControl string             `json:"time_control"`
	EndTime     int64              `json:"end_time"`
	Rated       bool               `json:"rated"`
	Accuracies  map[string]float64 `json:"accuracies"`
	FEN         string             `json:"fen"`
	TimeClass   string             `json:"time_class"`
	Rules       string             `json:"rules"`
	White       LiveGamePlayer     `json:"white"`
	Black       LiveGamePlayer     `json:"black"`
	ECO         string             `json:"eco"`
}

func NewCmd() *cobra.Command {
	var username string
	var base, inc int
	cmd := &cobra.Command{
		Use:   "live",
		Short: "Show live game archive by time control",
		Long:  `Fetch and display live chess games filtered by base time and increment.`,
		Example: `  chess com player live --username hikaru --base 180 --increment 2
  chess com player live --username magnuscarlsen --base 60 --increment 0`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")
			url := fmt.Sprintf("https://api.chess.com/pub/player/%s/games/live/%d/%d", strings.ToLower(username), base, inc)
			body, err := requests.Get(url, requests.Options{})
			if err != nil {
				return fmt.Errorf("failed to fetch live games: %w", err)
			}
			var resp LiveGamesResponse
			if err := json.Unmarshal(body, &resp); err != nil {
				return fmt.Errorf("failed to parse live games: %w", err)
			}
			if jsonOutput {
				b, _ := json.MarshalIndent(resp, "", "  ")
				fmt.Println(string(b))
				return nil
			}
			if len(resp.Games) == 0 {
				fmt.Println("No games found")
				return nil
			}
			fmt.Printf("Live games for %s (%d+%d):\n", username, base, inc)
			for _, g := range resp.Games {
				fmt.Printf("  %s (%d) vs %s (%d) | %s | %s\n",
					g.White.Username, g.White.Rating,
					g.Black.Username, g.Black.Rating,
					strconv.FormatBool(g.Rated), g.TimeClass)
			}
			return nil
		},
	}
	cmd.Flags().StringVarP(&username, "username", "u", "", "Chess.com username")
	cmd.Flags().IntVarP(&base, "base", "b", 0, "Base time in seconds")
	cmd.Flags().IntVarP(&inc, "increment", "i", 0, "Increment in seconds")
	return cmd
}
