package lichess

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetCloudEvaluation(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path != "/api/cloud-eval" {
				t.Errorf("expected /api/cloud-eval, got %s", r.URL.Path)
			}
			q := r.URL.Query()
			if q.Get("fen") != "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" {
				t.Errorf("unexpected fen: %s", q.Get("fen"))
			}
			if q.Get("multiPv") != "1" {
				t.Errorf("expected multiPv=1, got %s", q.Get("multiPv"))
			}
			if q.Get("variant") != "standard" {
				t.Errorf("expected variant=standard, got %s", q.Get("variant"))
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(CloudEvaluation{
				Fen:   "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
				Depth: 20,
				Pvs:   []Pv{{Moves: "e4", Cp: 20}},
			})
		}))
		defer ts.Close()

		c := &LichessClient{BaseURL: ts.URL}
		result, err := c.GetCloudEvaluation(
			"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
			1,
			"standard",
		)
		if err != nil {
			t.Fatal(err)
		}
		if result.Depth != 20 {
			t.Errorf("expected depth 20, got %d", result.Depth)
		}
		if len(result.Pvs) != 1 || result.Pvs[0].Moves != "e4" {
			t.Errorf("expected PV e4, got %v", result.Pvs)
		}
	})

	t.Run("error status", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(http.StatusBadRequest)
		}))
		defer ts.Close()

		c := &LichessClient{BaseURL: ts.URL}
		_, err := c.GetCloudEvaluation("test-fen", 1, "standard")
		if err == nil {
			t.Fatal("expected error")
		}
	})
}
