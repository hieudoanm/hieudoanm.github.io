package cmd

import (
	"context"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestOpenStoreRejectsAddrWithData(t *testing.T) {
	_, err := openStore(context.Background(), "localhost:6379", "/tmp/kevin.json")
	if err == nil || !strings.Contains(err.Error(), "mutually exclusive") {
		t.Fatalf("expected a mutual-exclusion error, got %v", err)
	}
}

func TestOpenStoreRejectsAnUnreachableAddr(t *testing.T) {
	_, err := openStore(context.Background(), "127.0.0.1:1", "")
	if err == nil {
		t.Fatal("expected dialling a closed port to fail")
	}
	if !strings.Contains(err.Error(), "connect to kevin") {
		t.Fatalf("expected a wrapped dial error, got %v", err)
	}
}

func TestOpenStoreInProcessIsUsable(t *testing.T) {
	store, err := openStore(context.Background(), "", "")
	if err != nil {
		t.Fatalf("open store: %v", err)
	}
	defer closeStore(store)

	if err := store.Ping(); err != nil {
		t.Fatalf("ping: %v", err)
	}
	if _, found, err := store.Get("anything"); err != nil || found {
		t.Fatalf("expected a fresh empty store, got found=%t err=%v", found, err)
	}
}

func TestPersistedStoreWritesTheSnapshotOnClose(t *testing.T) {
	path := filepath.Join(t.TempDir(), "kevin.json")

	store, err := openStore(context.Background(), "", path)
	if err != nil {
		t.Fatalf("open store: %v", err)
	}
	if err := store.Set("persisted", "yes", 0); err != nil {
		t.Fatalf("set: %v", err)
	}
	closeStore(store)

	raw, err := os.ReadFile(path)
	if err != nil {
		t.Fatalf("expected a snapshot on disk: %v", err)
	}
	if !strings.Contains(string(raw), "persisted") {
		t.Fatalf("expected the key in the snapshot, got %s", raw)
	}
}

func TestPersistedStoreReloadsOnReopen(t *testing.T) {
	path := filepath.Join(t.TempDir(), "kevin.json")

	first, err := openStore(context.Background(), "", path)
	if err != nil {
		t.Fatalf("open first store: %v", err)
	}
	if err := first.Set("carried", "over", 0); err != nil {
		t.Fatalf("set: %v", err)
	}
	closeStore(first)

	second, err := openStore(context.Background(), "", path)
	if err != nil {
		t.Fatalf("open second store: %v", err)
	}
	defer closeStore(second)

	value, found, err := second.Get("carried")
	if err != nil {
		t.Fatalf("get: %v", err)
	}
	if !found || value != "over" {
		t.Fatalf("expected the value to survive a restart, got %q (found=%t)", value, found)
	}
}

func TestPersistedStoreLoadsAnExistingFile(t *testing.T) {
	path := filepath.Join(t.TempDir(), "kevin.json")
	if err := os.WriteFile(path, []byte(`{"data":{"seeded":"value"}}`), 0o600); err != nil {
		t.Fatalf("seed: %v", err)
	}

	store, err := openStore(context.Background(), "", path)
	if err != nil {
		t.Fatalf("open store: %v", err)
	}
	defer closeStore(store)

	value, found, err := store.Get("seeded")
	if err != nil {
		t.Fatalf("get: %v", err)
	}
	if !found || value != "value" {
		t.Fatalf("expected the seeded value, got %q (found=%t)", value, found)
	}
}

func TestPersistedStoreToleratesAMissingFile(t *testing.T) {
	// A path that does not exist yet must not be an error: the first session
	// simply starts empty and creates the snapshot on close.
	store, err := openStore(context.Background(), "", filepath.Join(t.TempDir(), "absent.json"))
	if err != nil {
		t.Fatalf("expected a missing file to be tolerated, got %v", err)
	}
	closeStore(store)
}

func TestPersistedStorePreservesTTL(t *testing.T) {
	path := filepath.Join(t.TempDir(), "kevin.json")

	store, err := openStore(context.Background(), "", path)
	if err != nil {
		t.Fatalf("open store: %v", err)
	}
	if err := store.Set("temporary", "soon", 600); err != nil {
		t.Fatalf("set: %v", err)
	}
	closeStore(store)

	reopened, err := openStore(context.Background(), "", path)
	if err != nil {
		t.Fatalf("reopen: %v", err)
	}
	defer closeStore(reopened)

	seconds, state, err := reopened.TTL("temporary")
	if err != nil {
		t.Fatalf("ttl: %v", err)
	}
	if seconds <= 0 {
		t.Fatalf("expected a positive remaining lifetime, got %d", seconds)
	}
	if !strings.Contains(string(state), "expiring") {
		t.Fatalf("expected the key to still be expiring, got %s", state)
	}
}

func TestDescribeStore(t *testing.T) {
	tests := []struct {
		addr string
		want string
	}{
		{addr: "", want: "in-process"},
		{addr: "localhost:6379", want: "tcp:localhost:6379"},
	}

	for _, tt := range tests {
		t.Run(tt.want, func(t *testing.T) {
			if got := describeStore(tt.addr); got != tt.want {
				t.Fatalf("expected %q, got %q", tt.want, got)
			}
		})
	}
}
