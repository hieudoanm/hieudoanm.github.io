package httpapi

import (
	"bytes"
	"encoding/json"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/hieudoanm/backbone/internal/store"
)

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
	var n store.Notification
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
