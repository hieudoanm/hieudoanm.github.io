package epoch

import (
	"fmt"
	"strconv"
	"strings"
	"time"
)

func parseEpochDateString(s string) (time.Time, error) {
	layouts := []string{
		time.RFC3339,
		time.RFC1123,
		"2006-01-02T15:04:05",
		"2006-01-02 15:04:05",
		"2006-01-02",
	}
	for _, layout := range layouts {
		t, err := time.Parse(layout, s)
		if err == nil {
			return t, nil
		}
	}
	return time.Time{}, fmt.Errorf("unable to parse date: %s", s)
}

func parseEpochRelative(s string) (time.Time, error) {
	s = strings.TrimSpace(s)
	parts := strings.Fields(s)
	if len(parts) < 2 {
		return time.Time{}, fmt.Errorf("invalid relative time: %s", s)
	}

	// e.g., "2 hours ago" or "+3 days"
	sign := 1
	offset := parts[0]
	if offset[0] == '+' {
		offset = offset[1:]
	} else if offset[0] == '-' {
		sign = -1
		offset = offset[1:]
	} else if strings.ToLower(parts[len(parts)-1]) == "ago" {
		sign = -1
		parts = parts[:len(parts)-1]
		offset = parts[0]
	}

	n, err := strconv.Atoi(offset)
	if err != nil {
		return time.Time{}, fmt.Errorf("invalid number: %s", offset)
	}

	var unit string
	if len(parts) >= 2 {
		unit = parts[1]
	} else {
		return time.Time{}, fmt.Errorf("missing time unit")
	}

	unit = strings.ToLower(unit)
	switch {
	case strings.HasPrefix(unit, "second"):
		return time.Now().Add(time.Duration(sign*n) * time.Second), nil
	case strings.HasPrefix(unit, "minute"):
		return time.Now().Add(time.Duration(sign*n) * time.Minute), nil
	case strings.HasPrefix(unit, "hour"):
		return time.Now().Add(time.Duration(sign*n) * time.Hour), nil
	case strings.HasPrefix(unit, "day"):
		return time.Now().Add(time.Duration(sign*n) * 24 * time.Hour), nil
	case strings.HasPrefix(unit, "week"):
		return time.Now().Add(time.Duration(sign*n) * 7 * 24 * time.Hour), nil
	case strings.HasPrefix(unit, "month"):
		return time.Now().Add(time.Duration(sign*n) * 30 * 24 * time.Hour), nil
	case strings.HasPrefix(unit, "year"):
		return time.Now().Add(time.Duration(sign*n) * 365 * 24 * time.Hour), nil
	default:
		return time.Time{}, fmt.Errorf("unknown time unit: %s", unit)
	}
}

func printEpochJSON(epoch int64, rfc3339 string) {
	fmt.Printf(`{"epoch":%d,"rfc3339":"%s"}`, epoch, rfc3339)
	fmt.Println()
}
