package main

import (
	"testing"
)

func TestInsertLog(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	entry, err := insertLog(db, "l1", "info", "test message", `{"key":"val"}`)
	if err != nil {
		t.Fatalf("insert: %v", err)
	}
	if entry.ID != "l1" || entry.Level != "info" || entry.Message != "test message" || entry.Meta != `{"key":"val"}` {
		t.Fatalf("unexpected entry: %+v", entry)
	}
}

func TestListLogs(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	insertLog(db, "l1", "info", "msg1", "{}")
	insertLog(db, "l2", "warn", "msg2", `{"x":1}`)

	logs, err := listLogs(db)
	if err != nil {
		t.Fatal(err)
	}
	if len(logs) != 2 {
		t.Fatalf("expected 2 logs, got %d", len(logs))
	}
}

func TestClearLogs(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	insertLog(db, "l1", "info", "msg1", "{}")
	if err := clearLogs(db); err != nil {
		t.Fatal(err)
	}

	logs, _ := listLogs(db)
	if len(logs) != 0 {
		t.Fatalf("expected 0 logs after clear, got %d", len(logs))
	}
}

func TestWebhookLogData(t *testing.T) {
	l := &LogEntry{ID: "l1", Level: "info", Message: "test"}
	data := webhookLogData(l)
	if data["log"] != l {
		t.Fatal("expected log key to reference the entry")
	}
}
