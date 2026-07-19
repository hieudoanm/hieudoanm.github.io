package httpapi

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/hieudoanm/backbone/internal/auth"
)

func (s *Server) handleRegister(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Email == "" || body.Password == "" {
		errorJSON(w, "email and password are required", http.StatusBadRequest)
		return
	}
	if len(body.Password) < 6 {
		errorJSON(w, "password must be at least 6 characters", http.StatusBadRequest)
		return
	}

	user, err := auth.RegisterUser(s.db, body.Email, body.Password)
	if err != nil {
		if strings.Contains(err.Error(), "UNIQUE") {
			errorJSON(w, "email already registered", http.StatusConflict)
			return
		}
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, user)
}

func (s *Server) handleLogin(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Email == "" || body.Password == "" {
		errorJSON(w, "email and password are required", http.StatusBadRequest)
		return
	}

	user, token, err := auth.LoginUser(s.db, body.Email, body.Password)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusUnauthorized)
		return
	}
	jsonResponse(w, map[string]any{
		"user":  user,
		"token": token,
	})
}
