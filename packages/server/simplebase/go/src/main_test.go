package main

import (
	"bytes"
	"encoding/json"
	"io"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"
)

func newTestServer(t *testing.T) *Server {
	t.Helper()
	f, err := os.CreateTemp("", "simplebase-test-*.db")
	if err != nil {
		t.Fatal(err)
	}
	f.Close()
	os.Setenv("SIMPLEBASE_DATA", os.TempDir())
	db, err := openDB()
	if err != nil {
		t.Fatal(err)
	}
	db.Exec("DROP TABLE IF EXISTS _collections")
	db.Exec("DROP TABLE IF EXISTS _users")
	db.Exec("DROP TABLE IF EXISTS _buckets")
	db.Exec("DROP TABLE IF EXISTS _files")
	if err := migrateDB(db); err != nil {
		t.Fatal(err)
	}
	storageDir, _ := os.MkdirTemp("", "simplebase-storage-*")
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
