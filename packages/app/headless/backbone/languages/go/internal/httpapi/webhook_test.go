package httpapi

import (
	"testing"

	"github.com/hieudoanm/backbone/internal/store"
)

func TestWebhookRecordData(t *testing.T) {
	r := &store.Record{ID: "123", Data: []byte(`{"x":1}`)}
	data := webhookRecordData("posts", r)
	if data["collection"] != "posts" {
		t.Fatalf("expected posts, got %v", data["collection"])
	}
}

func TestWebhookCollectionData(t *testing.T) {
	c := &store.Collection{Name: "test"}
	data := webhookCollectionData(c)
	if data["collection"] != c {
		t.Fatalf("unexpected data: %v", data)
	}
}

func TestWebhookBucketData(t *testing.T) {
	b := &store.Bucket{Name: "files"}
	data := webhookBucketData(b)
	if data["bucket"] != b {
		t.Fatalf("unexpected data: %v", data)
	}
}
