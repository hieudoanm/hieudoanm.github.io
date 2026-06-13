package system

import "testing"

func TestFormatBytes(t *testing.T) {
	tests := []struct {
		bytes    int64
		expected string
	}{
		{0, "0 B"},
		{100, "100 B"},
		{512, "512 B"},
		{1024, "1.0 KB"},
		{1536, "1.5 KB"},
		{2048, "2.0 KB"},
		{1048576, "1.0 MB"},
		{1073741824, "1.0 GB"},
		{1610612736, "1.5 GB"},
		{1099511627776, "1.0 TB"},
	}

	for _, tt := range tests {
		t.Run(tt.expected, func(t *testing.T) {
			got := formatBytes(tt.bytes)
			if got != tt.expected {
				t.Errorf("formatBytes(%d) = %q, want %q", tt.bytes, got, tt.expected)
			}
		})
	}
}

func TestFormatBytes_EdgeCases(t *testing.T) {
	if got := formatBytes(1); got != "1 B" {
		t.Errorf("formatBytes(1) = %q, want %q", got, "1 B")
	}
	if got := formatBytes(1023); got != "1023 B" {
		t.Errorf("formatBytes(1023) = %q, want %q", got, "1023 B")
	}
	if got := formatBytes(1073741824 + 107374182); got == "" {
		t.Errorf("formatBytes should handle large values")
	}
}
