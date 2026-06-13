package crypto

import (
	"strings"
	"testing"
)

func TestGeneratePronounceable_length(t *testing.T) {
	lengths := []int{1, 2, 4, 8, 16, 32, 64, 100}
	for _, n := range lengths {
		pw := generatePronounceable(n)
		if len(pw) != n {
			t.Errorf("length %d: got len %d", n, len(pw))
		}
	}
}

func TestGeneratePronounceable_chars(t *testing.T) {
	valid := passwdVowels + passwdConsonants
	for range 200 {
		pw := generatePronounceable(100)
		for _, r := range pw {
			if !strings.ContainsRune(valid, r) {
				t.Fatalf("unexpected character %q in %q", r, pw)
			}
		}
	}
}

func TestGeneratePronounceable_consonantVowelPattern(t *testing.T) {
	for range 100 {
		pw := generatePronounceable(20)
		for i, r := range pw {
			isVowel := strings.ContainsRune(passwdVowels, r)
			if i%2 == 0 && isVowel {
				t.Errorf("position %d: expected consonant, got vowel %q in %q", i, r, pw)
			}
			if i%2 == 1 && !isVowel {
				t.Errorf("position %d: expected vowel, got consonant %q in %q", i, r, pw)
			}
		}
	}
}
