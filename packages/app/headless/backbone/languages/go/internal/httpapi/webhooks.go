package httpapi

import (
	"bytes"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/hieudoanm/backbone/internal/id"
	"github.com/hieudoanm/backbone/internal/store"
	"github.com/hieudoanm/backbone/internal/webhook"
)

func (s *Server) handleWebhooksList(w http.ResponseWriter, r *http.Request) {
	hooks, err := store.ListWebhooks(s.db)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, hooks)
}

func (s *Server) handleWebhooksCreate(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Name   string   `json:"name"`
		URL    string   `json:"url"`
		Events []string `json:"events"`
		Secret string   `json:"secret"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Name == "" {
		errorJSON(w, "name is required", http.StatusBadRequest)
		return
	}
	if body.URL == "" {
		errorJSON(w, "url is required", http.StatusBadRequest)
		return
	}
	if len(body.Events) == 0 {
		errorJSON(w, "at least one event is required", http.StatusBadRequest)
		return
	}
	eventsJSON := webhook.WriteEventsJSON(body.Events)
	h, err := store.CreateWebhook(s.db, body.Name, body.URL, eventsJSON, body.Secret)
	if err != nil {
		if isConflict(err) {
			errorJSON(w, "webhook already exists", http.StatusConflict)
			return
		}
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, h)
}

func (s *Server) handleWebhooksGet(w http.ResponseWriter, r *http.Request) {
	h, err := store.GetWebhook(s.db, r.PathValue("id"))
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if h == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	jsonResponse(w, h)
}

func (s *Server) handleWebhooksUpdate(w http.ResponseWriter, r *http.Request) {
	existing, err := store.GetWebhook(s.db, r.PathValue("id"))
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if existing == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}

	var body struct {
		Name     *string  `json:"name"`
		URL      *string  `json:"url"`
		Events   []string `json:"events"`
		Secret   *string  `json:"secret"`
		IsActive *bool    `json:"is_active"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}

	name := existing.Name
	if body.Name != nil {
		name = *body.Name
	}
	url := existing.URL
	if body.URL != nil {
		url = *body.URL
	}
	events := existing.Events
	if body.Events != nil {
		events = body.Events
	}
	secret := existing.Secret
	if body.Secret != nil {
		secret = *body.Secret
	}
	isActive := existing.IsActive
	if body.IsActive != nil {
		isActive = *body.IsActive
	}

	h, err := store.UpdateWebhook(s.db, existing.ID, name, url, webhook.WriteEventsJSON(events), secret, isActive)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, h)
}

func (s *Server) handleWebhooksDelete(w http.ResponseWriter, r *http.Request) {
	h, err := store.GetWebhook(s.db, r.PathValue("id"))
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if h == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	if err := store.DeleteWebhook(s.db, h.ID); err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func (s *Server) handleWebhookLogs(w http.ResponseWriter, r *http.Request) {
	h, err := store.GetWebhook(s.db, r.PathValue("id"))
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if h == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	logs, err := store.ListWebhookLogs(s.db, h.ID, 50)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if logs == nil {
		logs = []store.WebhookLog{}
	}
	jsonResponse(w, logs)
}

func (s *Server) dispatchEvent(event string, data any) {
	hooks, err := store.ListWebhooks(s.db)
	if err != nil {
		log.Printf("dispatchEvent: list webhooks: %v", err)
		return
	}

	now := time.Now().UTC().Format(time.RFC3339)
	payload := webhook.EventPayload{Event: event, CreatedAt: now, Data: data}
	body, err := json.Marshal(payload)
	if err != nil {
		log.Printf("dispatchEvent: marshal payload: %v", err)
		return
	}

	for _, h := range hooks {
		if !h.IsActive {
			continue
		}
		if !webhook.EventInList(event, h.Events) {
			continue
		}
		go s.sendWebhook(h, event, body)
	}
}

func (s *Server) sendWebhook(h store.Webhook, event string, body []byte) {
	req, err := http.NewRequest("POST", h.URL, bytes.NewReader(body))
	if err != nil {
		log.Printf("sendWebhook: create request: %v", err)
		s.logWebhookDelivery(h.ID, event, h.URL, string(body), 0, "", err.Error(), "failure")
		return
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-Webhook-ID", h.ID)
	req.Header.Set("X-Webhook-Event", event)

	if h.Secret != "" {
		mac := hmac.New(sha256.New, []byte(h.Secret))
		mac.Write(body)
		sig := hex.EncodeToString(mac.Sum(nil))
		req.Header.Set("X-Webhook-Signature-256", sig)
	}

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		log.Printf("sendWebhook: request failed: %v", err)
		s.logWebhookDelivery(h.ID, event, h.URL, string(body), 0, "", err.Error(), "failure")
		return
	}
	defer resp.Body.Close()

	var respBody bytes.Buffer
	respBody.ReadFrom(resp.Body)

	status := "success"
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		status = "failure"
	}

	s.logWebhookDelivery(h.ID, event, h.URL, string(body), resp.StatusCode, respBody.String(), "", status)
}

func (s *Server) logWebhookDelivery(webhookID, event, url, reqBody string, statusCode int, respBody, errMsg, status string) {
	now := time.Now().UTC().Format(time.RFC3339)
	logEntry := &store.WebhookLog{
		ID:             id.Generate(),
		WebhookID:      webhookID,
		Event:          event,
		URL:            url,
		RequestBody:    reqBody,
		ResponseStatus: statusCode,
		ResponseBody:   respBody,
		Error:          errMsg,
		Status:         status,
		CreatedAt:      now,
	}
	if err := store.InsertWebhookLog(s.db, logEntry); err != nil {
		log.Printf("logWebhookDelivery: insert log: %v", err)
	}
}

func webhookRecordData(collection string, record *store.Record) map[string]any {
	return map[string]any{
		"collection": collection,
		"record":     record,
	}
}

func webhookCollectionData(collection *store.Collection) map[string]any {
	return map[string]any{
		"collection": collection,
	}
}

func webhookBucketData(bucket *store.Bucket) map[string]any {
	return map[string]any{
		"bucket": bucket,
	}
}
