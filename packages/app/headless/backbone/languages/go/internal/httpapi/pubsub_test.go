package httpapi

import (
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/hieudoanm/backbone/internal/pubsub"
	"github.com/hieudoanm/backbone/internal/realtime"
)

func TestHandlePubSubStream_SSE(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/pubsub/topics", `{"name":"chat"}`)
	if resp.StatusCode != 201 {
		t.Fatalf("create topic: expected 201, got %d", resp.StatusCode)
	}

	httpSrv := httptest.NewServer(srv.routes())
	defer httpSrv.Close()

	respCh := make(chan *http.Response, 1)
	errCh := make(chan error, 1)
	go func() {
		resp, err := http.Get(httpSrv.URL + "/api/pubsub/chat/stream")
		if err != nil {
			errCh <- err
			return
		}
		respCh <- resp
	}()

	time.Sleep(50 * time.Millisecond)

	resp = request(t, h, "POST", "/api/pubsub/topics/chat/messages", `{"body":"hello world"}`)
	if resp.StatusCode != 201 {
		t.Fatalf("create message: expected 201, got %d", resp.StatusCode)
	}

	var sseResp *http.Response
	select {
	case sseResp = <-respCh:
	case err := <-errCh:
		t.Fatal(err)
	case <-time.After(5 * time.Second):
		t.Fatal("timed out waiting for SSE response")
	}
	defer sseResp.Body.Close()

	if sseResp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", sseResp.StatusCode)
	}

	buf := make([]byte, 1024)
	n, err := sseResp.Body.Read(buf)
	if err != nil && err != io.EOF {
		t.Fatal(err)
	}
	body := string(buf[:n])
	if !strings.Contains(body, "hello world") {
		t.Fatalf("expected 'hello world' in SSE body, got: %s", body)
	}
}

func TestHandlePubSubStream_TopicNotFound(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)
	w := httptest.NewRecorder()
	r := httptest.NewRequest("GET", "/api/pubsub/nonexistent/stream", nil)
	r.SetPathValue("name", "nonexistent")
	srv := &Server{db: db, dataDir: t.TempDir(), pubsubHub: realtime.NewSSEHub(db)}
	srv.handlePubSubStream(w, r)
	if w.Code != 404 {
		t.Fatalf("expected 404, got %d", w.Code)
	}
}

func TestHandlePubSubStream_GetTopicError(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	w := httptest.NewRecorder()
	r := httptest.NewRequest("GET", "/api/pubsub/chat/stream", nil)
	r.SetPathValue("name", "chat")
	srv := &Server{db: db, dataDir: t.TempDir(), pubsubHub: realtime.NewSSEHub(db)}
	srv.handlePubSubStream(w, r)
	if w.Code != 500 {
		t.Fatalf("expected 500, got %d", w.Code)
	}
}

func TestHandlePubSubStream_HubNil(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)
	pubsub.InsertTopic(db, "t1", "chat")
	w := httptest.NewRecorder()
	r := httptest.NewRequest("GET", "/api/pubsub/chat/stream", nil)
	r.SetPathValue("name", "chat")
	srv := &Server{db: db, dataDir: t.TempDir()} // no pubsubHub
	srv.handlePubSubStream(w, r)
	if w.Code != 500 {
		t.Fatalf("expected 500, got %d", w.Code)
	}
}

func TestHandlePubSubTopicsCreate_InvalidJSON(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	w := httptest.NewRecorder()
	r := httptest.NewRequest("POST", "/api/pubsub/topics", strings.NewReader(`not json`))
	r.Header.Set("Content-Type", "application/json")
	srv := &Server{db: db, dataDir: t.TempDir()}
	srv.handlePubSubTopicsCreate(w, r)
	if w.Code != 400 {
		t.Fatalf("expected 400, got %d", w.Code)
	}
}

func TestHandlePubSubTopicsCreate_MissingName(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	w := httptest.NewRecorder()
	r := httptest.NewRequest("POST", "/api/pubsub/topics", strings.NewReader(`{"name":""}`))
	r.Header.Set("Content-Type", "application/json")
	srv := &Server{db: db, dataDir: t.TempDir()}
	srv.handlePubSubTopicsCreate(w, r)
	if w.Code != 400 {
		t.Fatalf("expected 400, got %d", w.Code)
	}
}

func TestHandlePubSubTopicsCreate_Duplicate(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/pubsub/topics", `{"name":"dup"}`)
	resp := request(t, h, "POST", "/api/pubsub/topics", `{"name":"dup"}`)
	if resp.StatusCode != 409 {
		t.Fatalf("expected 409, got %d", resp.StatusCode)
	}
}

func TestHandlePubSubTopicsCreate_GetTopicError(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	w := httptest.NewRecorder()
	r := httptest.NewRequest("POST", "/api/pubsub/topics", strings.NewReader(`{"name":"test"}`))
	r.Header.Set("Content-Type", "application/json")
	srv := &Server{db: db, dataDir: t.TempDir()}
	srv.handlePubSubTopicsCreate(w, r)
	if w.Code != 500 {
		t.Fatalf("expected 500, got %d", w.Code)
	}
}

func TestHandlePubSubMessagesCreate_InvalidJSON(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)
	pubsub.InsertTopic(db, "t1", "chat")
	w := httptest.NewRecorder()
	r := httptest.NewRequest("POST", "/api/pubsub/topics/chat/messages", strings.NewReader(`not json`))
	r.Header.Set("Content-Type", "application/json")
	r.SetPathValue("name", "chat")
	srv := &Server{db: db, dataDir: t.TempDir()}
	srv.handlePubSubMessagesCreate(w, r)
	if w.Code != 400 {
		t.Fatalf("expected 400, got %d", w.Code)
	}
}

func TestHandlePubSubMessagesCreate_MissingBody(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)
	pubsub.InsertTopic(db, "t1", "chat")
	w := httptest.NewRecorder()
	r := httptest.NewRequest("POST", "/api/pubsub/topics/chat/messages", strings.NewReader(`{"body":""}`))
	r.Header.Set("Content-Type", "application/json")
	r.SetPathValue("name", "chat")
	srv := &Server{db: db, dataDir: t.TempDir()}
	srv.handlePubSubMessagesCreate(w, r)
	if w.Code != 400 {
		t.Fatalf("expected 400, got %d", w.Code)
	}
}

func TestHandlePubSubMessagesCreate_TopicNotFound(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)
	w := httptest.NewRecorder()
	r := httptest.NewRequest("POST", "/api/pubsub/topics/nonexistent/messages", strings.NewReader(`{"body":"hello"}`))
	r.Header.Set("Content-Type", "application/json")
	r.SetPathValue("name", "nonexistent")
	srv := &Server{db: db, dataDir: t.TempDir()}
	srv.handlePubSubMessagesCreate(w, r)
	if w.Code != 404 {
		t.Fatalf("expected 404, got %d", w.Code)
	}
}

func TestHandlePubSubMessagesCreate_GetTopicError(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	w := httptest.NewRecorder()
	r := httptest.NewRequest("POST", "/api/pubsub/topics/chat/messages", strings.NewReader(`{"body":"hello"}`))
	r.Header.Set("Content-Type", "application/json")
	r.SetPathValue("name", "chat")
	srv := &Server{db: db, dataDir: t.TempDir()}
	srv.handlePubSubMessagesCreate(w, r)
	if w.Code != 500 {
		t.Fatalf("expected 500, got %d", w.Code)
	}
}

func TestHandlePubSubMessagesCreate_Success(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/pubsub/topics", `{"name":"chat"}`)
	resp := request(t, h, "POST", "/api/pubsub/topics/chat/messages", `{"body":"hi"}`)
	if resp.StatusCode != 201 {
		t.Fatalf("expected 201, got %d", resp.StatusCode)
	}
	var msg pubsub.PubSubMessage
	if err := json.NewDecoder(resp.Body).Decode(&msg); err != nil {
		t.Fatal(err)
	}
	defer resp.Body.Close()
	if msg.Body != "hi" {
		t.Fatalf("expected body 'hi', got '%s'", msg.Body)
	}
}
