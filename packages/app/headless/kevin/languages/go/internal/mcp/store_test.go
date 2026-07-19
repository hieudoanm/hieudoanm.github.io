package mcp

import (
	"context"
	"fmt"
	"net"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"github.com/hieudoanm/kevin/internal/db"
	"github.com/hieudoanm/kevin/internal/server"
)

// newTestDB returns an empty in-process store.
func newTestDB() *db.DB {
	return db.New()
}

// startTCPServer starts a real kevin TCP server on a random port and returns a
// Store proxying to it. The server stops when the test finishes.
func startTCPServer(t *testing.T) Store {
	t.Helper()

	listener, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatalf("listen: %v", err)
	}

	ctx, cancel := context.WithCancel(context.Background())
	done := make(chan struct{})
	go func() {
		defer close(done)
		if err := server.New(newTestDB()).Serve(ctx, listener); err != nil {
			t.Errorf("serve: %v", err)
		}
	}()
	t.Cleanup(func() {
		cancel()
		<-done
	})

	store, err := DialTCPStore(ctx, listener.Addr().String())
	if err != nil {
		t.Fatalf("dial: %v", err)
	}
	t.Cleanup(func() {
		if err := store.Close(); err != nil {
			t.Errorf("close store: %v", err)
		}
	})
	return store
}

// storeContract is the behaviour every Store implementation must share, so
// the in-process and TCP backends can be checked against the same table.
type storeContract struct {
	name  string
	store func(t *testing.T) Store
}

// storeContracts enumerates every backend under test.
func storeContracts() []storeContract {
	return []storeContract{
		{name: "in-process", store: func(t *testing.T) Store { return NewDBStore(newTestDB()) }},
		{name: "tcp", store: startTCPServer},
	}
}

func TestStoreSetGetDel(t *testing.T) {
	for _, contract := range storeContracts() {
		t.Run(contract.name, func(t *testing.T) {
			store := contract.store(t)

			value, found, err := store.Get("missing")
			if err != nil {
				t.Fatalf("get missing: %v", err)
			}
			if found {
				t.Fatal("a missing key should not be found")
			}

			if err := store.Set("greeting", "hello", 0); err != nil {
				t.Fatalf("set: %v", err)
			}
			value, found, err = store.Get("greeting")
			if err != nil {
				t.Fatalf("get: %v", err)
			}
			if !found || value != "hello" {
				t.Fatalf("expected hello, got %q (found=%t)", value, found)
			}

			deleted, err := store.Del([]string{"greeting"})
			if err != nil {
				t.Fatalf("del: %v", err)
			}
			if deleted != 1 {
				t.Fatalf("expected 1 deleted, got %d", deleted)
			}

			deleted, err = store.Del([]string{"greeting"})
			if err != nil {
				t.Fatalf("del again: %v", err)
			}
			if deleted != 0 {
				t.Fatalf("expected 0 deleted on a repeat, got %d", deleted)
			}
		})
	}
}

func TestStoreSetOverwrites(t *testing.T) {
	for _, contract := range storeContracts() {
		t.Run(contract.name, func(t *testing.T) {
			store := contract.store(t)

			if err := store.Set("k", "first", 0); err != nil {
				t.Fatalf("set: %v", err)
			}
			if err := store.Set("k", "second", 0); err != nil {
				t.Fatalf("overwrite: %v", err)
			}
			value, found, err := store.Get("k")
			if err != nil {
				t.Fatalf("get: %v", err)
			}
			if !found || value != "second" {
				t.Fatalf("expected second, got %q (found=%t)", value, found)
			}
		})
	}
}

func TestStoreDelMultiple(t *testing.T) {
	for _, contract := range storeContracts() {
		t.Run(contract.name, func(t *testing.T) {
			store := contract.store(t)

			for _, key := range []string{"a", "b", "c"} {
				if err := store.Set(key, "v", 0); err != nil {
					t.Fatalf("set %s: %v", key, err)
				}
			}
			deleted, err := store.Del([]string{"a", "b", "absent"})
			if err != nil {
				t.Fatalf("del: %v", err)
			}
			if deleted != 2 {
				t.Fatalf("expected 2 deleted, got %d", deleted)
			}
		})
	}
}

func TestStoreDelEmptyIsAnError(t *testing.T) {
	for _, contract := range storeContracts() {
		t.Run(contract.name, func(t *testing.T) {
			store := contract.store(t)
			if _, err := store.Del(nil); err == nil {
				t.Fatal("expected deleting no keys to be rejected")
			}
		})
	}
}

func TestStoreExistsLenKeysFlush(t *testing.T) {
	for _, contract := range storeContracts() {
		t.Run(contract.name, func(t *testing.T) {
			store := contract.store(t)

			exists, err := store.Exists("a")
			if err != nil {
				t.Fatalf("exists: %v", err)
			}
			if exists {
				t.Fatal("a should not exist yet")
			}

			for _, key := range []string{"a", "b"} {
				if err := store.Set(key, "v", 0); err != nil {
					t.Fatalf("set %s: %v", key, err)
				}
			}

			exists, err = store.Exists("a")
			if err != nil {
				t.Fatalf("exists: %v", err)
			}
			if !exists {
				t.Fatal("a should exist")
			}

			count, err := store.Len()
			if err != nil {
				t.Fatalf("len: %v", err)
			}
			if count != 2 {
				t.Fatalf("expected 2 keys, got %d", count)
			}

			keys, err := store.Keys()
			if err != nil {
				t.Fatalf("keys: %v", err)
			}
			if len(keys) != 2 {
				t.Fatalf("expected 2 keys, got %v", keys)
			}

			deleted, err := store.Flush()
			if err != nil {
				t.Fatalf("flush: %v", err)
			}
			if deleted != 2 {
				t.Fatalf("expected flush to report 2, got %d", deleted)
			}

			count, err = store.Len()
			if err != nil {
				t.Fatalf("len after flush: %v", err)
			}
			if count != 0 {
				t.Fatalf("expected an empty store after flush, got %d", count)
			}
		})
	}
}

func TestStoreTTLStates(t *testing.T) {
	tests := []struct {
		name       string
		setup      func(t *testing.T, store Store)
		key        string
		wantState  TTLState
		wantSecond int
	}{
		{
			name:       "missing key",
			setup:      func(*testing.T, Store) {},
			key:        "absent",
			wantState:  TTLStateMissing,
			wantSecond: -2,
		},
		{
			name: "key with no expiry",
			setup: func(t *testing.T, store Store) {
				if err := store.Set("k", "v", 0); err != nil {
					t.Fatalf("set: %v", err)
				}
			},
			key:        "k",
			wantState:  TTLStateNoExpiry,
			wantSecond: -1,
		},
		{
			name: "key with an expiry",
			setup: func(t *testing.T, store Store) {
				if err := store.Set("k", "v", 60); err != nil {
					t.Fatalf("set: %v", err)
				}
			},
			key:        "k",
			wantState:  TTLStateExpiring,
			wantSecond: 60,
		},
	}

	for _, contract := range storeContracts() {
		for _, tt := range tests {
			t.Run(contract.name+"/"+tt.name, func(t *testing.T) {
				store := contract.store(t)
				tt.setup(t, store)

				seconds, state, err := store.TTL(tt.key)
				if err != nil {
					t.Fatalf("ttl: %v", err)
				}
				if state != tt.wantState {
					t.Fatalf("expected state %s, got %s", tt.wantState, state)
				}
				if seconds != tt.wantSecond {
					t.Fatalf("expected %d seconds, got %d", tt.wantSecond, seconds)
				}
			})
		}
	}
}

func TestStoreTTLCountsDownAndExpires(t *testing.T) {
	for _, contract := range storeContracts() {
		t.Run(contract.name, func(t *testing.T) {
			store := contract.store(t)
			if err := store.Set("k", "v", 1); err != nil {
				t.Fatalf("set: %v", err)
			}

			time.Sleep(1200 * time.Millisecond)

			seconds, state, err := store.TTL("k")
			if err != nil {
				t.Fatalf("ttl: %v", err)
			}
			if state != TTLStateMissing {
				t.Fatalf("expected the key to have expired, got state %s", state)
			}
			if seconds != -2 {
				t.Fatalf("expected -2 for an expired key, got %d", seconds)
			}
		})
	}
}

func TestStoreExpire(t *testing.T) {
	for _, contract := range storeContracts() {
		t.Run(contract.name, func(t *testing.T) {
			store := contract.store(t)

			ok, err := store.Expire("absent", 30)
			if err != nil {
				t.Fatalf("expire absent: %v", err)
			}
			if ok {
				t.Fatal("expiring a missing key should report false")
			}

			if err := store.Set("k", "v", 0); err != nil {
				t.Fatalf("set: %v", err)
			}
			ok, err = store.Expire("k", 30)
			if err != nil {
				t.Fatalf("expire: %v", err)
			}
			if !ok {
				t.Fatal("expiring an existing key should report true")
			}

			_, state, err := store.TTL("k")
			if err != nil {
				t.Fatalf("ttl: %v", err)
			}
			if state != TTLStateExpiring {
				t.Fatalf("expected an expiring key, got %s", state)
			}
		})
	}
}

func TestStoreExpireReplacesPreviousExpiry(t *testing.T) {
	for _, contract := range storeContracts() {
		t.Run(contract.name, func(t *testing.T) {
			store := contract.store(t)
			if err := store.Set("k", "v", 1); err != nil {
				t.Fatalf("set: %v", err)
			}
			if _, err := store.Expire("k", 120); err != nil {
				t.Fatalf("expire: %v", err)
			}

			seconds, state, err := store.TTL("k")
			if err != nil {
				t.Fatalf("ttl: %v", err)
			}
			if state != TTLStateExpiring {
				t.Fatalf("expected an expiring key, got %s", state)
			}
			if seconds < 60 {
				t.Fatalf("expected the expiry to be extended past 60s, got %d", seconds)
			}
		})
	}
}

func TestStorePing(t *testing.T) {
	for _, contract := range storeContracts() {
		t.Run(contract.name, func(t *testing.T) {
			if err := contract.store(t).Ping(); err != nil {
				t.Fatalf("ping: %v", err)
			}
		})
	}
}

func TestDBStoreAcceptsKeysAndValuesWithSpaces(t *testing.T) {
	store := NewDBStore(newTestDB())
	if err := store.Set("a key", "a value", 0); err != nil {
		t.Fatalf("the in-process store should accept spaces, got %v", err)
	}
	value, found, err := store.Get("a key")
	if err != nil {
		t.Fatalf("get: %v", err)
	}
	if !found || value != "a value" {
		t.Fatalf("expected %q, got %q", "a value", value)
	}
}

func TestTCPStoreRejectsTokensTheProtocolCannotCarry(t *testing.T) {
	tests := []struct {
		name    string
		run     func(store Store) error
		wantMsg string
	}{
		{
			name:    "empty key",
			run:     func(store Store) error { return store.Set("", "v", 0) },
			wantMsg: "must not be empty",
		},
		{
			name:    "key with a space",
			run:     func(store Store) error { return store.Set("a key", "v", 0) },
			wantMsg: "must not contain spaces",
		},
		{
			name:    "value with a newline",
			run:     func(store Store) error { return store.Set("k", "a\nb", 0) },
			wantMsg: "must not contain spaces",
		},
		{
			name: "get with a spaced key",
			run: func(store Store) error {
				_, _, err := store.Get("a key")
				return err
			},
			wantMsg: "must not contain spaces",
		},
		{
			name:    "del with an empty key",
			run:     func(store Store) error { _, err := store.Del([]string{""}); return err },
			wantMsg: "must not be empty",
		},
	}

	store := startTCPServer(t)
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := tt.run(store)
			if err == nil {
				t.Fatal("expected the token to be rejected")
			}
			if !contains(err.Error(), tt.wantMsg) {
				t.Fatalf("expected an error mentioning %q, got %v", tt.wantMsg, err)
			}
		})
	}
}

func TestTCPStoreSetWithTTLRoundTripsTheValue(t *testing.T) {
	store := startTCPServer(t)

	// The expiry is applied with a follow-up EXPIRE rather than the
	// "SET key value EX n" form, whose handler searches the value for " EX ".
	// A value mentioning EX must therefore survive intact.
	const value = "prefix-EX-suffix"
	if err := store.Set("k", value, 60); err != nil {
		t.Fatalf("set: %v", err)
	}
	stored, found, err := store.Get("k")
	if err != nil {
		t.Fatalf("get: %v", err)
	}
	if !found || stored != value {
		t.Fatalf("expected %q, got %q (found=%t)", value, stored, found)
	}
	_, state, err := store.TTL("k")
	if err != nil {
		t.Fatalf("ttl: %v", err)
	}
	if state != TTLStateExpiring {
		t.Fatalf("expected the follow-up EXPIRE to apply, got %s", state)
	}
}

func TestTCPStoreSurfacesProtocolErrors(t *testing.T) {
	store := startTCPServer(t)

	// A non-positive expire time is rejected by the server with a
	// Redis-style "ERR ..." reply that must arrive as a Go error.
	_, err := store.Expire("k", -5)
	if err == nil {
		t.Fatal("expected the server's error reply to surface")
	}
	if !contains(err.Error(), "ERR invalid expire time") {
		t.Fatalf("expected the Redis-style ERR reply, got %v", err)
	}
}

func TestTCPStoreReportsAFailedCommand(t *testing.T) {
	// Point the store at a listener that closes immediately, so the write
	// succeeds but the read fails.
	listener, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatalf("listen: %v", err)
	}
	addr := listener.Addr().String()
	go func() {
		conn, err := listener.Accept()
		if err != nil {
			return
		}
		conn.Close()
	}()

	store, err := DialTCPStore(context.Background(), addr)
	if err != nil {
		t.Fatalf("dial: %v", err)
	}
	defer store.Close()

	if err := store.Ping(); err == nil {
		t.Fatal("expected a read failure once the server hung up")
	}
}

func TestDialTCPStoreRejectsABadAddress(t *testing.T) {
	_, err := DialTCPStore(context.Background(), "127.0.0.1:1")
	if err == nil {
		t.Fatal("expected dialling a closed port to fail")
	}
	if !contains(err.Error(), "dial kevin") {
		t.Fatalf("expected a wrapped dial error, got %v", err)
	}
}

func TestDBStoreRoundTripsThroughADataFile(t *testing.T) {
	path := filepath.Join(t.TempDir(), "kevin.json")

	kv := newTestDB()
	if err := NewDBStore(kv).Set("persisted", "yes", 0); err != nil {
		t.Fatalf("set: %v", err)
	}
	if err := kv.Save(path); err != nil {
		t.Fatalf("save: %v", err)
	}

	reloaded := newTestDB()
	if err := reloaded.Load(path); err != nil {
		t.Fatalf("load: %v", err)
	}
	value, found, err := NewDBStore(reloaded).Get("persisted")
	if err != nil {
		t.Fatalf("get: %v", err)
	}
	if !found || value != "yes" {
		t.Fatalf("expected the value to survive a save/load cycle, got %q", value)
	}
}

func TestClassifyTTL(t *testing.T) {
	tests := []struct {
		name       string
		remaining  time.Duration
		hasExpiry  bool
		wantSecond int
		wantState  TTLState
	}{
		{name: "missing", remaining: -2 * time.Second, wantSecond: -2, wantState: TTLStateMissing},
		{name: "no expiry", remaining: -1 * time.Second, wantSecond: -1, wantState: TTLStateNoExpiry},
		{name: "expiring whole seconds", remaining: 30 * time.Second, hasExpiry: true, wantSecond: 30, wantState: TTLStateExpiring},
		{name: "rounds up a partial second", remaining: 29500 * time.Millisecond, hasExpiry: true, wantSecond: 30, wantState: TTLStateExpiring},
		{name: "one second left", remaining: 1 * time.Millisecond, hasExpiry: true, wantSecond: 1, wantState: TTLStateExpiring},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			seconds, state := classifyTTL(tt.remaining, tt.hasExpiry)
			if seconds != tt.wantSecond || state != tt.wantState {
				t.Fatalf("expected (%d, %s), got (%d, %s)", tt.wantSecond, tt.wantState, seconds, state)
			}
		})
	}
}

func TestStateFromSeconds(t *testing.T) {
	tests := []struct {
		seconds   int
		wantState TTLState
	}{
		{seconds: -2, wantState: TTLStateMissing},
		{seconds: -1, wantState: TTLStateNoExpiry},
		{seconds: 0, wantState: TTLStateExpiring},
		{seconds: 30, wantState: TTLStateExpiring},
	}

	for _, tt := range tests {
		t.Run(fmt.Sprintf("%d", tt.seconds), func(t *testing.T) {
			if got := stateFromSeconds(tt.seconds); got != tt.wantState {
				t.Fatalf("expected %s, got %s", tt.wantState, got)
			}
		})
	}
}

func TestValidateToken(t *testing.T) {
	tests := []struct {
		name    string
		value   string
		wantErr bool
	}{
		{name: "plain", value: "abc"},
		{name: "empty", value: "", wantErr: true},
		{name: "space", value: "a b", wantErr: true},
		{name: "carriage return", value: "a\rb", wantErr: true},
		{name: "newline", value: "a\nb", wantErr: true},
		{name: "leading space", value: " abc", wantErr: true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := validateToken("key", tt.value)
			if tt.wantErr && err == nil {
				t.Fatalf("expected %q to be rejected", tt.value)
			}
			if !tt.wantErr && err != nil {
				t.Fatalf("expected %q to be accepted, got %v", tt.value, err)
			}
		})
	}
}

func TestParseCount(t *testing.T) {
	tests := []struct {
		name    string
		reply   string
		want    int
		wantErr bool
	}{
		{name: "zero", reply: "0", want: 0},
		{name: "positive", reply: "42", want: 42},
		{name: "negative", reply: "-2", want: -2},
		{name: "text", reply: "PONG", wantErr: true},
		{name: "empty", reply: "", wantErr: true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := parseCount(tt.reply)
			if tt.wantErr {
				if err == nil {
					t.Fatalf("expected %q to be rejected", tt.reply)
				}
				return
			}
			if err != nil {
				t.Fatalf("parse: %v", err)
			}
			if got != tt.want {
				t.Fatalf("expected %d, got %d", tt.want, got)
			}
		})
	}
}

func TestDBStoreCloseIsANoOp(t *testing.T) {
	if err := NewDBStore(newTestDB()).Close(); err != nil {
		t.Fatalf("expected nil, got %v", err)
	}
}

func TestTCPStoreSurvivesManySequentialCommands(t *testing.T) {
	store := startTCPServer(t)

	const rounds = 200
	for i := 0; i < rounds; i++ {
		key := fmt.Sprintf("key-%d", i)
		if err := store.Set(key, fmt.Sprintf("value-%d", i), 0); err != nil {
			t.Fatalf("set %s: %v", key, err)
		}
	}
	count, err := store.Len()
	if err != nil {
		t.Fatalf("len: %v", err)
	}
	if count != rounds {
		t.Fatalf("expected %d keys, got %d", rounds, count)
	}
}

func contains(haystack, needle string) bool {
	return strings.Contains(haystack, needle)
}
