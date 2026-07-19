package crossref

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetWork(t *testing.T) {
	t.Run("success with print date", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path != "/works/10.1000/xyz" {
				t.Errorf("expected /works/10.1000/xyz, got %s", r.URL.Path)
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(CrossRefResponse{
				Message: CrossRefMessage{
					Author:         []Author{{Given: "John", Family: "Doe"}},
					Title:          []string{"Test Title"},
					ContainerTitle: []string{"Test Journal"},
					Volume:         "10",
					Issue:          "2",
					Page:           "100-110",
					PublishedPrint: &DateParts{DateParts: [][]int{{2024, 3, 15}}},
				},
			})
		}))
		defer ts.Close()

		c := &CrossRefClient{BaseURL: ts.URL}
		ref, err := c.GetWork("10.1000/xyz")
		if err != nil {
			t.Fatal(err)
		}
		if ref.Title != "Test Title" {
			t.Errorf("expected Test Title, got %s", ref.Title)
		}
		if ref.Journal != "Test Journal" {
			t.Errorf("expected Test Journal, got %s", ref.Journal)
		}
		if ref.Volume != "10" || ref.Issue != "2" || ref.Pages != "100-110" {
			t.Errorf("unexpected ref fields: %+v", ref)
		}
		if ref.Year != 2024 {
			t.Errorf("expected year 2024, got %d", ref.Year)
		}
		if ref.URL != "https://doi.org/10.1000/xyz" {
			t.Errorf("expected doi.org url, got %s", ref.URL)
		}
		if len(ref.Authors) != 1 || ref.Authors[0].Family != "Doe" {
			t.Errorf("expected Doe, got %v", ref.Authors)
		}
	})

	t.Run("falls back to online date", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(CrossRefResponse{
				Message: CrossRefMessage{
					Title:           []string{"Online Only"},
					PublishedOnline: &DateParts{DateParts: [][]int{{2023, 6, 1}}},
				},
			})
		}))
		defer ts.Close()

		c := &CrossRefClient{BaseURL: ts.URL}
		ref, err := c.GetWork("10.1000/abc")
		if err != nil {
			t.Fatal(err)
		}
		if ref.Year != 2023 {
			t.Errorf("expected 2023, got %d", ref.Year)
		}
	})

	t.Run("no date parts", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(CrossRefResponse{
				Message: CrossRefMessage{Title: []string{"No Date"}},
			})
		}))
		defer ts.Close()

		c := &CrossRefClient{BaseURL: ts.URL}
		ref, err := c.GetWork("10.1000/no-date")
		if err != nil {
			t.Fatal(err)
		}
		if ref.Year != 0 {
			t.Errorf("expected 0, got %d", ref.Year)
		}
	})

	t.Run("empty title and journal", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(CrossRefResponse{Message: CrossRefMessage{}})
		}))
		defer ts.Close()

		c := &CrossRefClient{BaseURL: ts.URL}
		ref, err := c.GetWork("10.1000/empty")
		if err != nil {
			t.Fatal(err)
		}
		if ref.Title != "" || ref.Journal != "" {
			t.Errorf("expected empty title/journal, got title=%q journal=%q", ref.Title, ref.Journal)
		}
	})

	t.Run("error status", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(http.StatusNotFound)
		}))
		defer ts.Close()

		c := &CrossRefClient{BaseURL: ts.URL}
		_, err := c.GetWork("10.1000/missing")
		if err == nil {
			t.Fatal("expected error")
		}
	})
}
