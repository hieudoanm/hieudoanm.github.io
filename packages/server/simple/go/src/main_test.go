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
	dir, err := os.MkdirTemp("", "simplebase-test-*")
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { os.RemoveAll(dir) })
	os.Setenv("SIMPLEBASE_DATA", dir)
	db, err := openDB()
	if err != nil {
		t.Fatal(err)
	}
	if err := migrateDB(db); err != nil {
		t.Fatal(err)
	}
	storageDir, _ := os.MkdirTemp("", "simplebase-storage-*")
	t.Cleanup(func() { os.RemoveAll(storageDir) })
	return &Server{db: db, dataDir: storageDir}
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
