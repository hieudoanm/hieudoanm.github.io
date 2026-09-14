// Package notification manages user-visible notifications.
package notification

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/hieudoanm/backbone/internal/store"
)

// InsertNotification creates a notification.
func InsertNotification(db *sql.DB, id, title, body, ntype string) (*store.Notification, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	_, err := db.Exec(
		`INSERT INTO _notifications (id, title, body, type, created_at) VALUES (?, ?, ?, ?, ?)`,
		id, title, body, ntype, now,
	)
	if err != nil {
		return nil, fmt.Errorf("insert notification: %w", err)
	}
	return &store.Notification{
		ID:        id,
		Title:     title,
		Body:      body,
		Type:      ntype,
		IsRead:    false,
		CreatedAt: now,
	}, nil
}

// ListNotifications returns all notifications, newest first.
func ListNotifications(db *sql.DB) ([]store.Notification, error) {
	rows, err := db.Query(`SELECT id, title, body, type, is_read, created_at FROM _notifications ORDER BY created_at DESC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var notifications []store.Notification
	for rows.Next() {
		var n store.Notification
		var isRead int
		if err := rows.Scan(&n.ID, &n.Title, &n.Body, &n.Type, &isRead, &n.CreatedAt); err != nil {
			return nil, err
		}
		n.IsRead = isRead == 1
		notifications = append(notifications, n)
	}
	return notifications, rows.Err()
}

// GetNotification returns a notification by ID, or nil if absent.
func GetNotification(db *sql.DB, id string) (*store.Notification, error) {
	n := &store.Notification{}
	var isRead int
	err := db.QueryRow(
		`SELECT id, title, body, type, is_read, created_at FROM _notifications WHERE id = ?`, id,
	).Scan(&n.ID, &n.Title, &n.Body, &n.Type, &isRead, &n.CreatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	n.IsRead = isRead == 1
	return n, nil
}

// UpdateNotification modifies a notification.
func UpdateNotification(db *sql.DB, id string, title, body, ntype string, isRead bool) (*store.Notification, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	_, err := db.Exec(
		`UPDATE _notifications SET title = ?, body = ?, type = ?, is_read = ? WHERE id = ?`,
		title, body, ntype, boolToInt(isRead), id,
	)
	if err != nil {
		return nil, fmt.Errorf("update notification: %w", err)
	}
	return &store.Notification{ID: id, Title: title, Body: body, Type: ntype, IsRead: isRead, CreatedAt: now}, nil
}

// DeleteNotification removes a notification.
func DeleteNotification(db *sql.DB, id string) error {
	_, err := db.Exec(`DELETE FROM _notifications WHERE id = ?`, id)
	return err
}

// ClearNotifications removes all notifications.
func ClearNotifications(db *sql.DB) error {
	_, err := db.Exec(`DELETE FROM _notifications`)
	return err
}

func boolToInt(b bool) int {
	if b {
		return 1
	}
	return 0
}

// WebhookNotificationData wraps a notification for webhook payloads.
func WebhookNotificationData(n *store.Notification) map[string]any {
	return map[string]any{
		"notification": n,
	}
}
