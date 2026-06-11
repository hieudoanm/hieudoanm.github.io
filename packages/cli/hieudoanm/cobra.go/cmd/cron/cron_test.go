package cron

import (
	"strings"
	"testing"
)

func TestDescribeCron(t *testing.T) {
	tests := []struct {
		expr string
		want string
	}{
		{"*/15 * * * *", "every 15"},
		{"0 9 * * 1-5", "at 09:00"},
	}
	for _, tt := range tests {
		got := describeCron(tt.expr)
		if !strings.Contains(got, tt.want) {
			t.Errorf("describeCron(%q) = %q, want contains %q", tt.expr, got, tt.want)
		}
	}
}

func TestDescribeCronInvalid(t *testing.T) {
	if !strings.Contains(describeCron("* * *"), "invalid") {
		t.Errorf("expected invalid for short expression")
	}
}

func TestExpandField(t *testing.T) {
	if expandField("*", 0, 59, nil) != "every" {
		t.Errorf("expandField(*) should return 'every'")
	}
}
