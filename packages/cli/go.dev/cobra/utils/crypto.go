// Package utils ...
package utils

import (
	"crypto/aes"
	"crypto/cipher"
	"encoding/hex"
	"fmt"
)

// EncryptAES encrypts plaintext using AES-256-GCM
func EncryptAES(plainText string, key []byte, nonce []byte) (string, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	aesGCM, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	encrypted := aesGCM.Seal(nil, nonce, []byte(plainText), nil)

	// Prepend nonce to the encrypted data
	finalCiphertext := append(nonce, encrypted...)

	return hex.EncodeToString(finalCiphertext), nil
}

// DecryptAES decrypts a hex-encoded AES-256-GCM ciphertext (includes IV)
func DecryptAES(encryptedHex string, key []byte) (string, error) {
	data, err := hex.DecodeString(encryptedHex)
	if err != nil {
		return "", err
	}

	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	aesGCM, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	nonceSize := aesGCM.NonceSize()
	if len(data) < nonceSize {
		return "", fmt.Errorf("ciphertext too short")
	}

	// Extract nonce and encrypted data
	nonce, encrypted := data[:nonceSize], data[nonceSize:]

	decrypted, err := aesGCM.Open(nil, nonce, encrypted, nil)
	if err != nil {
		return "", err
	}

	return string(decrypted), nil
}
