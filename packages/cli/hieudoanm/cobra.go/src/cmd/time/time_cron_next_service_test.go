package time

import (
	"testing"
	"time"
)

func TestCronNextRuns(t *testing.T) {
	expr := "* * * * *"
	until := time.Now().Add(5 * time.Minute).Truncate(time.Minute)
	runs := cronNextRuns(expr, 3, until)
	if len(runs) != 3 {
		t.Errorf("expected 3 runs, got %d", len(runs))
	}
}

func TestCronNextRunsInvalid(t *testing.T) {
	runs := cronNextRuns("*/15 * *", 5, time.Now().Add(time.Hour))
	if runs != nil {
		t.Error("expected nil for invalid expression")
	}
}
