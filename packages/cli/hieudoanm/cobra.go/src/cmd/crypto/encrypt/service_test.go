package encrypt

import (
	"bytes"
	"io"
	"os"
	"testing"
)

func captureOutput(fn func()) string {
	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w
	fn()
	w.Close()
	var buf bytes.Buffer
	io.Copy(&buf, r)
	os.Stdout = old
	return buf.String()
}

func TestCmd_RunE_MissingFile(t *testing.T) {
	cmd := NewCommand()
	cmd.Flags().Set("password", "testpass")

	err := cmd.RunE(cmd, []string{})
	if err == nil {
		t.Fatal("expected error for missing --file flag")
	}
}
