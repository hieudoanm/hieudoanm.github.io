package openai

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestGetChatCompletion(t *testing.T) {
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

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(ChatResponse{
				Choices: []struct {
					Message Message `json:"message"`
				}{{Message: Message{Role: "assistant", Content: "Hello!"}}},
			})
		}))
		defer ts.Close()

		c := &OpenAIClient{BaseURL: ts.URL, APIKey: "test-key"}
		result, err := c.GetChatCompletion("gpt-4", "Hi")
		if err != nil {
			t.Fatal(err)
		}
		if len(result.Choices) != 1 || result.Choices[0].Message.Content != "Hello!" {
			t.Errorf("unexpected result: %+v", result)
		}
	})

	t.Run("sends correct request body", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			var req ChatRequest
			if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
				t.Fatal(err)
			}
			if req.Model != "gpt-4" {
				t.Errorf("expected model gpt-4, got %s", req.Model)
			}
			if len(req.Messages) != 1 || req.Messages[0].Content != "Summarize this" {
				t.Errorf("unexpected messages: %+v", req.Messages)
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(ChatResponse{})
		}))
		defer ts.Close()

		c := &OpenAIClient{BaseURL: ts.URL, APIKey: "test-key"}
		_, err := c.GetChatCompletion("gpt-4", "Summarize this")
		if err != nil {
			t.Fatal(err)
		}
	})

	t.Run("error status", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(http.StatusTooManyRequests)
		}))
		defer ts.Close()

		c := &OpenAIClient{BaseURL: ts.URL, APIKey: "test-key"}
		_, err := c.GetChatCompletion("gpt-4", "Hi")
		if err == nil {
			t.Fatal("expected error")
		}
		if !strings.Contains(err.Error(), "429") {
			t.Errorf("expected 429 in error, got %s", err.Error())
		}
	})

	t.Run("NewOpenAIClient default", func(t *testing.T) {
		c := NewOpenAIClient("test-key")
		if c.BaseURL != "https://api.openai.com/v1" {
			t.Errorf("expected https://api.openai.com/v1, got %s", c.BaseURL)
		}
		if c.APIKey != "test-key" {
			t.Errorf("expected test-key, got %s", c.APIKey)
		}
	})
}
