package tests

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strconv"
	"strings"
	"syscall"
	"testing"
	"time"
)

func buildBinary(t *testing.T) string {
	t.Helper()
	binDir := filepath.Join("..", "bin")
	binPath := filepath.Join(binDir, "backbone")
	if _, err := os.Stat(binPath); err == nil {
		return binPath
	}
	cmd := exec.Command("go", "build", "-o", binPath, "./../src")
	cmd.Stderr = &bytes.Buffer{}
	if err := cmd.Run(); err != nil {
		t.Fatalf("build binary: %v\nstderr: %s", err, cmd.Stderr.(*bytes.Buffer).String())
	}
	return binPath
}

func startServer(t *testing.T, binPath, dataDir string) (baseURL string, stop func()) {
	t.Helper()
	l, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatalf("listen: %v", err)
	}
	port := l.Addr().(*net.TCPAddr).Port
	l.Close()

	cmd := exec.Command(binPath)
	cmd.Env = append(os.Environ(),
		"BACKBONE_DATA="+dataDir,
		"PORT="+strconv.Itoa(port),
	)
	cmd.Stdout = &bytes.Buffer{}
	cmd.Stderr = &bytes.Buffer{}

	if err := cmd.Start(); err != nil {
		t.Fatalf("start server: %v", err)
	}

	baseURL = fmt.Sprintf("http://127.0.0.1:%d", port)
	stop = func() {
		cmd.Process.Signal(syscall.SIGINT)
		done := make(chan struct{}, 1)
		go func() {
			cmd.Wait()
			done <- struct{}{}
		}()
		select {
		case <-done:
		case <-time.After(5 * time.Second):
			cmd.Process.Kill()
			<-done
		}
	}

	var resp *http.Response
	for i := 0; i < 30; i++ {
		resp, err = http.Get(baseURL + "/api/health")
		if err == nil {
			resp.Body.Close()
			return baseURL, stop
		}
		time.Sleep(100 * time.Millisecond)
	}
	stop()
	t.Fatalf("server did not start within 3s\nstdout: %s\nstderr: %s",
		cmd.Stdout.(*bytes.Buffer).String(), cmd.Stderr.(*bytes.Buffer).String())
	return "", nil
}

type testClient struct {
	baseURL string
	token   string
	t       *testing.T
}

func newClient(t *testing.T, baseURL string) *testClient {
	return &testClient{t: t, baseURL: baseURL}
}

func (c *testClient) login() {
	c.t.Helper()
	resp := c.request("POST", "/api/auth/register", `{"email":"admin@test.com","password":"admin123"}`)
	resp.Body.Close()
	resp = c.request("POST", "/api/auth/login", `{"email":"admin@test.com","password":"admin123"}`)
	var result map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		c.t.Fatal(err)
	}
	resp.Body.Close()
	tok, _ := result["token"].(string)
	if tok == "" {
		c.t.Fatal("login: empty token")
	}
	c.token = tok
}

func (c *testClient) request(method, path, body string) *http.Response {
	c.t.Helper()
	var r io.Reader
	if body != "" {
		r = strings.NewReader(body)
	}
	req, err := http.NewRequest(method, c.baseURL+path, r)
	if err != nil {
		c.t.Fatal(err)
	}
	if body != "" {
		req.Header.Set("Content-Type", "application/json")
	}
	if c.token != "" {
		req.Header.Set("Authorization", "Bearer "+c.token)
	}
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		c.t.Fatalf("%s %s: %v", method, path, err)
	}
	return resp
}

func (c *testClient) readBody(resp *http.Response) map[string]any {
	c.t.Helper()
	defer resp.Body.Close()
	var result map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		c.t.Fatalf("read body: %v", err)
	}
	return result
}

func TestHealth(t *testing.T) {
	binPath := buildBinary(t)
	dataDir := t.TempDir()
	baseURL, stop := startServer(t, binPath, dataDir)
	defer stop()

	resp, err := http.Get(baseURL + "/api/health")
	if err != nil {
		t.Fatal(err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
	var result map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		t.Fatal(err)
	}
	if result["status"] != "ok" {
		t.Fatalf("expected status ok, got %v", result["status"])
	}
}

func TestAuthFlow(t *testing.T) {
	binPath := buildBinary(t)
	dataDir := t.TempDir()
	baseURL, stop := startServer(t, binPath, dataDir)
	defer stop()
	c := newClient(t, baseURL)

	resp := c.request("POST", "/api/auth/register", `{"email":"user@test.com","password":"pass123"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("register: expected 200, got %d", resp.StatusCode)
	}
	result := c.readBody(resp)
	if result["token"] == "" {
		t.Fatal("register: expected token")
	}

	resp = c.request("POST", "/api/auth/login", `{"email":"user@test.com","password":"pass123"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("login: expected 200, got %d", resp.StatusCode)
	}
	result = c.readBody(resp)
	if result["token"] == "" {
		t.Fatal("login: expected token")
	}
}

func TestAuthErrors(t *testing.T) {
	binPath := buildBinary(t)
	dataDir := t.TempDir()
	baseURL, stop := startServer(t, binPath, dataDir)
	defer stop()
	c := newClient(t, baseURL)

	tests := []struct {
		name string
		path string
		body string
		code int
	}{
		{"register ok", "/api/auth/register", `{"email":"dup@test.com","password":"pass123"}`, 200},
		{"duplicate email", "/api/auth/register", `{"email":"dup@test.com","password":"pass123"}`, 409},
		{"missing email", "/api/auth/register", `{"password":"pass123"}`, 400},
		{"missing password", "/api/auth/register", `{"email":"x@test.com"}`, 400},
		{"wrong password", "/api/auth/login", `{"email":"dup@test.com","password":"wrong"}`, 401},
		{"unknown user", "/api/auth/login", `{"email":"nobody@test.com","password":"pass123"}`, 401},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			resp := c.request("POST", tt.path, tt.body)
			if resp.StatusCode != tt.code {
				body, _ := io.ReadAll(resp.Body)
				resp.Body.Close()
				t.Fatalf("expected %d, got %d: %s", tt.code, resp.StatusCode, string(body))
			}
			resp.Body.Close()
		})
	}
}

func TestCollectionCRUD(t *testing.T) {
	binPath := buildBinary(t)
	dataDir := t.TempDir()
	baseURL, stop := startServer(t, binPath, dataDir)
	defer stop()
	c := newClient(t, baseURL)
	c.login()

	resp := c.request("POST", "/api/collections", `{"name":"posts","schema":"{\"title\":\"string\",\"body\":\"string\"}"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("create: expected 200, got %d", resp.StatusCode)
	}
	resp.Body.Close()

	resp = c.request("GET", "/api/collections", "")
	if resp.StatusCode != 200 {
		t.Fatalf("list: expected 200, got %d", resp.StatusCode)
	}
	var list []map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&list); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if len(list) != 1 {
		t.Fatalf("expected 1 collection, got %d", len(list))
	}
	if list[0]["name"] != "posts" {
		t.Fatalf("expected name 'posts', got %v", list[0]["name"])
	}

	resp = c.request("GET", "/api/collections/posts", "")
	if resp.StatusCode != 200 {
		t.Fatalf("get: expected 200, got %d", resp.StatusCode)
	}
	resp.Body.Close()

	resp = c.request("DELETE", "/api/collections/posts", "")
	if resp.StatusCode != 204 {
		t.Fatalf("delete: expected 204, got %d", resp.StatusCode)
	}
	resp.Body.Close()
}

func TestRecordCRUD(t *testing.T) {
	binPath := buildBinary(t)
	dataDir := t.TempDir()
	baseURL, stop := startServer(t, binPath, dataDir)
	defer stop()
	c := newClient(t, baseURL)
	c.login()

	resp := c.request("POST", "/api/collections", `{"name":"articles","schema":"{\"title\":\"string\",\"views\":\"number\"}"}`)
	resp.Body.Close()

	resp = c.request("POST", "/api/collections/articles/records", `{"data":{"title":"Hello","views":42}}`)
	if resp.StatusCode != 200 {
		body, _ := io.ReadAll(resp.Body)
		resp.Body.Close()
		t.Fatalf("create record: expected 200, got %d: %s", resp.StatusCode, string(body))
	}
	result := c.readBody(resp)
	recID, ok := result["id"].(string)
	if !ok || recID == "" {
		t.Fatal("expected record id")
	}

	resp = c.request("GET", "/api/collections/articles/records", "")
	if resp.StatusCode != 200 {
		t.Fatalf("list records: expected 200, got %d", resp.StatusCode)
	}
	resp.Body.Close()

	resp = c.request("GET", "/api/collections/articles/records/"+recID, "")
	if resp.StatusCode != 200 {
		t.Fatalf("get record: expected 200, got %d", resp.StatusCode)
	}
	resp.Body.Close()

	resp = c.request("PATCH", "/api/collections/articles/records/"+recID, `{"data":{"title":"Updated","views":42}}`)
	if resp.StatusCode != 200 {
		body, _ := io.ReadAll(resp.Body)
		resp.Body.Close()
		t.Fatalf("update record: expected 200, got %d: %s", resp.StatusCode, string(body))
	}
	resp.Body.Close()

	resp = c.request("DELETE", "/api/collections/articles/records/"+recID, "")
	if resp.StatusCode != 204 {
		t.Fatalf("delete record: expected 204, got %d", resp.StatusCode)
	}
	resp.Body.Close()
}

func TestBucketCRUD(t *testing.T) {
	binPath := buildBinary(t)
	dataDir := t.TempDir()
	baseURL, stop := startServer(t, binPath, dataDir)
	defer stop()
	c := newClient(t, baseURL)
	c.login()

	resp := c.request("POST", "/api/buckets", `{"name":"assets"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("create bucket: expected 200, got %d", resp.StatusCode)
	}
	resp.Body.Close()

	resp = c.request("GET", "/api/buckets", "")
	if resp.StatusCode != 200 {
		t.Fatalf("list buckets: expected 200, got %d", resp.StatusCode)
	}
	resp.Body.Close()

	resp = c.request("DELETE", "/api/buckets/assets", "")
	if resp.StatusCode != 204 {
		t.Fatalf("delete bucket: expected 204, got %d", resp.StatusCode)
	}
	resp.Body.Close()
}

func TestAuthRequired(t *testing.T) {
	binPath := buildBinary(t)
	dataDir := t.TempDir()
	baseURL, stop := startServer(t, binPath, dataDir)
	defer stop()
	c := newClient(t, baseURL)

	routes := []struct {
		method string
		path   string
	}{
		{"GET", "/api/collections"},
		{"POST", "/api/collections"},
		{"GET", "/api/buckets"},
		{"POST", "/api/buckets"},
		{"GET", "/api/webhooks"},
		{"POST", "/api/webhooks"},
		{"GET", "/api/secrets"},
		{"GET", "/api/notifications"},
		{"GET", "/api/logs"},
		{"GET", "/api/pubsub/topics"},
		{"GET", "/api/cache"},
	}
	for _, r := range routes {
		t.Run(r.method+" "+r.path, func(t *testing.T) {
			resp := c.request(r.method, r.path, `{}`)
			if resp.StatusCode != 401 {
				body, _ := io.ReadAll(resp.Body)
				resp.Body.Close()
				t.Fatalf("expected 401, got %d: %s", resp.StatusCode, string(body))
			}
			resp.Body.Close()
		})
	}
}

func TestNotFound(t *testing.T) {
	binPath := buildBinary(t)
	dataDir := t.TempDir()
	baseURL, stop := startServer(t, binPath, dataDir)
	defer stop()
	c := newClient(t, baseURL)
	c.login()

	tests := []struct {
		name   string
		method string
		path   string
	}{
		{"collection", "GET", "/api/collections/nonexistent"},
		{"bucket", "GET", "/api/buckets/nonexistent"},
		{"webhook", "GET", "/api/webhooks/nonexistent"},
		{"notification", "GET", "/api/notifications/nonexistent"},
		{"pubsub topic", "GET", "/api/pubsub/topics/nonexistent"},
		{"cronjob", "GET", "/api/cronjobs/nonexistent"},
		{"secret", "GET", "/api/secrets/nonexistent"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			resp := c.request(tt.method, tt.path, "")
			if resp.StatusCode != 404 {
				body, _ := io.ReadAll(resp.Body)
				resp.Body.Close()
				t.Fatalf("expected 404, got %d: %s", resp.StatusCode, string(body))
			}
			resp.Body.Close()
		})
	}
}

func TestPubSubFlow(t *testing.T) {
	binPath := buildBinary(t)
	dataDir := t.TempDir()
	baseURL, stop := startServer(t, binPath, dataDir)
	defer stop()
	c := newClient(t, baseURL)
	c.login()

	resp := c.request("POST", "/api/pubsub/topics", `{"name":"events"}`)
	if resp.StatusCode != 201 {
		t.Fatalf("create topic: expected 201, got %d", resp.StatusCode)
	}
	resp.Body.Close()

	resp = c.request("POST", "/api/pubsub/topics/events/messages", `{"body":"test message"}`)
	if resp.StatusCode != 201 {
		t.Fatalf("publish message: expected 201, got %d", resp.StatusCode)
	}
	resp.Body.Close()

	resp = c.request("GET", "/api/pubsub/topics/events/messages", "")
	if resp.StatusCode != 200 {
		t.Fatalf("list messages: expected 200, got %d", resp.StatusCode)
	}
	var messages []map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&messages); err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if len(messages) != 1 {
		t.Fatalf("expected 1 message, got %d", len(messages))
	}

	resp = c.request("DELETE", "/api/pubsub/topics/events", "")
	if resp.StatusCode != 204 {
		t.Fatalf("delete topic: expected 204, got %d", resp.StatusCode)
	}
	resp.Body.Close()
}

func TestNotificationFlow(t *testing.T) {
	binPath := buildBinary(t)
	dataDir := t.TempDir()
	baseURL, stop := startServer(t, binPath, dataDir)
	defer stop()
	c := newClient(t, baseURL)
	c.login()

	resp := c.request("POST", "/api/notifications", `{"title":"Test","body":"Hello","type":"info"}`)
	if resp.StatusCode != 201 {
		t.Fatalf("create: expected 201, got %d", resp.StatusCode)
	}
	result := c.readBody(resp)
	nID, ok := result["id"].(string)
	if !ok || nID == "" {
		t.Fatal("expected notification id")
	}

	resp = c.request("GET", "/api/notifications", "")
	if resp.StatusCode != 200 {
		t.Fatalf("list: expected 200, got %d", resp.StatusCode)
	}
	resp.Body.Close()

	resp = c.request("PATCH", "/api/notifications/"+nID, "")
	if resp.StatusCode != 200 {
		t.Fatalf("mark-read: expected 200, got %d", resp.StatusCode)
	}
	resp.Body.Close()

	resp = c.request("DELETE", "/api/notifications/"+nID, "")
	if resp.StatusCode != 204 {
		t.Fatalf("delete: expected 204, got %d", resp.StatusCode)
	}
	resp.Body.Close()
}
