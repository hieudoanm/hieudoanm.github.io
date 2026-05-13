package cmd

import (
	"bytes"
	"testing"
)

func TestVersionCmd(t *testing.T) {
	actual := new(bytes.Buffer)
	versionCmd.SetOut(actual)
	versionCmd.SetErr(actual)
	versionCmd.SetArgs([]string{})

	Version = "1.2.3"
	versionCmd.Run(versionCmd, []string{})

	expected := "Version: 1.2.3\n"
	if actual.String() != expected {
		t.Errorf("expected %q, got %q", expected, actual.String())
	}
}

func TestRootCmd(t *testing.T) {
	if rootCmd.Use != "weather" {
		t.Errorf("expected root command use 'weather', got %q", rootCmd.Use)
	}
}
