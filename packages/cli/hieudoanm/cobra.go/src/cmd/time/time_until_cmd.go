package time

import (
	"fmt"
	"time"

	"github.com/spf13/cobra"
)

func newUntilCmd() *cobra.Command {
	var timeStr string
	cmd := &cobra.Command{
		Use:   "until [--time <datetime>]",
		Short: "Countdown to a specific date/time",
		Long: `Show the time remaining until a given datetime.

Accepts formats: RFC3339 (2026-12-25T00:00:00Z), ISO date (2026-12-25),
date and time (2026-12-25 15:04:05), or a Unix timestamp in seconds.`,
		Example: `  hieudoanm time until --time 2026-12-25
  hieudoanm time until --time "2026-12-25 15:04:05"
  hieudoanm time until --time 2026-12-25T00:00:00Z`,
		RunE: func(cmd *cobra.Command, args []string) error {
			t, err := parseDatetime(timeStr)
			if err != nil {
				return fmt.Errorf("parse datetime: %w", err)
			}

			now := time.Now()
			if t.Before(now) {
				fmt.Println("That time has already passed.")
				return nil
			}

			d := t.Sub(now)
			days := int(d.Hours()) / 24
			hours := int(d.Hours()) % 24
			minutes := int(d.Minutes()) % 60
			seconds := int(d.Seconds()) % 60

			fmt.Printf("%dd %dh %dm %ds\n", days, hours, minutes, seconds)
			return nil
		},
	}

	cmd.Flags().StringVarP(&timeStr, "time", "t", "", "Target datetime")
	return cmd
}
