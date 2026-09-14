// Package pubsub manages pub/sub topics and their messages.
package pubsub

import (
	"database/sql"
	"fmt"
	"time"
)

// PubSubTopic is a named message channel.
type PubSubTopic struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	CreatedAt string `json:"created_at"`
}

// PubSubMessage is a message published to a topic.
type PubSubMessage struct {
	ID        string `json:"id"`
	TopicID   string `json:"topic_id"`
	Body      string `json:"body"`
	CreatedAt string `json:"created_at"`
}

// InsertTopic creates a new topic.
func InsertTopic(db *sql.DB, id, name string) (*PubSubTopic, error) {
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

// ListTopics returns all topics, newest first.
func ListTopics(db *sql.DB) ([]PubSubTopic, error) {
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

// GetTopicByName returns a topic by name, or nil if absent.
func GetTopicByName(db *sql.DB, name string) (*PubSubTopic, error) {
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

// GetTopicByID returns a topic by ID, or nil if absent.
func GetTopicByID(db *sql.DB, id string) (*PubSubTopic, error) {
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

// DeleteTopic removes a topic and its messages.
func DeleteTopic(db *sql.DB, name string) error {
	_, err := db.Exec(`DELETE FROM _pubsub_messages WHERE topic_id = (SELECT id FROM _pubsub_topics WHERE name = ?)`, name)
	if err != nil {
		return err
	}
	_, err = db.Exec(`DELETE FROM _pubsub_topics WHERE name = ?`, name)
	return err
}

// InsertMessage publishes a message to a topic.
func InsertMessage(db *sql.DB, id, topicID, body string) (*PubSubMessage, error) {
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

// ListMessages returns messages for a topic, newest first.
func ListMessages(db *sql.DB, topicID string) ([]PubSubMessage, error) {
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

// WebhookTopicData wraps a topic for webhook payloads.
func WebhookTopicData(t *PubSubTopic) map[string]any {
	return map[string]any{"topic": t}
}

// WebhookMessageData wraps a message for webhook payloads.
func WebhookMessageData(m *PubSubMessage) map[string]any {
	return map[string]any{"message": m}
}
