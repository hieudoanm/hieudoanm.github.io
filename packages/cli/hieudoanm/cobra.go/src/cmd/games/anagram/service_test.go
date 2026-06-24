package anagram

import (
	"strings"
	"testing"
)

func TestScrambleChangesOrder(t *testing.T) {
	word := "abcde"
	result := scramble(word)
	if result == word {
		t.Error("scramble returned the same word (possible but unlikely)")
	}
}

func TestScrambleSameLength(t *testing.T) {
	word := "hello"
	result := scramble(word)
	if len(result) != len(word) {
		t.Errorf("scramble length = %d, want %d", len(result), len(word))
	}
}

func TestScrambleSameLetters(t *testing.T) {
	word := "puzzle"
	result := scramble(word)
	for _, c := range word {
		if !strings.ContainsRune(result, c) {
			t.Errorf("scramble missing letter %c", c)
		}
	}
}

func TestScrambleAllSameLetters(t *testing.T) {
	word := "aaaaa"
	result := scramble(word)
	if result != word {
		t.Errorf("scramble of all-same = %q, want %q", result, word)
	}
}
