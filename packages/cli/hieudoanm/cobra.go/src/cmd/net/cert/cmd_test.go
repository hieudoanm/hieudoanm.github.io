package cert

import (
	"crypto/tls"
	"crypto/x509"
	"strings"
	"testing"
	"time"
)

type mockTLSConn struct {
	state tls.ConnectionState
}

func (m *mockTLSConn) ConnectionState() tls.ConnectionState { return m.state }
func (m *mockTLSConn) Close() error                         { return nil }

func TestNewCertCmd(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "cert" {
		t.Errorf("Use = %q, want 'cert'", cmd.Use)
	}
	if cmd.Short != "SSL/TLS certificate inspection" {
		t.Errorf("Short = %q", cmd.Short)
	}
	subs := cmd.Commands()
	if len(subs) != 2 {
		t.Fatalf("expected 2 subcommands, got %d", len(subs))
	}
	if cmd.PersistentFlags().Lookup("json") == nil {
		t.Error("expected --json persistent flag")
	}
}

func TestNewCertCheckCmd(t *testing.T) {
	cmd := newCertCheckCmd()
	if cmd.Use != "check [--host <host:port>]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	if cmd.Short != "Quick certificate health check (expiry warning)" {
		t.Errorf("Short = %q", cmd.Short)
	}
	wantLong := "Quickly check the TLS certificate for a host and report whether it is valid, expiring soon, or expired. Returns remaining validity time and SAN entries."
	if cmd.Long != wantLong {
		t.Errorf("Long = %q, want %q", cmd.Long, wantLong)
	}
	wantExample := "  net cert check --host google.com:443\n  cert check --host example.org --warn 30"
	if cmd.Example != wantExample {
		t.Errorf("Example = %q, want %q", cmd.Example, wantExample)
	}
	if cmd.Flag("host") == nil {
		t.Error("expected --host flag")
	}
	if cmd.Flag("warn") == nil {
		t.Error("expected --warn flag")
	}
}

func TestNewCertInfoCmd(t *testing.T) {
	cmd := newCertInfoCmd()
	if cmd.Use != "info [--host <host:port>]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	if cmd.Short != "Show detailed certificate information" {
		t.Errorf("Short = %q", cmd.Short)
	}
	wantLong := "Retrieve and display the full certificate chain for a TLS endpoint."
	if cmd.Long != wantLong {
		t.Errorf("Long = %q, want %q", cmd.Long, wantLong)
	}
	wantExample := "  cert info --host google.com:443\n  cert info --host example.org:8443"
	if cmd.Example != wantExample {
		t.Errorf("Example = %q, want %q", cmd.Example, wantExample)
	}
	if cmd.Flag("host") == nil {
		t.Error("expected --host flag")
	}
}

func TestNewCertCheckCmd_RunE_Valid(t *testing.T) {
	saved := certDialFn
	defer func() { certDialFn = saved }()
	certDialFn = func(host string) (tlsConn, error) {
		return &mockTLSConn{state: tls.ConnectionState{
			PeerCertificates: []*x509.Certificate{
				makeCert("example.com", "Test CA", 12345, 3,
					time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC),
					time.Date(2027, 1, 1, 0, 0, 0, 0, time.UTC),
					[]string{"example.com"}, nil,
					x509.SHA256WithRSA, x509.RSA,
				),
			},
		}}, nil
	}

	cmd := newCertCheckCmd()
	cmd.Flags().Set("host", "example.com:443")
	out := captureOutput(func() {
		err := cmd.RunE(cmd, []string{})
		if err != nil {
			t.Errorf("unexpected error: %v", err)
		}
	})
	if !strings.Contains(out, "Valid") {
		t.Errorf("output missing 'Valid': %s", out)
	}
}

func TestNewCertCheckCmd_RunE_Expired(t *testing.T) {
	saved := certDialFn
	defer func() { certDialFn = saved }()
	certDialFn = func(host string) (tlsConn, error) {
		return &mockTLSConn{state: tls.ConnectionState{
			PeerCertificates: []*x509.Certificate{
				makeCert("expired.com", "CA", 1, 3,
					time.Date(2020, 1, 1, 0, 0, 0, 0, time.UTC),
					time.Date(2021, 1, 1, 0, 0, 0, 0, time.UTC),
					nil, nil,
					x509.SHA256WithRSA, x509.RSA,
				),
			},
		}}, nil
	}

	cmd := newCertCheckCmd()
	cmd.Flags().Set("host", "expired.com:443")
	out := captureOutput(func() {
		err := cmd.RunE(cmd, []string{})
		if err != nil {
			t.Errorf("unexpected error: %v", err)
		}
	})
	if !strings.Contains(out, "EXPIRED") {
		t.Errorf("output missing 'EXPIRED': %s", out)
	}
}

func TestNewCertInfoCmd_RunE(t *testing.T) {
	saved := certDialFn
	defer func() { certDialFn = saved }()
	certDialFn = func(host string) (tlsConn, error) {
		return &mockTLSConn{state: tls.ConnectionState{
			PeerCertificates: []*x509.Certificate{
				makeCert("example.com", "Test CA", 12345, 3,
					time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC),
					time.Date(2027, 1, 1, 0, 0, 0, 0, time.UTC),
					[]string{"example.com", "www.example.com"},
					[]string{"1.2.3.4"},
					x509.SHA256WithRSA, x509.RSA,
				),
			},
		}}, nil
	}

	cmd := newCertInfoCmd()
	cmd.Flags().Set("host", "example.com:443")
	out := captureOutput(func() {
		err := cmd.RunE(cmd, []string{})
		if err != nil {
			t.Errorf("unexpected error: %v", err)
		}
	})
	if !strings.Contains(out, "example.com") {
		t.Errorf("output missing 'example.com': %s", out)
	}
	if !strings.Contains(out, "1.2.3.4") {
		t.Errorf("output missing '1.2.3.4': %s", out)
	}
}

func TestNewCertInfoCmd_RunE_NoCerts(t *testing.T) {
	saved := certDialFn
	defer func() { certDialFn = saved }()
	certDialFn = func(host string) (tlsConn, error) {
		return &mockTLSConn{state: tls.ConnectionState{PeerCertificates: nil}}, nil
	}

	cmd := newCertInfoCmd()
	cmd.Flags().Set("host", "example.com:443")
	out := captureOutput(func() {
		err := cmd.RunE(cmd, []string{})
		if err != nil {
			t.Errorf("unexpected error: %v", err)
		}
	})
	if out == "" {
		t.Log("output is empty for no certs (expected)")
	}
}
