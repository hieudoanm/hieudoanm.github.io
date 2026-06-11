package hash

import (
	"crypto/md5"
	"crypto/sha256"
	"fmt"
	"testing"
)

func TestMD5(t *testing.T) {
	input := []byte("hello")
	expected := "5d41402abc4b2a76b9719d911017c592"
	got := fmt.Sprintf("%x", md5.Sum(input))
	if got != expected {
		t.Errorf("md5('hello') = %s, want %s", got, expected)
	}
}

func TestSHA256(t *testing.T) {
	input := []byte("hello")
	expected := "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
	got := fmt.Sprintf("%x", sha256.Sum256(input))
	if got != expected {
		t.Errorf("sha256('hello') = %s, want %s", got, expected)
	}
}
