package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"sync"
	"time"
)

const (
	EventNotificationCreate = "notification.create"
)

type SSEClient struct {
	ID    string
	Ch    chan []byte
	mu    sync.Mutex
	close chan struct{}
}

type SSEHub struct {
	mu      sync.RWMutex
	clients map[string]*SSEClient
	db      *sql.DB
}

func NewSSEHub(db *sql.DB) *SSEHub {
	return &SSEHub{
		clients: make(map[string]*SSEClient),
		db:      db,
	}
}

func (h *SSEHub) Register(client *SSEClient) {
	h.mu.Lock()
	h.clients[client.ID] = client
	h.mu.Unlock()
}

func (h *SSEHub) Unregister(id string) {
	h.mu.Lock()
	delete(h.clients, id)
	h.mu.Unlock()
}

func (h *SSEHub) Broadcast(data []byte) {
	h.mu.RLock()
	defer h.mu.RUnlock()
	for _, client := range h.clients {
		select {
		case client.Ch <- data:
		default:
		}
	}
}

func (h *SSEHub) handleStream(w http.ResponseWriter, r *http.Request) {
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "streaming unsupported", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	id := generateID()
	client := &SSEClient{
		ID:    id,
		Ch:    make(chan []byte, 64),
		close: make(chan struct{}),
	}
	h.Register(client)
	defer h.Unregister(id)

	ctx := r.Context()
	for {
		select {
		case <-ctx.Done():
			return
		case data, ok := <-client.Ch:
			if !ok {
				return
			}
			fmt.Fprintf(w, "data: %s\n\n", data)
			flusher.Flush()
		}
	}
}

func insertNotification(db *sql.DB, id, title, body, ntype string) (*Notification, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	_, err := db.Exec(
		`INSERT INTO _notifications (id, title, body, type, created_at) VALUES (?, ?, ?, ?, ?)`,
		id, title, body, ntype, now,
	)
	if err != nil {
		return nil, fmt.Errorf("insert notification: %w", err)
	}
	return &Notification{
		ID:        id,
		Title:     title,
		Body:      body,
		Type:      ntype,
		IsRead:    false,
		CreatedAt: now,
	}, nil
}

func listNotifications(db *sql.DB) ([]Notification, error) {
	rows, err := db.Query(`SELECT id, title, body, type, is_read, created_at FROM _notifications ORDER BY created_at DESC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var notifications []Notification
	for rows.Next() {
		var n Notification
		var isRead int
		if err := rows.Scan(&n.ID, &n.Title, &n.Body, &n.Type, &isRead, &n.CreatedAt); err != nil {
			return nil, err
		}
		n.IsRead = isRead == 1
		notifications = append(notifications, n)
	}
	return notifications, rows.Err()
}

func getNotification(db *sql.DB, id string) (*Notification, error) {
	n := &Notification{}
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

func updateNotification(db *sql.DB, id string, title, body, ntype string, isRead bool) (*Notification, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	_, err := db.Exec(
		`UPDATE _notifications SET title = ?, body = ?, type = ?, is_read = ? WHERE id = ?`,
		title, body, ntype, boolToInt(isRead), id,
	)
	if err != nil {
		return nil, fmt.Errorf("update notification: %w", err)
	}
	return &Notification{ID: id, Title: title, Body: body, Type: ntype, IsRead: isRead, CreatedAt: now}, nil
}

func deleteNotification(db *sql.DB, id string) error {
	_, err := db.Exec(`DELETE FROM _notifications WHERE id = ?`, id)
	return err
}

func clearNotifications(db *sql.DB) error {
	_, err := db.Exec(`DELETE FROM _notifications`)
	return err
}

func boolToInt(b bool) int {
	if b {
		return 1
	}
	return 0
}

func webhookNotificationData(n *Notification) map[string]any {
	return map[string]any{
		"notification": n,
	}
}

// MARK: Handlers

func (s *Server) handleNotificationsList(w http.ResponseWriter, r *http.Request) {
	notifications, err := listNotifications(s.db)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, notifications)
}

func (s *Server) handleNotificationsGet(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	notification, err := getNotification(s.db, id)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if notification == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	jsonResponse(w, notification)
}

func (s *Server) handleNotificationsCreate(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Title string `json:"title"`
		Body  string `json:"body"`
		Type  string `json:"type"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Title == "" {
		errorJSON(w, "title is required", http.StatusBadRequest)
		return
	}
	if body.Type == "" {
		body.Type = "info"
	}
	validTypes := map[string]bool{"info": true, "success": true, "warning": true, "error": true}
	if !validTypes[body.Type] {
		errorJSON(w, "type must be info, success, warning, or error", http.StatusBadRequest)
		return
	}

	id := generateID()
	notification, err := insertNotification(s.db, id, body.Title, body.Body, body.Type)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}

	go s.dispatchEvent(EventNotificationCreate, webhookNotificationData(notification))

	if s.sseHub != nil {
		data, _ := json.Marshal(notification)
		s.sseHub.Broadcast(data)
	}

	w.WriteHeader(http.StatusCreated)
	jsonResponse(w, notification)
}

func (s *Server) handleNotificationsMarkRead(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	existing, err := getNotification(s.db, id)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if existing == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	updated, err := updateNotification(s.db, id, existing.Title, existing.Body, existing.Type, true)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, updated)
}

func (s *Server) handleNotificationsDelete(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	existing, err := getNotification(s.db, id)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if existing == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	if err := deleteNotification(s.db, id); err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func (s *Server) handleNotificationsClear(w http.ResponseWriter, r *http.Request) {
	if err := clearNotifications(s.db); err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, map[string]string{"status": "cleared"})
}
