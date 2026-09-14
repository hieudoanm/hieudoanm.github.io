// Package log provides app-level log persistence.
package log

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/hieudoanm/backbone/internal/store"
)

// InsertLog stores a new log entry.
func InsertLog(db *sql.DB, id, level, message, meta string) (*store.LogEntry, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	_, err := db.Exec(
		`INSERT INTO _logs (id, level, message, meta, created_at) VALUES (?, ?, ?, ?, ?)`,
		id, level, message, meta, now,
	)
	if err != nil {
		return nil, fmt.Errorf("insert log: %w", err)
	}
	return &store.LogEntry{
		ID:        id,
		Level:     level,
		Message:   message,
		Meta:      meta,
		CreatedAt: now,
	}, nil
}

// ListLogs returns all logs, newest first.
func ListLogs(db *sql.DB) ([]store.LogEntry, error) {
	rows, err := db.Query(`SELECT id, level, message, meta, created_at FROM _logs ORDER BY created_at DESC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var logs []store.LogEntry
	for rows.Next() {
		var l store.LogEntry
		if err := rows.Scan(&l.ID, &l.Level, &l.Message, &l.Meta, &l.CreatedAt); err != nil {
			return nil, err
		}
		logs = append(logs, l)
	}
	return logs, rows.Err()
}

// ClearLogs removes all log entries.
func ClearLogs(db *sql.DB) error {
	_, err := db.Exec(`DELETE FROM _logs`)
	return err
}

// WebhookLogData wraps a log entry for webhook payloads.
func WebhookLogData(l *store.LogEntry) map[string]any {
	return map[string]any{
		"log": l,
	}
}
