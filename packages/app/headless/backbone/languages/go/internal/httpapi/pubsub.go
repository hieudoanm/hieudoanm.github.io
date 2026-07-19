package httpapi

import (
	"encoding/json"
	"net/http"

	"github.com/hieudoanm/backbone/internal/events"
	"github.com/hieudoanm/backbone/internal/id"
	"github.com/hieudoanm/backbone/internal/pubsub"
)

func (s *Server) handlePubSubTopicsList(w http.ResponseWriter, r *http.Request) {
	topics, err := pubsub.ListTopics(s.db)
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
	existing, err := pubsub.GetTopicByName(s.db, body.Name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if existing != nil {
		errorJSON(w, "topic already exists", http.StatusConflict)
		return
	}
	topic, err := pubsub.InsertTopic(s.db, id.Generate(), body.Name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	go s.dispatchEvent(events.EventPubSubTopicCreate, pubsub.WebhookTopicData(topic))
	w.WriteHeader(http.StatusCreated)
	jsonResponse(w, topic)
}

func (s *Server) handlePubSubTopicsGet(w http.ResponseWriter, r *http.Request) {
	topic, err := pubsub.GetTopicByName(s.db, r.PathValue("name"))
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
	existing, err := pubsub.GetTopicByName(s.db, name)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if existing == nil {
		errorJSON(w, "not found", http.StatusNotFound)
		return
	}
	if err := pubsub.DeleteTopic(s.db, name); err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	go s.dispatchEvent(events.EventPubSubTopicDelete, pubsub.WebhookTopicData(existing))
	w.WriteHeader(http.StatusNoContent)
}

func (s *Server) handlePubSubMessagesList(w http.ResponseWriter, r *http.Request) {
	topic, err := pubsub.GetTopicByName(s.db, r.PathValue("name"))
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if topic == nil {
		errorJSON(w, "topic not found", http.StatusNotFound)
		return
	}
	messages, err := pubsub.ListMessages(s.db, topic.ID)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	jsonResponse(w, messages)
}

func (s *Server) handlePubSubMessagesCreate(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	topic, err := pubsub.GetTopicByName(s.db, name)
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
	msg, err := pubsub.InsertMessage(s.db, id.Generate(), topic.ID, body.Body)
	if err != nil {
		errorJSON(w, err.Error(), http.StatusInternalServerError)
		return
	}
	go s.dispatchEvent(events.EventPubSubMessageCreate, pubsub.WebhookMessageData(msg))
	if s.pubsubHub != nil {
		data, _ := json.Marshal(msg)
		s.pubsubHub.Broadcast(data)
	}
	w.WriteHeader(http.StatusCreated)
	jsonResponse(w, msg)
}

func (s *Server) handlePubSubStream(w http.ResponseWriter, r *http.Request) {
	topic, err := pubsub.GetTopicByName(s.db, r.PathValue("name"))
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
	s.pubsubHub.HandleStream(w, r)
}
