package telegram

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestSendMessage(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path != "/bottest-token/sendMessage" {
				t.Errorf("expected /bottest-token/sendMessage, got %s", r.URL.Path)
			}
			q := r.URL.Query()
			if q.Get("chat_id") != "12345" {
				t.Errorf("expected chat_id=12345, got %s", q.Get("chat_id"))
			}
			if q.Get("text") != "Hello" {
				t.Errorf("expected text=Hello, got %s", q.Get("text"))
			}
			if q.Get("parse_mode") != "html" {
				t.Errorf("expected parse_mode=html, got %s", q.Get("parse_mode"))
			}
			w.WriteHeader(http.StatusOK)
		}))
		defer ts.Close()

		orig := baseURL
		baseURL = ts.URL + "/bot"
		defer func() { baseURL = orig }()

		err := SendMessage("test-token", 12345, "Hello", ParseModeHTML)
		if err != nil {
			t.Fatal(err)
		}
	})

	t.Run("empty token", func(t *testing.T) {
		err := SendMessage("", 12345, "Hello", ParseModeHTML)
		if err == nil {
			t.Fatal("expected error for empty token")
		}
	})

	t.Run("empty chatID", func(t *testing.T) {
		err := SendMessage("token", 0, "Hello", ParseModeHTML)
		if err == nil {
			t.Fatal("expected error for zero chatID")
		}
	})

	t.Run("empty message", func(t *testing.T) {
		err := SendMessage("token", 12345, "", ParseModeHTML)
		if err == nil {
			t.Fatal("expected error for empty message")
		}
	})

	t.Run("error status", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(http.StatusBadRequest)
		}))
		defer ts.Close()

		orig := baseURL
		baseURL = ts.URL + "/bot"
		defer func() { baseURL = orig }()

		err := SendMessage("test-token", 12345, "Hi", ParseModeHTML)
		if err == nil {
			t.Fatal("expected error")
		}
	})
}

func TestSetWebhook(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path != "/bottoken/setWebhook" {
				t.Errorf("expected /bottoken/setWebhook, got %s", r.URL.Path)
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(SetWebhookResponse{OK: true, Result: true})
		}))
		defer ts.Close()

		orig := baseURL
		baseURL = ts.URL + "/bot"
		defer func() { baseURL = orig }()

		result, err := SetWebhook("token", "https://example.com/webhook")
		if err != nil {
			t.Fatal(err)
		}
		if !result.OK {
			t.Errorf("expected ok=true, got %v", result.OK)
		}
	})

	t.Run("empty token", func(t *testing.T) {
		_, err := SetWebhook("", "https://example.com/webhook")
		if err == nil {
			t.Fatal("expected error for empty token")
		}
	})

	t.Run("empty url", func(t *testing.T) {
		_, err := SetWebhook("token", "")
		if err == nil {
			t.Fatal("expected error for empty url")
		}
	})
}

func TestDeleteWebhook(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path != "/bottoken/deleteWebhook" {
				t.Errorf("expected /bottoken/deleteWebhook, got %s", r.URL.Path)
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(DeleteWebhookResponse{OK: true, Result: true})
		}))
		defer ts.Close()

		orig := baseURL
		baseURL = ts.URL + "/bot"
		defer func() { baseURL = orig }()

		result, err := DeleteWebhook("token", "https://example.com/webhook")
		if err != nil {
			t.Fatal(err)
		}
		if !result.OK {
			t.Errorf("expected ok=true, got %v", result.OK)
		}
	})

	t.Run("empty token", func(t *testing.T) {
		_, err := DeleteWebhook("", "url")
		if err == nil {
			t.Fatal("expected error for empty token")
		}
	})

	t.Run("empty url", func(t *testing.T) {
		_, err := DeleteWebhook("token", "")
		if err == nil {
			t.Fatal("expected error for empty url")
		}
	})
}

func TestGetWebhookInfo(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path != "/bottoken/getWebhookInfo" {
				t.Errorf("expected /bottoken/getWebhookInfo, got %s", r.URL.Path)
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(WebhookInfo{
				OK: true,
				Result: struct {
					URL                  string `json:"url"`
					HasCustomCertificate bool   `json:"has_custom_certificate"`
					PendingUpdateCount   int    `json:"pending_update_count"`
				}{
					URL: "https://example.com/webhook", PendingUpdateCount: 5,
				},
			})
		}))
		defer ts.Close()

		orig := baseURL
		baseURL = ts.URL + "/bot"
		defer func() { baseURL = orig }()

		result, err := GetWebhookInfo("token")
		if err != nil {
			t.Fatal(err)
		}
		if !result.OK {
			t.Errorf("expected ok=true")
		}
		if result.Result.PendingUpdateCount != 5 {
			t.Errorf("expected 5 pending updates, got %d", result.Result.PendingUpdateCount)
		}
	})

	t.Run("empty token", func(t *testing.T) {
		_, err := GetWebhookInfo("")
		if err == nil {
			t.Fatal("expected error for empty token")
		}
	})
}
