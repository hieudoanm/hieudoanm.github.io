package footballdata

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetCompetitions(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path != "/competitions" {
				t.Errorf("expected /competitions, got %s", r.URL.Path)
			}
			if r.Header.Get("X-Auth-Token") != "test-token" {
				t.Errorf("expected X-Auth-Token test-token, got %s", r.Header.Get("X-Auth-Token"))
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(map[string]interface{}{
				"count": 2,
				"competitions": []map[string]interface{}{
					{"id": 1, "name": "Premier League"},
					{"id": 2, "name": "La Liga"},
				},
			})
		}))
		defer ts.Close()

		c := &FootballDataClient{BaseURL: ts.URL, AuthToken: "test-token"}
		result, err := c.GetCompetitions()
		if err != nil {
			t.Fatal(err)
		}
		if result["count"] != float64(2) {
			t.Errorf("expected count 2, got %v", result["count"])
		}
	})

	t.Run("error status", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(http.StatusForbidden)
		}))
		defer ts.Close()

		c := &FootballDataClient{BaseURL: ts.URL, AuthToken: "bad-token"}
		_, err := c.GetCompetitions()
		if err == nil {
			t.Fatal("expected error")
		}
	})
}
