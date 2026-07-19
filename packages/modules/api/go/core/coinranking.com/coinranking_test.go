package coinranking

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetCoins(t *testing.T) {
	t.Run("success without tag", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path != "/v2/coins" {
				t.Errorf("expected /v2/coins, got %s", r.URL.Path)
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(CoinRankingResponse{
				Status: "success",
				Data: CoinRankingData{
					Stats: CoinRankingStats{Total: 1, TotalCoins: 100},
					Coins: []Coin{{UUID: "1", Name: "Bitcoin", Symbol: "BTC"}},
				},
			})
		}))
		defer ts.Close()

		c := &CoinRankingClient{BaseURL: ts.URL}
		result, err := c.GetCoins("")
		if err != nil {
			t.Fatal(err)
		}
		if result.Status != "success" {
			t.Errorf("expected success, got %s", result.Status)
		}
		if len(result.Data.Coins) != 1 || result.Data.Coins[0].Name != "Bitcoin" {
			t.Errorf("expected Bitcoin, got %v", result.Data.Coins[0].Name)
		}
	})

	t.Run("success with tag", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Query().Get("tags") != "defi" {
				t.Errorf("expected tags=defi, got %s", r.URL.Query().Get("tags"))
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(CoinRankingResponse{Status: "success"})
		}))
		defer ts.Close()

		c := &CoinRankingClient{BaseURL: ts.URL}
		_, err := c.GetCoins("defi")
		if err != nil {
			t.Fatal(err)
		}
	})

	t.Run("error status", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(http.StatusForbidden)
		}))
		defer ts.Close()

		c := &CoinRankingClient{BaseURL: ts.URL}
		_, err := c.GetCoins("")
		if err == nil {
			t.Fatal("expected error")
		}
	})
}
