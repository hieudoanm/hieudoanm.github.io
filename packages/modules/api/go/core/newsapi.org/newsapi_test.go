package newsapi

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetTopHeadlines(t *testing.T) {
	t.Run("success with all fields", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path != "/top-headlines" {
				t.Errorf("expected /top-headlines, got %s", r.URL.Path)
			}
			if r.Header.Get("X-Api-Key") != "test-key" {
				t.Errorf("expected X-Api-Key test-key, got %s", r.Header.Get("X-Api-Key"))
			}
			q := r.URL.Query()
			if q.Get("category") != "technology" || q.Get("country") != "us" {
				t.Errorf("unexpected query: %s", r.URL.RawQuery)
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(ArticleResponse{
				Status:       "ok",
				TotalResults: 1,
				Articles: []Article{{
					Source: struct {
						ID   string `json:"id"`
						Name string `json:"name"`
					}{Name: "TechCrunch"},
					Title: "AI News",
				}},
			})
		}))
		defer ts.Close()

		orig := NewsAPIBaseURL
		NewsAPIBaseURL = ts.URL
		defer func() { NewsAPIBaseURL = orig }()

		result, err := GetTopHeadlines("test-key", TopHeadlinesRequest{
			Category: "technology",
			Country:  "us",
		})
		if err != nil {
			t.Fatal(err)
		}
		if result.Status != "ok" {
			t.Errorf("expected ok, got %s", result.Status)
		}
		if len(result.Articles) != 1 || result.Articles[0].Title != "AI News" {
			t.Errorf("unexpected articles: %+v", result.Articles)
		}
	})

	t.Run("success with optional params", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			q := r.URL.Query()
			if q.Get("page") != "2" || q.Get("pageSize") != "50" || q.Get("q") != "test" {
				t.Errorf("unexpected query: %s", r.URL.RawQuery)
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(ArticleResponse{Status: "ok"})
		}))
		defer ts.Close()

		orig := NewsAPIBaseURL
		NewsAPIBaseURL = ts.URL
		defer func() { NewsAPIBaseURL = orig }()

		_, err := GetTopHeadlines("test-key", TopHeadlinesRequest{
			Category: "general",
			Country:  "us",
			Page:     2,
			PageSize: 50,
			Query:    "test",
		})
		if err != nil {
			t.Fatal(err)
		}
	})

	t.Run("success with sources", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Query().Get("sources") != "cnn,bbc" {
				t.Errorf("expected sources=cnn,bbc, got %s", r.URL.Query().Get("sources"))
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(ArticleResponse{Status: "ok"})
		}))
		defer ts.Close()

		orig := NewsAPIBaseURL
		NewsAPIBaseURL = ts.URL
		defer func() { NewsAPIBaseURL = orig }()

		_, err := GetTopHeadlines("test-key", TopHeadlinesRequest{
			Category: "general",
			Country:  "us",
			Sources:  []string{"cnn", "bbc"},
		})
		if err != nil {
			t.Fatal(err)
		}
	})
}
