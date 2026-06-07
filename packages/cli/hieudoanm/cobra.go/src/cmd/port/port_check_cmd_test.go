package port

import (
	"testing"
)

func TestCheckCmd_RunE_Success(t *testing.T) {
	cmd := newCheckCmd()
	cmd.Flags().Set("target", "127.0.0.1:1")
	cmd.Flags().Set("timeout", "1")

	err := cmd.RunE(cmd, []string{})
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
}

func TestCheckCmd_RunE_JSONOutput(t *testing.T) {
	cmd := newCheckCmd()
	cmd.Flags().Set("target", "127.0.0.1:1")
	cmd.Flags().Set("timeout", "1")
	cmd.Flags().Set("json", "true")

	err := cmd.RunE(cmd, []string{})
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
}

func TestCheckCmd_RunE_WithTimeout(t *testing.T) {
	cmd := newCheckCmd()
	cmd.Flags().Set("target", "127.0.0.1:1")
	cmd.Flags().Set("timeout", "0")

	err := cmd.RunE(cmd, []string{})
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
}
