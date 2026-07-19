package server

import (
	"strings"
	"testing"
)

func TestResolveBind(t *testing.T) {
	tests := []struct {
		name string
		cfg  Config
		want string
	}{
		{"default", Config{}, "0.0.0.0:8080"},
		{"bind only", Config{Bind: "127.0.0.1"}, "127.0.0.1:8080"},
		{"bind and port", Config{Bind: "127.0.0.1", Port: 9090}, "127.0.0.1:9090"},
		{"host:port only", Config{Bind: "127.0.0.1:7070"}, "127.0.0.1:7070"},
		{"host:port with port override", Config{Bind: "127.0.0.1:7070", Port: 9090}, "127.0.0.1:9090"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := tt.cfg.resolveBind(); got != tt.want {
				t.Errorf("resolveBind() = %q, want %q", got, tt.want)
			}
		})
	}
}

func TestExternalIPv4(t *testing.T) {
	ip := externalIPv4()
	if ip == "" {
		t.Skip("no suitable external IPv4 on this machine")
	}
	if strings.Count(ip, ".") != 3 {
		t.Errorf("externalIPv4() = %q, want a dotted IPv4", ip)
	}
}

func TestIsVirtual(t *testing.T) {
	prefixes := []string{"lo", "utun", "awdl"}
	for _, name := range []string{"lo0", "utun4", "awdl0", "en0"} {
		want := strings.HasPrefix(name, "lo") ||
			strings.HasPrefix(name, "utun") ||
			strings.HasPrefix(name, "awdl")
		if got := isVirtual(name, prefixes); got != want {
			t.Errorf("isVirtual(%s) = %v, want %v", name, got, want)
		}
	}
}
