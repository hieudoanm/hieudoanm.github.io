package requests

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"
)

func TestBuildURL(t *testing.T) {
	baseUrl := "https://example.com/api"
	query := map[string]string{"foo": "bar", "baz": "123"}

	u, err := buildURL(baseUrl, query)
	if err != nil {
		t.Fatalf("buildURL failed: %v", err)
	}

	if u.Scheme != "https" || u.Host != "example.com" || u.Path != "/api" {
		t.Errorf("URL structure mismatch: %s", u.String())
	}

	q := u.Query()
	if q.Get("foo") != "bar" || q.Get("baz") != "123" {
		t.Errorf("Query parameters mismatch: %s", u.RawQuery)
	}
}

func TestBuildBody(t *testing.T) {
	// 1. Nil body
	r, err := buildBody(nil)
	if err != nil || r != nil {
		t.Errorf("buildBody(nil) expected nil reader, got %v, err: %v", r, err)
	}

	// 2. Map body
	data := map[string]string{"hello": "world"}
	r, err = buildBody(data)
	if err != nil {
		t.Fatalf("buildBody failed: %v", err)
	}

	var decoded map[string]string
	json.NewDecoder(r).Decode(&decoded)
	if decoded["hello"] != "world" {
		t.Errorf("Body content mismatch: %v", decoded)
	}
}

func TestShouldRetry(t *testing.T) {
	tests := []struct {
		err        error
		status     int
		attempt    int
		maxRetries int
		expected   bool
	}{
		{nil, 200, 0, 3, false},
		{nil, 500, 0, 3, true},
		{nil, 500, 3, 3, false},
		{nil, 404, 0, 3, false},
	}

	for _, tt := range tests {
		if res := shouldRetry(tt.err, tt.status, tt.attempt, tt.maxRetries); res != tt.expected {
			t.Errorf("shouldRetry(%v, %d, %d, %d) = %v; expected %v", tt.err, tt.status, tt.attempt, tt.maxRetries, res, tt.expected)
		}
	}
}

func TestRequests(t *testing.T) {
	// Success case
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("ok"))
	}))
	defer ts.Close()

	body, err := Get(ts.URL, Options{})
	if err != nil {
		t.Errorf("Get failed: %v", err)
	}
	if string(body) != "ok" {
		t.Errorf("Unexpected body: %s", string(body))
	}

	// Retry case
	attempts := 0
	tsRetry := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		attempts++
		if attempts < 2 {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("recovered"))
	}))
	defer tsRetry.Close()

	body, err = Get(tsRetry.URL, Options{Retries: 2, Timeout: 1 * time.Second})
	if err != nil {
		t.Errorf("Get with retry failed: %v", err)
	}
	if string(body) != "recovered" {
		t.Errorf("Unexpected body after retry: %s", string(body))
	}
	if attempts != 2 {
		t.Errorf("Expected 2 attempts, got %d", attempts)
	}
}
