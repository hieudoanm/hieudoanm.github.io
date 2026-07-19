package httpapi

import (
	"encoding/json"
	"net/http"

	"github.com/hieudoanm/backbone/internal/events"
	"github.com/hieudoanm/backbone/internal/id"
	"github.com/hieudoanm/backbone/internal/log"
)

func (s *Server) handleLogsList(w http.ResponseWriter, r *http.Request) {
	logs, err := log.ListLogs(s.db)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, logs)
}

func (s *Server) handleLogsCreate(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Level   string `json:"level"`
		Message string `json:"message"`
		Meta    string `json:"meta"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Message == "" {
		errorJSON(w, "message is required", http.StatusBadRequest)
		return
	}
	if body.Level == "" {
		body.Level = "info"
	}
	validLevels := map[string]bool{"debug": true, "info": true, "warn": true, "error": true}
	if !validLevels[body.Level] {
		errorJSON(w, "level must be debug, info, warn, or error", http.StatusBadRequest)
		return
	}
	if body.Meta == "" {
		body.Meta = "{}"
	}

	entry, err := log.InsertLog(s.db, id.Generate(), body.Level, body.Message, body.Meta)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}

	go s.dispatchEvent(events.EventLogCreate, log.WebhookLogData(entry))

	if s.logHub != nil {
		data, _ := json.Marshal(entry)
		s.logHub.Broadcast(data)
	}

	w.WriteHeader(http.StatusCreated)
	jsonResponse(w, entry)
}

func (s *Server) handleLogsClear(w http.ResponseWriter, r *http.Request) {
	if err := log.ClearLogs(s.db); err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, map[string]string{"status": "cleared"})
}
