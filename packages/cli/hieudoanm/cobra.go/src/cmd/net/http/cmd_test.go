package http

import (
	"strings"
	"testing"

	"github.com/hieudoanm/jack/src/cmd/net/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
)

func captureOutput(f func()) string {
	return internal.CaptureOutput(f)
}

func TestNewHTTPCmd(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "http [--url <url>]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	if cmd.Short != "Make HTTP requests" {
		t.Errorf("Short = %q", cmd.Short)
	}
	wantLong := "Make HTTP GET, POST, PUT, DELETE requests to URLs."
	if cmd.Long != wantLong {
		t.Errorf("Long = %q, want %q", cmd.Long, wantLong)
	}
	wantExample := "  net http --url https://api.example.com/data\n  net http --url https://api.example.com --method POST --data '{\"key\":\"value\"}'\n  net http --url https://api.example.com/resource/1 --method DELETE\n  net http --url https://api.example.com --header \"Authorization: Bearer token\""
	if cmd.Example != wantExample {
		t.Errorf("Example = %q, want %q", cmd.Example, wantExample)
	}
	for _, name := range []string{"url", "method", "data", "header", "json"} {
		if cmd.Flag(name) == nil {
			t.Errorf("missing flag: --%s", name)
		}
	}
}

func TestNewHTTPCmd_RunE_InvalidMethod(t *testing.T) {
	cmd := NewCmd()
	cmd.Flags().Set("method", "INVALID")
	cmd.Flags().Set("data", `{"test":"value"}`)
	cmd.Flags().Set("header", "Content-Type: application/json,Authorization: Bearer xyz")
	err := cmd.RunE(cmd, []string{})
	if err == nil {
		t.Fatal("expected error for invalid method")
	}
	if !strings.Contains(err.Error(), "unsupported method") {
		t.Errorf("unexpected error: %v", err)
	}
}

func TestNewHTTPCmd_RunE_GET(t *testing.T) {
	saved := httpGet
	defer func() { httpGet = saved }()
	httpGet = func(url string, opts requests.Options) ([]byte, error) {
		return []byte(`{"message":"ok"}`), nil
	}

	cmd := NewCmd()
	cmd.Flags().Set("url", "https://example.com/api")
	cmd.Flags().Set("method", "GET")
	out := captureOutput(func() {
		err := cmd.RunE(cmd, []string{})
		if err != nil {
			t.Errorf("unexpected error: %v", err)
		}
	})
	if !strings.Contains(out, "ok") {
		t.Errorf("output missing 'ok': %s", out)
	}
}

func TestNewHTTPCmd_RunE_POST(t *testing.T) {
	saved := httpPost
	defer func() { httpPost = saved }()
	httpPost = func(url string, opts requests.Options) ([]byte, error) {
		return []byte(`{"id":1}`), nil
	}

	cmd := NewCmd()
	cmd.Flags().Set("url", "https://example.com/api")
	cmd.Flags().Set("method", "POST")
	cmd.Flags().Set("data", `{"name":"test"}`)
	cmd.Flags().Set("header", "Content-Type: application/json")
	out := captureOutput(func() {
		err := cmd.RunE(cmd, []string{})
		if err != nil {
			t.Errorf("unexpected error: %v", err)
		}
	})
	if !strings.Contains(out, "1") {
		t.Errorf("output missing '1': %s", out)
	}
}

func TestNewHTTPCmd_RunE_PUT(t *testing.T) {
	saved := httpPut
	defer func() { httpPut = saved }()
	httpPut = func(url string, opts requests.Options) ([]byte, error) {
		return []byte(`{"updated":true}`), nil
	}

	cmd := NewCmd()
	cmd.Flags().Set("url", "https://example.com/api/1")
	cmd.Flags().Set("method", "PUT")
	cmd.Flags().Set("data", `{"name":"updated"}`)
	out := captureOutput(func() {
		err := cmd.RunE(cmd, []string{})
		if err != nil {
			t.Errorf("unexpected error: %v", err)
		}
	})
	if !strings.Contains(out, "true") {
		t.Errorf("output missing 'true': %s", out)
	}
}

func TestNewHTTPCmd_RunE_DELETE(t *testing.T) {
	saved := httpDelete
	defer func() { httpDelete = saved }()
	httpDelete = func(url string, opts requests.Options) ([]byte, error) {
		return []byte(`{}`), nil
	}

	cmd := NewCmd()
	cmd.Flags().Set("url", "https://example.com/api/1")
	cmd.Flags().Set("method", "DELETE")
	err := cmd.RunE(cmd, []string{})
	if err != nil {
		t.Errorf("unexpected error: %v", err)
	}
}

func TestNewHTTPCmd_RunE_JSONPretty(t *testing.T) {
	saved := httpGet
	defer func() { httpGet = saved }()
	httpGet = func(url string, opts requests.Options) ([]byte, error) {
		return []byte(`{"key":"value","nested":{"a":1}}`), nil
	}

	cmd := NewCmd()
	cmd.Flags().Set("url", "https://example.com/api")
	cmd.Flags().Set("json", "true")
	out := captureOutput(func() {
		err := cmd.RunE(cmd, []string{})
		if err != nil {
			t.Errorf("unexpected error: %v", err)
		}
	})
	if !strings.Contains(out, "nested") {
		t.Errorf("output missing nested: %s", out)
	}
}
