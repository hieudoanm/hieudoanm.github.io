package chess

import (
	"encoding/json"
	"fmt"

	"strings"

	"github.com/hieudoanm/hieudoanm/libs/colors"
	"github.com/hieudoanm/hieudoanm/libs/number"
	"github.com/hieudoanm/hieudoanm/libs/requests"

	"github.com/spf13/cobra"
)

/* ----------------------------- Helpers ----------------------------- */

func printRatingsHeader() {
	fmt.Printf(
		"| %-8s | %8s | %8s | %8s | %8s | %8s |\n",
		"Mode",
		"Best",
		"Last",
		"Win",
		"Draw",
		"Loss",
	)
	fmt.Printf(
		"| %-8s | %8s | %8s | %8s | %8s | %8s |\n",
		strings.Repeat("-", 8),
		strings.Repeat("-", 8),
		strings.Repeat("-", 8),
		strings.Repeat("-", 8),
		strings.Repeat("-", 8),
		strings.Repeat("-", 8),
	)
}

func printRating(label string, r ChessRating) {
	fmt.Printf(
		"| %-8s | %8s | %8s | %8s | %8s | %8s |\n",
		label,
		number.Comma(r.Best.Rating),
		number.Comma(r.Last.Rating),
		number.Comma(r.Record.Win),
		number.Comma(r.Record.Draw),
		number.Comma(r.Record.Loss),
	)
}

/* ----------------------------- Models ----------------------------- */

type PlayerProfile struct {
	Username   string `json:"username"`
	Name       string `json:"name"`
	Country    string `json:"country"`
	Title      string `json:"title"`
	Fide       int    `json:"fide"`
	Followers  int    `json:"followers"`
	Joined     int64  `json:"joined"`
	LastOnline int64  `json:"last_online"`
}

type ChessRatingLast struct {
	Rating int `json:"rating"`
	Date   int `json:"date"`
	Rd     int `json:"rd"`
}

type ChessRatingBest struct {
	Rating int    `json:"rating"`
	Date   int    `json:"date"`
	Game   string `json:"game"`
}

type ChessRatingRecord struct {
	Win  int `json:"win"`
	Draw int `json:"draw"`
	Loss int `json:"loss"`
}

type ChessRating struct {
	Last   ChessRatingLast   `json:"last"`
	Best   ChessRatingBest   `json:"best"`
	Record ChessRatingRecord `json:"record"`
}

type PlayerStats struct {
	ChessBullet ChessRating `json:"chess_bullet"`
	ChessBlitz  ChessRating `json:"chess_blitz"`
	ChessRapid  ChessRating `json:"chess_rapid"`
}

/* ----------------------------- Command ----------------------------- */

func newComPlayerCmd() *cobra.Command {
	var username string
	cmd := &cobra.Command{
		Use:   "player [--username <username>]",
		Short: "Show Chess.com player profile and stats",
		Long:  `Fetch and display a Chess.com player's profile information including name, title, country, and ratings for bullet, blitz, and rapid.`,
		Example: `  chess com player --username hikaru
  chess com player --username magnuscarlsen`,
		RunE: func(cmd *cobra.Command, args []string) error {
			username = strings.ToLower(username)
			profileURL := fmt.Sprintf("https://api.chess.com/pub/player/%s", username)
			statsURL := fmt.Sprintf("https://api.chess.com/pub/player/%s/stats", username)

			// ---- profile ----
			profileBody, err := requests.Get(profileURL, requests.Options{})
			if err != nil {
				return fmt.Errorf("failed to fetch player profile: %w", err)
			}

			var profile PlayerProfile
			if err := json.Unmarshal(profileBody, &profile); err != nil {
				return fmt.Errorf("failed to parse profile: %w", err)
			}

			// ---- stats ----
			statsBody, err := requests.Get(statsURL, requests.Options{})
			if err != nil {
				return fmt.Errorf("failed to fetch player stats: %w", err)
			}

			var stats PlayerStats
			if err := json.Unmarshal(statsBody, &stats); err != nil {
				return fmt.Errorf("failed to parse stats: %w", err)
			}

			// ---- output ----
			fmt.Println()
			fmt.Printf("♟ Player: %s\n", strings.ToUpper(profile.Username))
			fmt.Println("---------------------------------------------------------------")

			if profile.Name != "" {
				fmt.Printf("Name      : %s\n", profile.Name)
			}
			if profile.Title != "" {
				fmt.Printf("Title     : %s\n", colors.Red(profile.Title))
			}

			_, countryName := country(profile.Country)
			fmt.Printf("Country   : %s\n", countryName)

			if profile.Fide > 0 {
				fmt.Printf("FIDE      : %d\n", profile.Fide)
			}

			fmt.Printf("Followers : %s\n", number.Comma(profile.Followers))

			fmt.Println()
			fmt.Println("Ratings")
			fmt.Println()

			printRatingsHeader()
			printRating("Bullet", stats.ChessBullet)
			printRating("Blitz", stats.ChessBlitz)
			printRating("Rapid", stats.ChessRapid)

			return nil
		},
	}

	cmd.Flags().StringVarP(&username, "username", "u", "", "Chess.com username")
	return cmd
}
