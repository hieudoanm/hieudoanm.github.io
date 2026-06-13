package time

import (
	"strconv"
	"strings"
	"time"
)

func matchCronField(spec string, val, min, max int) bool {
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

func cronNextRuns(expr string, count int, until time.Time) []*time.Time {
	fields := strings.Fields(expr)
	if len(fields) != 5 {
		return nil
	}

	minSpec := fields[0]
	hourSpec := fields[1]

	var runs []*time.Time
	now := time.Now().Truncate(time.Minute)
	current := now

	for len(runs) < count && current.Before(until) {
		if matchCronField(minSpec, current.Minute(), 0, 59) &&
			matchCronField(hourSpec, current.Hour(), 0, 23) {
			t := current
			runs = append(runs, &t)
		}
		current = current.Add(1 * time.Minute)
	}
	return runs
}
