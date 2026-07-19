package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

const (
	EventPubSubTopicCreate   = "pubsub.topic.create"
	EventPubSubTopicDelete   = "pubsub.topic.delete"
	EventPubSubMessageCreate = "pubsub.message.create"
)

type PubSubTopic struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	CreatedAt string `json:"created_at"`
}

type PubSubMessage struct {
	ID        string `json:"id"`
	TopicID   string `json:"topic_id"`
	Body      string `json:"body"`
	CreatedAt string `json:"created_at"`
}

func insertPubSubTopic(db *sql.DB, id, name string) (*PubSubTopic, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	_, err := db.Exec(
		`INSERT INTO _pubsub_topics (id, name, created_at) VALUES (?, ?, ?)`,
		id, name, now,
	)
	if err != nil {
		return nil, fmt.Errorf("insert pubsub topic: %w", err)
	}
	return &PubSubTopic{ID: id, Name: name, CreatedAt: now}, nil
}

func listPubSubTopics(db *sql.DB) ([]PubSubTopic, error) {
	rows, err := db.Query(`SELECT id, name, created_at FROM _pubsub_topics ORDER BY created_at DESC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var topics []PubSubTopic
	for rows.Next() {
		var t PubSubTopic
		if err := rows.Scan(&t.ID, &t.Name, &t.CreatedAt); err != nil {
			return nil, err
		}
		topics = append(topics, t)
	}
	return topics, rows.Err()
}

func getPubSubTopic(db *sql.DB, name string) (*PubSubTopic, error) {
	t := &PubSubTopic{}
	err := db.QueryRow(
		`SELECT id, name, created_at FROM _pubsub_topics WHERE name = ?`, name,
	).Scan(&t.ID, &t.Name, &t.CreatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return t, nil
}

func getPubSubTopicByID(db *sql.DB, id string) (*PubSubTopic, error) {
	t := &PubSubTopic{}
	err := db.QueryRow(
		`SELECT id, name, created_at FROM _pubsub_topics WHERE id = ?`, id,
	).Scan(&t.ID, &t.Name, &t.CreatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return t, nil
}

func deletePubSubTopic(db *sql.DB, name string) error {
	_, err := db.Exec(`DELETE FROM _pubsub_messages WHERE topic_id = (SELECT id FROM _pubsub_topics WHERE name = ?)`, name)
	if err != nil {
		return err
	}
	_, err = db.Exec(`DELETE FROM _pubsub_topics WHERE name = ?`, name)
	return err
}

func insertPubSubMessage(db *sql.DB, id, topicID, body string) (*PubSubMessage, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	_, err := db.Exec(
		`INSERT INTO _pubsub_messages (id, topic_id, body, created_at) VALUES (?, ?, ?, ?)`,
		id, topicID, body, now,
	)
	if err != nil {
		return nil, fmt.Errorf("insert pubsub message: %w", err)
	}
	return &PubSubMessage{ID: id, TopicID: topicID, Body: body, CreatedAt: now}, nil
}

func listPubSubMessages(db *sql.DB, topicID string) ([]PubSubMessage, error) {
	rows, err := db.Query(
		`SELECT id, topic_id, body, created_at FROM _pubsub_messages WHERE topic_id = ? ORDER BY created_at DESC`,
		topicID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var messages []PubSubMessage
	for rows.Next() {
		var m PubSubMessage
		if err := rows.Scan(&m.ID, &m.TopicID, &m.Body, &m.CreatedAt); err != nil {
			return nil, err
		}
		messages = append(messages, m)
	}
	return messages, rows.Err()
}

func webhookPubSubTopicData(t *PubSubTopic) map[string]any {
	return map[string]any{"topic": t}
}

func webhookPubSubMessageData(m *PubSubMessage) map[string]any {
	return map[string]any{"message": m}
}

// MARK: Handlers

func (s *Server) handlePubSubTopicsList(w http.ResponseWriter, r *http.Request) {
	topics, err := listPubSubTopics(s.db)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, topics)
}

func (s *Server) handlePubSubTopicsCreate(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Name string `json:"name"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Name == "" {
		errorJSON(w, "name is required", http.StatusBadRequest)
		return
	}
	existing, err := getPubSubTopic(s.db, body.Name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if existing != nil {
		errorJSON(w, "topic already exists", http.StatusConflict)
		return
	}
	id := generateID()
	topic, err := insertPubSubTopic(s.db, id, body.Name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	go s.dispatchEvent(EventPubSubTopicCreate, webhookPubSubTopicData(topic))
	w.WriteHeader(http.StatusCreated)
	jsonResponse(w, topic)
}

func (s *Server) handlePubSubTopicsGet(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	topic, err := getPubSubTopic(s.db, name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if topic == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	jsonResponse(w, topic)
}

func (s *Server) handlePubSubTopicsDelete(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	existing, err := getPubSubTopic(s.db, name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if existing == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	if err := deletePubSubTopic(s.db, name); err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	go s.dispatchEvent(EventPubSubTopicDelete, webhookPubSubTopicData(existing))
	w.WriteHeader(http.StatusNoContent)
}

func (s *Server) handlePubSubMessagesList(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	topic, err := getPubSubTopic(s.db, name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if topic == nil {
		errorJSON(w, "topic not found", http.StatusNotFound)
		return
	}
	messages, err := listPubSubMessages(s.db, topic.ID)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, messages)
}

func (s *Server) handlePubSubMessagesCreate(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	topic, err := getPubSubTopic(s.db, name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if topic == nil {
		errorJSON(w, "topic not found", http.StatusNotFound)
		return
	}
	var body struct {
		Body string `json:"body"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		errorJSON(w, "invalid json", http.StatusBadRequest)
		return
	}
	if body.Body == "" {
		errorJSON(w, "body is required", http.StatusBadRequest)
		return
	}
	id := generateID()
	msg, err := insertPubSubMessage(s.db, id, topic.ID, body.Body)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	go s.dispatchEvent(EventPubSubMessageCreate, webhookPubSubMessageData(msg))
	if s.pubsubHub != nil {
		data, _ := json.Marshal(msg)
		s.pubsubHub.Broadcast(data)
	}
	w.WriteHeader(http.StatusCreated)
	jsonResponse(w, msg)
}

func (s *Server) handlePubSubStream(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	topic, err := getPubSubTopic(s.db, name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if topic == nil {
		errorJSON(w, "topic not found", http.StatusNotFound)
		return
	}
	if s.pubsubHub == nil {
		http.Error(w, "pubsub not available", http.StatusInternalServerError)
		return
	}
	s.pubsubHub.handleStream(w, r)
}
