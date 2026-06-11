package cron

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/spf13/cobra"
)

var monthNames = map[string]int{
	"jan": 1, "feb": 2, "mar": 3, "apr": 4, "may": 5, "jun": 6,
	"jul": 7, "aug": 8, "sep": 9, "oct": 10, "nov": 11, "dec": 12,
}

var weekNames = map[string]int{
	"sun": 0, "mon": 1, "tue": 2, "wed": 3, "thu": 4, "fri": 5, "sat": 6,
}

func expandField(field string, min, max int, names map[string]int) string {
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
		from := resolveName(parts[0], names)
		to := resolveName(parts[1], names)
		return fmt.Sprintf("%s-%s", from, to)
	}

	if strings.Contains(field, ",") {
		return field
	}

	return resolveName(field, names)
}

func resolveName(val string, names map[string]int) string {
	if name, ok := names[strings.ToLower(val)]; ok {
		return fmt.Sprintf("%d", name)
	}
	return val
}

func describeCron(expr string) string {
	fields := strings.Fields(expr)
	if len(fields) != 5 {
		return "invalid cron expression (need 5 fields)"
	}

	minute := expandField(fields[0], 0, 59, nil)
	hour := expandField(fields[1], 0, 23, nil)
	dom := expandField(fields[2], 1, 31, nil)
	month := expandField(fields[3], 1, 12, monthNames)
	dow := expandField(fields[4], 0, 6, weekNames)

	var parts []string

	if minute == "every" && hour == "every" {
		parts = append(parts, "every minute")
	} else if hour == "every" {
		parts = append(parts, fmt.Sprintf("minute %s of every hour", minute))
	} else if minute == "every" {
		parts = append(parts, fmt.Sprintf("every minute of hour %s", hour))
	} else {
		parts = append(parts, fmt.Sprintf("at %s:%s", zeropad(hour), zeropad(minute)))
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

func zeropad(s string) string {
	n, err := strconv.Atoi(s)
	if err != nil {
		return s
	}
	if n < 10 {
		return fmt.Sprintf("0%d", n)
	}
	return s
}

func NewCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "cron <expression>",
		Short: "Describe a cron expression in plain English",
		Long:  `Parse a 5-field cron expression and describe when it runs.`,
		Example: `  cron "*/15 * * * *"
  cron "0 9 * * 1-5"
  cron "0 0 1 1 *"`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			fmt.Println(describeCron(args[0]))
			return nil
		},
	}
}
