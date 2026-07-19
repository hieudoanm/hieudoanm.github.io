package frankfurter

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetLatest(t *testing.T) {
	t.Run("success with defaults", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path != "/latest" {
				t.Errorf("expected /latest, got %s", r.URL.Path)
			}
			if r.URL.Query().Get("from") != "EUR" {
				t.Errorf("expected from=EUR, got %s", r.URL.Query().Get("from"))
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(FrankfurterLatestResponse{
				Amount: 1,
				Base:   "EUR",
				Date:   "2024-01-15",
				Rates:  map[string]float64{"USD": 1.08},
			})
		}))
		defer ts.Close()

		orig := FrankfurterBaseURL
		FrankfurterBaseURL = ts.URL
		defer func() { FrankfurterBaseURL = orig }()

		result, err := GetLatest(FrankfurterLatestRequest{Amount: 1, Base: "EUR"})
		if err != nil {
			t.Fatal(err)
		}
		if result.Base != "EUR" || result.Rates["USD"] != 1.08 {
			t.Errorf("unexpected result: %+v", result)
		}
	})

	t.Run("success with to currencies", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Query().Get("to") != "USD,GBP" {
				t.Errorf("expected to=USD,GBP, got %s", r.URL.Query().Get("to"))
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(FrankfurterLatestResponse{
				Amount: 1, Base: "EUR", Date: "2024-01-15",
				Rates: map[string]float64{"USD": 1.08, "GBP": 0.87},
			})
		}))
		defer ts.Close()

		orig := FrankfurterBaseURL
		FrankfurterBaseURL = ts.URL
		defer func() { FrankfurterBaseURL = orig }()

		result, err := GetLatest(FrankfurterLatestRequest{Amount: 1, Base: "EUR", To: []string{"USD", "GBP"}})
		if err != nil {
			t.Fatal(err)
		}
		if result.Rates["GBP"] != 0.87 {
			t.Errorf("expected GBP 0.87, got %f", result.Rates["GBP"])
		}
	})

	t.Run("empty to slice", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Query().Get("to") != "" {
				t.Errorf("expected no to param, got %s", r.URL.Query().Get("to"))
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(FrankfurterLatestResponse{Amount: 1, Base: "EUR"})
		}))
		defer ts.Close()

		orig := FrankfurterBaseURL
		FrankfurterBaseURL = ts.URL
		defer func() { FrankfurterBaseURL = orig }()

		_, err := GetLatest(FrankfurterLatestRequest{Amount: 1, Base: "EUR", To: []string{}})
		if err != nil {
			t.Fatal(err)
		}
	})
}

func TestGetCurrencies(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path != "/currencies" {
				t.Errorf("expected /currencies, got %s", r.URL.Path)
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(CurrenciesResponse{"USD": "US Dollar", "EUR": "Euro"})
		}))
		defer ts.Close()

		orig := FrankfurterBaseURL
		FrankfurterBaseURL = ts.URL
		defer func() { FrankfurterBaseURL = orig }()

		result, err := GetCurrencies()
		if err != nil {
			t.Fatal(err)
		}
		if result["USD"] != "US Dollar" {
			t.Errorf("expected US Dollar, got %s", result["USD"])
		}
	})
}
