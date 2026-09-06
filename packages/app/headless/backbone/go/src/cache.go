package main

import (
	"database/sql"
	"log"
	"sync"
	"time"
)

type CacheStore struct {
	mu   sync.RWMutex
	data map[string]*CacheEntry
	db   *sql.DB
}

func NewCacheStore(db *sql.DB) *CacheStore {
	cs := &CacheStore{
		data: make(map[string]*CacheEntry),
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
		var e CacheEntry
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

func (cs *CacheStore) Set(key, value string, ttl int) *CacheEntry {
	now := time.Now().UTC()
	nowStr := now.Format(time.RFC3339)
	var expiresAt string
	if ttl > 0 {
		expiresAt = now.Add(time.Duration(ttl) * time.Second).Format(time.RFC3339)
	}
	entry := &CacheEntry{
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

func (cs *CacheStore) Get(key string) *CacheEntry {
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

func (cs *CacheStore) load(key string) *CacheEntry {
	var e CacheEntry
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

func (cs *CacheStore) Delete(key string) bool {
	cs.mu.Lock()
	_, ok := cs.data[key]
	delete(cs.data, key)
	cs.mu.Unlock()
	cs.db.Exec(`DELETE FROM _cache WHERE key = ?`, key)
	return ok
}

func (cs *CacheStore) List() []CacheEntry {
	now := time.Now().UTC()
	cs.mu.RLock()
	entries := make([]CacheEntry, 0, len(cs.data))
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

func (cs *CacheStore) Flush() {
	cs.mu.Lock()
	cs.data = make(map[string]*CacheEntry)
	cs.mu.Unlock()
	cs.db.Exec(`DELETE FROM _cache`)
}

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

func (cs *CacheStore) persist(entry *CacheEntry) {
	cs.db.Exec(`INSERT INTO _cache (key, value, ttl, expires_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)
		ON CONFLICT(key) DO UPDATE SET value = excluded.value, ttl = excluded.ttl, expires_at = excluded.expires_at, updated_at = excluded.updated_at`,
		entry.Key, entry.Value, entry.TTL, entry.ExpiresAt, entry.CreatedAt, entry.UpdatedAt)
}
