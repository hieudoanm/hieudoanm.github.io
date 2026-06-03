package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"
	"time"
)

func newTestServer(t *testing.T) *Server {
	t.Helper()
	dir, err := os.MkdirTemp("", "simple-test-*")
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { os.RemoveAll(dir) })
	os.Setenv("SIMPLE_DATA", dir)
	db, err := openDB()
	if err != nil {
		t.Fatal(err)
	}
	if err := migrateDB(db); err != nil {
		t.Fatal(err)
	}
	storageDir, _ := os.MkdirTemp("", "simple-storage-*")
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
