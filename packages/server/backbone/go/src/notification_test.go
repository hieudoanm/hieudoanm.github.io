package main

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
)

func TestInsertNotification(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	n, err := insertNotification(db, "n1", "Test Title", "Test Body", "info")
	if err != nil {
		t.Fatalf("insert: %v", err)
	}
	if n.ID != "n1" || n.Title != "Test Title" || n.Body != "Test Body" || n.Type != "info" {
		t.Fatalf("unexpected notification: %+v", n)
	}
	if n.IsRead {
		t.Fatal("expected is_read false")
	}
}

func TestGetNotification(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	insertNotification(db, "n1", "Title", "Body", "info")

	n, err := getNotification(db, "n1")
	if err != nil {
		t.Fatal(err)
	}
	if n == nil {
		t.Fatal("expected notification")
	}
	if n.Title != "Title" {
		t.Fatalf("expected Title, got %s", n.Title)
	}

	// Get nonexistent
	n, err = getNotification(db, "nonexistent")
	if err != nil {
		t.Fatal(err)
	}
	if n != nil {
		t.Fatal("expected nil for nonexistent")
	}
}

func TestListNotifications(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	insertNotification(db, "n1", "A", "B1", "info")
	insertNotification(db, "n2", "B", "B2", "warning")

	notifications, err := listNotifications(db)
	if err != nil {
		t.Fatal(err)
	}
	if len(notifications) != 2 {
		t.Fatalf("expected 2, got %d", len(notifications))
	}
}

func TestUpdateNotification(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	insertNotification(db, "n1", "Old Title", "Old Body", "info")

	updated, err := updateNotification(db, "n1", "New Title", "New Body", "success", true)
	if err != nil {
		t.Fatal(err)
	}
	if updated.Title != "New Title" || updated.Body != "New Body" || updated.Type != "success" || !updated.IsRead {
		t.Fatalf("unexpected: %+v", updated)
	}
}

func TestDeleteNotification(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	insertNotification(db, "n1", "Title", "Body", "info")
	if err := deleteNotification(db, "n1"); err != nil {
		t.Fatal(err)
	}

	n, _ := getNotification(db, "n1")
	if n != nil {
		t.Fatal("expected nil after delete")
	}
}

func TestClearNotifications(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	insertNotification(db, "n1", "A", "B", "info")
	insertNotification(db, "n2", "C", "D", "warning")

	if err := clearNotifications(db); err != nil {
		t.Fatal(err)
	}

	notifications, _ := listNotifications(db)
	if len(notifications) != 0 {
		t.Fatalf("expected 0, got %d", len(notifications))
	}
}

func TestWebhookNotificationData(t *testing.T) {
	n := &Notification{ID: "n1", Title: "Test"}
	data := webhookNotificationData(n)
	if data["notification"] != n {
		t.Fatal("expected notification key to reference the notification")
	}
}

func TestHandleStream_SSE(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)
	hub := NewSSEHub(db)

	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		hub.handleStream(w, r)
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

func TestInsertNotification_DBError(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	_, err := insertNotification(db, "err", "t", "b", "info")
	if err == nil {
		t.Fatal("expected error with un-migrated DB")
	}
}

func TestUpdateNotification_DBError(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	_, err := updateNotification(db, "err", "t", "b", "info", false)
	if err == nil {
		t.Fatal("expected error with un-migrated DB")
	}
}

func TestHandleNotificationsCreate_InvalidJSON(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	w := httptest.NewRecorder()
	r := httptest.NewRequest("POST", "/api/notifications", bytes.NewReader([]byte("{invalid")))
	srv := &Server{db: db, dataDir: t.TempDir()}
	srv.handleNotificationsCreate(w, r)
	if w.Code != 400 {
		t.Fatalf("expected 400, got %d", w.Code)
	}
}

func TestHandleNotificationsCreate_InsertError(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	body := `{"title":"test","body":"test body","type":"info"}`
	w := httptest.NewRecorder()
	r := httptest.NewRequest("POST", "/api/notifications", strings.NewReader(body))
	srv := &Server{db: db, dataDir: t.TempDir()}
	srv.handleNotificationsCreate(w, r)
	if w.Code != 201 {
		t.Fatalf("expected 201, got %d: %s", w.Code, w.Body.String())
	}
	var n Notification
	if err := json.Unmarshal(w.Body.Bytes(), &n); err != nil {
		t.Fatal(err)
	}
	if n.Type != "info" {
		t.Fatalf("expected type info, got %s", n.Type)
	}
}

func TestHandleNotificationsList_Error(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	w := httptest.NewRecorder()
	r := httptest.NewRequest("GET", "/api/notifications", nil)
	srv := &Server{db: db, dataDir: t.TempDir()}
	srv.handleNotificationsList(w, r)
	if w.Code != 500 {
		t.Fatalf("expected 500, got %d", w.Code)
	}
}

func TestHandleNotificationsGet_Error(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	w := httptest.NewRecorder()
	r := httptest.NewRequest("GET", "/api/notifications/test", nil)
	r.SetPathValue("id", "test")
	srv := &Server{db: db, dataDir: t.TempDir()}
	srv.handleNotificationsGet(w, r)
	if w.Code != 500 {
		t.Fatalf("expected 500, got %d", w.Code)
	}
}

func TestHandleNotificationsMarkRead_NotFound(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "PATCH", "/api/notifications/test-id", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

func TestHandleNotificationsCreate_MissingTitle(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/notifications", `{"body":"no title","type":"info"}`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400 for missing title, got %d", resp.StatusCode)
	}
}

func TestHandleNotifications_CreateAndMarkRead(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/notifications", `{"title":"Read Me","body":"body","type":"info"}`)
	if resp.StatusCode != 201 {
		t.Fatalf("create: expected 201, got %d", resp.StatusCode)
	}
	result := readBody(t, resp)
	nID := result["id"].(string)

	resp = request(t, h, "PATCH", "/api/notifications/"+nID, "")
	if resp.StatusCode != 200 {
		t.Fatalf("mark-read: expected 200, got %d: %s", resp.StatusCode, readBody(t, resp))
	}

	resp = request(t, h, "DELETE", "/api/notifications/"+nID, "")
	if resp.StatusCode != 204 {
		t.Fatalf("delete: expected 204, got %d", resp.StatusCode)
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
