package time

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/spf13/cobra"
)

var ageJSON bool

func newAgeCmd() *cobra.Command {
	var date string
	cmd := &cobra.Command{
		Use:   "age [--date <birthdate>]",
		Short: "Calculate age from a birthdate",
		Long: `Calculate someone's age in years, months, and days from their birthdate.

Accepts formats: YYYY-MM-DD, YYYY-MM-DDTHH:MM:SS, RFC3339.`,
		Example: `  time age --date 1990-01-15
  time age --date 1990-01-15 --json`,
		RunE: func(cmd *cobra.Command, args []string) error {
			t, err := parseDatetime(date)
			if err != nil {
				return fmt.Errorf("parse date: %w", err)
			}

			now := time.Now()
			if t.After(now) {
				return fmt.Errorf("birthdate cannot be in the future")
			}

			years := now.Year() - t.Year()
			months := int(now.Month() - t.Month())
			days := now.Day() - t.Day()

			if days < 0 {
				months--
				prev := time.Date(now.Year(), now.Month(), 0, 0, 0, 0, 0, now.Location())
				days += prev.Day()
			}
			if months < 0 {
				years--
				months += 12
			}

			if ageJSON {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"birthdate": t.Format("2006-01-02"),
					"years":     years,
					"months":    months,
					"days":      days,
				}, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Printf("%d years, %d months, %d days\n", years, months, days)
			}
			return nil
		},
	}

	cmd.Flags().StringVarP(&date, "date", "d", "", "Birthdate (YYYY-MM-DD)")
	cmd.Flags().BoolVar(&ageJSON, "json", false, "Output in JSON format")
	return cmd
}
