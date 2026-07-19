package main

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"time"
)

type Permission struct {
	ID         string `json:"id"`
	UserID     string `json:"user_id"`
	Collection string `json:"collection"`
	Role       string `json:"role"`
	CreatedAt  string `json:"created_at"`
	UpdatedAt  string `json:"updated_at"`
}

func (s *Server) rbacMiddleware(requiredRoles ...string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			userID := r.Header.Get("X-User-ID")
			if userID == "" {
				errorJSON(w, "unauthorized", http.StatusUnauthorized)
				return
			}

			var permCount int
			s.db.QueryRow(`SELECT COUNT(*) FROM _permissions`).Scan(&permCount)
			if permCount == 0 {
				next.ServeHTTP(w, r)
				return
			}

			collection := r.PathValue("name")

			var role string
			var err error
			if collection == "" {
				for _, reqRole := range requiredRoles {
					err = s.db.QueryRow(
						`SELECT role FROM _permissions WHERE user_id = ? AND role = ? LIMIT 1`,
						userID, reqRole,
					).Scan(&role)
					if err == nil {
						break
					}
				}
			} else {
				err = s.db.QueryRow(
					`SELECT role FROM _permissions WHERE user_id = ? AND collection = ?`,
					userID, collection,
				).Scan(&role)
			}

			if err != nil {
				if err == sql.ErrNoRows {
					errorJSON(w, "forbidden", http.StatusForbidden)
					return
				}
				errorJSON(w, err.Error(), http.StatusInternalServerError)
				return
			}

			for _, required := range requiredRoles {
				if role == required {
					next.ServeHTTP(w, r)
					return
				}
			}
			if role == "admin" {
				next.ServeHTTP(w, r)
				return
			}

			errorJSON(w, "forbidden", http.StatusForbidden)
		})
	}
}

func (s *Server) handlePermissionsList(w http.ResponseWriter, r *http.Request) {
	rows, err := s.db.Query(`SELECT id, user_id, collection, role, created_at, updated_at FROM _permissions ORDER BY collection, user_id`)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var perms []Permission
	for rows.Next() {
		var p Permission
		if err := rows.Scan(&p.ID, &p.UserID, &p.Collection, &p.Role, &p.CreatedAt, &p.UpdatedAt); err != nil {
			errorJSON(w, err.Error(), http.StatusInternalServerError)
			return
		}
		perms = append(perms, p)
	}
	if err := rows.Err(); err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if perms == nil {
		perms = []Permission{}
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

	now := time.Now().UTC().Format(time.RFC3339)
	id := generateID()
	_, err := s.db.Exec(
		`INSERT INTO _permissions (id, user_id, collection, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)
		ON CONFLICT(user_id, collection) DO UPDATE SET role = excluded.role, updated_at = excluded.updated_at`,
		id, body.UserID, body.Collection, body.Role, now, now,
	)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}

	p := &Permission{ID: id, UserID: body.UserID, Collection: body.Collection, Role: body.Role, CreatedAt: now, UpdatedAt: now}
	jsonResponse(w, p)
}

func (s *Server) handlePermissionsDelete(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	res, err := s.db.Exec(`DELETE FROM _permissions WHERE id = ?`, id)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	n, _ := res.RowsAffected()
	if n == 0 {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
