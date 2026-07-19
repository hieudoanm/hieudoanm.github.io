package main

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net"
	"net/http"
	"net/http/httptest"
	"os"
	"os/exec"
	"strconv"
	"strings"
	"syscall"
	"testing"
	"time"
)

func newTestServer(t *testing.T) *Server {
	t.Helper()
	dir, err := os.MkdirTemp("", "backbone-test-*")
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { os.RemoveAll(dir) })
	os.Setenv("BACKBONE_DATA", dir)
	db, err := openDB()
	if err != nil {
		t.Fatal(err)
	}
	if err := migrateDB(db); err != nil {
		t.Fatal(err)
	}
	storageDir, _ := os.MkdirTemp("", "backbone-storage-*")
	t.Cleanup(func() { os.RemoveAll(storageDir) })
	key, err := getOrCreateSecretsKey(storageDir)
	if err != nil {
		t.Fatal(err)
	}
	wsHub := NewWSHub(db)
	go wsHub.Run()
	cache := NewCacheStore(db)
	sseHub := NewSSEHub(db)
	logHub := NewSSEHub(db)
	pubsubHub := NewSSEHub(db)
	return &Server{db: db, dataDir: storageDir, secretsKey: key, cronScheduler: nil, wsHub: wsHub, cache: cache, sseHub: sseHub, logHub: logHub, pubsubHub: pubsubHub}
}

func request(t *testing.T, h http.Handler, method, path, body string) *http.Response {
	t.Helper()
	req := httptest.NewRequest(method, path, strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	h.ServeHTTP(w, req)
	return w.Result()
}

func readBody(t *testing.T, resp *http.Response) map[string]any {
	t.Helper()
	var result map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	return result
}

func TestHealth(t *testing.T) {
	srv := newTestServer(t)
	resp := request(t, srv.routes(), "GET", "/api/health", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
	body := readBody(t, resp)
	if body["status"] != "ok" {
		t.Fatalf("expected status ok, got %v", body["status"])
	}
}

func TestAuthRegisterAndLogin(t *testing.T) {
	srv := newTestServer(t)

	resp := request(t, srv.routes(), "POST", "/api/auth/register", `{"email":"test@example.com","password":"password123"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("register: expected 200, got %d", resp.StatusCode)
	}
	result := readBody(t, resp)
	if result["email"] != "test@example.com" {
		t.Fatalf("expected test@example.com, got %v", result["email"])
	}

	resp = request(t, srv.routes(), "POST", "/api/auth/login", `{"email":"test@example.com","password":"password123"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("login: expected 200, got %d", resp.StatusCode)
	}
	result = readBody(t, resp)
	if result["token"] == "" {
		t.Fatal("expected token")
	}
	user, ok := result["user"].(map[string]any)
	if !ok {
		t.Fatal("expected user object")
	}
	if user["email"] != "test@example.com" {
		t.Fatalf("expected test@example.com, got %v", user["email"])
	}
}

func TestAuthRequiresToken(t *testing.T) {
	srv := newTestServer(t)
	resp := request(t, srv.routes(), "GET", "/api/collections", "")
	if resp.StatusCode != 401 {
		t.Fatalf("expected 401, got %d", resp.StatusCode)
	}
}

func loginAndGetToken(t *testing.T, srv *Server) string {
	t.Helper()
	h := srv.routes()
	request(t, h, "POST", "/api/auth/register", `{"email":"admin@test.com","password":"admin123"}`)
	resp := request(t, h, "POST", "/api/auth/login", `{"email":"admin@test.com","password":"admin123"}`)
	result := readBody(t, resp)
	token, _ := result["token"].(string)
	return token
}

func authenticated(h http.Handler, token string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		r.Header.Set("Authorization", "Bearer "+token)
		h.ServeHTTP(w, r)
	})
}

func TestCollectionCRUD(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	// Create collection
	resp := request(t, h, "POST", "/api/collections", `{"name":"posts","schema":"{\"title\":\"string\"}"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("create collection: expected 200, got %d", resp.StatusCode)
	}

	// List collections
	resp = request(t, h, "GET", "/api/collections", "")
	if resp.StatusCode != 200 {
		t.Fatalf("list collections: expected 200, got %d", resp.StatusCode)
	}
	var cols []map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&cols); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if len(cols) != 1 {
		t.Fatalf("expected 1 collection, got %d", len(cols))
	}

	// Get collection
	resp = request(t, h, "GET", "/api/collections/posts", "")
	if resp.StatusCode != 200 {
		t.Fatalf("get collection: expected 200, got %d", resp.StatusCode)
	}
	result := readBody(t, resp)
	if result["name"] != "posts" {
		t.Fatalf("expected posts, got %v", result["name"])
	}

	// Delete collection
	resp = request(t, h, "DELETE", "/api/collections/posts", "")
	if resp.StatusCode != 204 {
		t.Fatalf("delete collection: expected 204, got %d", resp.StatusCode)
	}

	// Verify deleted
	resp = request(t, h, "GET", "/api/collections/posts", "")
	if resp.StatusCode != 404 {
		t.Fatalf("get deleted: expected 404, got %d", resp.StatusCode)
	}
}

func TestRecordCRUD(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	// Create collection
	resp := request(t, h, "POST", "/api/collections", `{"name":"items"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("create collection: expected 200, got %d", resp.StatusCode)
	}

	// Create record
	resp = request(t, h, "POST", "/api/collections/items/records", `{"data":{"name":"item1","value":42}}`)
	if resp.StatusCode != 200 {
		t.Fatalf("create record: expected 200, got %d", resp.StatusCode)
	}
	result := readBody(t, resp)
	recID, ok := result["id"].(string)
	if !ok || recID == "" {
		t.Fatal("expected record id")
	}

	// Get record
	resp = request(t, h, "GET", "/api/collections/items/records/"+recID, "")
	if resp.StatusCode != 200 {
		t.Fatalf("get record: expected 200, got %d", resp.StatusCode)
	}
	result = readBody(t, resp)
	if result["id"] != recID {
		t.Fatalf("expected id %s, got %v", recID, result["id"])
	}

	// List records
	resp = request(t, h, "GET", "/api/collections/items/records?page=1&per_page=20", "")
	if resp.StatusCode != 200 {
		t.Fatalf("list records: expected 200, got %d", resp.StatusCode)
	}
	var page map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&page); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	total, _ := page["total"].(float64)
	if total != 1 {
		t.Fatalf("expected 1 total, got %v", total)
	}

	// Update record
	resp = request(t, h, "PATCH", "/api/collections/items/records/"+recID, `{"data":{"name":"item1-updated","value":99}}`)
	if resp.StatusCode != 200 {
		t.Fatalf("update record: expected 200, got %d", resp.StatusCode)
	}

	// Delete record
	resp = request(t, h, "DELETE", "/api/collections/items/records/"+recID, "")
	if resp.StatusCode != 204 {
		t.Fatalf("delete record: expected 204, got %d", resp.StatusCode)
	}

	// Verify deleted
	resp = request(t, h, "GET", "/api/collections/items/records/"+recID, "")
	if resp.StatusCode != 404 {
		t.Fatalf("get deleted: expected 404, got %d", resp.StatusCode)
	}
}

func TestDuplicateEmail(t *testing.T) {
	srv := newTestServer(t)
	h := srv.routes()

	resp := request(t, h, "POST", "/api/auth/register", `{"email":"dup@test.com","password":"password123"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("first register: expected 200, got %d", resp.StatusCode)
	}

	resp = request(t, h, "POST", "/api/auth/register", `{"email":"dup@test.com","password":"password123"}`)
	if resp.StatusCode != 409 {
		t.Fatalf("duplicate: expected 409, got %d", resp.StatusCode)
	}
}

func TestMissingAuthFields(t *testing.T) {
	srv := newTestServer(t)
	h := srv.routes()
	tests := []struct {
		body string
		code int
		desc string
	}{
		{`{}`, 400, "empty body"},
		{`{"email":"test@test.com"}`, 400, "missing password"},
		{`{"password":"test"}`, 400, "missing email"},
		{`{"email":"test@test.com","password":"123"}`, 400, "short password"},
	}
	for _, tt := range tests {
		resp := request(t, h, "POST", "/api/auth/register", tt.body)
		if resp.StatusCode != tt.code {
			t.Errorf("%s: expected %d, got %d", tt.desc, tt.code, resp.StatusCode)
		}
	}
}

func TestCollectionNotFound(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "GET", "/api/collections/nonexistent", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}

	resp = request(t, h, "POST", "/api/collections/nonexistent/records", `{"data":{}}`)
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

func TestInvalidToken(t *testing.T) {
	srv := newTestServer(t)
	h := authenticated(srv.routes(), "invalid-token")

	resp := request(t, h, "GET", "/api/collections", "")
	if resp.StatusCode != 401 {
		t.Fatalf("expected 401, got %d", resp.StatusCode)
	}
}

func TestLoginInvalidCredentials(t *testing.T) {
	srv := newTestServer(t)
	h := srv.routes()

	request(t, h, "POST", "/api/auth/register", `{"email":"user@test.com","password":"password123"}`)
	resp := request(t, h, "POST", "/api/auth/login", `{"email":"user@test.com","password":"wrongpassword"}`)
	if resp.StatusCode != 401 {
		t.Fatalf("expected 401, got %d", resp.StatusCode)
	}
}

func uploadFile(t *testing.T, h http.Handler, bucket, filename, content string) *http.Response {
	t.Helper()
	var buf bytes.Buffer
	w := multipart.NewWriter(&buf)
	fw, err := w.CreateFormFile("file", filename)
	if err != nil {
		t.Fatal(err)
	}
	io.WriteString(fw, content)
	w.Close()

	req := httptest.NewRequest("POST", "/api/buckets/"+bucket+"/files", &buf)
	req.Header.Set("Content-Type", w.FormDataContentType())
	resp := httptest.NewRecorder()
	h.ServeHTTP(resp, req)
	return resp.Result()
}

func TestBucketCRUD(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	// Create bucket
	resp := request(t, h, "POST", "/api/buckets", `{"name":"avatars"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("create bucket: expected 200, got %d", resp.StatusCode)
	}
	result := readBody(t, resp)
	if result["name"] != "avatars" {
		t.Fatalf("expected avatars, got %v", result["name"])
	}

	// List buckets
	resp = request(t, h, "GET", "/api/buckets", "")
	if resp.StatusCode != 200 {
		t.Fatalf("list buckets: expected 200, got %d", resp.StatusCode)
	}
	var buckets []map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&buckets); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if len(buckets) != 1 {
		t.Fatalf("expected 1 bucket, got %d", len(buckets))
	}

	// Get bucket
	resp = request(t, h, "GET", "/api/buckets/avatars", "")
	if resp.StatusCode != 200 {
		t.Fatalf("get bucket: expected 200, got %d", resp.StatusCode)
	}
	result = readBody(t, resp)
	if result["name"] != "avatars" {
		t.Fatalf("expected avatars, got %v", result["name"])
	}

	// Delete bucket
	resp = request(t, h, "DELETE", "/api/buckets/avatars", "")
	if resp.StatusCode != 204 {
		t.Fatalf("delete bucket: expected 204, got %d", resp.StatusCode)
	}

	// Verify deleted
	resp = request(t, h, "GET", "/api/buckets/avatars", "")
	if resp.StatusCode != 404 {
		t.Fatalf("get deleted: expected 404, got %d", resp.StatusCode)
	}
}

func TestFileUploadDownloadDelete(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	// Create bucket
	resp := request(t, h, "POST", "/api/buckets", `{"name":"photos"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("create bucket: expected 200, got %d", resp.StatusCode)
	}

	// Upload file
	resp = uploadFile(t, h, "photos", "hello.txt", "Hello, World!")
	if resp.StatusCode != 200 {
		t.Fatalf("upload file: expected 200, got %d", resp.StatusCode)
	}
	result := readBody(t, resp)
	fileID, ok := result["id"].(string)
	if !ok || fileID == "" {
		t.Fatal("expected file id")
	}
	if result["filename"] != "hello.txt" {
		t.Fatalf("expected hello.txt, got %v", result["filename"])
	}
	if result["bucket"] != "photos" {
		t.Fatalf("expected photos, got %v", result["bucket"])
	}

	// List files
	resp = request(t, h, "GET", "/api/buckets/photos/files", "")
	if resp.StatusCode != 200 {
		t.Fatalf("list files: expected 200, got %d", resp.StatusCode)
	}
	var page map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&page); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	files, _ := page["files"].([]any)
	if len(files) != 1 {
		t.Fatalf("expected 1 file, got %d", len(files))
	}

	// Download file
	resp = request(t, h, "GET", "/api/buckets/photos/files/"+fileID, "")
	if resp.StatusCode != 200 {
		t.Fatalf("download file: expected 200, got %d", resp.StatusCode)
	}
	body, _ := io.ReadAll(resp.Body)
	resp.Body.Close()
	if string(body) != "Hello, World!" {
		t.Fatalf("expected file content 'Hello, World!', got %s", string(body))
	}
	if resp.Header.Get("Content-Type") != "text/plain; charset=utf-8" {
		t.Fatalf("expected text/plain, got %s", resp.Header.Get("Content-Type"))
	}
	if resp.Header.Get("Content-Disposition") != `attachment; filename="hello.txt"` {
		t.Fatalf("expected attachment header, got %s", resp.Header.Get("Content-Disposition"))
	}

	// Delete file
	resp = request(t, h, "DELETE", "/api/buckets/photos/files/"+fileID, "")
	if resp.StatusCode != 204 {
		t.Fatalf("delete file: expected 204, got %d", resp.StatusCode)
	}

	// Verify deleted
	resp = request(t, h, "GET", "/api/buckets/photos/files/"+fileID, "")
	if resp.StatusCode != 404 {
		t.Fatalf("get deleted: expected 404, got %d", resp.StatusCode)
	}
}

func TestFileNoBucket(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	// Upload to nonexistent bucket
	resp := uploadFile(t, h, "nonexistent", "f.txt", "data")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}

	// Bucket auth required
	resp = request(t, srv.routes(), "GET", "/api/buckets", "")
	if resp.StatusCode != 401 {
		t.Fatalf("expected 401, got %d", resp.StatusCode)
	}
}

func TestBucketDuplicate(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/buckets", `{"name":"dup"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("first: expected 200, got %d", resp.StatusCode)
	}

	resp = request(t, h, "POST", "/api/buckets", `{"name":"dup"}`)
	if resp.StatusCode != 409 {
		t.Fatalf("duplicate: expected 409, got %d", resp.StatusCode)
	}
}

func TestWebhookCRUD(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authHandler(srv, token)

	// Create webhook
	resp := request(t, h, "POST", "/api/webhooks", `{"name":"my hook","url":"https://example.com/hook","events":["record.create","record.delete"]}`)
	if resp.StatusCode != 200 {
		t.Fatalf("create webhook: expected 200, got %d", resp.StatusCode)
	}
	result := readBody(t, resp)
	hookID, ok := result["id"].(string)
	if !ok || hookID == "" {
		t.Fatal("expected webhook id")
	}
	if result["name"] != "my hook" {
		t.Fatalf("expected name 'my hook', got %v", result["name"])
	}

	// List webhooks
	resp = request(t, h, "GET", "/api/webhooks", "")
	if resp.StatusCode != 200 {
		t.Fatalf("list webhooks: expected 200, got %d", resp.StatusCode)
	}
	var hooks []map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&hooks); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if len(hooks) != 1 {
		t.Fatalf("expected 1 webhook, got %d", len(hooks))
	}

	// Get webhook
	resp = request(t, h, "GET", "/api/webhooks/"+hookID, "")
	if resp.StatusCode != 200 {
		t.Fatalf("get webhook: expected 200, got %d", resp.StatusCode)
	}
	result = readBody(t, resp)
	if result["id"] != hookID {
		t.Fatalf("expected id %s, got %v", hookID, result["id"])
	}

	// Update webhook
	resp = request(t, h, "PATCH", "/api/webhooks/"+hookID, `{"name":"updated hook","is_active":false}`)
	if resp.StatusCode != 200 {
		t.Fatalf("update webhook: expected 200, got %d", resp.StatusCode)
	}
	result = readBody(t, resp)
	if result["name"] != "updated hook" {
		t.Fatalf("expected name 'updated hook', got %v", result["name"])
	}

	// Delete webhook
	resp = request(t, h, "DELETE", "/api/webhooks/"+hookID, "")
	if resp.StatusCode != 204 {
		t.Fatalf("delete webhook: expected 204, got %d", resp.StatusCode)
	}

	// Verify deleted
	resp = request(t, h, "GET", "/api/webhooks/"+hookID, "")
	if resp.StatusCode != 404 {
		t.Fatalf("get deleted: expected 404, got %d", resp.StatusCode)
	}
}

func TestWebhookValidation(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authHandler(srv, token)

	tests := []struct {
		body string
		code int
		desc string
	}{
		{`{}`, 400, "empty body"},
		{`{"name":"h"}`, 400, "missing url"},
		{`{"name":"h","url":"http://example.com/hook"}`, 400, "missing events"},
	}
	for _, tt := range tests {
		resp := request(t, h, "POST", "/api/webhooks", tt.body)
		if resp.StatusCode != tt.code {
			t.Errorf("%s: expected %d, got %d", tt.desc, tt.code, resp.StatusCode)
		}
	}
}

func TestWebhookLogs(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authHandler(srv, token)

	// Create webhook
	resp := request(t, h, "POST", "/api/webhooks", `{"name":"log test","url":"https://example.com/hook","events":["record.create"]}`)
	if resp.StatusCode != 200 {
		t.Fatalf("create webhook: expected 200, got %d", resp.StatusCode)
	}
	result := readBody(t, resp)
	hookID := result["id"].(string)

	// Get logs (should be empty)
	resp = request(t, h, "GET", "/api/webhooks/"+hookID+"/logs", "")
	if resp.StatusCode != 200 {
		t.Fatalf("list logs: expected 200, got %d", resp.StatusCode)
	}
	var logs []any
	if err := json.NewDecoder(resp.Body).Decode(&logs); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if len(logs) != 0 {
		t.Fatalf("expected 0 logs, got %d", len(logs))
	}

	// Auth required for webhooks
	resp = request(t, srv.routes(), "GET", "/api/webhooks", "")
	if resp.StatusCode != 401 {
		t.Fatalf("expected 401, got %d", resp.StatusCode)
	}
}

func authHandler(srv *Server, token string) http.Handler {
	return authenticated(srv.routes(), token)
}

func TestWebhookDispatch(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authHandler(srv, token)

	// Start a test HTTP server to receive webhooks
	received := make(chan map[string]any, 1)
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var payload map[string]any
		if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
			t.Errorf("webhook server decode: %v", err)
		}
		r.Body.Close()
		received <- payload
		w.WriteHeader(http.StatusOK)
	}))
	defer ts.Close()

	// Create webhook pointing at test server
	resp := request(t, h, "POST", "/api/webhooks",
		fmt.Sprintf(`{"name":"delivery test","url":"%s","events":["record.create"]}`, ts.URL))
	if resp.StatusCode != 200 {
		t.Fatalf("create webhook: expected 200, got %d", resp.StatusCode)
	}

	// Create a collection
	resp = request(t, h, "POST", "/api/collections", `{"name":"wh_test"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("create collection: expected 200, got %d", resp.StatusCode)
	}

	// Create a record (triggers webhook)
	resp = request(t, h, "POST", "/api/collections/wh_test/records", `{"data":{"hello":"world"}}`)
	if resp.StatusCode != 200 {
		t.Fatalf("create record: expected 200, got %d", resp.StatusCode)
	}

	// Wait for webhook delivery
	select {
	case payload := <-received:
		event, ok := payload["event"].(string)
		if !ok || event != "record.create" {
			t.Fatalf("expected event 'record.create', got %v", event)
		}
		data, ok := payload["data"].(map[string]any)
		if !ok {
			t.Fatal("expected data object")
		}
		collection, ok := data["collection"].(string)
		if !ok || collection != "wh_test" {
			t.Fatalf("expected collection 'wh_test', got %v", collection)
		}
	case <-time.After(3 * time.Second):
		t.Fatal("timed out waiting for webhook delivery")
	}
}

func TestWebhookSignature(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authHandler(srv, token)

	got := make(chan struct{}, 1)
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		sig := r.Header.Get("X-Webhook-Signature-256")
		if sig != "" {
			got <- struct{}{}
		}
		w.WriteHeader(http.StatusOK)
	}))
	defer ts.Close()

	// Create webhook with secret
	resp := request(t, h, "POST", "/api/webhooks",
		fmt.Sprintf(`{"name":"sig test","url":"%s","events":["record.create"],"secret":"mysecret"}`, ts.URL))
	if resp.StatusCode != 200 {
		t.Fatalf("create webhook: expected 200, got %d", resp.StatusCode)
	}

	resp = request(t, h, "POST", "/api/collections", `{"name":"sig_test"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("create collection: expected 200, got %d", resp.StatusCode)
	}

	resp = request(t, h, "POST", "/api/collections/sig_test/records", `{"data":{"x":1}}`)
	if resp.StatusCode != 200 {
		t.Fatalf("create record: expected 200, got %d", resp.StatusCode)
	}

	select {
	case <-got:
		// signature received
	case <-time.After(3 * time.Second):
		t.Fatal("timed out waiting for signature header")
	}
}

func TestWebhookNoDeliveryOnInactive(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authHandler(srv, token)

	received := make(chan map[string]any, 1)
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var payload map[string]any
		json.NewDecoder(r.Body).Decode(&payload)
		r.Body.Close()
		received <- payload
	}))
	defer ts.Close()

	// Create inactive webhook
	resp := request(t, h, "POST", "/api/webhooks",
		fmt.Sprintf(`{"name":"inactive test","url":"%s","events":["record.create"]}`, ts.URL))
	if resp.StatusCode != 200 {
		t.Fatalf("create webhook: expected 200, got %d", resp.StatusCode)
	}
	result := readBody(t, resp)
	hookID := result["id"].(string)

	// Deactivate it
	resp = request(t, h, "PATCH", "/api/webhooks/"+hookID, `{"is_active":false}`)
	if resp.StatusCode != 200 {
		t.Fatalf("deactivate: expected 200, got %d", resp.StatusCode)
	}

	// Create collection + record
	resp = request(t, h, "POST", "/api/collections", `{"name":"inact_test"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("create collection: expected 200, got %d", resp.StatusCode)
	}
	resp = request(t, h, "POST", "/api/collections/inact_test/records", `{"data":{"x":1}}`)
	if resp.StatusCode != 200 {
		t.Fatalf("create record: expected 200, got %d", resp.StatusCode)
	}

	// Should NOT receive webhook
	select {
	case <-received:
		t.Fatal("received webhook on inactive webhook")
	case <-time.After(500 * time.Millisecond):
		// expected
	}
}

func TestSecretsCRUD(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	// Create
	resp := request(t, h, "POST", "/api/secrets", `{"name":"db_pass","value":"s3cret!","scope":"db"}`)
	if resp.StatusCode != 201 {
		t.Fatalf("create: expected 201, got %d", resp.StatusCode)
	}
	created := readBody(t, resp)
	id := created["id"].(string)
	if created["name"].(string) != "db_pass" {
		t.Fatalf("expected name db_pass, got %v", created["name"])
	}
	if created["scope"].(string) != "db" {
		t.Fatalf("expected scope db, got %v", created["scope"])
	}

	// List (value should NOT be returned in list)
	resp = request(t, h, "GET", "/api/secrets", "")
	if resp.StatusCode != 200 {
		t.Fatalf("list: expected 200, got %d", resp.StatusCode)
	}
	var list []map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&list); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if len(list) != 1 {
		t.Fatalf("expected 1 secret, got %d", len(list))
	}
	if _, ok := list[0]["value"]; ok {
		t.Fatal("value should not be in list response")
	}

	// Get (decrypted value)
	resp = request(t, h, "GET", "/api/secrets/"+id, "")
	if resp.StatusCode != 200 {
		t.Fatalf("get: expected 200, got %d", resp.StatusCode)
	}
	item := readBody(t, resp)
	if item["value"].(string) != "s3cret!" {
		t.Fatalf("expected value s3cret!, got %v", item["value"])
	}

	// Update
	resp = request(t, h, "PATCH", "/api/secrets/"+id, `{"name":"db_pass_v2","value":"newpass","scope":"prod"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("update: expected 200, got %d", resp.StatusCode)
	}
	resp = request(t, h, "GET", "/api/secrets/"+id, "")
	item = readBody(t, resp)
	if item["value"].(string) != "newpass" {
		t.Fatalf("expected value newpass, got %v", item["value"])
	}

	// Delete
	resp = request(t, h, "DELETE", "/api/secrets/"+id, "")
	if resp.StatusCode != 204 {
		t.Fatalf("delete: expected 204, got %d", resp.StatusCode)
	}
	resp = request(t, h, "GET", "/api/secrets/"+id, "")
	if resp.StatusCode != 404 {
		t.Fatalf("get after delete: expected 404, got %d", resp.StatusCode)
	}
}

func TestSecretsValidation(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	// Missing name
	resp := request(t, h, "POST", "/api/secrets", `{"value":"x"}`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400 for missing name, got %d", resp.StatusCode)
	}

	// Not found
	resp = request(t, h, "GET", "/api/secrets/nonexistent", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}

	// Update not found
	resp = request(t, h, "PATCH", "/api/secrets/nonexistent", `{"name":"x","value":"y"}`)
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404 on update not found, got %d", resp.StatusCode)
	}
}

// --- CronJob Tests ---

func TestCronJobsCRUD(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	// Create
	resp := request(t, h, "POST", "/api/cronjobs", `{"name":"ping google","schedule":"*/5 * * * *","command":"https://google.com","method":"GET"}`)
	if resp.StatusCode != 201 {
		t.Fatalf("create: expected 201, got %d", resp.StatusCode)
	}
	created := readBody(t, resp)
	id := created["id"].(string)
	if created["name"].(string) != "ping google" {
		t.Fatalf("expected name 'ping google', got %v", created["name"])
	}
	if created["schedule"].(string) != "*/5 * * * *" {
		t.Fatalf("expected schedule '*/5 * * * *', got %v", created["schedule"])
	}

	// List
	resp = request(t, h, "GET", "/api/cronjobs", "")
	if resp.StatusCode != 200 {
		t.Fatalf("list: expected 200, got %d", resp.StatusCode)
	}
	var list []map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&list); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if len(list) != 1 {
		t.Fatalf("expected 1 cronjob, got %d", len(list))
	}

	// Get
	resp = request(t, h, "GET", "/api/cronjobs/"+id, "")
	if resp.StatusCode != 200 {
		t.Fatalf("get: expected 200, got %d", resp.StatusCode)
	}
	item := readBody(t, resp)
	if item["name"].(string) != "ping google" {
		t.Fatalf("expected name 'ping google', got %v", item["name"])
	}

	// Update
	resp = request(t, h, "PATCH", "/api/cronjobs/"+id, `{"name":"ping google v2","schedule":"*/10 * * * *","is_active":false}`)
	if resp.StatusCode != 200 {
		t.Fatalf("update: expected 200, got %d", resp.StatusCode)
	}
	resp = request(t, h, "GET", "/api/cronjobs/"+id, "")
	item = readBody(t, resp)
	if item["name"].(string) != "ping google v2" {
		t.Fatalf("expected name 'ping google v2', got %v", item["name"])
	}
	if item["is_active"] != false {
		t.Fatal("expected is_active false")
	}

	// Delete
	resp = request(t, h, "DELETE", "/api/cronjobs/"+id, "")
	if resp.StatusCode != 204 {
		t.Fatalf("delete: expected 204, got %d", resp.StatusCode)
	}
	resp = request(t, h, "GET", "/api/cronjobs/"+id, "")
	if resp.StatusCode != 404 {
		t.Fatalf("get after delete: expected 404, got %d", resp.StatusCode)
	}
}

func TestCronJobsValidation(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	// Missing name
	resp := request(t, h, "POST", "/api/cronjobs", `{"schedule":"*/5 * * * *","command":"https://example.com"}`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400 for missing name, got %d", resp.StatusCode)
	}

	// Missing schedule
	resp = request(t, h, "POST", "/api/cronjobs", `{"name":"test","command":"https://example.com"}`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400 for missing schedule, got %d", resp.StatusCode)
	}

	// Missing command
	resp = request(t, h, "POST", "/api/cronjobs", `{"name":"test","schedule":"*/5 * * * *"}`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400 for missing command, got %d", resp.StatusCode)
	}

	// Invalid schedule
	resp = request(t, h, "POST", "/api/cronjobs", `{"name":"test","schedule":"not-a-cron","command":"https://example.com"}`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400 for invalid schedule, got %d", resp.StatusCode)
	}

	// Not found
	resp = request(t, h, "GET", "/api/cronjobs/nonexistent", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

func TestCronJobsAuthRequired(t *testing.T) {
	srv := newTestServer(t)
	h := srv.routes()

	resp := request(t, h, "GET", "/api/cronjobs", "")
	if resp.StatusCode != 401 {
		t.Fatalf("expected 401, got %d", resp.StatusCode)
	}
}

func TestCronJobsRunAndLogs(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	// Create cronjob pointing at a test server
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("pong"))
	}))
	defer ts.Close()

	resp := request(t, h, "POST", "/api/cronjobs", `{"name":"test ping","schedule":"*/5 * * * *","command":"`+ts.URL+`","method":"GET"}`)
	if resp.StatusCode != 201 {
		t.Fatalf("create: expected 201, got %d", resp.StatusCode)
	}
	created := readBody(t, resp)
	id := created["id"].(string)

	// Manual run
	resp = request(t, h, "POST", "/api/cronjobs/"+id+"/run", "")
	if resp.StatusCode != 200 {
		t.Fatalf("run: expected 200, got %d", resp.StatusCode)
	}

	// Wait for execution
	time.Sleep(500 * time.Millisecond)

	// Get logs
	resp = request(t, h, "GET", "/api/cronjobs/"+id+"/logs", "")
	if resp.StatusCode != 200 {
		t.Fatalf("logs: expected 200, got %d", resp.StatusCode)
	}
	var logs []map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&logs); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if len(logs) == 0 {
		t.Fatal("expected at least 1 log entry")
	}
	if logs[0]["status"] != "success" {
		t.Fatalf("expected status 'success', got %v", logs[0]["status"])
	}
}

func TestSecretsAuthRequired(t *testing.T) {
	srv := newTestServer(t)
	h := srv.routes()

	// Without auth token, secrets endpoints should return 401
	resp := request(t, h, "GET", "/api/secrets", "")
	if resp.StatusCode != 401 {
		t.Fatalf("expected 401, got %d", resp.StatusCode)
	}
}

// --- WebSocket Tests ---

func TestWebSocketCRUD(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	// List initially empty
	resp := request(t, h, "GET", "/api/websockets", "")
	if resp.StatusCode != 200 {
		t.Fatalf("list: expected 200, got %d", resp.StatusCode)
	}
	var list []any
	if err := json.NewDecoder(resp.Body).Decode(&list); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()

	// List all messages
	resp = request(t, h, "GET", "/api/websockets/messages", "")
	if resp.StatusCode != 200 {
		t.Fatalf("messages: expected 200, got %d", resp.StatusCode)
	}
	var msgs []any
	if err := json.NewDecoder(resp.Body).Decode(&msgs); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
}

func TestWebSocketBroadcast(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	// Broadcast a message
	resp := request(t, h, "POST", "/api/websockets/broadcast", `{"content":"hello all"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("broadcast: expected 200, got %d", resp.StatusCode)
	}
	body := readBody(t, resp)
	if body["status"] != "broadcasted" {
		t.Fatalf("expected status 'broadcasted', got %v", body["status"])
	}

	// Verify message appears in all messages
	resp = request(t, h, "GET", "/api/websockets/messages", "")
	if resp.StatusCode != 200 {
		t.Fatalf("messages: expected 200, got %d", resp.StatusCode)
	}
	var msgs []map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&msgs); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if len(msgs) == 0 {
		t.Fatal("expected at least 1 message")
	}
	if msgs[0]["direction"] != "sent" {
		t.Fatalf("expected direction 'sent', got %v", msgs[0]["direction"])
	}
}

func TestWebSocketNotFound(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "GET", "/api/websockets/nonexistent", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}

	resp = request(t, h, "DELETE", "/api/websockets/nonexistent", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

func TestWebSocketAuthRequired(t *testing.T) {
	srv := newTestServer(t)
	h := srv.routes()

	resp := request(t, h, "GET", "/api/websockets", "")
	if resp.StatusCode != 401 {
		t.Fatalf("expected 401, got %d", resp.StatusCode)
	}
}

// --- Cache Tests ---

func TestCacheSetGetDelete(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	// Set a key
	resp := request(t, h, "POST", "/api/cache", `{"key":"hello","value":"world"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("set: expected 200, got %d", resp.StatusCode)
	}
	entry := readBody(t, resp)
	if entry["key"] != "hello" || entry["value"] != "world" {
		t.Fatalf("unexpected entry: %v", entry)
	}

	// Get the key
	resp = request(t, h, "GET", "/api/cache/hello", "")
	if resp.StatusCode != 200 {
		t.Fatalf("get: expected 200, got %d", resp.StatusCode)
	}
	entry = readBody(t, resp)
	if entry["value"] != "world" {
		t.Fatalf("expected 'world', got %v", entry["value"])
	}

	// Delete the key
	resp = request(t, h, "DELETE", "/api/cache/hello", "")
	if resp.StatusCode != 204 {
		t.Fatalf("delete: expected 204, got %d", resp.StatusCode)
	}

	// Get deleted key
	resp = request(t, h, "GET", "/api/cache/hello", "")
	if resp.StatusCode != 404 {
		t.Fatalf("get after delete: expected 404, got %d", resp.StatusCode)
	}
}

func TestCacheList(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/cache", `{"key":"a","value":"1"}`)
	request(t, h, "POST", "/api/cache", `{"key":"b","value":"2"}`)

	resp := request(t, h, "GET", "/api/cache", "")
	if resp.StatusCode != 200 {
		t.Fatalf("list: expected 200, got %d", resp.StatusCode)
	}
	var list []map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&list); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if len(list) != 2 {
		t.Fatalf("expected 2 entries, got %d", len(list))
	}
}

func TestCacheTTL(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	// Set with 1-second TTL
	resp := request(t, h, "POST", "/api/cache", `{"key":"temp","value":"data","ttl":1}`)
	if resp.StatusCode != 200 {
		t.Fatalf("set ttl: expected 200, got %d", resp.StatusCode)
	}

	// Should exist immediately
	resp = request(t, h, "GET", "/api/cache/temp", "")
	if resp.StatusCode != 200 {
		t.Fatalf("get before ttl: expected 200, got %d", resp.StatusCode)
	}

	// Wait for expiry
	time.Sleep(1100 * time.Millisecond)

	// Should be gone
	resp = request(t, h, "GET", "/api/cache/temp", "")
	if resp.StatusCode != 404 {
		t.Fatalf("get after ttl: expected 404, got %d", resp.StatusCode)
	}
}

func TestCacheOverwrite(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/cache", `{"key":"k","value":"v1"}`)
	request(t, h, "POST", "/api/cache", `{"key":"k","value":"v2"}`)

	resp := request(t, h, "GET", "/api/cache/k", "")
	entry := readBody(t, resp)
	if entry["value"] != "v2" {
		t.Fatalf("expected 'v2', got %v", entry["value"])
	}
}

func TestCacheFlush(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/cache", `{"key":"x","value":"1"}`)
	request(t, h, "POST", "/api/cache", `{"key":"y","value":"2"}`)

	resp := request(t, h, "DELETE", "/api/cache", "")
	if resp.StatusCode != 200 {
		t.Fatalf("flush: expected 200, got %d", resp.StatusCode)
	}

	resp = request(t, h, "GET", "/api/cache", "")
	var list []any
	if err := json.NewDecoder(resp.Body).Decode(&list); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if len(list) != 0 {
		t.Fatalf("expected 0 entries after flush, got %d", len(list))
	}
}

func TestCacheValidation(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	// Missing key
	resp := request(t, h, "POST", "/api/cache", `{"value":"v"}`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400 for missing key, got %d", resp.StatusCode)
	}

	// Missing value
	resp = request(t, h, "POST", "/api/cache", `{"key":"k"}`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400 for missing value, got %d", resp.StatusCode)
	}

	// Not found
	resp = request(t, h, "GET", "/api/cache/nonexistent", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

func TestCacheAuthRequired(t *testing.T) {
	srv := newTestServer(t)
	h := srv.routes()

	resp := request(t, h, "GET", "/api/cache", "")
	if resp.StatusCode != 401 {
		t.Fatalf("expected 401, got %d", resp.StatusCode)
	}
}

// --- Notification Tests ---

func TestNotificationCreate(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/notifications", `{"title":"Test Notice","body":"Hello","type":"info"}`)
	if resp.StatusCode != 201 {
		t.Fatalf("expected 201, got %d", resp.StatusCode)
	}
	data := readBody(t, resp)
	if data["title"] != "Test Notice" {
		t.Fatalf("expected title Test Notice, got %v", data["title"])
	}
	if data["type"] != "info" {
		t.Fatalf("expected type info, got %v", data["type"])
	}
}

func TestNotificationList(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/notifications", `{"title":"N1","body":"B1","type":"info"}`)
	request(t, h, "POST", "/api/notifications", `{"title":"N2","body":"B2","type":"warning"}`)

	resp := request(t, h, "GET", "/api/notifications", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
	var list []map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&list); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if len(list) < 2 {
		t.Fatalf("expected at least 2 notifications, got %d", len(list))
	}
}

func TestNotificationMarkRead(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/notifications", `{"title":"Read Me","body":"Body","type":"info"}`)
	data := readBody(t, resp)
	id := data["id"].(string)

	resp = request(t, h, "PATCH", "/api/notifications/"+id, "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
	data = readBody(t, resp)
	if data["is_read"] != true {
		t.Fatalf("expected is_read true, got %v", data["is_read"])
	}
}

func TestNotificationDelete(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/notifications", `{"title":"Delete Me","body":"Body","type":"error"}`)
	data := readBody(t, resp)
	id := data["id"].(string)

	resp = request(t, h, "DELETE", "/api/notifications/"+id, "")
	if resp.StatusCode != 204 {
		t.Fatalf("expected 204, got %d", resp.StatusCode)
	}

	resp = request(t, h, "GET", "/api/notifications/"+id, "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404 after delete, got %d", resp.StatusCode)
	}
}

func TestNotificationValidation(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	// Missing title
	resp := request(t, h, "POST", "/api/notifications", `{"body":"B","type":"info"}`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400 for missing title, got %d", resp.StatusCode)
	}

	// Invalid type
	resp = request(t, h, "POST", "/api/notifications", `{"title":"T","body":"B","type":"invalid"}`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400 for invalid type, got %d", resp.StatusCode)
	}
}

func TestNotificationClear(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/notifications", `{"title":"N1","body":"B1","type":"info"}`)

	resp := request(t, h, "DELETE", "/api/notifications", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}

	resp = request(t, h, "GET", "/api/notifications", "")
	var list []map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&list); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if len(list) != 0 {
		t.Fatalf("expected 0 notifications after clear, got %d", len(list))
	}
}

func TestNotificationAuthRequired(t *testing.T) {
	srv := newTestServer(t)
	h := srv.routes()

	resp := request(t, h, "GET", "/api/notifications", "")
	if resp.StatusCode != 401 {
		t.Fatalf("expected 401, got %d", resp.StatusCode)
	}
}

func TestLogCreate(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/logs", `{"level":"info","message":"test log","meta":"{\"key\":\"val\"}"}`)
	if resp.StatusCode != 201 {
		t.Fatalf("expected 201, got %d: %s", resp.StatusCode, readBody(t, resp))
	}
	var log LogEntry
	if err := json.NewDecoder(resp.Body).Decode(&log); err != nil {
		t.Fatal(err)
	}
	if log.Message != "test log" {
		t.Fatalf("expected 'test log', got %q", log.Message)
	}
	if log.Level != "info" {
		t.Fatalf("expected 'info', got %q", log.Level)
	}
	if log.ID == "" {
		t.Fatal("expected non-empty id")
	}
}

func TestLogList(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	for i := 0; i < 3; i++ {
		body := fmt.Sprintf(`{"level":"info","message":"log %d"}`, i)
		resp := request(t, h, "POST", "/api/logs", body)
		if resp.StatusCode != 201 {
			t.Fatalf("create failed: %d", resp.StatusCode)
		}
	}

	resp := request(t, h, "GET", "/api/logs", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
	var logs []LogEntry
	if err := json.NewDecoder(resp.Body).Decode(&logs); err != nil {
		t.Fatal(err)
	}
	if len(logs) != 3 {
		t.Fatalf("expected 3 logs, got %d", len(logs))
	}
}

func TestLogValidation(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/logs", `{"level":"info","message":""}`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400 for empty message, got %d", resp.StatusCode)
	}

	resp = request(t, h, "POST", "/api/logs", `{"level":"invalid","message":"test"}`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400 for invalid level, got %d", resp.StatusCode)
	}
}

func TestLogClear(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/logs", `{"level":"info","message":"test"}`)
	if resp.StatusCode != 201 {
		t.Fatalf("create failed: %d", resp.StatusCode)
	}

	resp = request(t, h, "DELETE", "/api/logs", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}

	resp = request(t, h, "GET", "/api/logs", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
	var logs []LogEntry
	if err := json.NewDecoder(resp.Body).Decode(&logs); err != nil {
		t.Fatal(err)
	}
	if len(logs) != 0 {
		t.Fatalf("expected 0 logs after clear, got %d", len(logs))
	}
}

func TestLogAuthRequired(t *testing.T) {
	srv := newTestServer(t)
	h := srv.routes()

	resp := request(t, h, "GET", "/api/logs", "")
	if resp.StatusCode != 401 {
		t.Fatalf("expected 401, got %d", resp.StatusCode)
	}
	resp = request(t, h, "POST", "/api/logs", `{"message":"x","level":"info"}`)
	if resp.StatusCode != 401 {
		t.Fatalf("expected 401, got %d", resp.StatusCode)
	}
}

func TestPubSubTopicCRUD(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/pubsub/topics", `{"name":"mytopic"}`)
	if resp.StatusCode != 201 {
		t.Fatalf("expected 201, got %d", resp.StatusCode)
	}
	data := readBody(t, resp)
	if data["name"] != "mytopic" {
		t.Fatalf("expected mytopic, got %v", data["name"])
	}

	resp = request(t, h, "GET", "/api/pubsub/topics", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
	var topics []map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&topics); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if len(topics) != 1 {
		t.Fatalf("expected 1 topic, got %d", len(topics))
	}

	resp = request(t, h, "GET", "/api/pubsub/topics/mytopic", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}

	resp = request(t, h, "DELETE", "/api/pubsub/topics/mytopic", "")
	if resp.StatusCode != 204 {
		t.Fatalf("expected 204, got %d", resp.StatusCode)
	}

	resp = request(t, h, "GET", "/api/pubsub/topics/mytopic", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

func TestPubSubTopicDuplicate(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/pubsub/topics", `{"name":"dup"}`)
	resp := request(t, h, "POST", "/api/pubsub/topics", `{"name":"dup"}`)
	if resp.StatusCode != 409 {
		t.Fatalf("expected 409, got %d", resp.StatusCode)
	}
}

func TestPubSubTopicMissingName(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/pubsub/topics", `{}`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400, got %d", resp.StatusCode)
	}
}

func TestPubSubTopicAuthRequired(t *testing.T) {
	srv := newTestServer(t)
	h := srv.routes()

	resp := request(t, h, "GET", "/api/pubsub/topics", "")
	if resp.StatusCode != 401 {
		t.Fatalf("expected 401, got %d", resp.StatusCode)
	}
	resp = request(t, h, "POST", "/api/pubsub/topics", `{"name":"x"}`)
	if resp.StatusCode != 401 {
		t.Fatalf("expected 401, got %d", resp.StatusCode)
	}
}

func TestPubSubMessagePublishList(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/pubsub/topics", `{"name":"chat"}`)

	resp := request(t, h, "POST", "/api/pubsub/topics/chat/messages", `{"body":"hello world"}`)
	if resp.StatusCode != 201 {
		t.Fatalf("expected 201, got %d", resp.StatusCode)
	}
	msg := readBody(t, resp)
	if msg["body"] != "hello world" {
		t.Fatalf("expected 'hello world', got %v", msg["body"])
	}
	if msg["topic_id"] == "" {
		t.Fatal("expected topic_id")
	}

	resp = request(t, h, "GET", "/api/pubsub/topics/chat/messages", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
	var msgs []map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&msgs); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if len(msgs) != 1 {
		t.Fatalf("expected 1 message, got %d", len(msgs))
	}
}

func TestPubSubMessageToUnknownTopic(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/pubsub/topics/nonexistent/messages", `{"body":"x"}`)
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

func TestPubSubMessageMissingBody(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/pubsub/topics", `{"name":"t"}`)
	resp := request(t, h, "POST", "/api/pubsub/topics/t/messages", `{}`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400, got %d", resp.StatusCode)
	}
}

func TestPubSubDeleteCascade(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/pubsub/topics", `{"name":"tmp"}`)
	request(t, h, "POST", "/api/pubsub/topics/tmp/messages", `{"body":"m1"}`)
	request(t, h, "POST", "/api/pubsub/topics/tmp/messages", `{"body":"m2"}`)
	request(t, h, "DELETE", "/api/pubsub/topics/tmp", "")

	resp := request(t, h, "GET", "/api/pubsub/topics/tmp/messages", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404 after delete, got %d", resp.StatusCode)
	}
}

// --- Cache Stats ---

func TestCacheStats(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "GET", "/api/cache/stats", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
	stats := readBody(t, resp)
	if _, ok := stats["total_entries"]; !ok {
		t.Fatal("expected total_entries in stats")
	}
	if _, ok := stats["expired_entries"]; !ok {
		t.Fatal("expected expired_entries in stats")
	}

	request(t, h, "POST", "/api/cache", `{"key":"a","value":"1"}`)
	resp = request(t, h, "GET", "/api/cache/stats", "")
	stats = readBody(t, resp)
	total, _ := stats["total_entries"].(float64)
	if total != 1 {
		t.Fatalf("expected 1 total_entry, got %v", total)
	}
}

func TestCacheStatsAuthRequired(t *testing.T) {
	srv := newTestServer(t)
	resp := request(t, srv.routes(), "GET", "/api/cache/stats", "")
	if resp.StatusCode != 401 {
		t.Fatalf("expected 401, got %d", resp.StatusCode)
	}
}

// --- Notification Get ---

func TestNotificationGet(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/notifications", `{"title":"Get Me","body":"Find me","type":"info"}`)
	created := readBody(t, resp)
	id := created["id"].(string)

	resp = request(t, h, "GET", "/api/notifications/"+id, "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
	item := readBody(t, resp)
	if item["title"] != "Get Me" {
		t.Fatalf("expected title 'Get Me', got %v", item["title"])
	}
	if item["body"] != "Find me" {
		t.Fatalf("expected body 'Find me', got %v", item["body"])
	}
}

func TestNotificationGetNotFound(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "GET", "/api/notifications/nonexistent", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

func TestNotificationAuthRequiredForCreate(t *testing.T) {
	srv := newTestServer(t)
	resp := request(t, srv.routes(), "POST", "/api/notifications", `{"title":"X","body":"Y","type":"info"}`)
	if resp.StatusCode != 401 {
		t.Fatalf("expected 401, got %d", resp.StatusCode)
	}
}

// --- WebSocket Send To Nonexistent Client ---

func TestWebSocketSendNotFound(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/websockets/nonexistent/send", `{"content":"hello"}`)
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

func TestWebSocketMessagesList(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	// List messages for nonexistent client
	resp := request(t, h, "GET", "/api/websockets/nonexistent/messages", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
	var msgs []any
	if err := json.NewDecoder(resp.Body).Decode(&msgs); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
}

// --- Collection Validation Edge Cases ---

func TestCollectionCreateMissingName(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/collections", `{}`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400, got %d", resp.StatusCode)
	}
}

func TestCollectionCreateDuplicate(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/collections", `{"name":"dup"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("first create: expected 200, got %d", resp.StatusCode)
	}
	resp = request(t, h, "POST", "/api/collections", `{"name":"dup"}`)
	if resp.StatusCode != 409 {
		t.Fatalf("duplicate: expected 409, got %d", resp.StatusCode)
	}
}

// --- Bucket Validation Edge Cases ---

func TestBucketCreateMissingName(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/buckets", `{}`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400, got %d", resp.StatusCode)
	}
}

// --- Record Conflict ---

func TestRecordCreateDuplicateID(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/collections", `{"name":"items"}`)

	// Create record with explicit ID
	resp := request(t, h, "POST", "/api/collections/items/records", `{"id":"myid","data":{"x":1}}`)
	if resp.StatusCode != 200 {
		t.Fatalf("first create: expected 200, got %d", resp.StatusCode)
	}

	// Duplicate ID should fail
	resp = request(t, h, "POST", "/api/collections/items/records", `{"id":"myid","data":{"x":2}}`)
	if resp.StatusCode != 409 {
		t.Fatalf("duplicate id: expected 409, got %d", resp.StatusCode)
	}
}

// --- Webhook Update Edge Cases ---

func TestWebhookUpdateNotFound(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authHandler(srv, token)

	resp := request(t, h, "PATCH", "/api/webhooks/nonexistent", `{"name":"nope"}`)
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

func TestWebhookDeleteNotFound(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authHandler(srv, token)

	resp := request(t, h, "DELETE", "/api/webhooks/nonexistent", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

// --- PubSub Auth Required For Topics ---

func TestPubSubTopicNotFound(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "GET", "/api/pubsub/topics/nonexistent", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

// --- Record Update Edge Cases ---

func TestRecordUpdateNotFound(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/collections", `{"name":"items"}`)

	// Update nonexistent record
	resp := request(t, h, "PATCH", "/api/collections/items/records/nonexistent", `{"data":{"x":1}}`)
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

func TestRecordUpdateMissingData(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/collections", `{"name":"items"}`)
	resp := request(t, h, "POST", "/api/collections/items/records", `{"data":{"x":1}}`)
	result := readBody(t, resp)
	id := result["id"].(string)

	// Update with no data
	resp = request(t, h, "PATCH", "/api/collections/items/records/"+id, `{}`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400 for missing data, got %d", resp.StatusCode)
	}
}

// --- Import / Export Tests ---

func TestExport(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/collections", `{"name":"export_test"}`)
	request(t, h, "POST", "/api/collections/export_test/records", `{"id":"r1","data":{"x":1}}`)
	request(t, h, "POST", "/api/buckets", `{"name":"export_bucket"}`)

	resp := request(t, h, "GET", "/api/export", "")
	if resp.StatusCode != 200 {
		t.Fatalf("export: expected 200, got %d", resp.StatusCode)
	}
	var result map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if _, ok := result["collections"]; !ok {
		t.Fatal("expected collections in export")
	}
	if _, ok := result["records"]; !ok {
		t.Fatal("expected records in export")
	}
}

func TestImportConflict(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/collections", `{"name":"import_test"}`)

	body := `{"collections":[{"name":"import_test"}],"records":{},"buckets":[],"files":[]}`
	resp := request(t, h, "POST", "/api/import", body)
	if resp.StatusCode != 409 {
		t.Fatalf("import conflict: expected 409, got %d", resp.StatusCode)
	}
}

func TestImportSkipExisting(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/collections", `{"name":"skip_test"}`)

	body := `{"collections":[{"name":"skip_test"}],"records":{},"buckets":[],"files":[]}`
	resp := request(t, h, "POST", "/api/import?skip_existing=true", body)
	if resp.StatusCode != 200 {
		t.Fatalf("import skip: expected 200, got %d", resp.StatusCode)
	}
}

func TestImportNewData(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	body := `{"collections":[{"name":"new_collection"}],"records":{"new_collection":[{"id":"r1","data":{"hello":"world"}}]},"buckets":[{"name":"new_bucket"}],"files":[]}`
	resp := request(t, h, "POST", "/api/import", body)
	if resp.StatusCode != 200 {
		t.Fatalf("import new: expected 200, got %d", resp.StatusCode)
	}

	resp = request(t, h, "GET", "/api/collections/new_collection", "")
	if resp.StatusCode != 200 {
		t.Fatalf("verify collection: expected 200, got %d", resp.StatusCode)
	}
}

func TestImportInvalidJSON(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/import", `not json`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400 for invalid json, got %d", resp.StatusCode)
	}
}

// --- Permissions Tests ---

func TestPermissionsCRUD(t *testing.T) {
	srv := newTestServer(t)

	// Register then login to get token and user ID
	resp := request(t, srv.routes(), "POST", "/api/auth/register", `{"email":"admin@perm.com","password":"admin123"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("register: expected 200, got %d", resp.StatusCode)
	}
	resp = request(t, srv.routes(), "POST", "/api/auth/login", `{"email":"admin@perm.com","password":"admin123"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("login: expected 200, got %d", resp.StatusCode)
	}
	loginResult := readBody(t, resp)
	token := loginResult["token"].(string)
	userObj := loginResult["user"].(map[string]any)
	adminUserID := userObj["id"].(string)
	h := authenticated(srv.routes(), token)

	// Create admin permission for self (works because _permissions table is empty)
	resp = request(t, h, "POST", "/api/permissions", fmt.Sprintf(`{"user_id":"%s","collection":"*","role":"admin"}`, adminUserID))
	if resp.StatusCode != 200 {
		t.Fatalf("create admin perm: expected 200, got %d", resp.StatusCode)
	}

	// Now user has admin role, list/create/delete all work
	resp = request(t, h, "GET", "/api/permissions", "")
	if resp.StatusCode != 200 {
		t.Fatalf("list: expected 200, got %d", resp.StatusCode)
	}
	var list []any
	if err := json.NewDecoder(resp.Body).Decode(&list); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()

	resp = request(t, h, "POST", "/api/permissions", `{"user_id":"user1","collection":"posts","role":"editor"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("create: expected 200, got %d", resp.StatusCode)
	}
	created := readBody(t, resp)
	permID := created["id"].(string)
	if created["user_id"] != "user1" {
		t.Fatalf("expected user1, got %v", created["user_id"])
	}
	if created["role"] != "editor" {
		t.Fatalf("expected editor, got %v", created["role"])
	}

	resp = request(t, h, "POST", "/api/permissions", `{"user_id":"user2","collection":"other","role":"superadmin"}`)
	if resp.StatusCode != 400 {
		t.Fatalf("invalid role: expected 400, got %d", resp.StatusCode)
	}

	resp = request(t, h, "DELETE", "/api/permissions/"+permID, "")
	if resp.StatusCode != 204 {
		t.Fatalf("delete: expected 204, got %d", resp.StatusCode)
	}

	resp = request(t, h, "DELETE", "/api/permissions/nonexistent", "")
	if resp.StatusCode != 404 {
		t.Fatalf("delete not found: expected 404, got %d", resp.StatusCode)
	}
}

func TestPermissionsAuthRequired(t *testing.T) {
	srv := newTestServer(t)
	h := srv.routes()

	resp := request(t, h, "GET", "/api/permissions", "")
	if resp.StatusCode != 401 {
		t.Fatalf("expected 401, got %d", resp.StatusCode)
	}
}

// --- File Thumbnail Tests ---

func TestFileThumbnailImage(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/buckets", `{"name":"images"}`)

	// Create a minimal 1x1 PNG
	pngData := []byte{
		0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A,
		0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52,
		0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
		0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53,
		0xDE, 0x00, 0x00, 0x00, 0x0C, 0x49, 0x44, 0x41,
		0x54, 0x08, 0xD7, 0x63, 0x60, 0x60, 0x00, 0x00,
		0x00, 0x02, 0x00, 0x01, 0xE5, 0x27, 0xDE, 0xFC,
		0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44,
		0xAE, 0x42, 0x60, 0x82,
	}

	var buf bytes.Buffer
	w := multipart.NewWriter(&buf)
	fw, err := w.CreateFormFile("file", "test.png")
	if err != nil {
		t.Fatal(err)
	}
	fw.Write(pngData)
	w.Close()

	req := httptest.NewRequest("POST", "/api/buckets/images/files", &buf)
	req.Header.Set("Content-Type", w.FormDataContentType())
	resp := httptest.NewRecorder()
	h.ServeHTTP(resp, req)
	result := resp.Result()
	if result.StatusCode != 200 {
		t.Fatalf("upload png: expected 200, got %d", result.StatusCode)
	}
	uploaded := readBody(t, result)
	fileID := uploaded["id"].(string)

	// Thumbnail should produce a resized PNG
	resp2 := request(t, h, "GET", "/api/buckets/images/files/"+fileID+"/thumb?width=50&height=50", "")
	if resp2.StatusCode != 200 {
		t.Fatalf("thumbnail image: expected 200, got %d", resp2.StatusCode)
	}
	thumbData, _ := io.ReadAll(resp2.Body)
	resp2.Body.Close()
	if len(thumbData) == 0 {
		t.Fatal("expected non-empty thumbnail")
	}
}

func TestFileThumbnailNonImage(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/buckets", `{"name":"docs"}`)
	resp := uploadFile(t, h, "docs", "test.txt", "hello thumbnail")
	if resp.StatusCode != 200 {
		t.Fatalf("upload: expected 200, got %d", resp.StatusCode)
	}
	result := readBody(t, resp)
	fileID := result["id"].(string)

	resp = request(t, h, "GET", "/api/buckets/docs/files/"+fileID+"/thumb", "")
	if resp.StatusCode != 200 {
		t.Fatalf("thumbnail: expected 200, got %d", resp.StatusCode)
	}
	body, _ := io.ReadAll(resp.Body)
	resp.Body.Close()
	if string(body) != "hello thumbnail" {
		t.Fatalf("expected file content, got %s", string(body))
	}

	resp = request(t, h, "GET", "/api/buckets/docs/files/nonexistent/thumb", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}

	resp = request(t, h, "GET", "/api/buckets/other/files/"+fileID+"/thumb", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404 for wrong bucket, got %d", resp.StatusCode)
	}
}

// --- Collection Update Tests ---

func TestCollectionUpdate(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/collections", `{"name":"updatable","schema":"{\"title\":\"string\"}"}`)

	resp := request(t, h, "PATCH", "/api/collections/updatable", `{"schema":"{\"title\":\"string\",\"views\":\"integer\"}"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("update collection schema: expected 200, got %d", resp.StatusCode)
	}

	resp = request(t, h, "GET", "/api/collections/updatable", "")
	result := readBody(t, resp)
	schema, ok := result["schema"].(string)
	if !ok {
		t.Fatal("expected schema in response")
	}
	if schema != `{"title":"string","views":"integer"}` {
		t.Fatalf("unexpected schema: %s", schema)
	}

	resp = request(t, h, "PATCH", "/api/collections/nonexistent", `{"schema":"{}"}`)
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

// --- Record Create With Schema Validation ---

func TestRecordCreateWithValidation(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/collections", `{"name":"validated","schema":"{\"name\":\"string\",\"age\":\"integer\"}"}`)

	resp := request(t, h, "POST", "/api/collections/validated/records", `{"data":{"name":"Alice","age":30}}`)
	if resp.StatusCode != 200 {
		t.Fatalf("valid record: expected 200, got %d", resp.StatusCode)
	}

	resp = request(t, h, "POST", "/api/collections/validated/records", `{"data":{"name":123,"age":"not-number"}}`)
	if resp.StatusCode != 400 {
		t.Fatalf("invalid record: expected 400, got %d", resp.StatusCode)
	}
}

// --- Record List With Filter/Sort/Search ---

func TestRecordListFilterSortSearch(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/collections", `{"name":"filterable"}`)

	for i := 0; i < 5; i++ {
		body := fmt.Sprintf(`{"data":{"val":%d,"label":"item-%d"}}`, i, i)
		request(t, h, "POST", "/api/collections/filterable/records", body)
	}

	resp := request(t, h, "GET", "/api/collections/filterable/records?sort=-val", "")
	if resp.StatusCode != 200 {
		t.Fatalf("list sorted: expected 200, got %d", resp.StatusCode)
	}

	resp = request(t, h, "GET", "/api/collections/filterable/records?search=item-1", "")
	if resp.StatusCode != 200 {
		t.Fatalf("list search: expected 200, got %d", resp.StatusCode)
	}
	var page map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&page); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	total, _ := page["total"].(float64)
	if total != 1 {
		t.Fatalf("expected 1 result for search, got %v", total)
	}
}

// --- Backup Test ---

func TestBackupEndpoint(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "GET", "/api/backup", "")
	if resp.StatusCode != 200 {
		t.Fatalf("backup: expected 200, got %d", resp.StatusCode)
	}
	body, _ := io.ReadAll(resp.Body)
	resp.Body.Close()
	if len(body) == 0 {
		t.Fatal("expected non-empty backup")
	}
	if resp.Header.Get("Content-Type") != "application/octet-stream" {
		t.Fatalf("expected octet-stream, got %s", resp.Header.Get("Content-Type"))
	}
}

// --- Content-Type Validation Tests ---

func TestContentTypeValidationWrongType(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	req := httptest.NewRequest("POST", "/api/collections", strings.NewReader(`{"name":"test"}`))
	req.Header.Set("Content-Type", "text/plain")
	req.Header.Set("Authorization", "Bearer "+token)
	resp := httptest.NewRecorder()
	h.ServeHTTP(resp, req)
	if resp.Result().StatusCode != 415 {
		t.Fatalf("expected 415, got %d", resp.Result().StatusCode)
	}
}

func TestContentTypeValidationInvalidJSON(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	req := httptest.NewRequest("POST", "/api/collections", strings.NewReader(`not json`))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+token)
	resp := httptest.NewRecorder()
	h.ServeHTTP(resp, req)
	if resp.Result().StatusCode != 400 {
		t.Fatalf("expected 400, got %d", resp.Result().StatusCode)
	}
}

func TestContentTypeValidationGETNoCheck(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	req := httptest.NewRequest("GET", "/api/collections", nil)
	req.Header.Set("Content-Type", "text/plain")
	req.Header.Set("Authorization", "Bearer "+token)
	resp := httptest.NewRecorder()
	h.ServeHTTP(resp, req)
	if resp.Result().StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.Result().StatusCode)
	}
}

// --- Import edge case tests ---

func TestImportNonExistentCollection(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	body := map[string]any{
		"collections": []map[string]string{},
		"records": map[string][]map[string]any{
			"ghost": {{"id": "r1", "data": map[string]string{"name": "test"}}},
		},
	}
	data, _ := json.Marshal(body)
	resp := request(t, h, "POST", "/api/import?skip_existing=true", string(data))
	if resp.StatusCode != 500 {
		t.Fatalf("expected 500 for non-existent collection, got %d", resp.StatusCode)
	}
}

func TestImportWithBucketsAndFiles(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	body := map[string]any{
		"collections": []map[string]string{},
		"records":     map[string][]map[string]any{},
		"buckets":     []map[string]any{{"name": "imported-bucket", "is_public": true}},
		"files": []map[string]any{
			{"id": "f1", "bucket": "imported-bucket", "filename": "test.txt", "mime_type": "text/plain", "size": 0},
		},
	}
	data, _ := json.Marshal(body)
	resp := request(t, h, "POST", "/api/import", string(data))
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
}

// --- Collections/Buckets Delete with content ---

func TestCollectionDeleteWithRecords(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/collections", `{"name":"delete-me"}`)
	request(t, h, "POST", "/api/collections/delete-me/records", `{"id":"r1","data":{"name":"test"}}`)
	request(t, h, "POST", "/api/collections/delete-me/records", `{"id":"r2","data":{"name":"test2"}}`)

	resp := request(t, h, "DELETE", "/api/collections/delete-me", "")
	if resp.StatusCode != 204 {
		t.Fatalf("expected 204, got %d", resp.StatusCode)
	}
}

func TestBucketDeleteWithFiles(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/buckets", `{"name":"files-to-delete"}`)
	resp := uploadFile(t, h, "files-to-delete", "keep.txt", "content")
	if resp.StatusCode != 200 {
		t.Fatalf("upload: expected 200, got %d", resp.StatusCode)
	}

	resp = request(t, h, "DELETE", "/api/buckets/files-to-delete", "")
	if resp.StatusCode != 204 {
		t.Fatalf("expected 204, got %d", resp.StatusCode)
	}
}

// --- Login edge cases ---

func TestLoginMissingFields(t *testing.T) {
	srv := newTestServer(t)
	h := srv.routes()

	tests := []struct {
		body string
		code int
		desc string
	}{
		{`{"email":"test@test.com"}`, 400, "missing password"},
		{`{"password":"pass"}`, 400, "missing email"},
		{`{}`, 400, "empty body"},
	}
	for _, tt := range tests {
		resp := request(t, h, "POST", "/api/auth/login", tt.body)
		if resp.StatusCode != tt.code {
			t.Errorf("%s: expected %d, got %d", tt.desc, tt.code, resp.StatusCode)
		}
	}
}

func TestRegisterMissingFields(t *testing.T) {
	srv := newTestServer(t)
	h := srv.routes()

	tests := []struct {
		body string
		code int
		desc string
	}{
		{`{"email":"test@test.com"}`, 400, "missing password"},
		{`{"password":"pass"}`, 400, "missing email"},
		{`{}`, 400, "empty body"},
	}
	for _, tt := range tests {
		resp := request(t, h, "POST", "/api/auth/register", tt.body)
		if resp.StatusCode != tt.code {
			t.Errorf("%s: expected %d, got %d", tt.desc, tt.code, resp.StatusCode)
		}
	}
}

// --- Notification boolToInt test ---

func TestBoolToInt(t *testing.T) {
	if v := boolToInt(true); v != 1 {
		t.Fatalf("expected 1, got %d", v)
	}
	if v := boolToInt(false); v != 0 {
		t.Fatalf("expected 0, got %d", v)
	}
}

// --- Records Update with validation ---

func TestRecordUpdateWithDataValidation(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/collections", `{"name":"val-update","schema":"{\"name\":\"string\",\"count\":\"number\"}"}`)
	request(t, h, "POST", "/api/collections/val-update/records", `{"id":"r1","data":{"name":"test","count":5}}`)

	// Update with valid data
	resp := request(t, h, "PATCH", "/api/collections/val-update/records/r1", `{"data":{"name":"updated","count":10}}`)
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
	body := readBody(t, resp)
	data := body["data"].(map[string]any)
	if data["name"] != "updated" {
		t.Fatalf("expected updated, got %v", data["name"])
	}

	// Update with invalid type
	resp = request(t, h, "PATCH", "/api/collections/val-update/records/r1", `{"data":{"name":123}}`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400, got %d", resp.StatusCode)
	}
}

// --- Webhook Dispatch edge cases ---

func TestWebhookDispatchToInvalidURL(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/collections", `{"name":"webhook-col"}`)
	request(t, h, "POST", "/api/collections/webhook-col/webhooks", `{"url":"http://127.0.0.1:1/invalid","events":["record.created"]}`)
	resp := request(t, h, "POST", "/api/collections/webhook-col/records", `{"id":"r1","data":{"name":"test"}}`)
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200 for record create, got %d", resp.StatusCode)
	}
}

// --- Export/Import clean state ---

func TestExportEmpty(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "GET", "/api/export", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
	body := readBody(t, resp)
	cols, _ := body["collections"].([]any)
	if len(cols) != 0 {
		t.Fatalf("expected no collections, got %d", len(cols))
	}
}

// --- File thumbnail edge cases ---

func TestFileThumbnailInvalidSize(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/buckets", `{"name":"thumb-bad"}`)
	resp := uploadFile(t, h, "thumb-bad", "test.txt", "hello world")
	body := readBody(t, resp)
	fileID := body["id"].(string)

	// Invalid width (negative) returns the file content (not JSON)
	resp = request(t, h, "GET", "/api/buckets/thumb-bad/files/"+fileID+"/thumb?width=-1&height=50", "")
	raw, _ := io.ReadAll(resp.Body)
	resp.Body.Close()
	if len(raw) == 0 {
		t.Fatal("expected non-empty response")
	}
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
}

// --- Secrets edge cases ---

func TestSecretsUpdateNotFound(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "PATCH", "/api/secrets/nonexistent", `{"name":"test","value":"val"}`)
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

func TestSecretsDeleteNotFound(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "DELETE", "/api/secrets/nonexistent", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

// --- Collections Create with schema validation ---

func TestCollectionCreateWithSchemaValidation(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	// Create collection with schema (schema must be a JSON string)
	resp := request(t, h, "POST", "/api/collections", `{"name":"schema-col","schema":"{\"email\":\"email\",\"age\":\"integer\"}"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}

	// Record with valid data
	resp = request(t, h, "POST", "/api/collections/schema-col/records", `{"data":{"email":"user@test.com","age":30}}`)
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}

	// Record with invalid email
	resp = request(t, h, "POST", "/api/collections/schema-col/records", `{"data":{"email":"not-an-email","age":30}}`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400, got %d", resp.StatusCode)
	}

	// Record with invalid integer
	resp = request(t, h, "POST", "/api/collections/schema-col/records", `{"data":{"email":"user@test.com","age":"not-a-number"}}`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400, got %d", resp.StatusCode)
	}
}

// --- Records List with pagination and expand ---

func TestRecordListWithPagination(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/collections", `{"name":"paginated"}`)
	for i := 0; i < 5; i++ {
		id := fmt.Sprintf("r%d", i+1)
		request(t, h, "POST", "/api/collections/paginated/records", fmt.Sprintf(`{"id":"%s","data":{"val":%d}}`, id, i+1))
	}

	// Page 1 (page=1, per_page=2)
	resp := request(t, h, "GET", "/api/collections/paginated/records?page=1&per_page=2", "")
	body := readBody(t, resp)
	recs, _ := body["records"].([]any)
	if len(recs) != 2 {
		t.Fatalf("expected 2 records, got %d", len(recs))
	}
	total, _ := body["total"].(float64)
	if total != 5 {
		t.Fatalf("expected total=5, got %v", total)
	}
	totalPages, _ := body["total_pages"].(float64)
	if totalPages != 3 {
		t.Fatalf("expected totalPages=3, got %v", totalPages)
	}
}

// --- Cron jobs edge cases ---

func TestCronJobsUpdateNotFound(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "PUT", "/api/cron/nonexistent", `{"name":"test","schedule":"* * * * *","url":"http://example.com/hook"}`)
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

func TestCronJobsDeleteNotFound(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "DELETE", "/api/cron/nonexistent", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

// --- Bucket CRUD with public flag ---

func TestBucketCreateWithPublicFlag(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/buckets", `{"name":"public-bucket","is_public":true}`)

	resp := request(t, h, "GET", "/api/buckets/public-bucket", "")
	body := readBody(t, resp)
	if body["is_public"] != true {
		t.Fatal("expected is_public=true")
	}
}

// --- Permissions missing fields ---

func TestPermissionsCreateMissingFields(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	tests := []struct {
		body string
		code int
		desc string
	}{
		{`{"role":"admin"}`, 400, "missing user_id"},
		{`{"user_id":"some-user"}`, 400, "missing role"},
		{`{}`, 400, "empty"},
	}
	for _, tt := range tests {
		resp := request(t, h, "POST", "/api/permissions", tt.body)
		if resp.StatusCode != tt.code {
			t.Errorf("%s: expected %d, got %d", tt.desc, tt.code, resp.StatusCode)
		}
	}
}

// --- RBAC middleware with invalid token ---

func TestPermissionListRequiresAuth(t *testing.T) {
	srv := newTestServer(t)
	h := srv.routes()

	resp := request(t, h, "GET", "/api/permissions", "")
	if resp.StatusCode != 401 {
		t.Fatalf("expected 401, got %d", resp.StatusCode)
	}
}

// --- Records created without ID should auto-generate one ---

func TestRecordCreateAutoGenerateID(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/collections", `{"name":"auto-id"}`)
	resp := request(t, h, "POST", "/api/collections/auto-id/records", `{"data":{"name":"test"}}`)
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
	body := readBody(t, resp)
	id, _ := body["id"].(string)
	if id == "" {
		t.Fatal("expected auto-generated id")
	}
}

// --- Records list with expand parameter ---

func TestRecordListWithExpand(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/collections", `{"name":"authors"}`)
	request(t, h, "POST", "/api/collections", `{"name":"books"}`)

	request(t, h, "POST", "/api/collections/authors/records", `{"id":"auth1","data":{"name":"Alice"}}`)
	request(t, h, "POST", "/api/collections/books/records", `{"id":"book1","data":{"title":"Go","author_id":"auth1"}}`)

	resp := request(t, h, "GET", "/api/collections/books/records?expand=author_id", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
}

// --- Files upload missing file part ---

func TestFileUploadMissingFile(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/buckets", `{"name":"no-file"}`)

	var buf bytes.Buffer
	w := multipart.NewWriter(&buf)
	w.Close()

	req := httptest.NewRequest("POST", "/api/buckets/no-file/files", &buf)
	req.Header.Set("Content-Type", w.FormDataContentType())
	req.Header.Set("Authorization", "Bearer "+token)
	resp := httptest.NewRecorder()
	h.ServeHTTP(resp, req)
	if resp.Result().StatusCode != 400 {
		t.Fatalf("expected 400, got %d", resp.Result().StatusCode)
	}
}

// --- Files delete not found ---

func TestFileDeleteNotFound(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/buckets", `{"name":"file-del"}`)
	resp := request(t, h, "DELETE", "/api/buckets/file-del/files/nonexistent", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

// --- Cache set missing key/value ---

func TestCacheSetMissingFields(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	tests := []struct {
		body string
		code int
		desc string
	}{
		{`{"key":"k","value":""}`, 400, "empty value"},
		{`{"key":"","value":"v"}`, 400, "empty key"},
		{`{}`, 400, "empty body"},
	}
	for _, tt := range tests {
		resp := request(t, h, "POST", "/api/cache", tt.body)
		if resp.StatusCode != tt.code {
			t.Errorf("%s: expected %d, got %d", tt.desc, tt.code, resp.StatusCode)
		}
	}
}

// --- Cache delete nonexistent ---

func TestCacheDeleteNotFound(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "DELETE", "/api/cache/nonexistent", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

// --- Secrets create missing fields ---

func TestSecretsCreateMissingFields(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	tests := []struct {
		body string
		code int
		desc string
	}{
		{`{}`, 400, "missing name"},
		{`{"value":"v"}`, 400, "missing name"},
	}
	for _, tt := range tests {
		resp := request(t, h, "POST", "/api/secrets", tt.body)
		if resp.StatusCode != tt.code {
			t.Errorf("%s: expected %d, got %d", tt.desc, tt.code, resp.StatusCode)
		}
	}
}

// --- Secrets update partial data ---

func TestSecretsUpdatePartialData(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/secrets", `{"name":"partial_test","value":"initial"}`)
	if resp.StatusCode != 201 {
		t.Fatalf("expected 201, got %d", resp.StatusCode)
	}
	created := readBody(t, resp)
	id := created["id"].(string)

	// Update just name
	resp = request(t, h, "PATCH", "/api/secrets/"+id, `{"name":"renamed"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
	body := readBody(t, resp)
	if body["name"] != "renamed" {
		t.Fatalf("expected renamed, got %v", body["name"])
	}
}

// --- Webhooks create and list globally ---

func TestWebhookCreateAndList(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/webhooks", `{"name":"myhook","url":"http://example.com/hook","events":["record.created"]}`)
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}

	// List webhooks (returns a JSON array)
	resp = request(t, h, "GET", "/api/webhooks", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
}

// --- Records update with no changes ---

func TestRecordUpdateNoChanges(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/collections", `{"name":"upd-missing"}`)
	request(t, h, "POST", "/api/collections/upd-missing/records", `{"id":"r1","data":{"name":"test"}}`)

	// PATCH with empty data should work
	resp := request(t, h, "PATCH", "/api/collections/upd-missing/records/r1", `{"data":{}}`)
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
}

// --- Bucket create duplicate name ---

func TestBucketCreateDuplicateName(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/buckets", `{"name":"dup-bucket"}`)
	resp := request(t, h, "POST", "/api/buckets", `{"name":"dup-bucket"}`)
	if resp.StatusCode != 409 {
		t.Fatalf("expected 409, got %d", resp.StatusCode)
	}
}

// --- Webhook logs without webhook ---

func TestWebhookLogsNoWebhook(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "GET", "/api/webhooks/nonexistent/logs", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

// --- Backup without data (empty DB) ---

func TestBackupEmpty(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "GET", "/api/backup", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
	body, _ := io.ReadAll(resp.Body)
	resp.Body.Close()
	if len(body) == 0 {
		t.Fatal("expected non-empty backup")
	}
}

// --- Collection delete not found ---

func TestCollectionDeleteNotFound(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "DELETE", "/api/collections/nonexistent", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

// --- Register short password ---

func TestRegisterShortPassword(t *testing.T) {
	srv := newTestServer(t)
	h := srv.routes()

	resp := request(t, h, "POST", "/api/auth/register", `{"email":"short@test.com","password":"12"}`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400, got %d", resp.StatusCode)
	}
}

// --- RBAC forbidden with non-matching role ---

func TestRBACForbiddenNonMatchingRole(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/collections", `{"name":"rbac-forbidden"}`)

	// Register another user with viewer-only role
	resp := request(t, h, "POST", "/api/auth/register", `{"email":"viewer@test.com","password":"password123"}`)
	userBody := readBody(t, resp)
	viewerID := userBody["id"].(string)

	// Grant viewer permission on the collection
	request(t, h, "POST", "/api/permissions", fmt.Sprintf(`{"user_id":"%s","collection":"rbac-forbidden","role":"viewer"}`, viewerID))

	// Login as viewer
	viewerResp := request(t, h, "POST", "/api/auth/login", `{"email":"viewer@test.com","password":"password123"}`)
	viewerToken := readBody(t, viewerResp)["token"].(string)
	viewerHandler := authenticated(srv.routes(), viewerToken)

	// Viewer should be forbidden from creating records (requires editor/admin)
	resp = request(t, viewerHandler, "POST", "/api/collections/rbac-forbidden/records", `{"data":{"name":"x"}}`)
	if resp.StatusCode != 403 {
		t.Fatalf("expected 403, got %d", resp.StatusCode)
	}
}

// --- Permissions list empty ---

func TestPermissionsListEmpty(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "GET", "/api/permissions", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
	var perms []any
	if err := json.NewDecoder(resp.Body).Decode(&perms); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if perms == nil {
		t.Fatal("expected empty array, not nil")
	}
}

// --- Record delete not found in collection ---

func TestRecordDeleteNotFoundInCollection(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/collections", `{"name":"rec-del"}`)
	resp := request(t, h, "DELETE", "/api/collections/rec-del/records/nonexistent", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

// --- Cache set with invalid JSON ---

func TestCacheSetInvalidJSON(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	req := httptest.NewRequest("POST", "/api/cache", strings.NewReader(`not json`))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+token)
	resp := httptest.NewRecorder()
	h.ServeHTTP(resp, req)
	if resp.Result().StatusCode != 400 {
		t.Fatalf("expected 400, got %d", resp.Result().StatusCode)
	}
}

// --- Decrypt secret with invalid format ---

func TestDecryptSecretInvalidFormat(t *testing.T) {
	_, err := decryptSecret([]byte("12345678901234567890123456789012"), "invalid-format")
	if err == nil {
		t.Fatal("expected error for invalid format")
	}
}

func TestDecryptSecretInvalidHex(t *testing.T) {
	_, err := decryptSecret([]byte("12345678901234567890123456789012"), "ZZZZ:data")
	if err == nil {
		t.Fatal("expected error for invalid hex")
	}
}

// --- GetOrCreateSecretsKey via env var ---

func TestGetOrCreateSecretsKeyEnvVar(t *testing.T) {
	keyHex := "abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
	t.Setenv("BACKBONE_SECRETS_KEY", keyHex)
	key, err := getOrCreateSecretsKey(t.TempDir())
	if err != nil {
		t.Fatal(err)
	}
	if len(key) != 32 {
		t.Fatalf("expected 32 bytes, got %d", len(key))
	}
}

// --- Logs list and clear ---

func TestLogListWithEntries(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	// Create a log entry
	resp := request(t, h, "POST", "/api/logs", `{"level":"info","message":"test log"}`)
	if resp.StatusCode != 201 {
		t.Fatalf("expected 201, got %d", resp.StatusCode)
	}

	// List logs (returns array)
	resp = request(t, h, "GET", "/api/logs", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
	var logEntries []any
	if err := json.NewDecoder(resp.Body).Decode(&logEntries); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if len(logEntries) == 0 {
		t.Fatal("expected at least one log")
	}
}

func TestLogClearWithEntries(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/logs", `{"level":"info","message":"to clear"}`)
	resp := request(t, h, "DELETE", "/api/logs", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}

	resp = request(t, h, "GET", "/api/logs", "")
	var afterClear []any
	if err := json.NewDecoder(resp.Body).Decode(&afterClear); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if len(afterClear) != 0 {
		t.Fatalf("expected 0 logs after clear, got %d", len(afterClear))
	}
}

// --- Records list with filter parameters ---

func TestRecordListWithFilterOp(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/collections", `{"name":"filtered"}`)
	request(t, h, "POST", "/api/collections/filtered/records", `{"id":"a","data":{"val":10}}`)
	request(t, h, "POST", "/api/collections/filtered/records", `{"id":"b","data":{"val":20}}`)
	request(t, h, "POST", "/api/collections/filtered/records", `{"id":"c","data":{"val":30}}`)

	resp := request(t, h, "GET", "/api/collections/filtered/records?filter=val=20", "")
	body := readBody(t, resp)
	total, _ := body["total"].(float64)
	if total != 1 {
		t.Fatalf("expected total=1, got %v", total)
	}
}

// --- Webhook dispatch to unreachable URL (covers sendWebhook error path) ---

func TestWebhookDispatchError(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/collections", `{"name":"wh-err"}`)
	request(t, h, "POST", "/api/webhooks", `{"name":"err-hook","url":"http://127.0.0.1:1/invalid","events":["record.created"]}`)
	resp := request(t, h, "POST", "/api/collections/wh-err/records", `{"id":"r1","data":{"name":"test"}}`)
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
}

// --- CronJobs update and delete edge cases ---

func TestCronJobsUpdateFields(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/cronjobs", `{"name":"myjob","schedule":"* * * * *","command":"http://example.com/hook","method":"POST"}`)
	resp := request(t, h, "GET", "/api/cronjobs", "")
	var jobs []map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&jobs); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if len(jobs) == 0 {
		t.Fatal("expected at least one cron job")
	}
	job := jobs[0]
	id := job["id"].(string)

	// Update name only
	resp = request(t, h, "PATCH", "/api/cronjobs/"+id, `{"name":"renamed"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
}

// --- WS List with no connections ---

func TestWSListEmpty(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "GET", "/api/websockets", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
	var conns []any
	if err := json.NewDecoder(resp.Body).Decode(&conns); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if len(conns) != 0 {
		t.Fatalf("expected no connections, got %d", len(conns))
	}
}

// --- WS Get nonexistent connection ---

func TestWSGetNotFound(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "GET", "/api/websockets/nonexistent", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

// --- WS Send to nonexistent connection (inserts message, returns 200) ---

func TestWSSendNotFound(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/websockets/nonexistent/send", `{"content":"hello"}`)
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

// --- PubSub topic delete not found ---

func TestPubSubTopicDeleteNotFound(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "DELETE", "/api/pubsub/topics/nonexistent", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

// --- Notifications mark read not found ---

func TestNotificationMarkReadNotFound(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "PATCH", "/api/notifications/nonexistent", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

func TestNotificationDeleteNotFound(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "DELETE", "/api/notifications/nonexistent", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

// --- Backend backup file with real data in collections ---

func TestBackupWithData(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	request(t, h, "POST", "/api/collections", `{"name":"data-col"}`)
	request(t, h, "POST", "/api/collections/data-col/records", `{"id":"r1","data":{"name":"backup-test"}}`)

	resp := request(t, h, "GET", "/api/backup", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
	body, _ := io.ReadAll(resp.Body)
	resp.Body.Close()
	if len(body) == 0 {
		t.Fatal("expected non-empty backup")
	}
}

// --- Webhook logs for an existing webhook (no logs) ---

func TestWebhookLogsEmpty(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/webhooks", `{"name":"empty-logs","url":"http://example.com/hook","events":["record.created"]}`)
	hook := readBody(t, resp)
	hookID := hook["id"].(string)

	resp = request(t, h, "GET", "/api/webhooks/"+hookID+"/logs", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
}

func TestServeHTTP(t *testing.T) {
	srv := newTestServer(t)
	w := httptest.NewRecorder()
	r := httptest.NewRequest("GET", "/api/health", nil)
	srv.ServeHTTP(w, r)
	if w.Code != 200 {
		t.Fatalf("expected 200, got %d", w.Code)
	}
}

func TestWSBroadcastInvalidJSON(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/websockets/broadcast", `invalid`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400, got %d", resp.StatusCode)
	}
}

func TestWSBroadcastEmptyContent(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/websockets/broadcast", `{"content":""}`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400, got %d", resp.StatusCode)
	}
}

func TestWSAllMessagesEmpty(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "GET", "/api/websockets/messages", "")
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
	var msgs []any
	if err := json.NewDecoder(resp.Body).Decode(&msgs); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
}

func TestCronJobsLogsNotFound(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "GET", "/api/cronjobs/nonexistent/logs", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}

func TestWSSendInvalidJSON(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "POST", "/api/websockets/test-id/send", `invalid`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400, got %d", resp.StatusCode)
	}
}

// Test handler-level DB error branches by creating a Server with a closed DB.
func TestHandlers_ClosedDB(t *testing.T) {
	db, err := sql.Open("sqlite", ":memory:")
	if err != nil {
		t.Fatal(err)
	}
	db.Close()

	key := make([]byte, 32)
	srv := &Server{db: db, dataDir: t.TempDir(), secretsKey: key}

	noArgCases := []struct {
		name string
		fn   func(w http.ResponseWriter, r *http.Request)
	}{
		{"handleCollectionsList", srv.handleCollectionsList},
		{"handleBucketsList", srv.handleBucketsList},
		{"handleWebhooksList", srv.handleWebhooksList},
		{"handleCronJobsList", srv.handleCronJobsList},
		{"handleWSList", srv.handleWSList},
		{"handleLogsList", srv.handleLogsList},
		{"handleWSAllMessages", srv.handleWSAllMessages},
		{"handleFilesList", srv.handleFilesList},
		{"handleLogsClear", srv.handleLogsClear},
		{"handleNotificationsList", srv.handleNotificationsList},
		{"handleNotificationsClear", srv.handleNotificationsClear},
		{"handlePubSubTopicsList", srv.handlePubSubTopicsList},
		{"handlePermissionsList", srv.handlePermissionsList},
		{"handleExport", srv.handleExport},
		{"handleBackup", srv.handleBackup},
	}
	for _, tc := range noArgCases {
		t.Run(tc.name, func(t *testing.T) {
			w := httptest.NewRecorder()
			r := httptest.NewRequest("GET", "/", nil)
			tc.fn(w, r)
			if w.Code != 500 {
				t.Fatalf("expected 500, got %d", w.Code)
			}
		})
	}

	pathValueCases := []struct {
		name string
		fn   func(w http.ResponseWriter, r *http.Request)
	}{
		{"handleCollectionsGet", srv.handleCollectionsGet},
		{"handleCollectionsUpdate", srv.handleCollectionsUpdate},
		{"handleCollectionsDelete", srv.handleCollectionsDelete},
		{"handleBucketsGet", srv.handleBucketsGet},
		{"handleBucketsDelete", srv.handleBucketsDelete},
		{"handleWebhooksGet", srv.handleWebhooksGet},
		{"handleWebhooksUpdate", srv.handleWebhooksUpdate},
		{"handleWebhooksDelete", srv.handleWebhooksDelete},
		{"handleWebhookLogs", srv.handleWebhookLogs},
		{"handleSecretsGet", srv.handleSecretsGet},
		{"handleSecretsUpdate", srv.handleSecretsUpdate},
		{"handleSecretsDelete", srv.handleSecretsDelete},
		{"handleCronJobsGet", srv.handleCronJobsGet},
		{"handleCronJobsUpdate", srv.handleCronJobsUpdate},
		{"handleCronJobsDelete", srv.handleCronJobsDelete},
		{"handleCronJobsRun", srv.handleCronJobsRun},
		{"handleCronJobsLogs", srv.handleCronJobsLogs},
		{"handleWSGet", srv.handleWSGet},
		{"handleWSDelete", srv.handleWSDelete},
		{"handleWSMessages", srv.handleWSMessages},
		{"handleNotificationsGet", srv.handleNotificationsGet},
		{"handleNotificationsMarkRead", srv.handleNotificationsMarkRead},
		{"handleNotificationsDelete", srv.handleNotificationsDelete},
		{"handlePubSubTopicsGet", srv.handlePubSubTopicsGet},
		{"handlePubSubTopicsDelete", srv.handlePubSubTopicsDelete},
		{"handlePubSubMessagesList", srv.handlePubSubMessagesList},
	}
	for _, tc := range pathValueCases {
		t.Run(tc.name, func(t *testing.T) {
			w := httptest.NewRecorder()
			r := httptest.NewRequest("GET", "/", nil)
			r.SetPathValue("id", "test")
			r.SetPathValue("name", "test")
			tc.fn(w, r)
			if w.Code != 500 {
				t.Fatalf("expected 500, got %d", w.Code)
			}
		})
	}

	bodyCases := []struct {
		name   string
		method string
		fn     func(w http.ResponseWriter, r *http.Request)
		body   string
	}{
		{"handleWebhooksCreate", "POST", srv.handleWebhooksCreate, `{"name":"test","url":"http://ex.com","events":["record.created"]}`},
		{"handleSecretsCreate", "POST", srv.handleSecretsCreate, `{"name":"k","value":"v","scope":"g"}`},
	}
	for _, tc := range bodyCases {
		t.Run(tc.name, func(t *testing.T) {
			w := httptest.NewRecorder()
			r := httptest.NewRequest(tc.method, "/", strings.NewReader(tc.body))
			r.Header.Set("Content-Type", "application/json")
			r.SetPathValue("id", "test")
			tc.fn(w, r)
			if w.Code != 500 {
				t.Fatalf("expected 500, got %d", w.Code)
			}
		})
	}
}

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

// Direct closed-DB tests for low-coverage DB functions
func TestDBFunctions_ClosedDB(t *testing.T) {
	db, err := sql.Open("sqlite", ":memory:")
	if err != nil {
		t.Fatal(err)
	}
	db.Close()

	tests := []struct {
		name string
		fn   func(*sql.DB) error
	}{
		{"deleteBucket", func(db *sql.DB) error { _, err := deleteBucket(db, "test"); return err }},
		{"deleteFile", func(db *sql.DB) error { _, err := deleteFile(db, "test"); return err }},
		{"deleteCacheEntry", func(db *sql.DB) error { _, err := deleteCacheEntry(db, "test"); return err }},
		{"listBuckets", func(db *sql.DB) error { _, err := listBuckets(db); return err }},
		{"listSecrets", func(db *sql.DB) error { _, err := listSecrets(db); return err }},
		{"listCronJobs", func(db *sql.DB) error { _, err := listCronJobs(db); return err }},
		{"listWebhooks", func(db *sql.DB) error { _, err := listWebhooks(db); return err }},
		{"listWSConnections", func(db *sql.DB) error { _, err := listWSConnections(db); return err }},
		{"listAllWSMessages", func(db *sql.DB) error { _, err := listAllWSMessages(db); return err }},
		{"listCronJobLogs", func(db *sql.DB) error { _, err := listCronJobLogs(db, "test"); return err }},
		{"listWebhookLogs", func(db *sql.DB) error { _, err := listWebhookLogs(db, "test", 10); return err }},
		{"insertPubSubTopic", func(db *sql.DB) error { _, err := insertPubSubTopic(db, "test", "test"); return err }},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			if err := tc.fn(db); err == nil {
				t.Fatal("expected error")
			}
		})
	}
}
