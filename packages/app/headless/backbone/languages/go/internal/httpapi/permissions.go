package httpapi

import (
	"encoding/json"
	"net/http"

	"github.com/hieudoanm/backbone/internal/id"
	"github.com/hieudoanm/backbone/internal/rbac"
)

func (s *Server) handlePermissionsList(w http.ResponseWriter, r *http.Request) {
	perms, err := rbac.ListPermissions(s.db)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if perms == nil {
		perms = []rbac.Permission{}
	}
	jsonResponse(w, perms)
}

func (s *Server) handlePermissionsCreate(w http.ResponseWriter, r *http.Request) {
	var body struct {
		UserID     string `json:"user_id"`
		Collection string `json:"collection"`
		Role       string `json:"role"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.UserID == "" {
		errorJSON(w, "user_id is required", http.StatusBadRequest)
		return
	}
	if body.Collection == "" {
		errorJSON(w, "collection is required", http.StatusBadRequest)
		return
	}
	if body.Role == "" {
		body.Role = "viewer"
	}
	validRoles := map[string]bool{"admin": true, "editor": true, "viewer": true}
	if !validRoles[body.Role] {
		errorJSON(w, "role must be admin, editor, or viewer", http.StatusBadRequest)
		return
	}

	p, err := rbac.UpsertPermission(s.db, id.Generate(), body.UserID, body.Collection, body.Role)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, p)
}

func (s *Server) handlePermissionsDelete(w http.ResponseWriter, r *http.Request) {
	deleted, err := rbac.DeletePermission(s.db, r.PathValue("id"))
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if !deleted {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
