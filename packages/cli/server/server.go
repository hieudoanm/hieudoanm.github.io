package server

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
)

// Server holds the HTTP server configuration.
type Server struct {
	addr string
	mux  *http.ServeMux
}

// NewServer creates a new webhook Server.
func NewServer(addr string) *Server {
	s := &Server{
		addr: addr,
		mux:  http.NewServeMux(),
	}
	s.registerRoutes()
	return s
}

// Start begins listening for incoming HTTP requests.
func (s *Server) Start() error {
	log.Printf("Endpoints:")
	log.Printf("  POST http://localhost%s/webhook", s.addr)
	log.Printf("  GET  http://localhost%s/health", s.addr)
	return http.ListenAndServe(s.addr, s.mux)
}

func (s *Server) registerRoutes() {
	s.mux.HandleFunc("/webhook", s.handleWebhook)
	s.mux.HandleFunc("/health", s.handleHealth)
}

// handleHealth is a simple liveness check.
func (s *Server) handleHealth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

// handleWebhook receives and logs incoming webhook POST requests.
func (s *Server) handleWebhook(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		log.Printf("[webhook] failed to read body: %v", err)
		http.Error(w, "failed to read body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	log.Printf("[webhook] received %d bytes: %s", len(body), body)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "received"})
}
