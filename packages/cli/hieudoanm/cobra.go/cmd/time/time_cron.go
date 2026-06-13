package time

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/spf13/cobra"
)

var cronMonthNames = map[string]int{
	"jan": 1, "feb": 2, "mar": 3, "apr": 4, "may": 5, "jun": 6,
	"jul": 7, "aug": 8, "sep": 9, "oct": 10, "nov": 11, "dec": 12,
}

var cronWeekNames = map[string]int{
	"sun": 0, "mon": 1, "tue": 2, "wed": 3, "thu": 4, "fri": 5, "sat": 6,
}

func cronExpandField(field string, min, max int, names map[string]int) string {
	if field == "*" {
		return "every"
	}
	if strings.HasPrefix(field, "*/") {
		n, err := strconv.Atoi(field[2:])
		if err != nil {
			return field
		}
		return fmt.Sprintf("every %d", n)
	}
	if strings.Contains(field, "-") {
		parts := strings.SplitN(field, "-", 2)
		from := cronResolveName(parts[0], names)
		to := cronResolveName(parts[1], names)
		return fmt.Sprintf("%s-%s", from, to)
	}
	if strings.Contains(field, ",") {
		return field
	}
	return cronResolveName(field, names)
}

func cronResolveName(val string, names map[string]int) string {
	if name, ok := names[strings.ToLower(val)]; ok {
		return fmt.Sprintf("%d", name)
	}
	return val
}

func cronZeropad(s string) string {
	n, err := strconv.Atoi(s)
	if err != nil {
		return s
	}
	if n < 10 {
		return fmt.Sprintf("0%d", n)
	}
	return s
}

func parseUntil(until string) (time.Time, error) {
	if until == "" {
		return time.Date(2100, 1, 1, 0, 0, 0, 0, time.Local), nil
	}
	t, err := time.Parse("2006-01-02", until)
	if err != nil {
		return time.Time{}, fmt.Errorf("invalid --until date: %s", err)
	}
	return t, nil
}

func outputCronJSON(expr string, runs []*time.Time) {
	runStrs := make([]string, len(runs))
	for i, t := range runs {
		runStrs[i] = t.Format("2006-01-02 15:04 Mon")
	}
	out, _ := json.MarshalIndent(map[string]interface{}{
		"expression":  expr,
		"description": cronDescribe(expr),
		"next_runs":   runStrs,
	}, "", "  ")
	fmt.Println(string(out))
}

func outputCronText(expr string, runs []*time.Time) {
	fmt.Printf("Expression: %s\n", expr)
	fmt.Printf("Description: %s\n", cronDescribe(expr))
	fmt.Println()
	if len(runs) > 0 {
		fmt.Printf("Next %d runs:\n", len(runs))
		for i, t := range runs {
			fmt.Printf("  %2d. %s\n", i+1, t.Format("2006-01-02 15:04 Mon"))
		}
	}
}

func newCronCmd() *cobra.Command {
	var next int
	var until string
	var cronJSON bool

	cmd := &cobra.Command{
		Use:   "cron <expression>",
		Short: "Describe a cron expression in plain English and compute next runs",
		Long:  `Parse a 5-field cron expression, describe when it runs, and compute upcoming occurrences.`,
		Example: `  cron "*/15 * * * *"
  cron "0 9 * * 1-5"
  cron "0 0 1 1 *"
  cron --next 5 "*/30 * * * *"
  cron --next 10 --until "2026-12-31" "0 0 * * *"`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			expr := args[0]
			untilTime, err := parseUntil(until)
			if err != nil {
				return err
			}

			var runs []*time.Time
			if next > 0 {
				runs = cronNextRuns(expr, next, untilTime)
			}

			if cronJSON {
				outputCronJSON(expr, runs)
			} else {
				outputCronText(expr, runs)
			}
			return nil
		},
	}

	cmd.Flags().IntVarP(&next, "next", "n", 0, "Show next N run times")
	cmd.Flags().StringVar(&until, "until", "", "Show runs until this date (YYYY-MM-DD)")
	cmd.Flags().BoolVar(&cronJSON, "json", false, "Output in JSON format")
	return cmd
}
