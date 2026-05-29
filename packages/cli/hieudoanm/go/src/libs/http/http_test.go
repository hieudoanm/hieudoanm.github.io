package http

import (
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"
)

func TestGet(t *testing.T) {
	expectedBody := `{"message": "success"}`
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "GET" {
			t.Errorf("Expected method GET, got %s", r.Method)
		}
		if r.URL.Query().Get("q") != "search" {
			t.Errorf("Expected query parameter q=search, got %s", r.URL.Query().Get("q"))
		}
		if r.Header.Get("X-Test") != "test-value" {
			t.Errorf("Expected header X-Test: test-value, got %s", r.Header.Get("X-Test"))
		}
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(expectedBody))
	}))
	defer ts.Close()

	opts := Options{
		Header: http.Header{"X-Test": []string{"test-value"}},
		Query:  map[string]string{"q": "search"},
	}

	body, err := Get(ts.URL, opts)
	if err != nil {
		t.Fatalf("Get failed: %v", err)
	}

	if string(body) != expectedBody {
		t.Errorf("Expected body %s, got %s", expectedBody, string(body))
	}
}

func TestPost(t *testing.T) {
	requestBody := map[string]interface{}{"foo": "bar"}
	expectedResponseBody := `{"status": "posted"}`

	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" {
			t.Errorf("Expected method POST, got %s", r.Method)
		}
		if r.Header.Get(CONTENT_TYPE_HEADER) != CONTENT_TYPE_APPLICATION_JSON {
			t.Errorf("Expected Content-Type %s, got %s", CONTENT_TYPE_APPLICATION_JSON, r.Header.Get(CONTENT_TYPE_HEADER))
		}

		body, _ := io.ReadAll(r.Body)
		var received map[string]interface{}
		json.Unmarshal(body, &received)

		if !reflect.DeepEqual(received, requestBody) {
			t.Errorf("Expected body %v, got %v", requestBody, received)
		}

		w.WriteHeader(http.StatusCreated)
		w.Write([]byte(expectedResponseBody))
	}))
	defer ts.Close()

	opts := Options{
		Body: requestBody,
	}

	body, err := Post(ts.URL, opts)
	if err != nil {
		t.Fatalf("Post failed: %v", err)
	}

	if string(body) != expectedResponseBody {
		t.Errorf("Expected body %s, got %s", expectedResponseBody, string(body))
	}
}

func TestPut(t *testing.T) {
	requestBody := map[string]interface{}{"id": 123}
	expectedResponseBody := `{"status": "updated"}`

	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "PUT" {
			t.Errorf("Expected method PUT, got %s", r.Method)
		}
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(expectedResponseBody))
	}))
	defer ts.Close()

	opts := Options{
		Body: requestBody,
	}

	body, err := Put(ts.URL, opts)
	if err != nil {
		t.Fatalf("Put failed: %v", err)
	}

	if string(body) != expectedResponseBody {
		t.Errorf("Expected body %s, got %s", expectedResponseBody, string(body))
	}
}

func TestDelete(t *testing.T) {
	expectedResponseBody := `{"status": "deleted"}`

	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "DELETE" {
			t.Errorf("Expected method DELETE, got %s", r.Method)
		}
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(expectedResponseBody))
	}))
	defer ts.Close()

	opts := Options{}

	body, err := Delete(ts.URL, opts)
	if err != nil {
		t.Fatalf("Delete failed: %v", err)
	}

	if string(body) != expectedResponseBody {
		t.Errorf("Expected body %s, got %s", expectedResponseBody, string(body))
	}
}

func TestDebugLog(t *testing.T) {
	// This just ensures it doesn't crash
	debugLog(true, "Test Label", "Test Value")
	debugLog(false, "Test Label", "Test Value")
	debugLog(true, "Test Label", map[string]string{"foo": "bar"})
}
