package tests

import (
	"bytes"
	"fmt"
	"io"
	"net"
	"net/http"
	"net/http/httptest"
	"os"
	"os/exec"
	"path/filepath"
	"strconv"
	"strings"
	"syscall"
	"testing"
	"time"
)

const fixtureHTML = `<!DOCTYPE html>
<html>
<head><title>Browserverless Fixture</title></head>
<body><h1>Integration Fixture Content</h1></body>
</html>`

func buildBinary(t *testing.T) string {
	t.Helper()
	binDir := filepath.Join("..", "bin")
	binPath := filepath.Join(binDir, "browserverless")
	if _, err := os.Stat(binPath); err == nil {
		return binPath
	}
	if err := os.MkdirAll(binDir, 0o755); err != nil {
		t.Fatalf("mkdir bin: %v", err)
	}
	cmd := exec.Command("go", "build", "-o", binPath, "./..")
	cmd.Stderr = &bytes.Buffer{}
	if err := cmd.Run(); err != nil {
		t.Fatalf("build binary: %v\nstderr: %s", err, cmd.Stderr.(*bytes.Buffer).String())
	}
	return binPath
}

func newFixture(t *testing.T) *httptest.Server {
	t.Helper()
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		_, _ = io.WriteString(w, fixtureHTML)
	}))
	t.Cleanup(srv.Close)
	return srv
}

func startServer(t *testing.T, binPath string) (baseURL string, stop func()) {
	t.Helper()
	l, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatalf("listen: %v", err)
	}
	port := l.Addr().(*net.TCPAddr).Port
	l.Close()

	cmd := exec.Command(binPath, "serve", "--bind", "127.0.0.1", "--port", strconv.Itoa(port))
	cmd.Stdout = &bytes.Buffer{}
	cmd.Stderr = &bytes.Buffer{}

	if err := cmd.Start(); err != nil {
		t.Fatalf("start server: %v", err)
	}

	baseURL = fmt.Sprintf("http://127.0.0.1:%d", port)
	stop = func() {
		cmd.Process.Signal(syscall.SIGINT)
		done := make(chan struct{}, 1)
		go func() {
			cmd.Wait()
			done <- struct{}{}
		}()
		select {
		case <-done:
		case <-time.After(5 * time.Second):
			cmd.Process.Kill()
			<-done
		}
	}

	var resp *http.Response
	for i := 0; i < 30; i++ {
		resp, err = http.Get(baseURL + "/api/v1/health")
		if err == nil {
			resp.Body.Close()
			return baseURL, stop
		}
		time.Sleep(100 * time.Millisecond)
	}
	stop()
	t.Fatalf("server did not start within 3s\nstdout: %s\nstderr: %s",
		cmd.Stdout.(*bytes.Buffer).String(), cmd.Stderr.(*bytes.Buffer).String())
	return "", nil
}

func doRequest(t *testing.T, method, baseURL, path, body string) *http.Response {
	t.Helper()
	var r io.Reader
	if body != "" {
		r = strings.NewReader(body)
	}
	req, err := http.NewRequest(method, baseURL+path, r)
	if err != nil {
		t.Fatal(err)
	}
	if body != "" {
		req.Header.Set("Content-Type", "application/json")
	}
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Fatalf("%s %s: %v", method, path, err)
	}
	return resp
}

func readBody(t *testing.T, resp *http.Response) string {
	t.Helper()
	defer resp.Body.Close()
	b, err := io.ReadAll(resp.Body)
	if err != nil {
		t.Fatalf("read body: %v", err)
	}
	return string(b)
}

func runCLI(t *testing.T, binPath string, args ...string) (string, string, error) {
	t.Helper()
	cmd := exec.Command(binPath, args...)
	var stdout, stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr
	err := cmd.Run()
	return stdout.String(), stderr.String(), err
}
