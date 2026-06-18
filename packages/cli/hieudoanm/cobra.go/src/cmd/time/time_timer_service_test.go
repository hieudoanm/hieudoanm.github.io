package time

import (
	"testing"
	"time"
)

func TestParseTimerDurationSeconds(t *testing.T) {
	d, err := parseTimerDuration("30s")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if d != 30*time.Second {
		t.Errorf("expected 30s, got %v", d)
	}
}

func TestParseTimerDurationMinutes(t *testing.T) {
	d, err := parseTimerDuration("5m")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if d != 5*time.Minute {
		t.Errorf("expected 5m, got %v", d)
	}
}

func TestParseTimerDurationBareNumber(t *testing.T) {
	d, err := parseTimerDuration("90")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if d != 90*time.Second {
		t.Errorf("expected 90s, got %v", d)
	}
}

func TestParseTimerDurationEmpty(t *testing.T) {
	_, err := parseTimerDuration("")
	if err == nil {
		t.Fatal("expected error for empty string")
	}
}

func TestParseTimerDurationInvalid(t *testing.T) {
	_, err := parseTimerDuration("abc")
	if err == nil {
		t.Fatal("expected error for invalid input")
	}
}

func TestParseTimerDurationInvalidSuffix(t *testing.T) {
	_, err := parseTimerDuration("10x")
	if err == nil {
		t.Fatal("expected error for invalid suffix")
	}
}

func TestFormatTimerDurationZero(t *testing.T) {
	got := formatTimerDuration(0)
	if got != "00:00" {
		t.Errorf("expected '00:00', got %q", got)
	}
}

func TestFormatTimerDurationSeconds(t *testing.T) {
	got := formatTimerDuration(45 * time.Second)
	if got != "00:45" {
		t.Errorf("expected '00:45', got %q", got)
	}
}

func TestFormatTimerDurationMinutes(t *testing.T) {
	got := formatTimerDuration(5*time.Minute + 30*time.Second)
	if got != "05:30" {
		t.Errorf("expected '05:30', got %q", got)
	}
}

func TestFormatTimerDurationHours(t *testing.T) {
	got := formatTimerDuration(90*time.Minute + 15*time.Second)
	if got != "90:15" {
		t.Errorf("expected '90:15', got %q", got)
	}
}

func TestFormatTimerDurationRoundsDown(t *testing.T) {
	got := formatTimerDuration(61*time.Second + 500*time.Millisecond)
	if got != "01:02" {
		t.Errorf("expected '01:02' (rounded), got %q", got)
	}
}
