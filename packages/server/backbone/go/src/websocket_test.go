package main

import (
	"database/sql"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/gorilla/websocket"
)

func TestNewWSHub(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	h := NewWSHub(db)
	if h == nil {
		t.Fatal("expected non-nil hub")
	}
	if h.clients == nil {
		t.Fatal("expected clients map")
	}
}

func TestWSHubActiveCount(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	h := NewWSHub(db)
	go h.Run()

	if n := h.ActiveCount(); n != 0 {
		t.Fatalf("expected 0, got %d", n)
	}
}

func TestWSHubSendToClient_NotFound(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	h := NewWSHub(db)
	go h.Run()

	if h.SendToClient("nonexistent", []byte("hi")) {
		t.Fatal("expected false for nonexistent client")
	}
}

func TestWSHubCloseClient_NotFound(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	h := NewWSHub(db)
	go h.Run()

	// Should not panic
	h.CloseClient("nonexistent")
}

func TestWSHubCloseClient_Found(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)
	h := NewWSHub(db)
	go h.Run()

	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		wsUpgrader.Upgrade(w, r, nil)
	}))
	defer server.Close()

	url := "ws" + strings.TrimPrefix(server.URL, "http")
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		t.Fatal(err)
	}
	defer conn.Close()

	client := &WSClient{
		ID:   "close-found",
		Hub:  h,
		Conn: conn,
		Send: make(chan []byte, 256),
	}
	h.register <- client
	time.Sleep(50 * time.Millisecond)

	if n := h.ActiveCount(); n != 1 {
		t.Fatalf("expected 1 active client, got %d", n)
	}

	h.CloseClient("close-found")
	time.Sleep(50 * time.Millisecond)

	if n := h.ActiveCount(); n != 0 {
		t.Fatalf("expected 0 active clients after close, got %d", n)
	}
}

func TestWSHubRegisterAndUnregister(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)
	h := NewWSHub(db)
	go h.Run()

	client := &WSClient{
		ID:          "test1",
		Hub:         h,
		Send:        make(chan []byte, 256),
		RemoteAddr:  "10.0.0.1",
		UserAgent:   "test-agent",
		Path:        "/ws",
		ConnectedAt: time.Now().UTC().Format(time.RFC3339),
	}
	h.register <- client
	time.Sleep(50 * time.Millisecond)

	if n := h.ActiveCount(); n != 1 {
		t.Fatalf("expected 1 active client, got %d", n)
	}

	h.unregister <- client
	time.Sleep(50 * time.Millisecond)

	if n := h.ActiveCount(); n != 0 {
		t.Fatalf("expected 0 active clients after unregister, got %d", n)
	}
}

func TestWSHubBroadcast(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	h := NewWSHub(db)
	go h.Run()

	received := make(chan []byte, 1)
	client := &WSClient{
		ID:   "broadcast-client",
		Hub:  h,
		Send: make(chan []byte, 256),
	}
	h.register <- client
	time.Sleep(50 * time.Millisecond)

	go func() {
		msg := <-client.Send
		received <- msg
	}()

	h.broadcast <- []byte("hello all")
	time.Sleep(50 * time.Millisecond)

	select {
	case msg := <-received:
		if string(msg) != "hello all" {
			t.Fatalf("expected 'hello all', got %s", string(msg))
		}
	default:
		t.Fatal("expected broadcast message")
	}
}

func TestWSHubSendToClient_FullBuffer(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)
	h := NewWSHub(db)
	go h.Run()

	client := &WSClient{
		ID:   "full-buf",
		Hub:  h,
		Send: make(chan []byte, 1),
	}
	h.register <- client
	time.Sleep(50 * time.Millisecond)

	// Fill the buffer
	client.Send <- []byte("first")

	// Next send should fail (buffer full)
	if h.SendToClient("full-buf", []byte("second")) {
		t.Fatal("expected false when buffer is full")
	}
}

func TestWSHubActiveCountConcurrent(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	h := NewWSHub(db)
	go h.Run()

	for i := 0; i < 10; i++ {
		id := string(rune('a' + i))
		client := &WSClient{ID: "c" + id, Hub: h, Send: make(chan []byte, 256)}
		h.register <- client
	}
	time.Sleep(100 * time.Millisecond)

	if n := h.ActiveCount(); n != 10 {
		t.Fatalf("expected 10 clients, got %d", n)
	}
}

func TestWSHubBroadcastFullBuffer(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	h := NewWSHub(db)
	go h.Run()

	client := &WSClient{
		ID:   "full-buffer-bc",
		Hub:  h,
		Send: make(chan []byte, 1),
	}
	h.register <- client
	time.Sleep(50 * time.Millisecond)

	client.Send <- []byte("fills buffer")

	h.broadcast <- []byte("overflow")
	time.Sleep(50 * time.Millisecond)
}

func TestWSHubSendToClient_Success(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)
	h := NewWSHub(db)
	go h.Run()

	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		h.ServeWS(w, r)
	}))
	defer server.Close()

	url := "ws" + strings.TrimPrefix(server.URL, "http")
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		t.Fatal(err)
	}
	defer conn.Close()

	time.Sleep(100 * time.Millisecond)

	h.mu.RLock()
	if len(h.clients) == 0 {
		h.mu.RUnlock()
		t.Fatal("expected at least one client")
	}
	var clientID string
	for id := range h.clients {
		clientID = id
		break
	}
	h.mu.RUnlock()

	if !h.SendToClient(clientID, []byte("direct-msg")) {
		t.Fatal("expected SendToClient to return true")
	}

	_, msg, err := conn.ReadMessage()
	if err != nil {
		t.Fatalf("expected to read message from WS: %v", err)
	}
	if string(msg) != "direct-msg" {
		t.Fatalf("expected 'direct-msg', got %s", string(msg))
	}
}

func TestWSHubServeWS_FullCycle(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)
	h := NewWSHub(db)
	go h.Run()

	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		h.ServeWS(w, r)
	}))
	defer server.Close()

	url := "ws" + strings.TrimPrefix(server.URL, "http")
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		t.Fatal(err)
	}

	time.Sleep(100 * time.Millisecond)

	if n := h.ActiveCount(); n != 1 {
		t.Fatalf("expected 1 client after connect, got %d", n)
	}

	err = conn.WriteMessage(websocket.TextMessage, []byte("client says hi"))
	if err != nil {
		t.Fatalf("write to server: %v", err)
	}
	time.Sleep(100 * time.Millisecond)

	msgs, err := listAllWSMessages(db)
	if err != nil {
		t.Fatal(err)
	}
	found := false
	for _, m := range msgs {
		if m.Content == "client says hi" {
			found = true
			break
		}
	}
	if !found {
		t.Fatal("expected 'client says hi' in DB messages")
	}

	conn.Close()
	time.Sleep(150 * time.Millisecond)

	if n := h.ActiveCount(); n != 0 {
		t.Fatalf("expected 0 clients after disconnect, got %d", n)
	}
}

func newTestDB(t *testing.T) (*sql.DB, func()) {
	t.Helper()
	dir := t.TempDir()
	t.Setenv("BACKBONE_DATA", dir)
	db, err := openDB()
	if err != nil {
		t.Fatal(err)
	}
	return db, func() { db.Close() }
}
