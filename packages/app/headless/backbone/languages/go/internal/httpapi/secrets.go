package httpapi

import (
	"encoding/json"
	"net/http"

	"github.com/hieudoanm/backbone/internal/events"
	"github.com/hieudoanm/backbone/internal/id"
	"github.com/hieudoanm/backbone/internal/secrets"
	"github.com/hieudoanm/backbone/internal/store"
)

func (s *Server) handleSecretsList(w http.ResponseWriter, r *http.Request) {
	secretList, err := store.ListSecrets(s.db)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	type secretItem struct {
		ID        string `json:"id"`
		Name      string `json:"name"`
		Scope     string `json:"scope"`
		CreatedAt string `json:"created_at"`
		UpdatedAt string `json:"updated_at"`
	}
	items := make([]secretItem, 0, len(secretList))
	for _, sec := range secretList {
		items = append(items, secretItem{ID: sec.ID, Name: sec.Name, Scope: sec.Scope, CreatedAt: sec.CreatedAt, UpdatedAt: sec.UpdatedAt})
	}
	jsonResponse(w, items)
}

func (s *Server) handleSecretsCreate(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Name  string `json:"name"`
		Value string `json:"value"`
		Scope string `json:"scope"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Name == "" {
		errorJSON(w, "name is required", http.StatusBadRequest)
		return
	}
	if body.Scope == "" {
		body.Scope = "general"
	}
	encrypted, err := secrets.EncryptSecret(s.secretsKey, body.Value)
	if err != nil {
		errorJSON(w, "encryption error", http.StatusInternalServerError)
		return
	}
	secret, err := store.CreateSecret(s.db, id.Generate(), body.Name, encrypted, body.Scope)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	go s.dispatchEvent(events.EventSecretCreate, secrets.WebhookSecretData(secret))
	w.WriteHeader(http.StatusCreated)
	jsonResponse(w, secret)
}

func (s *Server) handleSecretsGet(w http.ResponseWriter, r *http.Request) {
	secret, err := store.GetSecret(s.db, r.PathValue("id"))
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if secret == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	decrypted, err := secrets.DecryptSecret(s.secretsKey, secret.Value)
	if err != nil {
		errorJSON(w, "decryption error", http.StatusInternalServerError)
		return
	}
	secret.Value = decrypted
	jsonResponse(w, secret)
}

func (s *Server) handleSecretsUpdate(w http.ResponseWriter, r *http.Request) {
	existing, err := store.GetSecret(s.db, r.PathValue("id"))
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if existing == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	var body struct {
		Name  string `json:"name"`
		Value string `json:"value"`
		Scope string `json:"scope"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Name == "" {
		body.Name = existing.Name
	}
	if body.Scope == "" {
		body.Scope = existing.Scope
	}
	plaintext := body.Value
	if plaintext == "" {
		if v, err := secrets.DecryptSecret(s.secretsKey, existing.Value); err == nil {
			plaintext = v
		}
	}
	encrypted, err := secrets.EncryptSecret(s.secretsKey, plaintext)
	if err != nil {
		errorJSON(w, "encryption error", http.StatusInternalServerError)
		return
	}
	secret, err := store.UpdateSecret(s.db, existing.ID, body.Name, encrypted, body.Scope)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	go s.dispatchEvent(events.EventSecretUpdate, secrets.WebhookSecretData(secret))
	jsonResponse(w, secret)
}

func (s *Server) handleSecretsDelete(w http.ResponseWriter, r *http.Request) {
	secret, err := store.GetSecret(s.db, r.PathValue("id"))
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if secret == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	if err := store.DeleteSecret(s.db, secret.ID); err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	go s.dispatchEvent(events.EventSecretDelete, secrets.WebhookSecretData(secret))
	w.WriteHeader(http.StatusNoContent)
}
