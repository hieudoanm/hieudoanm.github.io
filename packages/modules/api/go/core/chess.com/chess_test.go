package chess

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestChessClient(t *testing.T) {
	t.Run("GetPlayers success", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path != "/titled/GM" {
				t.Errorf("expected /titled/GM, got %s", r.URL.Path)
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(PlayersResponse{Players: []string{"player1", "player2"}})
		}))
		defer ts.Close()

		c := &ChessClient{BaseURL: ts.URL}
		players, err := c.GetPlayers("GM")
		if err != nil {
			t.Fatal(err)
		}
		if len(players) != 2 || players[0] != "player1" {
			t.Errorf("expected [player1 player2], got %v", players)
		}
	})

	t.Run("GetPlayer success", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path != "/player/magnus" {
				t.Errorf("expected /player/magnus, got %s", r.URL.Path)
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(map[string]interface{}{"player_id": "magnus"})
		}))
		defer ts.Close()

		c := &ChessClient{BaseURL: ts.URL}
		result, err := c.GetPlayer("magnus")
		if err != nil {
			t.Fatal(err)
		}
		if result["player_id"] != "magnus" {
			t.Errorf("expected magnus, got %v", result["player_id"])
		}
	})

	t.Run("GetStats success", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path != "/player/magnus/stats" {
				t.Errorf("expected /player/magnus/stats, got %s", r.URL.Path)
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(map[string]interface{}{"rated": true})
		}))
		defer ts.Close()

		c := &ChessClient{BaseURL: ts.URL}
		result, err := c.GetStats("magnus")
		if err != nil {
			t.Fatal(err)
		}
		if result["rated"] != true {
			t.Errorf("expected rated=true, got %v", result["rated"])
		}
	})

	t.Run("GetPlayers error status", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(http.StatusNotFound)
		}))
		defer ts.Close()

		c := &ChessClient{BaseURL: ts.URL}
		_, err := c.GetPlayers("GM")
		if err == nil {
			t.Fatal("expected error")
		}
	})
}
