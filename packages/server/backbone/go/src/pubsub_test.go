package main

import (
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
)

func TestInsertPubSubTopic(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	topic, err := insertPubSubTopic(db, "t1", "mytopic")
	if err != nil {
		t.Fatalf("insert: %v", err)
	}
	if topic.ID != "t1" || topic.Name != "mytopic" {
		t.Fatalf("unexpected topic: %+v", topic)
	}
}

func TestGetPubSubTopic(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	insertPubSubTopic(db, "t1", "mytopic")

	topic, err := getPubSubTopic(db, "mytopic")
	if err != nil {
		t.Fatal(err)
	}
	if topic == nil {
		t.Fatal("expected topic")
	}
	if topic.Name != "mytopic" {
		t.Fatalf("expected mytopic, got %s", topic.Name)
	}

	// Get nonexistent
	topic, err = getPubSubTopic(db, "nonexistent")
	if err != nil {
		t.Fatal(err)
	}
	if topic != nil {
		t.Fatal("expected nil for nonexistent")
	}
}

func TestGetPubSubTopicByID(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	insertPubSubTopic(db, "t1", "mytopic")

	topic, err := getPubSubTopicByID(db, "t1")
	if err != nil {
		t.Fatal(err)
	}
	if topic == nil {
		t.Fatal("expected topic")
	}

	// Get nonexistent
	topic, err = getPubSubTopicByID(db, "nonexistent")
	if err != nil {
		t.Fatal(err)
	}
	if topic != nil {
		t.Fatal("expected nil for nonexistent id")
	}
}

func TestListPubSubTopics(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	insertPubSubTopic(db, "t1", "alpha")
	insertPubSubTopic(db, "t2", "beta")

	topics, err := listPubSubTopics(db)
	if err != nil {
		t.Fatal(err)
	}
	if len(topics) != 2 {
		t.Fatalf("expected 2, got %d", len(topics))
	}
}

func TestDeletePubSubTopic(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	insertPubSubTopic(db, "t1", "mytopic")
	if err := deletePubSubTopic(db, "mytopic"); err != nil {
		t.Fatal(err)
	}

	topic, _ := getPubSubTopic(db, "mytopic")
	if topic != nil {
		t.Fatal("expected nil after delete")
	}
}

func TestInsertPubSubMessage(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	insertPubSubTopic(db, "t1", "chat")
	topic, _ := getPubSubTopic(db, "chat")

	msg, err := insertPubSubMessage(db, "m1", topic.ID, "hello world")
	if err != nil {
		t.Fatalf("insert message: %v", err)
	}
	if msg.ID != "m1" || msg.Body != "hello world" {
		t.Fatalf("unexpected message: %+v", msg)
	}
}

func TestListPubSubMessages(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	insertPubSubTopic(db, "t1", "chat")
	topic, _ := getPubSubTopic(db, "chat")

	insertPubSubMessage(db, "m1", topic.ID, "msg1")
	insertPubSubMessage(db, "m2", topic.ID, "msg2")

	messages, err := listPubSubMessages(db, topic.ID)
	if err != nil {
		t.Fatal(err)
	}
	if len(messages) != 2 {
		t.Fatalf("expected 2 messages, got %d", len(messages))
	}
}

func TestWebhookPubSubTopicData(t *testing.T) {
	topic := &PubSubTopic{ID: "t1", Name: "test"}
	data := webhookPubSubTopicData(topic)
	if data["topic"] != topic {
		t.Fatal("expected topic key to reference the topic")
	}
}

func TestWebhookPubSubMessageData(t *testing.T) {
	msg := &PubSubMessage{ID: "m1", Body: "test"}
	data := webhookPubSubMessageData(msg)
	if data["message"] != msg {
		t.Fatal("expected message key to reference the message")
	}
}

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
	srv := &Server{db: db, dataDir: t.TempDir(), pubsubHub: NewSSEHub(db)}
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
	srv := &Server{db: db, dataDir: t.TempDir(), pubsubHub: NewSSEHub(db)}
	srv.handlePubSubStream(w, r)
	if w.Code != 500 {
		t.Fatalf("expected 500, got %d", w.Code)
	}
}

func TestHandlePubSubStream_HubNil(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)
	insertPubSubTopic(db, "t1", "chat")
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
	insertPubSubTopic(db, "t1", "chat")
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
	insertPubSubTopic(db, "t1", "chat")
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
	var msg PubSubMessage
	if err := json.NewDecoder(resp.Body).Decode(&msg); err != nil {
		t.Fatal(err)
	}
	defer resp.Body.Close()
	if msg.Body != "hi" {
		t.Fatalf("expected body 'hi', got '%s'", msg.Body)
	}
}
