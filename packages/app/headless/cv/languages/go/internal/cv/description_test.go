package cv

import "testing"

func TestFormatDescription(t *testing.T) {
	tests := []struct {
		name string
		in   string
		want string
	}{
		{
			name: "single line unchanged",
			in:   "Built a thing",
			want: "Built a thing",
		},
		{
			name: "blank lines separate paragraphs",
			in:   "First paragraph.\n\nSecond paragraph.",
			want: "First paragraph.<br><br>Second paragraph.",
		},
		{
			name: "hyphen bullets become markers on their own line",
			in:   "- one\n- two\n- three",
			want: "• one<br>• two<br>• three",
		},
		{
			name: "asterisk bullets become markers",
			in:   "* one\n* two",
			want: "• one<br>• two",
		},
		{
			name: "leading and trailing whitespace is trimmed",
			in:   "\n  - one  \n\n",
			want: "• one",
		},
		{
			name: "html special characters are escaped",
			in:   "R&D <team>",
			want: "R&amp;D &lt;team&gt;",
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			if got := FormatDescription(test.in); got != test.want {
				t.Errorf("FormatDescription(%q) = %q, want %q", test.in, got, test.want)
			}
		})
	}
}
