package main

import (
	"testing"
)

func TestEventInList_Found(t *testing.T) {
	if !eventInList("record.create", []string{"record.create", "record.delete"}) {
		t.Fatal("expected true")
	}
}

func TestEventInList_NotFound(t *testing.T) {
	if eventInList("record.update", []string{"record.create", "record.delete"}) {
		t.Fatal("expected false")
	}
}

func TestEventInList_Empty(t *testing.T) {
	if eventInList("record.create", []string{}) {
		t.Fatal("expected false for empty list")
	}
}

func TestWriteWebhookEventsJSON_Nil(t *testing.T) {
	result := writeWebhookEventsJSON(nil)
	if result != "[]" {
		t.Fatalf("expected '[]', got %q", result)
	}
}

func TestWriteWebhookEventsJSON_Empty(t *testing.T) {
	result := writeWebhookEventsJSON([]string{})
	if result != "[]" {
		t.Fatalf("expected '[]', got %q", result)
	}
}

func TestWriteWebhookEventsJSON_Values(t *testing.T) {
	result := writeWebhookEventsJSON([]string{"record.create", "record.delete"})
	if result != `["record.create","record.delete"]` {
		t.Fatalf("unexpected result: %q", result)
	}
}

func TestWebhookRecordData(t *testing.T) {
	r := &Record{ID: "123", Data: []byte(`{"x":1}`)}
	data := webhookRecordData("posts", r)
	if data["collection"] != "posts" {
		t.Fatalf("expected posts, got %v", data["collection"])
	}
}

func TestWebhookCollectionData(t *testing.T) {
	c := &Collection{Name: "test"}
	data := webhookCollectionData(c)
	if data["collection"] != c {
		t.Fatalf("unexpected data: %v", data)
	}
}

func TestWebhookBucketData(t *testing.T) {
	b := &Bucket{Name: "files"}
	data := webhookBucketData(b)
	if data["bucket"] != b {
		t.Fatalf("unexpected data: %v", data)
	}
}

func TestValidateWebhookEvents_Valid(t *testing.T) {
	srv := &Server{secretsKey: make([]byte, 32)}
	events := []any{"record.create", "record.delete", "bucket.create", "secret.create", "cronjob.create", "notification.create", "log.create", "pubsub.topic.create", "pubsub.message.create"}
	result, err := srv.validateWebhookEvents(events)
	if err != nil {
		t.Fatal(err)
	}
	if len(result) != len(events) {
		t.Fatalf("expected %d events, got %d", len(events), len(result))
	}
}

func TestValidateWebhookEvents_NotArray(t *testing.T) {
	srv := &Server{secretsKey: make([]byte, 32)}
	_, err := srv.validateWebhookEvents("not an array")
	if err == nil {
		t.Fatal("expected error for non-array input")
	}
}

func TestValidateWebhookEvents_NonStringElement(t *testing.T) {
	srv := &Server{secretsKey: make([]byte, 32)}
	events := []any{42}
	_, err := srv.validateWebhookEvents(events)
	if err == nil {
		t.Fatal("expected error for non-string element")
	}
}

func TestValidateWebhookEvents_UnknownEvent(t *testing.T) {
	srv := &Server{secretsKey: make([]byte, 32)}
	events := []any{"unknown.event"}
	_, err := srv.validateWebhookEvents(events)
	if err == nil {
		t.Fatal("expected error for unknown event")
	}
}

func TestValidateWebhookEvents_Empty(t *testing.T) {
	srv := &Server{secretsKey: make([]byte, 32)}
	result, err := srv.validateWebhookEvents([]any{})
	if err != nil {
		t.Fatal(err)
	}
	if len(result) != 0 {
		t.Fatalf("expected 0, got %d", len(result))
	}
}
