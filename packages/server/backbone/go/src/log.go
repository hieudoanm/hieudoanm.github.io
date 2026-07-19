package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

const (
	EventLogCreate = "log.create"
)

func insertLog(db *sql.DB, id, level, message, meta string) (*LogEntry, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	_, err := db.Exec(
		`INSERT INTO _logs (id, level, message, meta, created_at) VALUES (?, ?, ?, ?, ?)`,
		id, level, message, meta, now,
	)
	if err != nil {
		return nil, fmt.Errorf("insert log: %w", err)
	}
	return &LogEntry{
		ID:        id,
		Level:     level,
		Message:   message,
		Meta:      meta,
		CreatedAt: now,
	}, nil
}

func listLogs(db *sql.DB) ([]LogEntry, error) {
	rows, err := db.Query(`SELECT id, level, message, meta, created_at FROM _logs ORDER BY created_at DESC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var logs []LogEntry
	for rows.Next() {
		var l LogEntry
		if err := rows.Scan(&l.ID, &l.Level, &l.Message, &l.Meta, &l.CreatedAt); err != nil {
			return nil, err
		}
		logs = append(logs, l)
	}
	return logs, rows.Err()
}

func clearLogs(db *sql.DB) error {
	_, err := db.Exec(`DELETE FROM _logs`)
	return err
}

func webhookLogData(l *LogEntry) map[string]any {
	return map[string]any{
		"log": l,
	}
}

func (s *Server) handleLogsList(w http.ResponseWriter, r *http.Request) {
	logs, err := listLogs(s.db)
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

	id := generateID()
	entry, err := insertLog(s.db, id, body.Level, body.Message, body.Meta)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}

	go s.dispatchEvent(EventLogCreate, webhookLogData(entry))

	if s.logHub != nil {
		data, _ := json.Marshal(entry)
		s.logHub.Broadcast(data)
	}

	w.WriteHeader(http.StatusCreated)
	jsonResponse(w, entry)
}

func (s *Server) handleLogsClear(w http.ResponseWriter, r *http.Request) {
	if err := clearLogs(s.db); err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, map[string]string{"status": "cleared"})
}
