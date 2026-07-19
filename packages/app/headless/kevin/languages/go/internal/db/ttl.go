package db

import "time"

// SetWithTTL stores value under key, expiring ttl from now.
func (d *DB) SetWithTTL(key, value string, ttl time.Duration) {
	d.mu.Lock()
	defer d.mu.Unlock()
	d.data[key] = value
	d.expires[key] = time.Now().Add(ttl)
}

// Expire sets an expiry on an existing key, replacing any previous one.
// It reports whether the key exists.
func (d *DB) Expire(key string, ttl time.Duration) bool {
	d.mu.Lock()
	defer d.mu.Unlock()
	if _, ok := d.data[key]; !ok {
		return false
	}
	d.expires[key] = time.Now().Add(ttl)
	return true
}

// TTL returns the remaining lifetime of key and whether an expiry is set.
// A missing or expired key returns -2s; a persistent key returns -1s.
func (d *DB) TTL(key string) (remaining time.Duration, hasExpiry bool) {
	d.mu.Lock()
	defer d.mu.Unlock()
	if _, ok := d.data[key]; !ok {
		return -2 * time.Second, false
	}
	expiry, ok := d.expires[key]
	if !ok {
		return -1 * time.Second, false
	}
	if !expiry.After(time.Now()) {
		d.removeLocked(key)
		return -2 * time.Second, false
	}
	return time.Until(expiry), true
}
