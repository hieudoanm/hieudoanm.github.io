package file

import (
	"testing"
)

func TestPluralS(t *testing.T) {
	tests := []struct {
		n    int
		want string
	}{
		{0, "s"},
		{1, ""},
		{2, "s"},
		{100, "s"},
	}
	for _, tc := range tests {
		got := pluralS(tc.n)
		if got != tc.want {
			t.Errorf("pluralS(%d) = %q, want %q", tc.n, got, tc.want)
		}
	}
}

func TestBuildDiff(t *testing.T) {
	tests := []struct {
		before string
		after  string
		want   string
	}{
		{"foo\nbar\nbaz", "foo\nqux\nbaz", "- bar\n+ qux"},
		{"same\nsame", "same\nsame", ""},
		{"line1\nline2", "line1\nchanged\nline2", "- line2\n+ changed\n+ line2"},
	}
	for _, tc := range tests {
		got := buildDiff(tc.before, tc.after)
		if got != tc.want {
			t.Errorf("buildDiff(%q, %q) = %q, want %q", tc.before, tc.after, got, tc.want)
		}
	}
}
