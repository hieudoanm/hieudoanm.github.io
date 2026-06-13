package time

import (
	"fmt"
	"strconv"
	"strings"
	"time"
)

func parseTimerDuration(s string) (time.Duration, error) {
	if strings.HasSuffix(s, "s") {
		n, err := strconv.Atoi(strings.TrimSuffix(s, "s"))
		if err != nil {
			return 0, fmt.Errorf("invalid duration: %s", s)
		}
		return time.Duration(n) * time.Second, nil
	}
	if strings.HasSuffix(s, "m") {
		n, err := strconv.Atoi(strings.TrimSuffix(s, "m"))
		if err != nil {
			return 0, fmt.Errorf("invalid duration: %s", s)
		}
		return time.Duration(n) * time.Minute, nil
	}
	n, err := strconv.Atoi(s)
	if err != nil {
		return 0, fmt.Errorf("invalid duration: %s (use e.g. 30s, 5m)", s)
	}
	return time.Duration(n) * time.Second, nil
}

func formatTimerDuration(d time.Duration) string {
	d = d.Round(time.Second)
	m := int(d.Minutes())
	s := int(d.Seconds()) - m*60
	return fmt.Sprintf("%02d:%02d", m, s)
}
