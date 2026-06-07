package epoch

import (
	"encoding/json"
	"strings"
	"testing"
	"time"
)

func TestParseEpochDateStringRFC3339(t *testing.T) {
	tm, err := parseEpochDateString("2024-06-11T15:04:05Z")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if tm.Year() != 2024 || tm.Month() != 6 || tm.Day() != 11 {
		t.Errorf("unexpected date: %v", tm)
	}
}

func TestParseEpochDateStringYYYYMMDD(t *testing.T) {
	tm, err := parseEpochDateString("2024-06-11")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if tm.Year() != 2024 || tm.Month() != 6 || tm.Day() != 11 {
		t.Errorf("unexpected date: %v", tm)
	}
}

func TestParseEpochDateStringWithSpaces(t *testing.T) {
	tm, err := parseEpochDateString("2024-06-11 15:04:05")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if tm.Year() != 2024 || tm.Month() != 6 || tm.Day() != 11 {
		t.Errorf("unexpected date: %v", tm)
	}
}

func TestParseEpochDateStringInvalid(t *testing.T) {
	_, err := parseEpochDateString("not-a-date")
	if err == nil {
		t.Fatal("expected error for invalid date string")
	}
}

func TestParseEpochRelativeHoursAgo(t *testing.T) {
	tm, err := parseEpochRelative("2 hours ago")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	expected := time.Now().Add(-2 * time.Hour)
	diff := tm.Sub(expected)
	if diff < -time.Second || diff > time.Second {
		t.Errorf("expected ~2 hours ago, diff: %v", diff)
	}
}

func TestParseEpochRelativePlusDays(t *testing.T) {
	tm, err := parseEpochRelative("+3 days")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	expected := time.Now().Add(3 * 24 * time.Hour)
	diff := tm.Sub(expected)
	if diff < -time.Second || diff > time.Second {
		t.Errorf("expected ~+3 days, diff: %v", diff)
	}
}

func TestParseEpochRelativeMinusWeek(t *testing.T) {
	tm, err := parseEpochRelative("-1 week")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	expected := time.Now().Add(-7 * 24 * time.Hour)
	diff := tm.Sub(expected)
	if diff < -time.Second || diff > time.Second {
		t.Errorf("expected ~-1 week, diff: %v", diff)
	}
}

func TestParseEpochRelativeInvalid(t *testing.T) {
	_, err := parseEpochRelative("foo")
	if err == nil {
		t.Fatal("expected error for invalid relative time")
	}
}

func TestParseEpochRelativeUnknownUnit(t *testing.T) {
	_, err := parseEpochRelative("5 decades ago")
	if err == nil {
		t.Fatal("expected error for unknown unit")
	}
}

func TestPrintEpochJSON(t *testing.T) {
	out := captureOutput(func() {
		printEpochJSON(1718100000, "2024-06-11T15:00:00Z")
	})
	var result map[string]interface{}
	if err := json.Unmarshal([]byte(out), &result); err != nil {
		t.Fatalf("invalid JSON output: %v\noutput: %s", err, out)
	}
	if result["epoch"] != float64(1718100000) {
		t.Errorf("expected epoch 1718100000, got %v", result["epoch"])
	}
	if result["rfc3339"] != "2024-06-11T15:00:00Z" {
		t.Errorf("expected rfc3339 '2024-06-11T15:00:00Z', got %v", result["rfc3339"])
	}
}

func TestParseEpochRelativeMinutesAgo(t *testing.T) {
	tm, err := parseEpochRelative("30 minutes ago")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	expected := time.Now().Add(-30 * time.Minute)
	diff := tm.Sub(expected)
	if diff < -time.Second || diff > time.Second {
		t.Errorf("expected ~30 minutes ago, diff: %v", diff)
	}
}

func TestParseEpochRelativeMonths(t *testing.T) {
	tm, err := parseEpochRelative("+1 month")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	expected := time.Now().Add(30 * 24 * time.Hour)
	diff := tm.Sub(expected)
	if diff < -time.Second || diff > time.Second {
		t.Errorf("expected ~+1 month, diff: %v", diff)
	}
}

func TestParseEpochRelativeYears(t *testing.T) {
	tm, err := parseEpochRelative("-1 year")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	expected := time.Now().Add(-365 * 24 * time.Hour)
	diff := tm.Sub(expected)
	if diff < -time.Second || diff > time.Second {
		t.Errorf("expected ~-1 year, diff: %v", diff)
	}
}

func TestParseEpochDateStringRFC1123(t *testing.T) {
	tm, err := parseEpochDateString("Mon, 11 Jun 2024 15:04:05 UTC")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if tm.Year() != 2024 || tm.Month() != 6 || tm.Day() != 11 {
		t.Errorf("unexpected date: %v", tm)
	}
}

func TestParseEpochRelativeSecondsAgo(t *testing.T) {
	tm, err := parseEpochRelative("10 seconds ago")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	expected := time.Now().Add(-10 * time.Second)
	diff := tm.Sub(expected)
	if diff < -time.Second || diff > time.Second {
		t.Errorf("expected ~10 seconds ago, diff: %v", diff)
	}
}

func TestPrintEpochJSONTrailingNewline(t *testing.T) {
	out := captureOutput(func() {
		printEpochJSON(1000, "1970-01-01T00:16:40Z")
	})
	if !strings.HasSuffix(out, "\n") {
		t.Error("expected trailing newline in JSON output")
	}
}
