package db

import (
	"fmt"
	"sync"
	"testing"
)

func TestSetGet(t *testing.T) {
	kv := New()
	kv.Set("key1", "value1")
	got, ok := kv.Get("key1")
	if !ok || got != "value1" {
		t.Errorf("Get = %q, %v; want %q, true", got, ok, "value1")
	}
}

func TestGetMissing(t *testing.T) {
	kv := New()
	if _, ok := kv.Get("nonexistent"); ok {
		t.Error("Get on missing key should return ok=false")
	}
}

func TestDel(t *testing.T) {
	kv := New()
	kv.Set("key1", "value1")
	if !kv.Del("key1") {
		t.Error("Del should return true for existing key")
	}
	if _, ok := kv.Get("key1"); ok {
		t.Error("key should be deleted after Del")
	}
}

func TestDelMissing(t *testing.T) {
	kv := New()
	if kv.Del("nonexistent") {
		t.Error("Del on missing key should return false")
	}
}

func TestOverwrite(t *testing.T) {
	kv := New()
	kv.Set("key1", "value1")
	kv.Set("key1", "value2")
	got, ok := kv.Get("key1")
	if !ok || got != "value2" {
		t.Errorf("Get = %q, %v; want %q, true", got, ok, "value2")
	}
}

func TestKeys(t *testing.T) {
	kv := New()
	kv.Set("a", "1")
	kv.Set("b", "2")
	kv.Set("c", "3")
	if got := len(kv.Keys()); got != 3 {
		t.Errorf("len(Keys) = %d; want 3", got)
	}
}

func TestConcurrentWrites(t *testing.T) {
	kv := New()
	var wg sync.WaitGroup
	for i := 0; i < 100; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			key := fmt.Sprintf("key%d", i)
			value := fmt.Sprintf("value%d", i)
			kv.Set(key, value)
			if got, ok := kv.Get(key); !ok || got != value {
				t.Errorf("concurrent Set/Get failed for %s", key)
			}
		}(i)
	}
	wg.Wait()
	for i := 0; i < 100; i++ {
		key := fmt.Sprintf("key%d", i)
		if _, ok := kv.Get(key); !ok {
			t.Errorf("key %s should exist after concurrent writes", key)
		}
	}
}
