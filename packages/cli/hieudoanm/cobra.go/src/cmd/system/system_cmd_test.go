package system

import (
	"bytes"
	"io"
	"os"
	"strings"
	"testing"
)

func TestSysMonitorCmd_Structure(t *testing.T) {
	if sysMonitorCmd.Use != "monitor" {
		t.Errorf("Use = %q, want 'monitor'", sysMonitorCmd.Use)
	}
	if sysMonitorCmd.Short != "Monitor system resources in real-time" {
		t.Errorf("Short = %q, want 'Monitor system resources in real-time'", sysMonitorCmd.Short)
	}
}

func TestNewClipboardCmd_Structure(t *testing.T) {
	cmd := newClipboardCmd()
	if cmd.Use != "clipboard" {
		t.Errorf("Use = %q, want 'clipboard'", cmd.Use)
	}
	if cmd.Short != "Watch clipboard changes and store them in SQLite" {
		t.Errorf("Short = %q, want 'Watch clipboard changes and store them in SQLite'", cmd.Short)
	}
	if f := cmd.Flags().Lookup("json"); f == nil {
		t.Error("expected --json flag")
	} else if f.DefValue != "false" {
		t.Errorf("--json default = %q, want 'false'", f.DefValue)
	}
}

func TestNewBatteryCmd_Structure(t *testing.T) {
	cmd := newBatteryCmd()
	if cmd.Use != "battery" {
		t.Errorf("Use = %q, want 'battery'", cmd.Use)
	}
	if cmd.Short != "Show battery status" {
		t.Errorf("Short = %q, want 'Show battery status'", cmd.Short)
	}
	if f := cmd.Flags().Lookup("json"); f == nil {
		t.Error("expected --json flag")
	} else if f.DefValue != "false" {
		t.Errorf("--json default = %q, want 'false'", f.DefValue)
	}
}

func TestNewDiskCmd_Structure(t *testing.T) {
	cmd := newDiskCmd()
	if cmd.Use != "disk" {
		t.Errorf("Use = %q, want 'disk'", cmd.Use)
	}
	if cmd.Short != "Show disk usage for mounted filesystems" {
		t.Errorf("Short = %q, want 'Show disk usage for mounted filesystems'", cmd.Short)
	}
	if f := cmd.Flags().Lookup("json"); f == nil {
		t.Error("expected --json flag")
	} else if f.DefValue != "false" {
		t.Errorf("--json default = %q, want 'false'", f.DefValue)
	}
}

func TestNewEnvCmd_Structure(t *testing.T) {
	cmd := newEnvCmd()
	if cmd.Use != "env [key]" {
		t.Errorf("Use = %q, want 'env [key]'", cmd.Use)
	}
	if cmd.Short != "List or search environment variables" {
		t.Errorf("Short = %q, want 'List or search environment variables'", cmd.Short)
	}
	if f := cmd.Flags().Lookup("sort"); f == nil {
		t.Error("expected --sort flag")
	} else if f.DefValue != "false" {
		t.Errorf("--sort default = %q, want 'false'", f.DefValue)
	}
	if f := cmd.Flags().Lookup("json"); f == nil {
		t.Error("expected --json flag")
	} else if f.DefValue != "false" {
		t.Errorf("--json default = %q, want 'false'", f.DefValue)
	}
}

func TestNewInfoCmd_Structure(t *testing.T) {
	cmd := newInfoCmd()
	if cmd.Use != "info" {
		t.Errorf("Use = %q, want 'info'", cmd.Use)
	}
	if cmd.Short != "Show system information" {
		t.Errorf("Short = %q, want 'Show system information'", cmd.Short)
	}
	if f := cmd.Flags().Lookup("json"); f == nil {
		t.Error("expected --json flag")
	} else if f.DefValue != "false" {
		t.Errorf("--json default = %q, want 'false'", f.DefValue)
	}
}

func TestNewPathCmd_Structure(t *testing.T) {
	cmd := newPathCmd()
	if cmd.Use != "path [command]" {
		t.Errorf("Use = %q, want 'path [command]'", cmd.Use)
	}
	if cmd.Short != "List or search PATH directories and commands" {
		t.Errorf("Short = %q, want 'List or search PATH directories and commands'", cmd.Short)
	}
	if f := cmd.Flags().Lookup("sort"); f == nil {
		t.Error("expected --sort flag")
	} else if f.DefValue != "false" {
		t.Errorf("--sort default = %q, want 'false'", f.DefValue)
	}
	if f := cmd.Flags().Lookup("json"); f == nil {
		t.Error("expected --json flag")
	} else if f.DefValue != "false" {
		t.Errorf("--json default = %q, want 'false'", f.DefValue)
	}
}

func captureOutput(fn func()) string {
	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w
	fn()
	w.Close()
	var buf bytes.Buffer
	io.Copy(&buf, r)
	os.Stdout = old
	return strings.TrimRight(buf.String(), "\n")
}

func TestNewEnvCmd_RunE(t *testing.T) {
	origJSON := envJSON
	envJSON = false
	defer func() { envJSON = origJSON }()

	cmd := newEnvCmd()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"PATH"}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "PATH=") {
		t.Errorf("expected PATH= in output, got %q", output)
	}
}

func TestNewEnvCmd_RunE_JSON(t *testing.T) {
	cmd := newEnvCmd()
	if err := cmd.Flags().Set("json", "true"); err != nil {
		t.Fatal(err)
	}
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"HOME"}); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, `"key"`) {
		t.Errorf("expected JSON key field, got %q", output)
	}
}

func TestNewPathCmd_RunE(t *testing.T) {
	cmd := newPathCmd()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, []string{"go"}); err != nil {
			t.Fatal(err)
		}
	})
	if output == "" {
		t.Error("expected non-empty output from path go")
	}
}

func TestNewInfoCmd_RunE(t *testing.T) {
	cmd := newInfoCmd()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, nil); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "OS:") {
		t.Errorf("expected OS: in output, got %q", output)
	}
	if !strings.Contains(output, "Arch:") {
		t.Errorf("expected Arch: in output, got %q", output)
	}
}

func TestNewInfoCmd_RunE_JSON(t *testing.T) {
	cmd := newInfoCmd()
	if err := cmd.Flags().Set("json", "true"); err != nil {
		t.Fatal(err)
	}
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, nil); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, `"hostname"`) {
		t.Errorf("expected hostname in JSON output, got %q", output)
	}
}

func TestNewDiskCmd_RunE(t *testing.T) {
	cmd := newDiskCmd()
	output := captureOutput(func() {
		if err := cmd.RunE(cmd, nil); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(output, "Filesystem") {
		t.Errorf("expected Filesystem header, got %q", output)
	}
}
