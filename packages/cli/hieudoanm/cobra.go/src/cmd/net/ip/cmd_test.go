package ip

import (
	"context"
	"fmt"
	"net"
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/libs/requests"
)

func TestNewIPCmd(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "ip" {
		t.Errorf("Use = %q", cmd.Use)
	}
	if cmd.Short != "Look up your public IP and geolocation" {
		t.Errorf("Short = %q", cmd.Short)
	}
	wantLong := "Look up your public IP address and geolocation information from multiple providers."
	if cmd.Long != wantLong {
		t.Errorf("Long = %q, want %q", cmd.Long, wantLong)
	}
	wantExample := "  net ip\n  net ip --json\n  net ip --raw"
	if cmd.Example != wantExample {
		t.Errorf("Example = %q, want %q", cmd.Example, wantExample)
	}
	if cmd.Flag("raw") == nil {
		t.Error("expected --raw flag")
	}
	if cmd.Flag("json") == nil {
		t.Error("expected --json flag")
	}
}

func TestNewDNSSubCmd(t *testing.T) {
	cmd := NewDNSSubCmd()
	if cmd.Use != "dns [--domain <domain>]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	if cmd.Short != "DNS record lookup" {
		t.Errorf("Short = %q", cmd.Short)
	}
	wantLong := "Look up DNS records (A, AAAA, CNAME, MX, NS, TXT) for a domain. Defaults to all record types."
	if cmd.Long != wantLong {
		t.Errorf("Long = %q, want %q", cmd.Long, wantLong)
	}
	wantExample := "  net dns --domain example.com\n  net dns --domain example.com --type mx\n  net dns --domain example.com --json"
	if cmd.Example != wantExample {
		t.Errorf("Example = %q, want %q", cmd.Example, wantExample)
	}
	if cmd.Flag("domain") == nil {
		t.Error("expected --domain flag")
	}
	if cmd.Flag("type") == nil {
		t.Error("expected --type flag")
	}
	if cmd.Flag("json") == nil {
		t.Error("expected --json flag")
	}
}

func TestNewDNSSubCmd_RunE_InvalidType(t *testing.T) {
	cmd := NewDNSSubCmd()
	cmd.Flags().Set("type", "invalid")
	err := cmd.RunE(cmd, []string{})
	if err == nil {
		t.Fatal("expected error for invalid record type")
	}
	if !strings.Contains(err.Error(), "unsupported record type") {
		t.Errorf("unexpected error: %v", err)
	}
}

func TestNewIPCmd_RunE_IPInfoSuccess(t *testing.T) {
	orig := netFetch
	callCount := 0
	netFetch = func(url string, opts requests.Options) ([]byte, error) {
		callCount++
		if strings.Contains(url, "ipify") {
			return []byte(`{"ip":"1.2.3.4"}`), nil
		}
		if strings.Contains(url, "ipinfo") {
			return []byte(`{"ip":"1.2.3.4","city":"City","region":"R","country":"CC","loc":"1.0,2.0","org":"AS1 Org"}`), nil
		}
		return nil, fmt.Errorf("unexpected call")
	}
	defer func() { netFetch = orig }()

	out := captureOutput(func() {
		cmd := NewCmd()
		if err := cmd.RunE(cmd, nil); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(out, "1.2.3.4") {
		t.Errorf("expected IP in output, got %q", out)
	}
	if callCount != 2 {
		t.Errorf("expected 2 netFetch calls, got %d", callCount)
	}
}

func TestNewIPCmd_RunE_IPInfoFailsFallbackToIpapi(t *testing.T) {
	orig := netFetch
	netFetch = func(url string, opts requests.Options) ([]byte, error) {
		if strings.Contains(url, "ipify") {
			return []byte(`{"ip":"5.5.5.5"}`), nil
		}
		if strings.Contains(url, "ipinfo") {
			return nil, fmt.Errorf("ipinfo failed")
		}
		if strings.Contains(url, "ipapi") {
			return []byte(`{"ip":"5.5.5.5","version":"IPv4","city":"FC","region":"FR","country_name":"FC","country_code":"FC","latitude":5.0,"longitude":5.0,"org":"F","asn":"AS5"}`), nil
		}
		return nil, fmt.Errorf("unexpected")
	}
	defer func() { netFetch = orig }()

	out := captureOutput(func() {
		cmd := NewCmd()
		if err := cmd.RunE(cmd, nil); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(out, "5.5.5.5") {
		t.Errorf("expected IP in output, got %q", out)
	}
}

func TestNewIPCmd_RunE_BothProvidersFail(t *testing.T) {
	orig := netFetch
	netFetch = func(url string, opts requests.Options) ([]byte, error) {
		if strings.Contains(url, "ipify") {
			return []byte(`{"ip":"1.2.3.4"}`), nil
		}
		return nil, fmt.Errorf("provider error")
	}
	defer func() { netFetch = orig }()

	cmd := NewCmd()
	err := cmd.RunE(cmd, nil)
	if err == nil {
		t.Fatal("expected error")
	}
	if !strings.Contains(err.Error(), "both providers failed") {
		t.Errorf("unexpected error: %v", err)
	}
}

func TestNewIPCmd_RunE_RawFlag(t *testing.T) {
	orig := netFetch
	netFetch = func(url string, opts requests.Options) ([]byte, error) {
		if strings.Contains(url, "ipify") {
			return []byte(`{"ip":"7.7.7.7"}`), nil
		}
		return []byte(`{"ip":"7.7.7.7","city":"C","region":"R","country":"CC","loc":"0.0,0.0","org":"AS7 O"}`), nil
	}
	defer func() { netFetch = orig }()

	cmd := NewCmd()
	cmd.Flags().Set("raw", "true")
	out := captureOutput(func() {
		if err := cmd.RunE(cmd, nil); err != nil {
			t.Fatal(err)
		}
	})
	if !strings.Contains(out, `"ip": "7.7.7.7"`) {
		t.Errorf("expected JSON output, got %q", out)
	}
}

func TestNewDNSSubCmd_RunE_A(t *testing.T) {
	saved := dnsLookupHost
	defer func() { dnsLookupHost = saved }()
	dnsLookupHost = func(ctx context.Context, host string) ([]string, error) {
		return []string{"1.2.3.4", "::1"}, nil
	}

	cmd := NewDNSSubCmd()
	cmd.Flags().Set("domain", "example.com")
	cmd.Flags().Set("type", "a")
	out := captureOutput(func() {
		err := cmd.RunE(cmd, []string{})
		if err != nil {
			t.Errorf("unexpected error: %v", err)
		}
	})
	if !strings.Contains(out, "1.2.3.4") {
		t.Errorf("output missing IPv4: %s", out)
	}
}

func TestNewDNSSubCmd_RunE_AAAA(t *testing.T) {
	saved := dnsLookupHost
	defer func() { dnsLookupHost = saved }()
	dnsLookupHost = func(ctx context.Context, host string) ([]string, error) {
		return []string{"1.2.3.4", "2001:db8::1"}, nil
	}

	cmd := NewDNSSubCmd()
	cmd.Flags().Set("domain", "example.com")
	cmd.Flags().Set("type", "aaaa")
	out := captureOutput(func() {
		err := cmd.RunE(cmd, []string{})
		if err != nil {
			t.Errorf("unexpected error: %v", err)
		}
	})
	if !strings.Contains(out, "2001:db8::1") {
		t.Errorf("output missing IPv6: %s", out)
	}
}

func TestNewDNSSubCmd_RunE_AllTypes(t *testing.T) {
	savedHost := dnsLookupHost
	savedCNAME := dnsLookupCNAME
	savedMX := dnsLookupMX
	savedNS := dnsLookupNS
	savedTXT := dnsLookupTXT
	defer func() {
		dnsLookupHost = savedHost
		dnsLookupCNAME = savedCNAME
		dnsLookupMX = savedMX
		dnsLookupNS = savedNS
		dnsLookupTXT = savedTXT
	}()
	dnsLookupHost = func(ctx context.Context, host string) ([]string, error) {
		return []string{"93.184.216.34"}, nil
	}
	dnsLookupCNAME = func(ctx context.Context, host string) (string, error) {
		return "example.com.", nil
	}
	dnsLookupMX = func(ctx context.Context, name string) ([]*net.MX, error) {
		return []*net.MX{{Host: "mail.example.com.", Pref: 10}}, nil
	}
	dnsLookupNS = func(ctx context.Context, name string) ([]*net.NS, error) {
		return []*net.NS{{Host: "ns1.example.com."}}, nil
	}
	dnsLookupTXT = func(ctx context.Context, name string) ([]string, error) {
		return []string{"v=spf1 include:_spf.example.com"}, nil
	}

	cmd := NewDNSSubCmd()
	cmd.Flags().Set("domain", "example.com")
	out := captureOutput(func() {
		err := cmd.RunE(cmd, []string{})
		if err != nil {
			t.Errorf("unexpected error: %v", err)
		}
	})
	if !strings.Contains(out, "93.184.216.34") {
		t.Errorf("output missing A record: %s", out)
	}
}

func TestNewDNSSubCmd_RunE_JSON(t *testing.T) {
	savedHost := dnsLookupHost
	savedJSON := dnsJSON
	defer func() { dnsLookupHost = savedHost; dnsJSON = savedJSON }()
	dnsLookupHost = func(ctx context.Context, host string) ([]string, error) {
		return []string{"1.2.3.4"}, nil
	}

	cmd := NewDNSSubCmd()
	cmd.Flags().Set("domain", "example.com")
	dnsJSON = true
	out := captureOutput(func() {
		err := cmd.RunE(cmd, []string{})
		if err != nil {
			t.Errorf("unexpected error: %v", err)
		}
	})
	if !strings.Contains(out, "1.2.3.4") {
		t.Errorf("output missing IP: %s", out)
	}
	if !strings.Contains(out, "domain") {
		t.Errorf("output missing 'domain' key: %s", out)
	}
}

func TestNewDNSSubCmd_RunE_NoRecords(t *testing.T) {
	savedHost := dnsLookupHost
	savedCNAME := dnsLookupCNAME
	savedMX := dnsLookupMX
	savedNS := dnsLookupNS
	savedTXT := dnsLookupTXT
	defer func() {
		dnsLookupHost = savedHost
		dnsLookupCNAME = savedCNAME
		dnsLookupMX = savedMX
		dnsLookupNS = savedNS
		dnsLookupTXT = savedTXT
	}()
	dnsLookupHost = func(ctx context.Context, host string) ([]string, error) {
		return nil, nil
	}
	dnsLookupCNAME = func(ctx context.Context, host string) (string, error) {
		return "", nil
	}
	dnsLookupMX = func(ctx context.Context, name string) ([]*net.MX, error) {
		return nil, nil
	}
	dnsLookupNS = func(ctx context.Context, name string) ([]*net.NS, error) {
		return nil, nil
	}
	dnsLookupTXT = func(ctx context.Context, name string) ([]string, error) {
		return nil, nil
	}

	cmd := NewDNSSubCmd()
	cmd.Flags().Set("domain", "example.com")
	out := captureOutput(func() {
		err := cmd.RunE(cmd, []string{})
		if err != nil {
			t.Errorf("unexpected error: %v", err)
		}
	})
	if !strings.Contains(out, "no records found") {
		t.Errorf("output missing 'no records found': %s", out)
	}
}

func TestNewDNSSubCmd_RunE_MXEmptyHost(t *testing.T) {
	savedMX := dnsLookupMX
	defer func() { dnsLookupMX = savedMX }()
	dnsLookupMX = func(ctx context.Context, name string) ([]*net.MX, error) {
		return []*net.MX{{Host: "", Pref: 10}}, nil
	}

	cmd := NewDNSSubCmd()
	cmd.Flags().Set("domain", "example.com")
	cmd.Flags().Set("type", "mx")
	err := cmd.RunE(cmd, []string{})
	if err != nil {
		t.Errorf("unexpected error: %v", err)
	}
}

func TestNewDNSSubCmd_RunE_NSEmptyHost(t *testing.T) {
	savedNS := dnsLookupNS
	defer func() { dnsLookupNS = savedNS }()
	dnsLookupNS = func(ctx context.Context, name string) ([]*net.NS, error) {
		return []*net.NS{{Host: ""}}, nil
	}

	cmd := NewDNSSubCmd()
	cmd.Flags().Set("domain", "example.com")
	cmd.Flags().Set("type", "ns")
	err := cmd.RunE(cmd, []string{})
	if err != nil {
		t.Errorf("unexpected error: %v", err)
	}
}
