package httpapi

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"github.com/hieudoanm/backbone/internal/events"
	"github.com/hieudoanm/backbone/internal/id"
	"github.com/hieudoanm/backbone/internal/store"
	"github.com/hieudoanm/backbone/internal/validation"
)

func (s *Server) handleRecordsCreate(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	c, err := store.GetCollection(s.db, name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if c == nil {
		errorJSON(w, "collection not found", http.StatusNotFound)
		return
	}

	var body struct {
		ID   string          `json:"id"`
		Data json.RawMessage `json:"data"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Data == nil {
		body.Data = json.RawMessage("{}")
	}
	if err := validation.ValidateData(body.Data, c.Schema); err != nil {
		errorJSON(w, err.Error(), http.StatusBadRequest)
		return
	}
	recID := body.ID
	if recID == "" {
		recID = id.Generate()
	}
	rec, err := store.CreateRecord(s.db, name, recID, body.Data)
	if err != nil {
		if strings.Contains(err.Error(), "UNIQUE") {
			errorJSON(w, "record with this id already exists", http.StatusConflict)
			return
		}
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	go s.dispatchEvent(events.EventRecordCreate, webhookRecordData(name, rec))
	jsonResponse(w, rec)
}

func (s *Server) handleRecordsList(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	c, err := store.GetCollection(s.db, name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if c == nil {
		errorJSON(w, "collection not found", http.StatusNotFound)
		return
	}

	page, _ := strconv.Atoi(r.URL.Query().Get("page"))
	if page < 1 {
		page = 1
	}
	perPage, _ := strconv.Atoi(r.URL.Query().Get("per_page"))
	if perPage < 1 || perPage > 100 {
		perPage = 20
	}

	filter := r.URL.Query()["filter"]
	sort := r.URL.Query().Get("sort")
	expandParam := r.URL.Query().Get("expand")
	var expand []string
	if expandParam != "" {
		for _, f := range strings.Split(expandParam, ",") {
			f = strings.TrimSpace(f)
			if f != "" {
				expand = append(expand, f)
			}
		}
	}

	search := r.URL.Query().Get("search")

	pageData, err := store.ListRecords(s.db, name, page, perPage, filter, sort, expand, search)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, pageData)
}

func (s *Server) handleRecordsGet(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	recID := r.PathValue("id")

	rec, err := store.GetRecord(s.db, name, recID)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if rec == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	jsonResponse(w, rec)
}

func (s *Server) handleRecordsUpdate(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	recID := r.PathValue("id")

	c, err := store.GetCollection(s.db, name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if c == nil {
		errorJSON(w, "collection not found", http.StatusNotFound)
		return
	}

	existing, err := store.GetRecord(s.db, name, recID)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if existing == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}

	var body struct {
		Data json.RawMessage `json:"data"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Data == nil {
		errorJSON(w, "data is required", http.StatusBadRequest)
		return
	}

	if err := validation.ValidateData(body.Data, c.Schema); err != nil {
		errorJSON(w, err.Error(), http.StatusBadRequest)
		return
	}

	rec, err := store.UpdateRecord(s.db, name, recID, body.Data)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	go s.dispatchEvent(events.EventRecordUpdate, webhookRecordData(name, rec))
	jsonResponse(w, rec)
}

func (s *Server) handleRecordsDelete(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	recID := r.PathValue("id")

	rec, err := store.GetRecord(s.db, name, recID)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if rec == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	go s.dispatchEvent(events.EventRecordDelete, webhookRecordData(name, rec))
	if err := store.DeleteRecord(s.db, name, recID); err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
