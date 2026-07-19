package db

import (
	"encoding/json"
	"errors"
	"os"
	"time"
)

// snapshot is the JSON representation of a DB for persistence.
type snapshot struct {
	Data    map[string]string    `json:"data"`
	Expires map[string]time.Time `json:"expires,omitempty"`
}

// Save writes the store to path atomically (temp file + rename).
func (d *DB) Save(path string) error {
	d.mu.RLock()
	snap := snapshot{Data: make(map[string]string, len(d.data)), Expires: make(map[string]time.Time, len(d.expires))}
	for k, v := range d.data {
		snap.Data[k] = v
	}
	for k, v := range d.expires {
		snap.Expires[k] = v
	}
	d.mu.RUnlock()

	raw, err := json.MarshalIndent(snap, "", "  ")
	if err != nil {
		return err
	}
	tmp := path + ".tmp"
	if err := os.WriteFile(tmp, raw, 0o600); err != nil {
		return err
	}
	return os.Rename(tmp, path)
}

// Load replaces the store contents from a JSON snapshot written by Save.
// A missing file leaves the store untouched.
func (d *DB) Load(path string) error {
	raw, err := os.ReadFile(path)
	if err != nil {
		if errors.Is(err, os.ErrNotExist) {
			return nil
		}
		return err
	}
	var snap snapshot
	if err := json.Unmarshal(raw, &snap); err != nil {
		return err
	}
	if snap.Data == nil {
		snap.Data = make(map[string]string)
	}
	if snap.Expires == nil {
		snap.Expires = make(map[string]time.Time)
	}

	d.mu.Lock()
	d.data = snap.Data
	d.expires = snap.Expires
	now := time.Now()
	for key, expiry := range d.expires {
		if expiry.After(now) {
			continue
		}
		delete(d.data, key)
		delete(d.expires, key)
	}
	d.mu.Unlock()
	return nil
}
