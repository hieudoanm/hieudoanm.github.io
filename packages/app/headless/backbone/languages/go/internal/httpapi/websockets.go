package httpapi

import (
	"encoding/json"
	"net/http"

	"github.com/hieudoanm/backbone/internal/store"
)

func (s *Server) handleWSList(w http.ResponseWriter, r *http.Request) {
	conns, err := store.ListWSConnections(s.db)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, conns)
}

func (s *Server) handleWSGet(w http.ResponseWriter, r *http.Request) {
	conn, err := store.GetWSConnection(s.db, r.PathValue("id"))
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if conn == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	jsonResponse(w, conn)
}

func (s *Server) handleWSDelete(w http.ResponseWriter, r *http.Request) {
	conn, err := store.GetWSConnection(s.db, r.PathValue("id"))
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if conn == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	if s.wsHub != nil {
		s.wsHub.CloseClient(conn.ID)
	}
	if err := store.DeleteWSConnection(s.db, conn.ID); err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func (s *Server) handleWSBroadcast(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Content string `json:"content"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Content == "" {
		errorJSON(w, "content is required", http.StatusBadRequest)
		return
	}
	if s.wsHub != nil {
		s.wsHub.Broadcast([]byte(body.Content))
	}
	store.InsertWSMessage(s.db, "", "sent", body.Content)
	jsonResponse(w, map[string]string{"status": "broadcasted"})
}

func (s *Server) handleWSSend(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	var body struct {
		Content string `json:"content"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Content == "" {
		errorJSON(w, "content is required", http.StatusBadRequest)
		return
	}
	if s.wsHub != nil {
		if !s.wsHub.SendToClient(id, []byte(body.Content)) {
			errorJSON(w, "client not found or disconnected", http.StatusNotFound)
			return
		}
	}
	store.InsertWSMessage(s.db, id, "sent", body.Content)
	jsonResponse(w, map[string]string{"status": "sent"})
}

func (s *Server) handleWSMessages(w http.ResponseWriter, r *http.Request) {
	msgs, err := store.ListWSMessages(s.db, r.PathValue("id"))
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, msgs)
}

func (s *Server) handleWSAllMessages(w http.ResponseWriter, r *http.Request) {
	msgs, err := store.ListAllWSMessages(s.db)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, msgs)
}
