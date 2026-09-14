package tests

import (
	"fmt"
	"net"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestCLIVersion(t *testing.T) {
	binPath := buildBinary(t)
	stdout, stderr, err := runCLI(t, binPath, "version")
	if err != nil {
		t.Fatalf("version: %v\nstderr: %s", err, stderr)
	}
	if !strings.Contains(stdout, "browserverless") {
		t.Fatalf("expected version string, got %q", stdout)
	}
}

func TestCLIHelp(t *testing.T) {
	binPath := buildBinary(t)
	stdout, _, err := runCLI(t, binPath, "help")
	if err != nil {
		t.Fatal(err)
	}
	for _, cmd := range []string{"screenshot", "scrape", "serve", "health"} {
		if !strings.Contains(stdout, cmd) {
			t.Fatalf("help output missing %q", cmd)
		}
	}
}

func TestCLIScreenshot(t *testing.T) {
	binPath := buildBinary(t)
	fixture := newFixture(t)
	out := filepath.Join(t.TempDir(), "shot.png")

	stdout, stderr, err := runCLI(t, binPath, "screenshot", "-o", out, fixture.URL)
	if err != nil {
		t.Fatalf("screenshot: %v\nstderr: %s", err, stderr)
	}
	if !strings.Contains(stdout, "Screenshot saved") {
		t.Fatalf("unexpected stdout: %q", stdout)
	}
	b, err := os.ReadFile(out)
	if err != nil {
		t.Fatalf("read output: %v", err)
	}
	if len(b) < 8 || string(b[:8]) != "\x89PNG\r\n\x1a\n" {
		t.Fatalf("output is not a PNG (len %d)", len(b))
	}
}

func TestCLIScrape(t *testing.T) {
	binPath := buildBinary(t)
	fixture := newFixture(t)

	stdout, stderr, err := runCLI(t, binPath, "scrape", fixture.URL)
	if err != nil {
		t.Fatalf("scrape: %v\nstderr: %s", err, stderr)
	}
	if !strings.Contains(stdout, "Integration Fixture Content") {
		t.Fatalf("scrape stdout missing fixture marker: %q", stdout)
	}
}

func TestCLIHealth(t *testing.T) {
	binPath := buildBinary(t)
	baseURL, stop := startServer(t, binPath)
	defer stop()

	stdout, stderr, err := runCLI(t, binPath, "health", "--base", baseURL)
	if err != nil {
		t.Fatalf("health: %v\nstderr: %s", err, stderr)
	}
	if strings.TrimSpace(stdout) != "ok" {
		t.Fatalf("expected \"ok\", got %q", stdout)
	}
}

func TestCLIHealthUnreachable(t *testing.T) {
	binPath := buildBinary(t)
	l, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatal(err)
	}
	port := l.Addr().(*net.TCPAddr).Port
	l.Close()

	stdout, _, err := runCLI(t, binPath, "health", "--base", fmt.Sprintf("http://127.0.0.1:%d", port))
	if err == nil {
		t.Fatalf("expected failure on unreachable server, got exit 0")
	}
	if stdout != "" {
		t.Fatalf("expected empty stdout, got %q", stdout)
	}
}
