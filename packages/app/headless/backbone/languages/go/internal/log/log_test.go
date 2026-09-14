package log

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
	store.MigrateDB(db)
}

func TestInsertLog(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	entry, err := InsertLog(db, "l1", "info", "test message", `{"key":"val"}`)
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

	InsertLog(db, "l1", "info", "msg1", "{}")
	InsertLog(db, "l2", "warn", "msg2", `{"x":1}`)

	logs, err := ListLogs(db)
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

	InsertLog(db, "l1", "info", "msg1", "{}")
	if err := ClearLogs(db); err != nil {
		t.Fatal(err)
	}

	logs, _ := ListLogs(db)
	if len(logs) != 0 {
		t.Fatalf("expected 0 logs after clear, got %d", len(logs))
	}
}
