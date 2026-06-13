package file

import (
	"testing"
)

func TestSplitLines(t *testing.T) {
	tests := []struct {
		input string
		lines int
		last  string
	}{
		{"hello\nworld\n", 3, ""},
		{"hello\nworld", 2, "world"},
		{"hello\nworld\n\n", 4, ""},
		{"", 1, ""},
		{"single", 1, "single"},
		{"a\nb\nc\nd\n", 5, ""},
		{"\n", 2, ""},
	}
	for _, tc := range tests {
		got := splitLines(tc.input)
		if len(got) != tc.lines {
			t.Errorf("splitLines(%q) got %d lines, want %d", tc.input, len(got), tc.lines)
		}
		if len(got) > 0 && got[len(got)-1] != tc.last {
			t.Errorf("splitLines(%q) last = %q, want %q", tc.input, got[len(got)-1], tc.last)
		}
	}
}

func TestSplitLinesRoundtrip(t *testing.T) {
	input := "line1\nline2\nline3"
	lines := splitLines(input)
	got := joinLines(lines)
	if got != input {
		t.Errorf("roundtrip: %q != %q", got, input)
	}
}

func TestJoinLines(t *testing.T) {
	tests := []struct {
		input []string
		want  string
	}{
		{[]string{"a", "b", "c"}, "a\nb\nc"},
		{[]string{}, ""},
		{[]string{"single"}, "single"},
		{[]string{"a", "", "c"}, "a\n\nc"},
	}
	for _, tc := range tests {
		got := joinLines(tc.input)
		if got != tc.want {
			t.Errorf("joinLines(%v) = %q, want %q", tc.input, got, tc.want)
		}
	}
}

func TestReadCmdHasFlags(t *testing.T) {
	cmd := newReadCmd()
	if cmd.Use != "read <file>" {
		t.Errorf("Use = %q", cmd.Use)
	}
	if cmd.Args == nil {
		t.Error("Args must be set")
	}
	_, err := cmd.Flags().GetInt("lines")
	if err != nil {
		t.Error("expected --lines flag")
	}
	_, err = cmd.Flags().GetInt("offset")
	if err != nil {
		t.Error("expected --offset flag")
	}
	_, err = cmd.Flags().GetBool("numbers")
	if err != nil {
		t.Error("expected --numbers flag")
	}
}
