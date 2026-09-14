package db

import "sync"

// DB is a concurrency-safe in-memory key/value store.
type DB struct {
	mu   sync.RWMutex
	data map[string]string
}

// New returns an empty DB.
func New() *DB {
	return &DB{data: make(map[string]string)}
}

// Set stores value under key, overwriting any existing value.
func (d *DB) Set(key, value string) {
	d.mu.Lock()
	defer d.mu.Unlock()
	d.data[key] = value
}

// Get returns the value stored under key and whether it exists.
func (d *DB) Get(key string) (string, bool) {
	d.mu.RLock()
	defer d.mu.RUnlock()
	value, ok := d.data[key]
	return value, ok
}

// Del removes key and reports whether it was present.
func (d *DB) Del(key string) bool {
	d.mu.Lock()
	defer d.mu.Unlock()
	if _, ok := d.data[key]; !ok {
		return false
	}
	delete(d.data, key)
	return true
}

// Keys returns all stored keys in no particular order.
func (d *DB) Keys() []string {
	d.mu.RLock()
	defer d.mu.RUnlock()
	keys := make([]string, 0, len(d.data))
	for key := range d.data {
		keys = append(keys, key)
	}
	return keys
}
