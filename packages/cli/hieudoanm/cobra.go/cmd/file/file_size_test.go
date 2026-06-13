package file

import (
	"testing"
)

func TestFormatSizeZero(t *testing.T) {
	if got := formatSize(0); got != "0 B" {
		t.Errorf("formatSize(0) = %q, want %q", got, "0 B")
	}
}

func TestFormatSizeBytes(t *testing.T) {
	if got := formatSize(100); got != "100 B" {
		t.Errorf("formatSize(100) = %q, want %q", got, "100 B")
	}
	if got := formatSize(200); got != "200 B" {
		t.Errorf("formatSize(200) = %q, want %q", got, "200 B")
	}
}

func TestFormatSizeKB(t *testing.T) {
	if got := formatSize(1024); got != "1.0 KB" {
		t.Errorf("formatSize(1024) = %q, want %q", got, "1.0 KB")
	}
	if got := formatSize(1536); got != "1.5 KB" {
		t.Errorf("formatSize(1536) = %q, want %q", got, "1.5 KB")
	}
	if got := formatSize(2048); got != "2.0 KB" {
		t.Errorf("formatSize(2048) = %q, want %q", got, "2.0 KB")
	}
}

func TestFormatSizeMB(t *testing.T) {
	if got := formatSize(1048576); got != "1.0 MB" {
		t.Errorf("formatSize(1048576) = %q, want %q", got, "1.0 MB")
	}
}

func TestFormatSizeGB(t *testing.T) {
	if got := formatSize(1073741824); got != "1.0 GB" {
		t.Errorf("formatSize(1073741824) = %q, want %q", got, "1.0 GB")
	}
}

func TestFormatSizeTB(t *testing.T) {
	if got := formatSize(1099511627776); got != "1.0 TB" {
		t.Errorf("formatSize(1099511627776) = %q, want %q", got, "1.0 TB")
	}
}
