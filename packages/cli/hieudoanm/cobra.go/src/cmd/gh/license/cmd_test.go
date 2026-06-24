package license

import (
	"testing"
)

func TestNewCommand_Structure(t *testing.T) {
	cmd := NewCommand()
	if cmd.Use != "license" {
		t.Errorf("Use = %q, want 'license'", cmd.Use)
	}
	if cmd.Short != "Fetch a license template from GitHub" {
		t.Errorf("Short = %q, want 'Fetch a license template from GitHub'", cmd.Short)
	}
	wantLong := `Fetch and save a license template from the GitHub licenses API.

Fetches the list of available licenses, prompts the user to select
one (or uses --spdx-id), then writes the license body to a file.`
	if cmd.Long != wantLong {
		t.Errorf("Long = %q, want %q", cmd.Long, wantLong)
	}
	wantExample := `  gh license
  gh license --spdx-id MIT
  gh license --spdx-id Apache-2.0 -o LICENSE.txt`
	if cmd.Example != wantExample {
		t.Errorf("Example = %q, want %q", cmd.Example, wantExample)
	}
	if f := cmd.Flags().Lookup("spdx-id"); f == nil {
		t.Error("expected --spdx-id flag")
	} else if f.DefValue != "" {
		t.Errorf("--spdx-id default = %q, want ''", f.DefValue)
	}
	if f := cmd.Flags().Lookup("output"); f == nil {
		t.Error("expected --output flag")
	} else if f.DefValue != "LICENSE" {
		t.Errorf("--output default = %q, want 'LICENSE'", f.DefValue)
	}
}
