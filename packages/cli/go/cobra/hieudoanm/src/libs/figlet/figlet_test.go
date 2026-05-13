package figlet

import (
	"bytes"
	"io"
	"os"
	"testing"
)

func TestLogProgramName(t *testing.T) {
	// Capture stdout
	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	LogProgramName()

	w.Close()
	os.Stdout = old

	var buf bytes.Buffer
	io.Copy(&buf, r)
	output := buf.String()

	if output == "" {
		t.Errorf("LogProgramName produced no output")
	}
}
