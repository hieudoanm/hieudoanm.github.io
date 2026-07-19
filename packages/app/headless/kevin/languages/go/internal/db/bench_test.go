package db

import (
	"fmt"
	"testing"
)

func BenchmarkSet(b *testing.B) {
	kv := New()
	key := "bench"
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		kv.Set(key, fmt.Sprintf("value%d", i))
	}
}

func BenchmarkGet(b *testing.B) {
	kv := New()
	kv.Set("bench", "value")
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		kv.Get("bench")
	}
}

func BenchmarkKeys(b *testing.B) {
	kv := New()
	for i := 0; i < 1000; i++ {
		kv.Set(fmt.Sprintf("key%d", i), fmt.Sprintf("value%d", i))
	}
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		kv.Keys()
	}
}
