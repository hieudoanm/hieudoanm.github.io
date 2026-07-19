// Package cache provides an in-memory cache that persists to SQLite.
package cache

import (
	"database/sql"
	"log"
	"sync"
	"time"

	"github.com/hieudoanm/backbone/internal/store"
)

// CacheStore is a thread-safe key/value cache backed by the database.
type CacheStore struct {
	mu   sync.RWMutex
	data map[string]*store.CacheEntry
	db   *sql.DB
}

// NewCacheStore creates a cache, warm it from disk, and starts eviction.
func NewCacheStore(db *sql.DB) *CacheStore {
	cs := &CacheStore{
		data: make(map[string]*store.CacheEntry),
		db:   db,
	}
	cs.loadFromDB()
	go cs.evictLoop()
	return cs
}

func (cs *CacheStore) loadFromDB() {
	rows, err := cs.db.Query(`SELECT key, value, ttl, expires_at, created_at, updated_at FROM _cache`)
	if err != nil {
		log.Printf("cache: load from db: %v", err)
		return
	}
	defer rows.Close()
	for rows.Next() {
		var e store.CacheEntry
		if err := rows.Scan(&e.Key, &e.Value, &e.TTL, &e.ExpiresAt, &e.CreatedAt, &e.UpdatedAt); err != nil {
			log.Printf("cache: scan row: %v", err)
			continue
		}
		if e.TTL > 0 && e.ExpiresAt != "" {
			expires, err := time.Parse(time.RFC3339, e.ExpiresAt)
			if err == nil && time.Now().UTC().After(expires) {
				continue
			}
		}
		cs.data[e.Key] = &e
	}
}

func (cs *CacheStore) evictLoop() {
	ticker := time.NewTicker(30 * time.Second)
	for range ticker.C {
		now := time.Now().UTC()
		cs.mu.Lock()
		for key, entry := range cs.data {
			if entry.TTL > 0 && entry.ExpiresAt != "" {
				expires, err := time.Parse(time.RFC3339, entry.ExpiresAt)
				if err == nil && now.After(expires) {
					delete(cs.data, key)
				}
			}
		}
		cs.mu.Unlock()
	}
}

// Set stores a value, optionally expiring after ttl seconds (0 = never).
func (cs *CacheStore) Set(key, value string, ttl int) *store.CacheEntry {
	now := time.Now().UTC()
	nowStr := now.Format(time.RFC3339)
	var expiresAt string
	if ttl > 0 {
		expiresAt = now.Add(time.Duration(ttl) * time.Second).Format(time.RFC3339)
	}
	entry := &store.CacheEntry{
		Key:       key,
		Value:     value,
		TTL:       ttl,
		ExpiresAt: expiresAt,
		CreatedAt: nowStr,
		UpdatedAt: nowStr,
	}
	cs.mu.Lock()
	cs.data[key] = entry
	cs.mu.Unlock()
	cs.persist(entry)
	return entry
}

// Get fetches a value, honoring TTL expiry.
func (cs *CacheStore) Get(key string) *store.CacheEntry {
	cs.mu.RLock()
	entry, ok := cs.data[key]
	cs.mu.RUnlock()
	if !ok {
		entry = cs.load(key)
		if entry == nil {
			return nil
		}
	}
	if entry.TTL > 0 && entry.ExpiresAt != "" {
		expires, err := time.Parse(time.RFC3339, entry.ExpiresAt)
		if err == nil && time.Now().UTC().After(expires) {
			cs.mu.Lock()
			delete(cs.data, key)
			cs.mu.Unlock()
			cs.db.Exec(`DELETE FROM _cache WHERE key = ?`, key)
			return nil
		}
	}
	return entry
}

func (cs *CacheStore) load(key string) *store.CacheEntry {
	var e store.CacheEntry
	err := cs.db.QueryRow(`SELECT key, value, ttl, expires_at, created_at, updated_at FROM _cache WHERE key = ?`, key).
		Scan(&e.Key, &e.Value, &e.TTL, &e.ExpiresAt, &e.CreatedAt, &e.UpdatedAt)
	if err != nil {
		return nil
	}
	if e.TTL > 0 && e.ExpiresAt != "" {
		expires, err := time.Parse(time.RFC3339, e.ExpiresAt)
		if err == nil && time.Now().UTC().After(expires) {
			cs.db.Exec(`DELETE FROM _cache WHERE key = ?`, key)
			return nil
		}
	}
	cs.mu.Lock()
	cs.data[key] = &e
	cs.mu.Unlock()
	return &e
}

// Delete removes a key, reporting whether it was present.
func (cs *CacheStore) Delete(key string) bool {
	cs.mu.Lock()
	_, ok := cs.data[key]
	delete(cs.data, key)
	cs.mu.Unlock()
	cs.db.Exec(`DELETE FROM _cache WHERE key = ?`, key)
	return ok
}

// List returns all non-expired entries.
func (cs *CacheStore) List() []store.CacheEntry {
	now := time.Now().UTC()
	cs.mu.RLock()
	entries := make([]store.CacheEntry, 0, len(cs.data))
	for _, e := range cs.data {
		if e.TTL > 0 && e.ExpiresAt != "" {
			expires, err := time.Parse(time.RFC3339, e.ExpiresAt)
			if err == nil && now.After(expires) {
				continue
			}
		}
		entries = append(entries, *e)
	}
	cs.mu.RUnlock()
	return entries
}

// Flush removes all entries.
func (cs *CacheStore) Flush() {
	cs.mu.Lock()
	cs.data = make(map[string]*store.CacheEntry)
	cs.mu.Unlock()
	cs.db.Exec(`DELETE FROM _cache`)
}

// Stats reports in-memory cache usage.
func (cs *CacheStore) Stats() map[string]any {
	cs.mu.RLock()
	total := len(cs.data)
	now := time.Now().UTC()
	expired := 0
	for _, e := range cs.data {
		if e.TTL > 0 && e.ExpiresAt != "" {
			expires, err := time.Parse(time.RFC3339, e.ExpiresAt)
			if err == nil && now.After(expires) {
				expired++
			}
		}
	}
	cs.mu.RUnlock()
	return map[string]any{
		"total_entries":   total,
		"expired_entries": expired,
		"memory":          true,
	}
}

func (cs *CacheStore) persist(entry *store.CacheEntry) {
	cs.db.Exec(`INSERT INTO _cache (key, value, ttl, expires_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)
		ON CONFLICT(key) DO UPDATE SET value = excluded.value, ttl = excluded.ttl, expires_at = excluded.expires_at, updated_at = excluded.updated_at`,
		entry.Key, entry.Value, entry.TTL, entry.ExpiresAt, entry.CreatedAt, entry.UpdatedAt)
}
