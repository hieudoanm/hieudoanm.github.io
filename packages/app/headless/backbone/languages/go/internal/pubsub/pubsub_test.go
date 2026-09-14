package pubsub

import (
	"database/sql"
	"testing"

	"github.com/hieudoanm/backbone/internal/store"
)

func newTestDB(t *testing.T) (*sql.DB, func()) {
	t.Helper()
	dir := t.TempDir()
	t.Setenv("BACKBONE_DATA", dir)
	db, err := store.OpenDB()
	if err != nil {
		t.Fatal(err)
	}
	return db, func() { db.Close() }
}

func migrateDB(db *sql.DB) {
	if err := store.MigrateDB(db); err != nil {
		panic(err)
	}
}

func TestInsertPubSubTopic(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	topic, err := InsertTopic(db, "t1", "mytopic")
	if err != nil {
		t.Fatalf("insert: %v", err)
	}
	if topic.ID != "t1" || topic.Name != "mytopic" {
		t.Fatalf("unexpected topic: %+v", topic)
	}
}

func TestGetPubSubTopic(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	InsertTopic(db, "t1", "mytopic")

	topic, err := GetTopicByName(db, "mytopic")
	if err != nil {
		t.Fatal(err)
	}
	if topic == nil {
		t.Fatal("expected topic")
	}
	if topic.Name != "mytopic" {
		t.Fatalf("expected mytopic, got %s", topic.Name)
	}

	// Get nonexistent
	topic, err = GetTopicByName(db, "nonexistent")
	if err != nil {
		t.Fatal(err)
	}
	if topic != nil {
		t.Fatal("expected nil for nonexistent")
	}
}

func TestGetPubSubTopicByID(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	InsertTopic(db, "t1", "mytopic")

	topic, err := GetTopicByID(db, "t1")
	if err != nil {
		t.Fatal(err)
	}
	if topic == nil {
		t.Fatal("expected topic")
	}

	// Get nonexistent
	topic, err = GetTopicByID(db, "nonexistent")
	if err != nil {
		t.Fatal(err)
	}
	if topic != nil {
		t.Fatal("expected nil for nonexistent id")
	}
}

func TestListPubSubTopics(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	InsertTopic(db, "t1", "alpha")
	InsertTopic(db, "t2", "beta")

	topics, err := ListTopics(db)
	if err != nil {
		t.Fatal(err)
	}
	if len(topics) != 2 {
		t.Fatalf("expected 2, got %d", len(topics))
	}
}

func TestDeletePubSubTopic(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	InsertTopic(db, "t1", "mytopic")
	if err := DeleteTopic(db, "mytopic"); err != nil {
		t.Fatal(err)
	}

	topic, _ := GetTopicByName(db, "mytopic")
	if topic != nil {
		t.Fatal("expected nil after delete")
	}
}

func TestInsertPubSubMessage(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	InsertTopic(db, "t1", "chat")
	topic, _ := GetTopicByName(db, "chat")

	msg, err := InsertMessage(db, "m1", topic.ID, "hello world")
	if err != nil {
		t.Fatalf("insert message: %v", err)
	}
	if msg.ID != "m1" || msg.Body != "hello world" {
		t.Fatalf("unexpected message: %+v", msg)
	}
}

func TestListPubSubMessages(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	InsertTopic(db, "t1", "chat")
	topic, _ := GetTopicByName(db, "chat")

	InsertMessage(db, "m1", topic.ID, "msg1")
	InsertMessage(db, "m2", topic.ID, "msg2")

	messages, err := ListMessages(db, topic.ID)
	if err != nil {
		t.Fatal(err)
	}
	if len(messages) != 2 {
		t.Fatalf("expected 2 messages, got %d", len(messages))
	}
}

func TestWebhookPubSubTopicData(t *testing.T) {
	topic := &PubSubTopic{ID: "t1", Name: "test"}
	data := WebhookTopicData(topic)
	if data["topic"] != topic {
		t.Fatal("expected topic key to reference the topic")
	}
}

func TestWebhookPubSubMessageData(t *testing.T) {
	msg := &PubSubMessage{ID: "m1", Body: "test"}
	data := WebhookMessageData(msg)
	if data["message"] != msg {
		t.Fatal("expected message key to reference the message")
	}
}
