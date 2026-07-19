package db

import (
	"sync"
	"time"
)

// DB is a concurrency-safe in-memory key/value store with per-key expiry.
type DB struct {
	mu      sync.RWMutex
	data    map[string]string
	expires map[string]time.Time
}

// New returns an empty DB.
func New() *DB {
	return &DB{data: make(map[string]string), expires: make(map[string]time.Time)}
}

// Set stores value under key with no expiry, overwriting any existing value.
func (d *DB) Set(key, value string) {
	d.mu.Lock()
	defer d.mu.Unlock()
	d.data[key] = value
	delete(d.expires, key)
}

// Get returns the value stored under key and whether it is still present.
func (d *DB) Get(key string) (string, bool) {
	d.mu.RLock()
	value, ok := d.data[key]
	if !ok {
		d.mu.RUnlock()
		return "", false
	}
	if d.expiredLocked(key) {
		d.mu.RUnlock()
		d.remove(key)
		return "", false
	}
	d.mu.RUnlock()
	return value, true
}

// Del removes key and reports whether it was present.
func (d *DB) Del(key string) bool {
	d.mu.Lock()
	defer d.mu.Unlock()
	if _, ok := d.data[key]; !ok {
		return false
	}
	d.removeLocked(key)
	return true
}

// DelMultiple removes every key and reports how many were present.
func (d *DB) DelMultiple(keys []string) int {
	d.mu.Lock()
	defer d.mu.Unlock()
	deleted := 0
	for _, key := range keys {
		if _, ok := d.data[key]; ok {
			d.removeLocked(key)
			deleted++
		}
	}
	return deleted
}

// Exists reports whether key is present and not expired.
func (d *DB) Exists(key string) bool {
	d.mu.RLock()
	_, ok := d.data[key]
	if ok && d.expiredLocked(key) {
		d.mu.RUnlock()
		d.remove(key)
		return false
	}
	d.mu.RUnlock()
	return ok
}

// Len returns the number of present, unexpired keys.
func (d *DB) Len() int {
	d.mu.RLock()
	defer d.mu.RUnlock()
	n := 0
	for key := range d.data {
		if !d.expiredLocked(key) {
			n++
		}
	}
	return n
}

// Flush removes all keys and returns how many were removed.
func (d *DB) Flush() int {
	d.mu.Lock()
	defer d.mu.Unlock()
	n := len(d.data)
	d.data = make(map[string]string)
	d.expires = make(map[string]time.Time)
	return n
}

// Keys returns the present, unexpired keys in no particular order.
func (d *DB) Keys() []string {
	d.mu.RLock()
	defer d.mu.RUnlock()
	keys := make([]string, 0, len(d.data))
	for key := range d.data {
		if d.expiredLocked(key) {
			continue
		}
		keys = append(keys, key)
	}
	return keys
}

// expiredLocked reports whether key's expiry has passed. Caller holds the lock.
func (d *DB) expiredLocked(key string) bool {
	expiry, ok := d.expires[key]
	return ok && !expiry.After(time.Now())
}

// remove deletes key and its expiry without locking; callers hold the mutex.
func (d *DB) removeLocked(key string) {
	delete(d.data, key)
	delete(d.expires, key)
}

// remove deletes key and its expiry, acquiring the write lock.
func (d *DB) remove(key string) {
	d.mu.Lock()
	defer d.mu.Unlock()
	d.removeLocked(key)
}
