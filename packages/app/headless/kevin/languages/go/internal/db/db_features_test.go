package db

import (
	"testing"
	"time"
)

func TestDelMultiple(t *testing.T) {
	kv := New()
	kv.Set("a", "1")
	kv.Set("b", "2")
	kv.Set("c", "3")

	if got := kv.DelMultiple([]string{"a", "b", "nope"}); got != 2 {
		t.Errorf("DelMultiple = %d; want 2", got)
	}
	if got := len(kv.Keys()); got != 1 {
		t.Errorf("len(Keys) after DelMultiple = %d; want 1", got)
	}
}

func TestDelMultipleEmpty(t *testing.T) {
	kv := New()
	if got := kv.DelMultiple(nil); got != 0 {
		t.Errorf("DelMultiple(nil) = %d; want 0", got)
	}
}

func TestExists(t *testing.T) {
	kv := New()
	kv.Set("a", "1")
	if !kv.Exists("a") {
		t.Error("Exists should report true for present key")
	}
	if kv.Exists("nope") {
		t.Error("Exists should report false for missing key")
	}
}

func TestLen(t *testing.T) {
	kv := New()
	if got := kv.Len(); got != 0 {
		t.Errorf("Len on empty = %d; want 0", got)
	}
	kv.Set("a", "1")
	kv.Set("b", "2")
	if got := kv.Len(); got != 2 {
		t.Errorf("Len = %d; want 2", got)
	}
}

func TestFlush(t *testing.T) {
	kv := New()
	kv.Set("a", "1")
	kv.Set("b", "2")
	if got := kv.Flush(); got != 2 {
		t.Errorf("Flush = %d; want 2", got)
	}
	if got := kv.Len(); got != 0 {
		t.Errorf("Len after Flush = %d; want 0", got)
	}
}

func TestSetWithTTLExpires(t *testing.T) {
	kv := New()
	kv.SetWithTTL("short", "x", -time.Second)
	kv.SetWithTTL("long", "y", time.Hour)

	if _, ok := kv.Get("short"); ok {
		t.Error("expired key should not be returned by Get")
	}
	if _, ok := kv.Get("long"); !ok {
		t.Error("unexpired key should still be present")
	}
	if kv.Exists("short") {
		t.Error("expired key should not be reported by Exists")
	}
	if got := kv.Len(); got != 1 {
		t.Errorf("Len with one expired = %d; want 1", got)
	}
	if got := len(kv.Keys()); got != 1 {
		t.Errorf("Keys with one expired = %d; want 1", got)
	}
}

func TestSetClearsExpiry(t *testing.T) {
	kv := New()
	kv.SetWithTTL("k", "v", time.Hour)
	kv.Set("k", "v2")
	if remaining, hasExpiry := kv.TTL("k"); hasExpiry {
		t.Errorf("TTL after plain Set = %v, %v; want no expiry", remaining, hasExpiry)
	}
}

func TestExpire(t *testing.T) {
	kv := New()
	kv.Set("k", "v")
	if !kv.Expire("k", time.Hour) {
		t.Error("Expire should succeed on existing key")
	}
	if remaining, hasExpiry := kv.TTL("k"); !hasExpiry || remaining <= 0 {
		t.Errorf("TTL after Expire = %v, %v; want positive", remaining, hasExpiry)
	}
	if kv.Expire("nope", time.Hour) {
		t.Error("Expire should fail on missing key")
	}
}

func TestTTLPersistentAndMissing(t *testing.T) {
	kv := New()
	kv.Set("k", "v")
	if remaining, hasExpiry := kv.TTL("k"); hasExpiry || remaining != -time.Second {
		t.Errorf("TTL persistent = %v, %v; want -1s, false", remaining, hasExpiry)
	}
	if remaining, hasExpiry := kv.TTL("nope"); hasExpiry || remaining != -2*time.Second {
		t.Errorf("TTL missing = %v, %v; want -2s, false", remaining, hasExpiry)
	}
}
