package main

import (
	"testing"
	"time"
)

func TestNewCacheStore(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	cs := NewCacheStore(db)
	if cs == nil {
		t.Fatal("expected non-nil cache")
	}
	if cs.data == nil {
		t.Fatal("expected data map")
	}
}

func TestCacheSetGet(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	cs := NewCacheStore(db)

	entry := cs.Set("key1", "value1", 0)
	if entry.Key != "key1" || entry.Value != "value1" {
		t.Fatalf("unexpected entry: %+v", entry)
	}

	got := cs.Get("key1")
	if got == nil {
		t.Fatal("expected entry")
	}
	if got.Value != "value1" {
		t.Fatalf("expected value1, got %s", got.Value)
	}
}

func TestCacheGet_NotFound(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	cs := NewCacheStore(db)
	got := cs.Get("nonexistent")
	if got != nil {
		t.Fatal("expected nil for missing key")
	}
}

func TestCacheDelete(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	cs := NewCacheStore(db)
	cs.Set("k", "v", 0)

	if !cs.Delete("k") {
		t.Fatal("expected true on delete")
	}
	if cs.Get("k") != nil {
		t.Fatal("expected nil after delete")
	}
}

func TestCacheDelete_NotFound(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	cs := NewCacheStore(db)
	if cs.Delete("nonexistent") {
		t.Fatal("expected false for nonexistent key")
	}
}

func TestCacheStoreList(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	cs := NewCacheStore(db)
	cs.Set("a", "1", 0)
	cs.Set("b", "2", 0)

	entries := cs.List()
	if len(entries) != 2 {
		t.Fatalf("expected 2 entries, got %d", len(entries))
	}
}

func TestCacheStoreFlush(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	cs := NewCacheStore(db)
	cs.Set("x", "1", 0)
	cs.Set("y", "2", 0)
	cs.Flush()

	entries := cs.List()
	if len(entries) != 0 {
		t.Fatalf("expected 0 entries after flush, got %d", len(entries))
	}
}

func TestCacheStoreStats(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	cs := NewCacheStore(db)
	stats := cs.Stats()
	total, _ := stats["total_entries"].(int)
	if total != 0 {
		t.Fatalf("expected 0, got %d", total)
	}

	cs.Set("k", "v", 0)
	stats = cs.Stats()
	total, _ = stats["total_entries"].(int)
	if total != 1 {
		t.Fatalf("expected 1, got %d", total)
	}
}

func TestCacheSetWithTTL(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	cs := NewCacheStore(db)
	cs.Set("temp", "data", 1)

	got := cs.Get("temp")
	if got == nil {
		t.Fatal("expected entry before TTL")
	}

	time.Sleep(1100 * time.Millisecond)

	got = cs.Get("temp")
	if got != nil {
		t.Fatal("expected nil after TTL")
	}
}

func TestCachePersistToDB(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	cs := NewCacheStore(db)
	cs.Set("persist-key", "persist-value", 0)

	dbEntry, err := getCacheEntry(db, "persist-key")
	if err != nil {
		t.Fatal(err)
	}
	if dbEntry == nil {
		t.Fatal("expected entry in db")
	}
	if dbEntry.Value != "persist-value" {
		t.Fatalf("expected persist-value, got %s", dbEntry.Value)
	}
}

func TestCacheLoadFromDB(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	_, err := setCacheEntry(db, "dbkey", "dbvalue", 0)
	if err != nil {
		t.Fatal(err)
	}

	cs := NewCacheStore(db)
	got := cs.Get("dbkey")
	if got == nil {
		t.Fatal("expected entry loaded from db")
	}
	if got.Value != "dbvalue" {
		t.Fatalf("expected dbvalue, got %s", got.Value)
	}
}

func TestCacheLoadAfterMiss(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	cs := NewCacheStore(db)

	// Write directly to DB (bypassing cache)
	setCacheEntry(db, "lazy-key", "lazy-val", 0)

	// Get should miss in memory, load from DB
	got := cs.Get("lazy-key")
	if got == nil {
		t.Fatal("expected entry loaded lazily")
	}
	if got.Value != "lazy-val" {
		t.Fatalf("expected lazy-val, got %s", got.Value)
	}
}

func TestCacheList_WithExpiredEntry(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	cs := NewCacheStore(db)
	cs.Set("valid", "val", 0)
	// Insert expired entry directly into DB (bypasses TTL check in memory)
	db.Exec(`INSERT INTO _cache (key, value, ttl, expires_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`,
		"stale", "old", 1, time.Now().UTC().Add(-1*time.Hour).Format(time.RFC3339),
		time.Now().UTC().Format(time.RFC3339), time.Now().UTC().Format(time.RFC3339))

	entries := cs.List()
	found := false
	for _, e := range entries {
		if e.Key == "valid" {
			found = true
		}
		if e.Key == "stale" {
			t.Fatal("expired entry should not appear in List")
		}
	}
	if !found {
		t.Fatal("expected valid entry in list")
	}
}

func TestCacheStoreStats_WithExpired(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	cs := NewCacheStore(db)
	cs.Set("good", "val", 0)
	cs.Set("expiring", "val", 1) // will expire by the time we check

	time.Sleep(1100 * time.Millisecond)

	stats := cs.Stats()
	total := stats["total_entries"].(int)
	expired := stats["expired_entries"].(int)
	if total != 2 {
		t.Fatalf("expected 2 total, got %d", total)
	}
	if expired != 1 {
		t.Fatalf("expected 1 expired, got %d", expired)
	}
}

func TestCacheLoadExpiredEntry(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	// Write directly to DB with an expired timestamp
	expiredAt := time.Now().UTC().Add(-1 * time.Hour).Format(time.RFC3339)
	_, err := db.Exec(`INSERT INTO _cache (key, value, ttl, expires_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`,
		"expired-key", "old-val", 3600, expiredAt, expiredAt, expiredAt)
	if err != nil {
		t.Fatal(err)
	}

	cs := NewCacheStore(db)
	got := cs.Get("expired-key")
	if got != nil {
		t.Fatal("expected nil for expired entry loaded from db")
	}
}
