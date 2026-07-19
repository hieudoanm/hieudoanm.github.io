package deepseek

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetChatCompletions(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.Method != "POST" {
				t.Errorf("expected POST, got %s", r.Method)
			}
			if r.URL.Path != "/chat/completions" {
				t.Errorf("expected /chat/completions, got %s", r.URL.Path)
			}
			if r.Header.Get("Authorization") != "Bearer test-key" {
				t.Errorf("expected Bearer test-key, got %s", r.Header.Get("Authorization"))
			}
			if r.Header.Get("Content-Type") != "application/json" {
				t.Errorf("expected application/json, got %s", r.Header.Get("Content-Type"))
			}

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(ChatCompletionResponse{
				ID:      "123",
				Object:  "chat.completion",
				Created: 1700000000,
				Model:   "deepseek-chat",
				Choices: []struct {
					Message ChatMessage `json:"message"`
				}{{Message: ChatMessage{Role: "assistant", Content: "Hello!"}}},
			})
		}))
		defer ts.Close()

		c := &DeepSeekClient{BaseURL: ts.URL, APIKey: "test-key"}
		result, err := c.GetChatCompletions("deepseek-chat", "Hi")
		if err != nil {
			t.Fatal(err)
		}
		if result.ID != "123" {
			t.Errorf("expected id 123, got %s", result.ID)
		}
		if len(result.Choices) != 1 || result.Choices[0].Message.Content != "Hello!" {
			t.Errorf("unexpected choices: %+v", result.Choices)
		}
	})

	t.Run("error status", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(http.StatusUnauthorized)
		}))
		defer ts.Close()

		c := &DeepSeekClient{BaseURL: ts.URL, APIKey: "bad-key"}
		_, err := c.GetChatCompletions("deepseek-chat", "Hi")
		if err == nil {
			t.Fatal("expected error")
		}
	})

	t.Run("NewDeepSeekClient default base URL", func(t *testing.T) {
		c := NewDeepSeekClient("my-key")
		if c.BaseURL != "https://api.deepseek.com" {
			t.Errorf("expected https://api.deepseek.com, got %s", c.BaseURL)
		}
		if c.APIKey != "my-key" {
			t.Errorf("expected my-key, got %s", c.APIKey)
		}
	})
}
