package timercmd

import (
	"testing"
	"time"
)

func TestParseDuration(t *testing.T) {
	tests := []struct {
		input string
		want  time.Duration
	}{
		{"30s", 30 * time.Second},
		{"5m", 5 * time.Minute},
		{"90", 90 * time.Second},
	}
	for _, tt := range tests {
		got, err := parseDuration(tt.input)
		if err != nil {
			t.Errorf("parseDuration(%q) error: %v", tt.input, err)
			continue
		}
		if got != tt.want {
			t.Errorf("parseDuration(%q) = %v, want %v", tt.input, got, tt.want)
		}
	}
}

func TestParseDurationInvalid(t *testing.T) {
	_, err := parseDuration("invalid")
	if err == nil {
		t.Error("parseDuration('invalid') expected error")
	}
}

func TestFormatDuration(t *testing.T) {
	if formatDuration(90*time.Second) != "01:30" {
		t.Errorf("formatDuration(90s) = %q", formatDuration(90*time.Second))
	}
	if formatDuration(0) != "00:00" {
		t.Errorf("formatDuration(0) = %q", formatDuration(0))
	}
}
