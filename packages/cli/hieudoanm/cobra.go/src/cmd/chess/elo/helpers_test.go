package elo

import (
	"testing"
)

func TestParseFloats(t *testing.T) {
	tests := []struct {
		input string
		want  []float64
	}{
		{input: "1800,1900,2000", want: []float64{1800, 1900, 2000}},
		{input: "1800, 1900, 2000", want: []float64{1800, 1900, 2000}},
		{input: "1800", want: []float64{1800}},
		{input: "", want: nil},
		{input: "abc", want: nil},
	}

	for _, tt := range tests {
		t.Run("", func(t *testing.T) {
			got := parseFloats(tt.input)
			if len(got) != len(tt.want) {
				t.Fatalf("parseFloats(%q) = %v, want %v", tt.input, got, tt.want)
			}
			for i := range got {
				if got[i] != tt.want[i] {
					t.Errorf("parseFloats(%q)[%d] = %.0f, want %.0f", tt.input, i, got[i], tt.want[i])
				}
			}
		})
	}
}

func TestResultToScore(t *testing.T) {
	tests := []struct {
		input string
		want  float64
		err   bool
	}{
		{input: "win", want: 1.0},
		{input: "1", want: 1.0},
		{input: "draw", want: 0.5},
		{input: "0.5", want: 0.5},
		{input: "loss", want: 0.0},
		{input: "0", want: 0.0},
		{input: " invalid ", err: true},
	}

	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			got, err := resultToScore(tt.input)
			if tt.err && err == nil {
				t.Fatal("expected error, got nil")
			}
			if !tt.err && err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if !tt.err && got != tt.want {
				t.Errorf("resultToScore(%q) = %.1f, want %.1f", tt.input, got, tt.want)
			}
		})
	}
}
