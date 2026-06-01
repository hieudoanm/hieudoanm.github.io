package fixer

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestFixerClient(t *testing.T) {
	t.Run("GetLatest success", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path != "/latest" {
				t.Errorf("expected /latest, got %s", r.URL.Path)
			}
			if r.URL.Query().Get("access_key") != "test-key" {
				t.Errorf("expected access_key=test-key, got %s", r.URL.Query().Get("access_key"))
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(FixerLatestResponse{
				Success: true,
				Base:    "EUR",
				Date:    "2024-01-15",
				Rates:   map[string]float64{"USD": 1.08, "GBP": 0.87},
			})
		}))
		defer ts.Close()

		c := &FixerClient{BaseURL: ts.URL, APIKey: "test-key"}
		result, err := c.GetLatest()
		if err != nil {
			t.Fatal(err)
		}
		if !result.Success {
			t.Errorf("expected success=true, got %v", result.Success)
		}
		if result.Rates["USD"] != 1.08 {
			t.Errorf("expected USD rate 1.08, got %f", result.Rates["USD"])
		}
	})

	t.Run("GetSymbols success", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path != "/symbols" {
				t.Errorf("expected /symbols, got %s", r.URL.Path)
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(FixerSymbolsResponse{
				Success: true,
				Symbols: map[string]string{"USD": "United States Dollar", "EUR": "Euro"},
			})
		}))
		defer ts.Close()

		c := &FixerClient{BaseURL: ts.URL, APIKey: "test-key"}
		result, err := c.GetSymbols()
		if err != nil {
			t.Fatal(err)
		}
		if !result.Success {
			t.Errorf("expected success=true")
		}
		if result.Symbols["USD"] != "United States Dollar" {
			t.Errorf("expected United States Dollar, got %s", result.Symbols["USD"])
		}
	})

	t.Run("GetLatest error status", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(http.StatusInternalServerError)
		}))
		defer ts.Close()

		c := &FixerClient{BaseURL: ts.URL, APIKey: "test-key"}
		_, err := c.GetLatest()
		if err == nil {
			t.Fatal("expected error")
		}
	})
}
