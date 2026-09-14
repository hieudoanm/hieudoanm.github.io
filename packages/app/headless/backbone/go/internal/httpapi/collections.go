package httpapi

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/hieudoanm/backbone/internal/events"
	"github.com/hieudoanm/backbone/internal/store"
)

func (s *Server) handleCollectionsList(w http.ResponseWriter, r *http.Request) {
	cols, err := store.ListCollections(s.db)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, cols)
}

func (s *Server) handleCollectionsCreate(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Name   string `json:"name"`
		Schema string `json:"schema"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Name == "" {
		errorJSON(w, "name is required", http.StatusBadRequest)
		return
	}
	if body.Schema == "" {
		body.Schema = "{}"
	}
	if err := store.CreateCollection(s.db, body.Name, body.Schema); err != nil {
		if strings.Contains(err.Error(), "UNIQUE") {
			errorJSON(w, "collection already exists", http.StatusConflict)
			return
		}
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	c, _ := store.GetCollection(s.db, body.Name)
	go s.dispatchEvent(events.EventCollectionCreate, webhookCollectionData(c))
	jsonResponse(w, c)
}

func (s *Server) handleCollectionsGet(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	c, err := store.GetCollection(s.db, name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if c == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	jsonResponse(w, c)
}

func (s *Server) handleCollectionsUpdate(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	c, err := store.GetCollection(s.db, name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if c == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}

	var body struct {
		Schema *string `json:"schema"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}

	if body.Schema != nil {
		if *body.Schema != "{}" && *body.Schema != c.Schema {
			if err := store.MigrateCollectionSchema(s.db, name, c.Schema, *body.Schema); err != nil {
				errorJSON(w, err.Error(), http.StatusInternalServerError)
				return
			}
		} else {
			if _, err := s.db.Exec(`UPDATE _collections SET schema = ?, updated_at = datetime('now') WHERE name = ?`, *body.Schema, name); err != nil {
				errorJSON(w, err.Error(), http.StatusInternalServerError)
				return
			}
		}
	}

	c, _ = store.GetCollection(s.db, name)
	jsonResponse(w, c)
}

func (s *Server) handleCollectionsDelete(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	c, err := store.GetCollection(s.db, name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if c == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	go s.dispatchEvent(events.EventCollectionDelete, webhookCollectionData(c))
	if err := store.DeleteCollection(s.db, name); err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
