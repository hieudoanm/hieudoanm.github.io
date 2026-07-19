package httpapi

import (
	"encoding/json"
	"net/http"
)

func (s *Server) handleCacheList(w http.ResponseWriter, r *http.Request) {
	jsonResponse(w, s.cache.List())
}

func (s *Server) handleCacheSet(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Key   string `json:"key"`
		Value string `json:"value"`
		TTL   int    `json:"ttl"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Key == "" || body.Value == "" {
		errorJSON(w, "key and value are required", http.StatusBadRequest)
		return
	}
	entry := s.cache.Set(body.Key, body.Value, body.TTL)
	jsonResponse(w, entry)
}

func (s *Server) handleCacheGet(w http.ResponseWriter, r *http.Request) {
	entry := s.cache.Get(r.PathValue("key"))
	if entry == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	jsonResponse(w, entry)
}

func (s *Server) handleCacheDelete(w http.ResponseWriter, r *http.Request) {
	if !s.cache.Delete(r.PathValue("key")) {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func (s *Server) handleCacheFlush(w http.ResponseWriter, r *http.Request) {
	s.cache.Flush()
	jsonResponse(w, map[string]string{"status": "flushed"})
}

func (s *Server) handleCacheStats(w http.ResponseWriter, r *http.Request) {
	jsonResponse(w, s.cache.Stats())
}
