package time

import (
	"fmt"
	"strconv"
	"strings"
	"time"
)

func parseEpochDateString(s string) (time.Time, error) {
	layouts := []string{
		time.RFC3339,
		"2006-01-02T15:04:05",
		"2006-01-02 15:04:05",
		"2006-01-02",
		time.RFC1123,
		time.RFC1123Z,
	}
	var t time.Time
	var err error
	for _, layout := range layouts {
		t, err = time.Parse(layout, s)
		if err == nil {
			return t, nil
		}
	}
	return time.Time{}, fmt.Errorf("unable to parse date: %s", s)
}

func parseEpochRelative(s string) (time.Time, error) {
	s = strings.TrimSpace(s)
	now := time.Now()

	parts := strings.Fields(s)
	if len(parts) < 2 {
		return time.Time{}, fmt.Errorf("invalid relative time: %s (expected e.g. '2 hours ago')", s)
	}

	n, err := strconv.Atoi(parts[0])
	if err != nil {
		return time.Time{}, fmt.Errorf("invalid number: %s", parts[0])
	}

	unit := strings.TrimSuffix(strings.ToLower(parts[1]), "s")

	direction := time.Duration(1)
	if len(parts) >= 3 && parts[len(parts)-1] == "ago" {
		direction = -1
	}
	if s[0] == '+' {
		direction = 1
	} else if s[0] == '-' {
		direction = -1
	}

	var d time.Duration
	switch unit {
	case "second":
		d = time.Second
	case "minute":
		d = time.Minute
	case "hour":
		d = time.Hour
	case "day":
		d = 24 * time.Hour
	case "week":
		d = 7 * 24 * time.Hour
	case "month":
		d = 30 * 24 * time.Hour
	case "year":
		d = 365 * 24 * time.Hour
	default:
		return time.Time{}, fmt.Errorf("unknown unit: %s", unit)
	}

	return now.Add(d * time.Duration(n) * direction), nil
}

func printEpochJSON(epoch int64, rfc3339 string) {
	fmt.Printf(`{"epoch":%d,"rfc3339":"%s"}`, epoch, rfc3339)
	fmt.Println()
}
