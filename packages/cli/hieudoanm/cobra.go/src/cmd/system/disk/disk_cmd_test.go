package disk

import (
	"io"
	"os"
	"strings"
	"testing"
)

func captureOutput(fn func()) string {
	r, w, _ := os.Pipe()
	orig := os.Stdout
	os.Stdout = w
	fn()
	w.Close()
	out, _ := io.ReadAll(r)
	os.Stdout = orig
	return string(out)
}

func TestNewCmd_RunE_Basic(t *testing.T) {
	cmd := NewCmd()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, nil); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "Filesystem") {
		t.Errorf("expected 'Filesystem' header in output, got %q", output)
	}
}

func TestNewCmd_RunE_Sort(t *testing.T) {
	cmd := NewCmd()
	if err := cmd.Flags().Set("sort", "true"); err != nil {
		t.Fatal(err)
	}
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, nil); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "Filesystem") {
		t.Errorf("expected 'Filesystem' header in output, got %q", output)
	}
}

func TestNewCmd_RunE_JSON(t *testing.T) {
	cmd := NewCmd()
	if err := cmd.Flags().Set("json", "true"); err != nil {
		t.Fatal(err)
	}
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, nil); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, `"mount"`) {
		t.Errorf("expected JSON with mount field, got %q", output)
	}
}

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
