// Package id provides unique identifier generation shared across the app.
package id

import (
	"crypto/rand"
	"encoding/hex"
)

// Generate returns a random 128-bit hex-encoded identifier.
func Generate() string {
	b := make([]byte, 16)
	rand.Read(b)
	return hex.EncodeToString(b)
}
