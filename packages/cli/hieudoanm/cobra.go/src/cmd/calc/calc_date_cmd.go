package calc

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/spf13/cobra"
)

func newDateCalcCmd() *cobra.Command {
	var addDays int
	var addMonths int
	var addYears int
	var diff string
	var format string

	cmd := &cobra.Command{
		Use:   "date",
		Short: "Date arithmetic and difference",
		Long:  `Add/subtract days, months, or years from a date, or calculate difference between two dates.`,
		Example: `  calc date --add 90
  calc date --add 30 "2026-01-01"
  calc date --diff "2026-06-01" "2026-01-01"`,
		Args: cobra.MaximumNArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			now := time.Now()
			if len(args) > 0 && diff == "" {
				var err error
				now, err = time.Parse("2006-01-02", args[0])
				if err != nil {
					return fmt.Errorf("invalid date %q (use YYYY-MM-DD)", args[0])
				}
			}

			if diff != "" {
				date1 := now
				var date2 time.Time
				if len(args) >= 2 {
					var err error
					date2, err = time.Parse("2006-01-02", args[1])
					if err != nil {
						return fmt.Errorf("invalid date %q (use YYYY-MM-DD)", args[1])
					}
				} else {
					date2 = now
					date1, _ = time.Parse("2006-01-02", diff)
				}
				days := int(date2.Sub(date1).Hours() / 24)
				if days < 0 {
					days = -days
				}

				if ok, _ := cmd.Flags().GetBool("json"); ok {
					out, err := json.MarshalIndent(map[string]interface{}{
						"date1": date1.Format("2006-01-02"),
						"date2": date2.Format("2006-01-02"),
						"days":  days,
					}, "", "  ")
					if err != nil {
						return err
					}
					fmt.Println(string(out))
				} else {
					before, after := date1.Format("2006-01-02"), date2.Format("2006-01-02")
					if date1.After(date2) {
						before, after = after, before
					}
					fmt.Printf("%s → %s: %d days\n", before, after, days)
				}
				return nil
			}

			result := now
			if addDays != 0 {
				result = result.AddDate(0, 0, addDays)
			}
			if addMonths != 0 {
				result = result.AddDate(0, addMonths, 0)
			}
			if addYears != 0 {
				result = result.AddDate(addYears, 0, 0)
			}

			outputFormat := format
			if outputFormat == "" {
				outputFormat = "2006-01-02"
			}

			if ok, _ := cmd.Flags().GetBool("json"); ok {
				out, err := json.MarshalIndent(map[string]interface{}{
					"date":    result.Format(outputFormat),
					"iso":     result.Format(time.RFC3339),
					"unix":    result.Unix(),
					"weekday": result.Weekday().String(),
				}, "", "  ")
				if err != nil {
					return err
				}
				fmt.Println(string(out))
			} else {
				fmt.Println(result.Format(outputFormat))
			}
			return nil
		},
	}

	cmd.Flags().IntVar(&addDays, "add", 0, "Add N days")
	cmd.Flags().IntVar(&addMonths, "add-months", 0, "Add N months")
	cmd.Flags().IntVar(&addYears, "add-years", 0, "Add N years")
	cmd.Flags().StringVar(&diff, "diff", "", "Calculate days between two dates (YYYY-MM-DD)")
	cmd.Flags().StringVar(&format, "format", "", "Output format (uses Go time layout)")

	return cmd
}
