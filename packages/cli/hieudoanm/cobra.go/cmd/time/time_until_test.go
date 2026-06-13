package time

import (
	"testing"
)

func TestParseDatetimeRFC3339(t *testing.T) {
	tm, err := parseDatetime("2026-12-25T00:00:00Z")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if tm.Year() != 2026 || tm.Month() != 12 || tm.Day() != 25 {
		t.Errorf("unexpected date: %v", tm)
	}
}

func TestParseDatetimeYYYYMMDD(t *testing.T) {
	tm, err := parseDatetime("2026-12-25")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if tm.Year() != 2026 || tm.Month() != 12 || tm.Day() != 25 {
		t.Errorf("unexpected date: %v", tm)
	}
}

func TestParseDatetimeWithSpaces(t *testing.T) {
	tm, err := parseDatetime("2026-12-25 15:04:05")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if tm.Year() != 2026 || tm.Month() != 12 || tm.Day() != 25 {
		t.Errorf("unexpected date: %v", tm)
	}
	if tm.Hour() != 15 || tm.Minute() != 4 || tm.Second() != 5 {
		t.Errorf("unexpected time: %v", tm)
	}
}

func TestParseDatetimeInvalid(t *testing.T) {
	_, err := parseDatetime("not-a-date")
	if err == nil {
		t.Fatal("expected error for invalid format")
	}
}

func TestParseDatetimeEmpty(t *testing.T) {
	_, err := parseDatetime("")
	if err == nil {
		t.Fatal("expected error for empty string")
	}
}

func TestParseDatetimeWithTFormat(t *testing.T) {
	tm, err := parseDatetime("2026-12-25T15:04:05")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if tm.Year() != 2026 || tm.Month() != 12 || tm.Day() != 25 {
		t.Errorf("unexpected date: %v", tm)
	}
	if tm.Hour() != 15 || tm.Minute() != 4 || tm.Second() != 5 {
		t.Errorf("unexpected time: %v", tm)
	}
}

func TestParseDatetimeDateTime(t *testing.T) {
	tm, err := parseDatetime("2026-12-25 15:04:05")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if tm.Year() != 2026 || tm.Month() != 12 || tm.Day() != 25 {
		t.Errorf("unexpected date: %v", tm)
	}
	if tm.Hour() != 15 || tm.Minute() != 4 || tm.Second() != 5 {
		t.Errorf("unexpected time: %v", tm)
	}
}
