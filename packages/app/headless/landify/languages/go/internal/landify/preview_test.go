package landify

import (
	"context"
	"io"
	"net"
	"net/http"
	"os"
	"path/filepath"
	"testing"
	"time"
)

func TestPreviewReturnsFileThenStopsOnCancel(t *testing.T) {
	dir := t.TempDir()
	if err := os.WriteFile(filepath.Join(dir, "hello.txt"), []byte("hi"), 0o644); err != nil {
		t.Fatal(err)
	}
	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatal(err)
	}
	defer ln.Close()
	ctx, cancel := context.WithCancel(context.Background())
	done := make(chan error, 1)
	go func() {
		done <- Preview(ctx, dir, ln)
	}()

	resp, err := http.Get("http://" + ln.Addr().String() + "/hello.txt")
	if err != nil {
		t.Fatal(err)
	}
	defer resp.Body.Close()
	body, _ := io.ReadAll(resp.Body)
	if resp.StatusCode != http.StatusOK || string(body) != "hi" {
		t.Fatalf("got status %d body %q", resp.StatusCode, string(body))
	}

	cancel()
	select {
	case err := <-done:
		if err != nil {
			t.Fatalf("Preview returned %v after cancel", err)
		}
	case <-time.After(5 * time.Second):
		t.Fatal("Preview did not stop after cancel")
	}
}

func TestPreviewServesNoDocsEndpoints(t *testing.T) {
	dir := t.TempDir()
	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatal(err)
	}
	defer ln.Close()
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	done := make(chan error, 1)
	go func() { done <- Preview(ctx, dir, ln) }()

	for _, path := range []string{"/api/v1/docs", "/api/v1/openapi.json"} {
		resp, err := http.Get("http://" + ln.Addr().String() + path)
		if err != nil {
			t.Fatal(err)
		}
		io.Copy(io.Discard, resp.Body)
		resp.Body.Close()
		if resp.StatusCode != http.StatusNotFound {
			t.Errorf("GET %s = %d, want 404 (preview serves static files only)", path, resp.StatusCode)
		}
	}
	cancel()
	<-done
}
