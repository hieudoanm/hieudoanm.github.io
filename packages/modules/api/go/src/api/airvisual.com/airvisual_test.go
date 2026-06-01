package airvisual

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetCountries(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path != "/v2/countries" {
				t.Errorf("expected /v2/countries, got %s", r.URL.Path)
			}
			if r.URL.Query().Get("key") != "test-key" {
				t.Errorf("expected key=test-key, got %s", r.URL.Query().Get("key"))
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(CountriesResponse{
				Status: "success",
				Data: []struct {
					Country string `json:"country"`
				}{{Country: "Vietnam"}, {Country: "USA"}},
			})
		}))
		defer ts.Close()

		orig := AirVisualBaseURL
		AirVisualBaseURL = ts.URL + "/v2"
		defer func() { AirVisualBaseURL = orig }()

		result, err := GetCountries("test-key")
		if err != nil {
			t.Fatal(err)
		}
		if result.Status != "success" {
			t.Errorf("expected success, got %s", result.Status)
		}
		if len(result.Data) != 2 {
			t.Errorf("expected 2 countries, got %d", len(result.Data))
		}
	})

	t.Run("http error", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(http.StatusInternalServerError)
		}))
		defer ts.Close()

		orig := AirVisualBaseURL
		AirVisualBaseURL = ts.URL + "/v2"
		defer func() { AirVisualBaseURL = orig }()

		_, err := GetCountries("test-key")
		if err == nil {
			t.Fatal("expected error")
		}
	})
}
