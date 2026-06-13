package crypto

import (
	"math/rand"
	"strings"
)

const (
	passwdVowels     = "aeiou"
	passwdConsonants = "bcdfghjklmnpqrstvwxyz"
)

func generatePronounceable(length int) string {
	var sb strings.Builder
	for sb.Len() < length {
		sb.WriteByte(passwdConsonants[rand.Intn(len(passwdConsonants))])
		sb.WriteByte(passwdVowels[rand.Intn(len(passwdVowels))])
	}
	return sb.String()[:length]
}
