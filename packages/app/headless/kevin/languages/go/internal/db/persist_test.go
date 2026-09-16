package db

import (
	"os"
	"path/filepath"
	"testing"
	"time"
)

func TestSaveLoadRoundTrip(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "kevin.json")

	kv := New()
	kv.Set("a", "1")
	kv.Set("b", "two words")
	kv.SetWithTTL("c", "3", time.Hour)
	if err := kv.Save(path); err != nil {
		t.Fatalf("Save: %v", err)
	}

	loaded := New()
	if err := loaded.Load(path); err != nil {
		t.Fatalf("Load: %v", err)
	}
	if got, ok := loaded.Get("a"); !ok || got != "1" {
		t.Errorf("loaded a = %q, %v; want 1, true", got, ok)
	}
	if got, ok := loaded.Get("b"); !ok || got != "two words" {
		t.Errorf("loaded b = %q, %v; want 'two words', true", got, ok)
	}
	if remaining, hasExpiry := loaded.TTL("c"); !hasExpiry || remaining <= 0 {
		t.Errorf("loaded c TTL = %v, %v; want positive, true", remaining, hasExpiry)
	}
}

func TestLoadMissingFile(t *testing.T) {
	kv := New()
	kv.Set("a", "1")
	if err := kv.Load(filepath.Join(t.TempDir(), "nope.json")); err != nil {
		t.Fatalf("Load missing file should be a no-op, got %v", err)
	}
	if !kv.Exists("a") {
		t.Error("Load missing file should not touch existing data")
	}
}

func TestLoadDropsExpired(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "kevin.json")

	kv := New()
	kv.SetWithTTL("a", "1", -time.Hour)
	kv.Set("b", "2")
	if err := kv.Save(path); err != nil {
		t.Fatalf("Save: %v", err)
	}

	loaded := New()
	if err := loaded.Load(path); err != nil {
		t.Fatalf("Load: %v", err)
	}
	if loaded.Exists("a") {
		t.Error("expired key should be dropped on load")
	}
	if !loaded.Exists("b") {
		t.Error("persistent key should survive load")
	}
}

func TestSaveOverwrites(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "kevin.json")

	kv := New()
	kv.Set("a", "1")
	if err := kv.Save(path); err != nil {
		t.Fatalf("first Save: %v", err)
	}
	kv.Set("b", "2")
	if err := kv.Save(path); err != nil {
		t.Fatalf("second Save: %v", err)
	}

	loaded := New()
	if err := loaded.Load(path); err != nil {
		t.Fatalf("Load: %v", err)
	}
	if !loaded.Exists("a") || !loaded.Exists("b") {
		t.Error("both keys should survive overwrite")
	}
	if _, err := os.Stat(path + ".tmp"); !os.IsNotExist(err) {
		t.Error("temp file should not remain after Save")
	}
}
