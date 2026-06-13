package port

import (
	"testing"
)

func TestBuildPortListEmpty(t *testing.T) {
	ports := buildPortList("")
	if len(ports) == 0 {
		t.Error("expected common ports when input is empty")
	}
	// Should be sorted
	for i := 1; i < len(ports); i++ {
		if ports[i-1] >= ports[i] {
			t.Errorf("ports not sorted: %d >= %d", ports[i-1], ports[i])
		}
	}
}

func TestBuildPortListComma(t *testing.T) {
	ports := buildPortList("22,80,443")
	want := []int{22, 80, 443}
	if len(ports) != len(want) {
		t.Fatalf("got %v, want %v", ports, want)
	}
	for i, p := range ports {
		if p != want[i] {
			t.Errorf("ports[%d] = %d, want %d", i, p, want[i])
		}
	}
}

func TestBuildPortListRange(t *testing.T) {
	ports := buildPortList("8000-8005")
	want := []int{8000, 8001, 8002, 8003, 8004, 8005}
	if len(ports) != len(want) {
		t.Fatalf("got %v, want %v", ports, want)
	}
	for i, p := range ports {
		if p != want[i] {
			t.Errorf("ports[%d] = %d, want %d", i, p, want[i])
		}
	}
}

func TestBuildPortListMixed(t *testing.T) {
	ports := buildPortList("  3000, 80 , 443, 8000-8002 ")
	want := []int{80, 443, 3000, 8000, 8001, 8002}
	if len(ports) != len(want) {
		t.Fatalf("got %v, want %v", ports, want)
	}
	for i, p := range ports {
		if p != want[i] {
			t.Errorf("ports[%d] = %d, want %d", i, p, want[i])
		}
	}
}

func TestBuildPortListInvalid(t *testing.T) {
	ports := buildPortList("abc,,")
	if len(ports) != 0 {
		t.Errorf("expected empty, got %v", ports)
	}
}

func TestBuildPortListReverseRange(t *testing.T) {
	ports := buildPortList("8005-8000")
	if len(ports) != 0 {
		t.Errorf("expected empty for reversed range, got %v", ports)
	}
}

func TestNewCommand(t *testing.T) {
	cmd := NewCommand()
	if cmd == nil {
		t.Fatal("NewCommand() returned nil")
	}
	if cmd.Use != "port" {
		t.Errorf("Use = %q", cmd.Use)
	}
	names := make(map[string]bool)
	for _, c := range cmd.Commands() {
		names[c.Name()] = true
	}
	for _, want := range []string{"check", "find", "scan"} {
		if !names[want] {
			t.Errorf("missing subcommand: %s", want)
		}
	}
	if cmd.PersistentFlags().Lookup("json") == nil {
		t.Error("expected --json persistent flag")
	}
}

func TestNewCheckCmd(t *testing.T) {
	cmd := newCheckCmd()
	if cmd == nil {
		t.Fatal("newCheckCmd() returned nil")
	}
	if cmd.Use != "check <host:port>" {
		t.Errorf("Use = %q", cmd.Use)
	}
	if cmd.Flag("timeout") == nil {
		t.Error("expected --timeout flag")
	}
}

func TestNewFindCmd(t *testing.T) {
	cmd := newFindCmd()
	if cmd == nil {
		t.Fatal("newFindCmd() returned nil")
	}
	if cmd.Use != "find" {
		t.Errorf("Use = %q", cmd.Use)
	}
	if cmd.Flag("start") == nil || cmd.Flag("end") == nil {
		t.Error("expected --start and --end flags")
	}
}

func TestNewScanCmd(t *testing.T) {
	cmd := newScanCmd()
	if cmd == nil {
		t.Fatal("newScanCmd() returned nil")
	}
	if cmd.Use != "scan <host>" {
		t.Errorf("Use = %q", cmd.Use)
	}
	for _, name := range []string{"ports", "timeout"} {
		if cmd.Flag(name) == nil {
			t.Errorf("missing flag: --%s", name)
		}
	}
}

func TestCommonPorts(t *testing.T) {
	if commonPorts[22] != "SSH" {
		t.Errorf("port 22 = %q, want SSH", commonPorts[22])
	}
	if commonPorts[80] != "HTTP" {
		t.Errorf("port 80 = %q, want HTTP", commonPorts[80])
	}
	if commonPorts[443] != "HTTPS" {
		t.Errorf("port 443 = %q, want HTTPS", commonPorts[443])
	}
}
