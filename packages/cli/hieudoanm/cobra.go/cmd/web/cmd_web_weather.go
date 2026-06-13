package web

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/spf13/cobra"
)

func newWeatherCmd() *cobra.Command {
	var forecast, jsonOutput bool
	var city, units string

	cmd := &cobra.Command{
		Use:   "weather [city]",
		Short: "Check current weather for a city",
		Long:  `Get current weather conditions using wttr.in (free, no API key needed).`,
		Example: `  weather London
  weather "Ho Chi Minh City"
  weather --forecast Tokyo
  weather --json London
  weather --units us "New York"`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			if len(args) > 0 {
				city = args[0]
			}
			if city == "" && !forecast {
				ipCity, err := detectLocation()
				if err == nil {
					city = ipCity
				}
			}
			if city == "" {
				return fmt.Errorf("provide a city name")
			}

			unitParam := "m"
			switch units {
			case "us", "imperial":
				unitParam = "u"
			case "uk":
				unitParam = "M"
			case "si", "metric":
				unitParam = "m"
			default:
				unitParam = "m"
			}

			var url string
			if forecast {
				url = fmt.Sprintf("https://wttr.in/%s?0&lang=en&%s", city, unitParam)
				if jsonOutput {
					url = fmt.Sprintf("https://wttr.in/%s?format=j1&lang=en&%s", city, unitParam)
				}
			} else {
				if jsonOutput {
					url = fmt.Sprintf("https://wttr.in/%s?format=j1&lang=en&%s", city, unitParam)
				} else {
					url = fmt.Sprintf("https://wttr.in/%s?format=%%C+%%t+%%w+%%h&%s", city, unitParam)
				}
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

			if jsonOutput {
				var data interface{}
				if err := json.Unmarshal(body, &data); err != nil {
					return err
				}
				b, _ := json.MarshalIndent(data, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Println(text)
			}
			return nil
		},
	}

	cmd.Flags().BoolVarP(&forecast, "forecast", "f", false, "Show 3-day forecast")
	cmd.Flags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")
	cmd.Flags().StringVarP(&units, "units", "u", "metric", "Units: metric, imperial, uk")
	return cmd
}
