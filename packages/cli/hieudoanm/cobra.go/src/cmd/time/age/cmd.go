package age

import (
	"fmt"
	"time"

	"github.com/hieudoanm/jack/src/cmd/time/internal"
	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "age [--date <birthdate>]",
		Short: "Calculate age from a birthdate",
		Long: `Calculate age in years, months, and days from a given birthdate.
Supports multiple date formats including YYYY-MM-DD and RFC3339.`,
		Example: `  time age --date 1990-01-15
  time age --date 1990-01-15 --json`,
		RunE: func(cmd *cobra.Command, args []string) error {
			dateStr, _ := cmd.Flags().GetString("date")
			jsonOutput, _ := cmd.Flags().GetBool("json")

			birthdate, err := internal.ParseDatetime(dateStr)
			if err != nil {
				return fmt.Errorf("invalid date: %w", err)
			}

			now := time.Now()
			if birthdate.After(now) {
				return fmt.Errorf("birthdate cannot be in the future")
			}

			years := now.Year() - birthdate.Year()
			months := int(now.Month()) - int(birthdate.Month())
			days := now.Day() - birthdate.Day()

			if days < 0 {
				months--
				prevMonth := now.AddDate(0, -1, 0)
				days += time.Date(prevMonth.Year(), prevMonth.Month()+1, 0, 0, 0, 0, 0, time.UTC).Day()
			}
			if months < 0 {
				years--
				months += 12
			}

			if jsonOutput {
				fmt.Printf(`{"birthdate":"%s","years":%d,"months":%d,"days":%d}`, dateStr, years, months, days)
				fmt.Println()
				return nil
			}
			fmt.Printf("You are %d years, %d months, and %d days old\n", years, months, days)
			return nil
		},
	}
	cmd.Flags().String("date", "", "Birthdate (e.g., 1990-01-15)")
	cmd.MarkFlagRequired("date")
	cmd.Flags().Bool("json", false, "Output in JSON format")
	return cmd
}
