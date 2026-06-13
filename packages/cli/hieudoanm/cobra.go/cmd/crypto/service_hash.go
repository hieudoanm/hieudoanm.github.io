package crypto

import (
	"crypto/md5"
	"crypto/sha1"
	"crypto/sha256"
	"crypto/sha512"
	"encoding/hex"
	"fmt"
	"strings"
)

func computeHash(input []byte, algorithm string) (string, error) {
	switch strings.ToLower(algorithm) {
	case "md5":
		h := md5.Sum(input)
		return hex.EncodeToString(h[:]), nil
	case "sha1":
		h := sha1.Sum(input)
		return hex.EncodeToString(h[:]), nil
	case "sha256":
		h := sha256.Sum256(input)
		return hex.EncodeToString(h[:]), nil
	case "sha512":
		h := sha512.Sum512(input)
		return hex.EncodeToString(h[:]), nil
	default:
		return "", fmt.Errorf("unknown algorithm: %s", algorithm)
	}
}
