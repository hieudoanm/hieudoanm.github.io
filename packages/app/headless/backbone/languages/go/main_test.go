package main

import (
	"bytes"
	"fmt"
	"io"
	"net"
	"net/http"
	"os"
	"os/exec"
	"strconv"
	"strings"
	"syscall"
	"testing"
	"time"
)

func TestDataDir_WithEnv(t *testing.T) {
	t.Setenv("BACKBONE_DATA", "/custom/path")
	if got := dataDir(); got != "/custom/path" {
		t.Fatalf("expected /custom/path, got %s", got)
	}
}

func TestDataDir_EmptyEnv(t *testing.T) {
	t.Setenv("BACKBONE_DATA", "")
	dir := dataDir()
	if dir == "" {
		t.Fatal("expected non-empty dir")
	}
	if !strings.HasSuffix(dir, ".backbone") {
		t.Fatalf("expected .backbone suffix, got %s", dir)
	}
}

func TestGetLocalIP(t *testing.T) {
	ip := getLocalIP()
	if ip == "" {
		t.Fatal("expected non-empty IP")
	}
}

func TestGetLocalIP_NonLoopback(t *testing.T) {
	ip := getLocalIP()
	if ip == "127.0.0.1" {
		t.Skip("only loopback available")
	}
	parsed := net.ParseIP(ip)
	if parsed == nil || parsed.IsLoopback() || parsed.To4() == nil {
		t.Fatalf("expected non-loopback IPv4, got %s", ip)
	}
}

func TestMain(m *testing.M) {
	if os.Getenv("GO_MAIN_TEST") == "1" {
		main()
		return
	}
	os.Exit(m.Run())
}

func TestMainFunction_StartsAndResponds(t *testing.T) {
	dir := t.TempDir()

	l, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatal(err)
	}
	port := l.Addr().(*net.TCPAddr).Port
	l.Close()

	cmd := exec.Command(os.Args[0], "-test.run=TestMainFunction_StartsAndResponds")
	cmd.Env = append(os.Environ(),
		"GO_MAIN_TEST=1",
		"BACKBONE_DATA="+dir,
		"PORT="+strconv.Itoa(port),
	)
	cmd.Stdout = &bytes.Buffer{}
	cmd.Stderr = &bytes.Buffer{}

	if err := cmd.Start(); err != nil {
		t.Fatal(err)
	}
	defer func() {
		cmd.Process.Signal(syscall.SIGINT)
		cmd.Wait()
	}()

	baseURL := fmt.Sprintf("http://127.0.0.1:%d", port)
	var resp *http.Response
	for i := 0; i < 20; i++ {
		resp, err = http.Get(baseURL + "/api/health")
		if err == nil {
			break
		}
		time.Sleep(50 * time.Millisecond)
	}
	if err != nil {
		t.Fatalf("server did not start: %v\nstdout: %s\nstderr: %s",
			err, cmd.Stdout.(*bytes.Buffer).String(), cmd.Stderr.(*bytes.Buffer).String())
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		t.Fatalf("expected 200, got %d: %s", resp.StatusCode, string(body))
	}
}
