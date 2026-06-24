package disk

import "testing"

func TestDiskLabel(t *testing.T) {
	tests := []struct {
		bytes uint64
		want  string
	}{
		{0, "0 B"},
		{500, "500 B"},
		{1024, "1.0 KB"},
		{1536, "1.5 KB"},
		{1048576, "1.0 MB"},
		{1073741824, "1.0 GB"},
	}

	for _, tt := range tests {
		got := diskLabel(tt.bytes)
		if got != tt.want {
			t.Errorf("diskLabel(%d) = %q, want %q", tt.bytes, got, tt.want)
		}
	}
}
