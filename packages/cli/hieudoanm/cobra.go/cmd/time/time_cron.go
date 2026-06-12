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

func cronDescribe(expr string) string {
	fields := strings.Fields(expr)
	if len(fields) != 5 {
		return "invalid cron expression (need 5 fields)"
	}

	minute := cronExpandField(fields[0], 0, 59, nil)
	hour := cronExpandField(fields[1], 0, 23, nil)
	dom := cronExpandField(fields[2], 1, 31, nil)
	month := cronExpandField(fields[3], 1, 12, cronMonthNames)
	dow := cronExpandField(fields[4], 0, 6, cronWeekNames)

	var parts []string

	if minute == "every" && hour == "every" {
		parts = append(parts, "every minute")
	} else if hour == "every" {
		parts = append(parts, fmt.Sprintf("minute %s of every hour", minute))
	} else if minute == "every" {
		parts = append(parts, fmt.Sprintf("every minute of hour %s", hour))
	} else {
		parts = append(parts, fmt.Sprintf("at %s:%s", cronZeropad(hour), cronZeropad(minute)))
	}

	if month != "*" && month != "every" {
		parts = append(parts, fmt.Sprintf("in %s", month))
	}
	if dom != "*" && dom != "every" {
		parts = append(parts, fmt.Sprintf("on day %s", dom))
	}
	if dow != "*" && dow != "every" {
		parts = append(parts, fmt.Sprintf("on %s", dow))
	}

	return strings.Join(parts, " ")
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

			if cronJSON {
				runs := []string{}
				if next > 0 {
					untilTime := time.Date(2100, 1, 1, 0, 0, 0, 0, time.Local)
					if until != "" {
						var err error
						untilTime, err = time.Parse("2006-01-02", until)
						if err != nil {
							return fmt.Errorf("invalid --until date: %s", err)
						}
					}
					nextRuns, err := cronNextRuns(expr, next, untilTime)
					if err != nil {
						return err
					}
					for _, t := range nextRuns {
						runs = append(runs, t.Format("2006-01-02 15:04 Mon"))
					}
				}
				out, _ := json.MarshalIndent(map[string]interface{}{
					"expression":  expr,
					"description": cronDescribe(expr),
					"next_runs":   runs,
				}, "", "  ")
				fmt.Println(string(out))
				return nil
			}

			fmt.Printf("Expression: %s\n", expr)
			fmt.Printf("Description: %s\n", cronDescribe(expr))
			fmt.Println()

			if next > 0 {
				untilTime := time.Date(2100, 1, 1, 0, 0, 0, 0, time.Local)
				if until != "" {
					var err error
					untilTime, err = time.Parse("2006-01-02", until)
					if err != nil {
						return fmt.Errorf("invalid --until date: %s", err)
					}
				}

				runs, err := cronNextRuns(expr, next, untilTime)
				if err != nil {
					return err
				}
				fmt.Printf("Next %d runs:\n", len(runs))
				for i, t := range runs {
					fmt.Printf("  %2d. %s\n", i+1, t.Format("2006-01-02 15:04 Mon"))
				}
			}

			return nil
		},
	}

	cmd.Flags().IntVarP(&next, "next", "n", 0, "Show next N run times")
	cmd.Flags().StringVar(&until, "until", "", "Show runs until this date (YYYY-MM-DD)")
	cmd.Flags().BoolVar(&cronJSON, "json", false, "Output in JSON format")
	return cmd
}

func cronNextRuns(expr string, count int, until time.Time) ([]time.Time, error) {
	fields := strings.Fields(expr)
	if len(fields) != 5 {
		return nil, fmt.Errorf("invalid cron expression")
	}

	minSpec := fields[0]
	hourSpec := fields[1]

	var runs []time.Time
	now := time.Now().Truncate(time.Minute)
	current := now

	startField := func(spec string, val, min, max int) bool {
		if spec == "*" {
			return true
		}
		if strings.HasPrefix(spec, "*/") {
			step, _ := strconv.Atoi(spec[2:])
			return step > 0 && val%step == 0
		}
		if strings.Contains(spec, ",") {
			for _, p := range strings.Split(spec, ",") {
				n, _ := strconv.Atoi(strings.TrimSpace(p))
				if n == val {
					return true
				}
			}
			return false
		}
		if strings.Contains(spec, "-") {
			parts := strings.SplitN(spec, "-", 2)
			lo, _ := strconv.Atoi(parts[0])
			hi, _ := strconv.Atoi(parts[1])
			return val >= lo && val <= hi
		}
		n, _ := strconv.Atoi(spec)
		return n == val
	}

	for len(runs) < count && current.Before(until) {
		if startField(minSpec, current.Minute(), 0, 59) &&
			startField(hourSpec, current.Hour(), 0, 23) {
			runs = append(runs, current)
		}
		current = current.Add(1 * time.Minute)
	}

	return runs, nil
}
