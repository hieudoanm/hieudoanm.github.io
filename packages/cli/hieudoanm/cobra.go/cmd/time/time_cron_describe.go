package time

import (
	"fmt"
	"strings"
)

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
