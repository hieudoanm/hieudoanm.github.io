package mcp

import (
	"errors"
	"math"
	"time"

	"github.com/hieudoanm/kevin/internal/db"
)

// TTLState classifies a key's expiry status. db.TTL reports the same false
// boolean for a missing key and a key with no expiry, distinguishing them only
// by a sentinel duration, so the store layer normalises both into one of these
// states before the tools see them.
type TTLState string

const (
	// TTLStateMissing means the key does not exist or has already expired.
	TTLStateMissing TTLState = "missing"
	// TTLStateNoExpiry means the key exists and never expires.
	TTLStateNoExpiry TTLState = "no-expiry"
	// TTLStateExpiring means the key exists and expires within Seconds.
	TTLStateExpiring TTLState = "expiring"
)

// Store is the key/value surface the MCP tools operate on. It is implemented
// twice: by an in-process adapter over db.DB, and by a client that speaks the
// inline protocol to an already-running `kevin serve`.
//
// Keys are opaque strings. A ttlSeconds of zero or less means "no expiry",
// matching the TCP handler, which rejects a non-positive expire time.
type Store interface {
	// Close releases any resource the store holds. The in-process store
	// holds none and always returns nil.
	Close() error
	// Ping verifies the store is reachable.
	Ping() error
	// Get returns the value stored under key and whether it was present.
	Get(key string) (string, bool, error)
	// Set stores value under key, optionally with a ttl in seconds.
	Set(key, value string, ttlSeconds int) error
	// Del removes every key and returns how many were present.
	Del(keys []string) (int, error)
	// Exists reports whether key is present and unexpired.
	Exists(key string) (bool, error)
	// Keys returns every present, unexpired key.
	Keys() ([]string, error)
	// Len returns the number of present, unexpired keys.
	Len() (int, error)
	// Flush removes every key and returns how many were removed.
	Flush() (int, error)
	// TTL returns the remaining lifetime of key in whole seconds, rounded up,
	// together with the key's expiry state.
	TTL(key string) (int, TTLState, error)
	// Expire sets an expiry on key and reports whether key existed.
	Expire(key string, seconds int) (bool, error)
}

// classifyTTL normalises db.TTL's sentinel durations into a state and a
// whole-second count. Remaining is rounded up so that a key stored with a 30
// second TTL still reads as 30 immediately rather than 29, matching the
// round-up the TCP handler applies.
func classifyTTL(remaining time.Duration, hasExpiry bool) (int, TTLState) {
	switch {
	case !hasExpiry && remaining <= -2*time.Second:
		return -2, TTLStateMissing
	case !hasExpiry:
		return -1, TTLStateNoExpiry
	default:
		return int(math.Ceil(remaining.Seconds())), TTLStateExpiring
	}
}

// dbStore adapts the in-process db.DB to Store.
type dbStore struct {
	kv *db.DB
}

// NewDBStore returns a Store backed by the in-process kv.
func NewDBStore(kv *db.DB) Store {
	return &dbStore{kv: kv}
}

// Close is a no-op: an in-process store holds no resources.
func (s *dbStore) Close() error {
	return nil
}

// Ping always succeeds: an in-process store cannot be unreachable.
func (s *dbStore) Ping() error {
	return nil
}

// Get returns the value stored under key and whether it was present.
func (s *dbStore) Get(key string) (string, bool, error) {
	value, ok := s.kv.Get(key)
	return value, ok, nil
}

// Set stores value under key, optionally with a ttl in seconds.
func (s *dbStore) Set(key, value string, ttlSeconds int) error {
	if ttlSeconds > 0 {
		s.kv.SetWithTTL(key, value, time.Duration(ttlSeconds)*time.Second)
		return nil
	}
	s.kv.Set(key, value)
	return nil
}

// Del removes every key and returns how many were present.
func (s *dbStore) Del(keys []string) (int, error) {
	if len(keys) == 0 {
		return 0, errors.New("keys must not be empty")
	}
	return s.kv.DelMultiple(keys), nil
}

// Exists reports whether key is present and unexpired.
func (s *dbStore) Exists(key string) (bool, error) {
	return s.kv.Exists(key), nil
}

// Keys returns every present, unexpired key.
func (s *dbStore) Keys() ([]string, error) {
	return s.kv.Keys(), nil
}

// Len returns the number of present, unexpired keys.
func (s *dbStore) Len() (int, error) {
	return s.kv.Len(), nil
}

// Flush removes every key and returns how many were removed.
func (s *dbStore) Flush() (int, error) {
	return s.kv.Flush(), nil
}

// TTL returns the remaining lifetime of key in whole seconds plus its state.
func (s *dbStore) TTL(key string) (int, TTLState, error) {
	remaining, hasExpiry := s.kv.TTL(key)
	seconds, state := classifyTTL(remaining, hasExpiry)
	return seconds, state, nil
}

// Expire sets an expiry on key and reports whether key existed.
func (s *dbStore) Expire(key string, seconds int) (bool, error) {
	return s.kv.Expire(key, time.Duration(seconds)*time.Second), nil
}
