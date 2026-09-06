package main

import (
	"testing"
)

func TestGetOrCreateSecretsKey(t *testing.T) {
	dir := t.TempDir()
	key, err := getOrCreateSecretsKey(dir)
	if err != nil {
		t.Fatalf("get or create key: %v", err)
	}
	if len(key) == 0 {
		t.Fatal("expected non-empty key")
	}

	// Second call should return the same key
	key2, err := getOrCreateSecretsKey(dir)
	if err != nil {
		t.Fatal(err)
	}
	if string(key) != string(key2) {
		t.Fatal("expected same key on second call")
	}
}

func TestEncryptDecryptSecret(t *testing.T) {
	key := make([]byte, 32)
	plaintext := "my-s3cret-value!"

	encrypted, err := encryptSecret(key, plaintext)
	if err != nil {
		t.Fatalf("encrypt: %v", err)
	}
	if encrypted == plaintext {
		t.Fatal("encrypted should differ from plaintext")
	}

	decrypted, err := decryptSecret(key, encrypted)
	if err != nil {
		t.Fatalf("decrypt: %v", err)
	}
	if decrypted != plaintext {
		t.Fatalf("expected '%s', got '%s'", plaintext, decrypted)
	}
}

func TestDecryptSecret_WrongKey(t *testing.T) {
	key := make([]byte, 32)
	plaintext := "test-value"

	encrypted, err := encryptSecret(key, plaintext)
	if err != nil {
		t.Fatal(err)
	}

	wrongKey := make([]byte, 32)
	wrongKey[0] = 1
	_, err = decryptSecret(wrongKey, encrypted)
	if err == nil {
		t.Fatal("expected error for wrong key")
	}
}

func TestInsertAndGetSecret(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	secret, err := createSecret(db, "s1", "api_key", "encrypted-value", "general")
	if err != nil {
		t.Fatalf("create: %v", err)
	}
	if secret.ID != "s1" || secret.Name != "api_key" || secret.Scope != "general" {
		t.Fatalf("unexpected secret: %+v", secret)
	}

	got, err := getSecret(db, "s1")
	if err != nil {
		t.Fatal(err)
	}
	if got == nil {
		t.Fatal("expected secret")
	}
	if got.Name != "api_key" {
		t.Fatalf("expected api_key, got %s", got.Name)
	}

	// Get nonexistent
	got, err = getSecret(db, "nonexistent")
	if err != nil {
		t.Fatal(err)
	}
	if got != nil {
		t.Fatal("expected nil for nonexistent")
	}
}

func TestListSecrets(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	createSecret(db, "s1", "key1", "val1", "general")
	createSecret(db, "s2", "key2", "val2", "db")

	secrets, err := listSecrets(db)
	if err != nil {
		t.Fatal(err)
	}
	if len(secrets) != 2 {
		t.Fatalf("expected 2, got %d", len(secrets))
	}
}

func TestUpdateSecret(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	createSecret(db, "s1", "old_name", "old_val", "general")

	updated, err := updateSecret(db, "s1", "new_name", "new_val", "prod")
	if err != nil {
		t.Fatal(err)
	}
	if updated.Name != "new_name" || updated.Scope != "prod" {
		t.Fatalf("unexpected: %+v", updated)
	}
}

func TestDeleteSecret(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	createSecret(db, "s1", "key", "val", "general")
	if err := deleteSecret(db, "s1"); err != nil {
		t.Fatal(err)
	}

	got, _ := getSecret(db, "s1")
	if got != nil {
		t.Fatal("expected nil after delete")
	}
}

func TestWebhookSecretData(t *testing.T) {
	s := &Secret{ID: "s1", Name: "test"}
	data := webhookSecretData(s)
	if data["secret"] != s {
		t.Fatal("expected secret key to reference the secret")
	}
}
