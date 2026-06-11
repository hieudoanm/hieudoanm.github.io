package weather

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"

	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	var forecast bool
	var city string

	cmd := &cobra.Command{
		Use:   "weather [city]",
		Short: "Check current weather for a city",
		Long:  `Get current weather conditions using wttr.in (free, no API key needed).`,
		Example: `  weather London
  weather "Ho Chi Minh City"
  weather --forecast Tokyo`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			if len(args) > 0 {
				city = args[0]
			}
			if city == "" {
				return fmt.Errorf("provide a city name")
			}

			url := fmt.Sprintf("https://wttr.in/%s?format=%%C+%%t+%%w+%%h&m", city)
			if forecast {
				url = fmt.Sprintf("https://wttr.in/%s?0&lang=en", city)
			}

			resp, err := http.Get(url)
			if err != nil {
				return fmt.Errorf("fetch error: %w", err)
			}
			defer resp.Body.Close()

			body, err := io.ReadAll(resp.Body)
			if err != nil {
				return err
			}
			text := strings.TrimSpace(string(body))
			fmt.Println(text)
			return nil
		},
	}

	cmd.Flags().BoolVarP(&forecast, "forecast", "f", false, "Show 3-day forecast")
	return cmd
}

func init() {
	// Silence wttr.in debug output when run via `go run`
	os.Setenv("WTTR_VERBOSE", "0")
}
