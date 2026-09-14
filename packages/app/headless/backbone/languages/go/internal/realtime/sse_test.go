package realtime

import (
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
)

func TestHandleStream_SSE(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)
	hub := NewSSEHub(db)

	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		hub.HandleStream(w, r)
	}))
	defer srv.Close()

	respCh := make(chan *http.Response, 1)
	errCh := make(chan error, 1)
	go func() {
		resp, err := http.Get(srv.URL)
		if err != nil {
			errCh <- err
			return
		}
		respCh <- resp
	}()

	time.Sleep(50 * time.Millisecond)

	hub.Broadcast([]byte("test event"))

	var resp *http.Response
	select {
	case resp = <-respCh:
	case err := <-errCh:
		t.Fatal(err)
	case <-time.After(5 * time.Second):
		t.Fatal("timed out waiting for SSE response")
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}

	buf := make([]byte, 1024)
	n, err := resp.Body.Read(buf)
	if err != nil && err != io.EOF {
		t.Fatal(err)
	}
	body := string(buf[:n])
	if !strings.Contains(body, "test event") {
		t.Fatalf("expected 'test event' in SSE body, got: %s", body)
	}
}

func TestSSEHubRegisterUnregister(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	h := NewSSEHub(db)
	client := &SSEClient{ID: "sse1", Ch: make(chan []byte, 64)}

	h.Register(client)
	h.Unregister("sse1")

	// Should not panic on double unregister
	h.Unregister("sse1")
}

func TestSSEHubBroadcast(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	h := NewSSEHub(db)

	received := make(chan []byte, 1)
	client := &SSEClient{ID: "sse2", Ch: make(chan []byte, 64)}
	h.Register(client)

	go func() {
		data := <-client.Ch
		received <- data
	}()

	h.Broadcast([]byte("hello"))
	time.Sleep(50 * time.Millisecond)

	select {
	case msg := <-received:
		if string(msg) != "hello" {
			t.Fatalf("expected hello, got %s", string(msg))
		}
	default:
		t.Fatal("expected broadcast")
	}
}
