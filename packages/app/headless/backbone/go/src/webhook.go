package main

import (
	"bytes"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

const (
	EventRecordCreate     = "record.create"
	EventRecordUpdate     = "record.update"
	EventRecordDelete     = "record.delete"
	EventCollectionCreate = "collection.create"
	EventCollectionDelete = "collection.delete"
	EventBucketCreate     = "bucket.create"
	EventBucketDelete     = "bucket.delete"
)

type eventPayload struct {
	Event     string `json:"event"`
	CreatedAt string `json:"created_at"`
	Data      any    `json:"data"`
}

func (s *Server) dispatchEvent(event string, data any) {
	hooks, err := listWebhooks(s.db)
	if err != nil {
		log.Printf("dispatchEvent: list webhooks: %v", err)
		return
	}

	now := time.Now().UTC().Format(time.RFC3339)
	payload := eventPayload{Event: event, CreatedAt: now, Data: data}
	body, err := json.Marshal(payload)
	if err != nil {
		log.Printf("dispatchEvent: marshal payload: %v", err)
		return
	}

	for _, h := range hooks {
		if !h.IsActive {
			continue
		}
		if !eventInList(event, h.Events) {
			continue
		}

		go s.sendWebhook(h, event, body)
	}
}

func eventInList(event string, events []string) bool {
	for _, e := range events {
		if e == event {
			return true
		}
	}
	return false
}

func (s *Server) sendWebhook(h Webhook, event string, body []byte) {
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
	logEntry := &WebhookLog{
		ID:             generateID(),
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
	if err := insertWebhookLog(s.db, logEntry); err != nil {
		log.Printf("logWebhookDelivery: insert log: %v", err)
	}
}

// WebhookEventData builds the data payload for record events.
func webhookRecordData(collection string, record *Record) map[string]any {
	return map[string]any{
		"collection": collection,
		"record":     record,
	}
}

// WebhookCollectionEventData builds the data payload for collection events.
func webhookCollectionData(collection *Collection) map[string]any {
	return map[string]any{
		"collection": collection,
	}
}

// WebhookBucketData builds the data payload for bucket events.
func webhookBucketData(bucket *Bucket) map[string]any {
	return map[string]any{
		"bucket": bucket,
	}
}

func writeWebhookEventsJSON(events []string) string {
	if events == nil {
		return "[]"
	}
	b, err := json.Marshal(events)
	if err != nil {
		return "[]"
	}
	return string(b)
}

func (s *Server) validateWebhookEvents(events any) ([]string, error) {
	raw, ok := events.([]any)
	if !ok {
		return nil, fmt.Errorf("events must be an array")
	}
	var result []string
	for _, e := range raw {
		s, ok := e.(string)
		if !ok {
			return nil, fmt.Errorf("each event must be a string")
		}
		switch s {
		case EventRecordCreate, EventRecordUpdate, EventRecordDelete,
			EventCollectionCreate, EventCollectionDelete,
			EventBucketCreate, EventBucketDelete,
			EventSecretCreate, EventSecretUpdate, EventSecretDelete,
			EventCronjobCreate, EventCronjobUpdate, EventCronjobDelete,
			EventNotificationCreate,
			EventLogCreate,
			EventPubSubTopicCreate, EventPubSubTopicDelete, EventPubSubMessageCreate:
			result = append(result, s)
		default:
			return nil, fmt.Errorf("unknown event: %s", s)
		}
	}
	return result, nil
}
