package cmd

import (
	"testing"

	version "github.com/hieudoanm/hieudoanm/cmd/version"
)

func TestRootCmd(t *testing.T) {
	if rootCmd.Use != "hieudoanm" {
		t.Errorf("expected root command use 'hieudoanm', got %q", rootCmd.Use)
	}
}

func TestVersionCmd(t *testing.T) {
	ver := version.NewCommand()
	if ver.Use != "version" {
		t.Errorf("expected version command use 'version', got %q", ver.Use)
	}
}
