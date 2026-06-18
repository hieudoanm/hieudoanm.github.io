package net

import (
	"strings"
	"testing"

	"github.com/hieudoanm/hieudoanm/src/libs/theme"
)

func TestStatusDot_HealthyUpOk(t *testing.T) {
	inputs := []string{"Healthy", "UP", "ok", "healthy", "up", "Ok"}
	for _, input := range inputs {
		t.Run(input, func(t *testing.T) {
			got := statusDot(input)
			if got != theme.GreenDot {
				t.Errorf("statusDot(%q) = %q, want %q", input, got, theme.GreenDot)
			}
		})
	}
}

func TestStatusDot_DownErrorFail(t *testing.T) {
	inputs := []string{"down", "Error 500", "fail", "failed", "DOWN", "Error", "Failure"}
	for _, input := range inputs {
		t.Run(input, func(t *testing.T) {
			got := statusDot(input)
			if got != theme.RedDot {
				t.Errorf("statusDot(%q) = %q, want %q", input, got, theme.RedDot)
			}
		})
	}
}

func TestStatusDot_Other(t *testing.T) {
	inputs := []string{"unknown", "maintenance", "", "degraded", "???", "partial_outage"}
	for _, input := range inputs {
		t.Run(input, func(t *testing.T) {
			got := statusDot(input)
			if got != theme.YellowDot {
				t.Errorf("statusDot(%q) = %q, want %q", input, got, theme.YellowDot)
			}
		})
	}
}

func TestRenderSRow(t *testing.T) {
	name := "test-service"
	status := "Healthy"
	width := 60

	result := renderSRow(name, status, width)
	if !strings.HasPrefix(result, name) {
		t.Errorf("renderSRow result should start with %q, got %q", name, result)
	}
	if !strings.HasSuffix(result, status) {
		t.Errorf("renderSRow result should end with %q, got %q", status, result)
	}
}

func TestRenderSRow_NarrowWidth(t *testing.T) {
	result := renderSRow("long-name-service", "Healthy", 10)
	if len(result) < 10 {
		t.Errorf("renderSRow with narrow width should have at least gap=1, got len=%d", len(result))
	}
}

func TestRenderSRow_DifferentStatuses(t *testing.T) {
	tests := []struct {
		name   string
		status string
	}{
		{"svc1", "Healthy"},
		{"svc2", "Down"},
		{"svc3", "Unknown"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := renderSRow(tt.name, tt.status, 80)
			if !strings.Contains(result, tt.name) {
				t.Errorf("result should contain name %q", tt.name)
			}
			if !strings.Contains(result, tt.status) {
				t.Errorf("result should contain status %q", tt.status)
			}
		})
	}
}

func TestServiceStatus_Struct(t *testing.T) {
	s := ServiceStatus{
		Name:   "github",
		URL:    "https://www.githubstatus.com/api/v2/status.json",
		Output: "Healthy",
	}

	if s.Name != "github" {
		t.Errorf("ServiceStatus.Name = %q, want %q", s.Name, "github")
	}
	if s.URL != "https://www.githubstatus.com/api/v2/status.json" {
		t.Errorf("ServiceStatus.URL = %q, want %q", s.URL, "https://www.githubstatus.com/api/v2/status.json")
	}
	if s.Output != "Healthy" {
		t.Errorf("ServiceStatus.Output = %q, want %q", s.Output, "Healthy")
	}
}
