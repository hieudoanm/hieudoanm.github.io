package httpapi

import (
	"encoding/json"
	"net/http"

	"github.com/hieudoanm/backbone/internal/events"
	"github.com/hieudoanm/backbone/internal/id"
	"github.com/hieudoanm/backbone/internal/notification"
)

func (s *Server) handleNotificationsList(w http.ResponseWriter, r *http.Request) {
	notifications, err := notification.ListNotifications(s.db)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, notifications)
}

func (s *Server) handleNotificationsGet(w http.ResponseWriter, r *http.Request) {
	n, err := notification.GetNotification(s.db, r.PathValue("id"))
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if n == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	jsonResponse(w, n)
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

	n, err := notification.InsertNotification(s.db, id.Generate(), body.Title, body.Body, body.Type)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}

	go s.dispatchEvent(events.EventNotificationCreate, notification.WebhookNotificationData(n))

	if s.sseHub != nil {
		data, _ := json.Marshal(n)
		s.sseHub.Broadcast(data)
	}

	w.WriteHeader(http.StatusCreated)
	jsonResponse(w, n)
}

func (s *Server) handleNotificationsMarkRead(w http.ResponseWriter, r *http.Request) {
	existing, err := notification.GetNotification(s.db, r.PathValue("id"))
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if existing == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	updated, err := notification.UpdateNotification(s.db, existing.ID, existing.Title, existing.Body, existing.Type, true)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, updated)
}

func (s *Server) handleNotificationsDelete(w http.ResponseWriter, r *http.Request) {
	existing, err := notification.GetNotification(s.db, r.PathValue("id"))
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if existing == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	if err := notification.DeleteNotification(s.db, existing.ID); err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func (s *Server) handleNotificationsClear(w http.ResponseWriter, r *http.Request) {
	if err := notification.ClearNotifications(s.db); err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, map[string]string{"status": "cleared"})
}
