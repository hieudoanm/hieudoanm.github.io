package browser

import (
	"os"
	"testing"
)

func TestDefaultOptions(t *testing.T) {
	opts := DefaultOptions()
	if opts.Width != 1440 || opts.Height != 900 || opts.Quality != 90 {
		t.Errorf("DefaultOptions returned unexpected values: %+v", opts)
	}
}

func TestNearestPreset(t *testing.T) {
	tests := []struct {
		w, h     int
		expected string
	}{
		{1440, 900, "desktop"},
		{390, 844, "mobile"},
		{1920, 1080, "hd"},
		{2000, 1100, "hd"},   // closest to HD
		{400, 800, "mobile"}, // closest to mobile
	}

	for _, tt := range tests {
		result := NearestPreset(tt.w, tt.h)
		if result != tt.expected {
			t.Errorf("NearestPreset(%d, %d) = %s; expected %s", tt.w, tt.h, result, tt.expected)
		}
	}
}

func TestChromePath(t *testing.T) {
	// 1. Test override via env var
	expectedPath := "/tmp/mock-chrome"
	os.Setenv("CHROME_PATH", expectedPath)
	defer os.Unsetenv("CHROME_PATH")

	if p := chromePath(); p != expectedPath {
		t.Errorf("chromePath() = %s; expected %s (from env)", p, expectedPath)
	}

	// 2. Clear env var and let it run
	os.Unsetenv("CHROME_PATH")
	// We don't necessarily know what the system returns, but we can verify it doesn't panic
	_ = chromePath()
}
