package ping

import (
	"fmt"
	"net"
	"strings"
	"testing"
	"time"

	"github.com/hieudoanm/jack/src/cmd/net/internal"
)

func captureOutput(f func()) string {
	return internal.CaptureOutput(f)
}

type mockConn struct {
	net.Conn
	closed bool
}

func (m *mockConn) Close() error {
	m.closed = true
	return nil
}

func TestNewPingCmd(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "ping [--host <host>]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	if cmd.Short != "TCP ping to check host reachability" {
		t.Errorf("Short = %q", cmd.Short)
	}
	wantLong := "Test TCP connectivity to a host with timing statistics. Uses TCP dial (not ICMP)."
	if cmd.Long != wantLong {
		t.Errorf("Long = %q, want %q", cmd.Long, wantLong)
	}
	wantExample := "  net ping --host example.com\n  net ping --host example.com --port 443\n  net ping --host example.com --count 5\n  net ping --host google.com --port 443 --count 3 --timeout 2s"
	if cmd.Example != wantExample {
		t.Errorf("Example = %q, want %q", cmd.Example, wantExample)
	}
	for _, name := range []string{"host", "port", "count", "timeout", "json"} {
		if cmd.Flag(name) == nil {
			t.Errorf("missing flag: --%s", name)
		}
	}
}

func TestNewPingCmd_RunE_Success(t *testing.T) {
	saved := netDialTimeout
	defer func() { netDialTimeout = saved }()
	netDialTimeout = func(network, address string, timeout time.Duration) (net.Conn, error) {
		return &mockConn{}, nil
	}

	cmd := NewCmd()
	cmd.Flags().Set("host", "example.com")
	cmd.Flags().Set("count", "1")
	cmd.Flags().Set("timeout", "5s")
	err := cmd.RunE(cmd, []string{})
	if err != nil {
		t.Errorf("unexpected error: %v", err)
	}
}

func TestNewPingCmd_RunE_AllFail(t *testing.T) {
	saved := netDialTimeout
	defer func() { netDialTimeout = saved }()
	netDialTimeout = func(network, address string, timeout time.Duration) (net.Conn, error) {
		return nil, fmt.Errorf("connection refused")
	}

	cmd := NewCmd()
	cmd.Flags().Set("host", "example.com")
	cmd.Flags().Set("count", "2")
	cmd.Flags().Set("timeout", "1s")
	out := captureOutput(func() {
		err := cmd.RunE(cmd, []string{})
		if err != nil {
			t.Errorf("unexpected error: %v", err)
		}
	})
	if !strings.Contains(out, "100%") {
		t.Errorf("output missing 100%% loss: %s", out)
	}
}

func TestNewPingCmd_RunE_JSON(t *testing.T) {
	saved := netDialTimeout
	defer func() { netDialTimeout = saved }()
	callCount := 0
	netDialTimeout = func(network, address string, timeout time.Duration) (net.Conn, error) {
		callCount++
		if callCount == 1 {
			return &mockConn{}, nil
		}
		return nil, fmt.Errorf("timeout")
	}

	cmd := NewCmd()
	cmd.Flags().Set("host", "example.com")
	cmd.Flags().Set("count", "2")
	cmd.Flags().Set("json", "true")
	out := captureOutput(func() {
		err := cmd.RunE(cmd, []string{})
		if err != nil {
			t.Errorf("unexpected error: %v", err)
		}
	})
	if !strings.Contains(out, "successes") {
		t.Errorf("output missing 'successes': %s", out)
	}
	if !strings.Contains(out, "failures") {
		t.Errorf("output missing 'failures': %s", out)
	}
}
