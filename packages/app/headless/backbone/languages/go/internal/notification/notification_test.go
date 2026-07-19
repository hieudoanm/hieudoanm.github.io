package notification

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

func TestInsertNotification(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	n, err := InsertNotification(db, "n1", "Test Title", "Test Body", "info")
	if err != nil {
		t.Fatalf("insert: %v", err)
	}
	if n.ID != "n1" || n.Title != "Test Title" || n.Body != "Test Body" || n.Type != "info" {
		t.Fatalf("unexpected notification: %+v", n)
	}
	if n.IsRead {
		t.Fatal("expected is_read false")
	}
}

func TestGetNotification(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	InsertNotification(db, "n1", "Title", "Body", "info")

	n, err := GetNotification(db, "n1")
	if err != nil {
		t.Fatal(err)
	}
	if n == nil {
		t.Fatal("expected notification")
	}
	if n.Title != "Title" {
		t.Fatalf("expected Title, got %s", n.Title)
	}

	// Get nonexistent
	n, err = GetNotification(db, "nonexistent")
	if err != nil {
		t.Fatal(err)
	}
	if n != nil {
		t.Fatal("expected nil for nonexistent")
	}
}

func TestListNotifications(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	InsertNotification(db, "n1", "A", "B1", "info")
	InsertNotification(db, "n2", "B", "B2", "warning")

	notifications, err := ListNotifications(db)
	if err != nil {
		t.Fatal(err)
	}
	if len(notifications) != 2 {
		t.Fatalf("expected 2, got %d", len(notifications))
	}
}

func TestUpdateNotification(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	InsertNotification(db, "n1", "Old Title", "Old Body", "info")

	updated, err := UpdateNotification(db, "n1", "New Title", "New Body", "success", true)
	if err != nil {
		t.Fatal(err)
	}
	if updated.Title != "New Title" || updated.Body != "New Body" || updated.Type != "success" || !updated.IsRead {
		t.Fatalf("unexpected: %+v", updated)
	}
}

func TestDeleteNotification(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	InsertNotification(db, "n1", "Title", "Body", "info")
	if err := DeleteNotification(db, "n1"); err != nil {
		t.Fatal(err)
	}

	n, _ := GetNotification(db, "n1")
	if n != nil {
		t.Fatal("expected nil after delete")
	}
}

func TestClearNotifications(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	InsertNotification(db, "n1", "A", "B", "info")
	InsertNotification(db, "n2", "C", "D", "warning")

	if err := ClearNotifications(db); err != nil {
		t.Fatal(err)
	}

	notifications, _ := ListNotifications(db)
	if len(notifications) != 0 {
		t.Fatalf("expected 0, got %d", len(notifications))
	}
}

func TestWebhookNotificationData(t *testing.T) {
	n := &store.Notification{ID: "n1", Title: "Test"}
	data := WebhookNotificationData(n)
	if data["notification"] != n {
		t.Fatal("expected notification key to reference the notification")
	}
}

func TestBoolToInt(t *testing.T) {
	if v := boolToInt(true); v != 1 {
		t.Fatalf("expected 1, got %d", v)
	}
	if v := boolToInt(false); v != 0 {
		t.Fatalf("expected 0, got %d", v)
	}
}

func TestInsertNotification_DBError(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	_, err := InsertNotification(db, "err", "t", "b", "info")
	if err == nil {
		t.Fatal("expected error with un-migrated DB")
	}
}

func TestUpdateNotification_DBError(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	_, err := UpdateNotification(db, "err", "t", "b", "info", false)
	if err == nil {
		t.Fatal("expected error with un-migrated DB")
	}
}
