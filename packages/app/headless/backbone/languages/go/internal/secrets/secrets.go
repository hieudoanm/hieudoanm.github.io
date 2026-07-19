// Package secrets encrypts and decrypts secret values at rest.
package secrets

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/hieudoanm/backbone/internal/store"
)

// GetOrCreateKey loads the AES-256 key from BACKBONE_SECRETS_KEY, a key file,
// or generates and persists a new key under the data directory.
func GetOrCreateKey(dataDir string) ([]byte, error) {
	envKey := os.Getenv("BACKBONE_SECRETS_KEY")
	if envKey != "" {
		return hex.DecodeString(envKey)
	}
	keyPath := filepath.Join(dataDir, "secrets.key")
	if data, err := os.ReadFile(keyPath); err == nil {
		return hex.DecodeString(strings.TrimSpace(string(data)))
	}
	key := make([]byte, 32)
	if _, err := rand.Read(key); err != nil {
		return nil, fmt.Errorf("generate key: %w", err)
	}
	if err := os.WriteFile(keyPath, []byte(hex.EncodeToString(key)), 0600); err != nil {
		return nil, fmt.Errorf("write key file: %w", err)
	}
	return key, nil
}

// EncryptSecret encrypts plaintext as nonce:ciphertext hex.
func EncryptSecret(key []byte, plaintext string) (string, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", fmt.Errorf("new cipher: %w", err)
	}
	aead, err := cipher.NewGCM(block)
	if err != nil {
		return "", fmt.Errorf("new gcm: %w", err)
	}
	nonce := make([]byte, aead.NonceSize())
	if _, err := rand.Read(nonce); err != nil {
		return "", fmt.Errorf("rand nonce: %w", err)
	}
	ciphertext := aead.Seal(nil, nonce, []byte(plaintext), nil)
	return hex.EncodeToString(nonce) + ":" + hex.EncodeToString(ciphertext), nil
}

// DecryptSecret reverses EncryptSecret.
func DecryptSecret(key []byte, encrypted string) (string, error) {
	parts := strings.SplitN(encrypted, ":", 2)
	if len(parts) != 2 {
		return "", fmt.Errorf("invalid encrypted format")
	}
	nonce, err := hex.DecodeString(parts[0])
	if err != nil {
		return "", fmt.Errorf("decode nonce: %w", err)
	}
	ciphertext, err := hex.DecodeString(parts[1])
	if err != nil {
		return "", fmt.Errorf("decode ciphertext: %w", err)
	}
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", fmt.Errorf("new cipher: %w", err)
	}
	aead, err := cipher.NewGCM(block)
	if err != nil {
		return "", fmt.Errorf("new gcm: %w", err)
	}
	plaintext, err := aead.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return "", fmt.Errorf("decrypt: %w", err)
	}
	return string(plaintext), nil
}

// WebhookSecretData wraps a secret for webhook payloads.
func WebhookSecretData(secret *store.Secret) map[string]any {
	return map[string]any{
		"secret": secret,
	}
}
