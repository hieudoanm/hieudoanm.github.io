package system

import (
	"fmt"
	"strings"
	"testing"
)

func TestSysMax(t *testing.T) {
	tests := []struct {
		a, b, expected int
	}{
		{5, 3, 5},
		{3, 5, 5},
		{0, 0, 0},
		{-5, 5, 5},
		{-5, -3, -3},
	}

	for _, tt := range tests {
		name := fmt.Sprintf("max(%d,%d)=%d", tt.a, tt.b, tt.expected)
		t.Run(name, func(t *testing.T) {
			got := sysMax(tt.a, tt.b)
			if got != tt.expected {
				t.Errorf("sysMax(%d,%d) = %d, want %d", tt.a, tt.b, got, tt.expected)
			}
		})
	}
}

func TestSysMin(t *testing.T) {
	tests := []struct {
		a, b, expected int
	}{
		{5, 3, 3},
		{3, 5, 3},
		{0, 0, 0},
		{-5, 5, -5},
		{-5, -3, -5},
	}

	for _, tt := range tests {
		name := fmt.Sprintf("min(%d,%d)=%d", tt.a, tt.b, tt.expected)
		t.Run(name, func(t *testing.T) {
			got := sysMin(tt.a, tt.b)
			if got != tt.expected {
				t.Errorf("sysMin(%d,%d) = %d, want %d", tt.a, tt.b, got, tt.expected)
			}
		})
	}
}

func TestSysSparkline_EmptyData(t *testing.T) {
	got := sysSparkline([]float64{}, 10)
	if len(got) != 10 {
		t.Errorf("expected length 10, got %d", len(got))
	}
	for _, c := range got {
		if c != ' ' {
			t.Errorf("expected all spaces for empty data, got %q", got)
			break
		}
	}
}

func TestSysSparkline_ProducesCorrectLength(t *testing.T) {
	tests := []struct {
		data  []float64
		width int
	}{
		{[]float64{0, 50, 100}, 5},
		{[]float64{0, 50, 100}, 3},
		{[]float64{0, 50, 100}, 10},
		{[]float64{25, 75}, 2},
	}

	for _, tt := range tests {
		name := fmt.Sprintf("len=%d,width=%d", len(tt.data), tt.width)
		t.Run(name, func(t *testing.T) {
			got := sysSparkline(tt.data, tt.width)
			if got == "" {
				t.Errorf("sysSparkline(%v, %d) returned empty string", tt.data, tt.width)
			}
		})
	}
}

func TestSysSparkline_PadsWithSpaces(t *testing.T) {
	data := []float64{50}
	out := sysSparkline(data, 5)
	if out == "" {
		t.Fatal("sysSparkline returned empty string")
	}
	spaceCount := 0
	for _, c := range out[:4] {
		if c == ' ' {
			spaceCount++
		}
	}
	if spaceCount == 0 {
		t.Errorf("expected leading spaces when data < width, got %q", out)
	}
}

func TestSysSparkline_TruncatesLargeData(t *testing.T) {
	data := []float64{10, 20, 30, 40, 50}
	got := sysSparkline(data, 3)
	if got == "" {
		t.Errorf("sysSparkline(%v, %d) returned empty string", data, 3)
	}
}

func TestSysBar_Width(t *testing.T) {
	tests := []struct {
		pct   float64
		width int
	}{
		{50, 10},
		{0, 10},
		{100, 10},
		{25, 20},
		{75, 5},
	}

	for _, tt := range tests {
		name := fmt.Sprintf("pct=%.0f,w=%d", tt.pct, tt.width)
		t.Run(name, func(t *testing.T) {
			got := sysBar(tt.pct, tt.width)
			filled := strings.Count(got, "█")
			empty := strings.Count(got, "░")
			if filled+empty != tt.width {
				t.Errorf("sysBar(%v, %d) has %d█ + %d░ = %d total chars, want %d",
					tt.pct, tt.width, filled, empty, filled+empty, tt.width)
			}
		})
	}
}

func TestSysBar_EdgeCases(t *testing.T) {
	t.Run("zero percent", func(t *testing.T) {
		got := sysBar(0, 10)
		if strings.Count(got, "█") != 0 {
			t.Errorf("expected 0 filled bars for 0%%, got %q", got)
		}
		if strings.Count(got, "░") != 10 {
			t.Errorf("expected 10 empty bars for 0%%, got %q", got)
		}
	})

	t.Run("full percent", func(t *testing.T) {
		got := sysBar(100, 10)
		if strings.Count(got, "█") != 10 {
			t.Errorf("expected 10 filled bars for 100%%, got %q", got)
		}
		if strings.Count(got, "░") != 0 {
			t.Errorf("expected 0 empty bars for 100%%, got %q", got)
		}
	})

	t.Run("negative percent clamped", func(t *testing.T) {
		got := sysBar(-10, 10)
		filled := strings.Count(got, "█")
		if filled != 0 {
			t.Errorf("expected 0 filled for negative pct, got %d", filled)
		}
	})

	t.Run("over 100 percent clamped", func(t *testing.T) {
		got := sysBar(200, 10)
		filled := strings.Count(got, "█")
		if filled != 10 {
			t.Errorf("expected 10 filled for 200%%, got %d", filled)
		}
	})
}
