package main

import (
	"testing"
)

func TestJwtSecret_Default(t *testing.T) {
	t.Setenv("JWT_SECRET", "")
	secret := jwtSecret()
	if string(secret) != "dev-secret-change-in-production" {
		t.Fatalf("expected default secret, got %s", string(secret))
	}
}

func TestJwtSecret_Custom(t *testing.T) {
	t.Setenv("JWT_SECRET", "my-custom-secret")
	secret := jwtSecret()
	if string(secret) != "my-custom-secret" {
		t.Fatalf("expected custom secret, got %s", string(secret))
	}
}

func TestGenerateID(t *testing.T) {
	id := generateID()
	if len(id) != 32 {
		t.Fatalf("expected 32 hex chars, got %d: %s", len(id), id)
	}
	id2 := generateID()
	if id == id2 {
		t.Fatal("expected different IDs")
	}
}

func TestGenerateAndValidateToken(t *testing.T) {
	t.Setenv("JWT_SECRET", "test-secret")
	token, err := generateToken("user1", "user1@test.com")
	if err != nil {
		t.Fatalf("generate token: %v", err)
	}
	if token == "" {
		t.Fatal("expected non-empty token")
	}

	claims, err := validateToken(token)
	if err != nil {
		t.Fatalf("validate token: %v", err)
	}
	if claims.UserID != "user1" {
		t.Fatalf("expected user1, got %s", claims.UserID)
	}
	if claims.Email != "user1@test.com" {
		t.Fatalf("expected user1@test.com, got %s", claims.Email)
	}
}

func TestValidateToken_Invalid(t *testing.T) {
	t.Setenv("JWT_SECRET", "test-secret")
	_, err := validateToken("invalid-token")
	if err == nil {
		t.Fatal("expected error for invalid token")
	}
}

func TestValidateToken_WrongSigningMethod(t *testing.T) {
	t.Setenv("JWT_SECRET", "test-secret")
	token, err := generateToken("u1", "u1@test.com")
	if err != nil {
		t.Fatal(err)
	}

	t.Setenv("JWT_SECRET", "different-secret")
	_, err = validateToken(token)
	if err == nil {
		t.Fatal("expected error for wrong secret")
	}
}

func TestRegisterAndLoginUser(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	user, err := registerUser(db, "test@test.com", "password123")
	if err != nil {
		t.Fatalf("register: %v", err)
	}
	if user.Email != "test@test.com" {
		t.Fatalf("expected test@test.com, got %s", user.Email)
	}
	if user.ID == "" {
		t.Fatal("expected non-empty id")
	}

	// Login with correct password
	loggedIn, token, err := loginUser(db, "test@test.com", "password123")
	if err != nil {
		t.Fatalf("login: %v", err)
	}
	if loggedIn.Email != "test@test.com" {
		t.Fatalf("expected test@test.com, got %s", loggedIn.Email)
	}
	if token == "" {
		t.Fatal("expected non-empty token")
	}

	// Login with wrong password
	_, _, err = loginUser(db, "test@test.com", "wrongpassword")
	if err == nil {
		t.Fatal("expected error for wrong password")
	}

	// Login with nonexistent email
	_, _, err = loginUser(db, "nonexistent@test.com", "password123")
	if err == nil {
		t.Fatal("expected error for nonexistent user")
	}
}

func TestRegisterUser_DuplicateEmail(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	migrateDB(db)

	_, err := registerUser(db, "dup@test.com", "password123")
	if err != nil {
		t.Fatalf("first register: %v", err)
	}

	_, err = registerUser(db, "dup@test.com", "password123")
	if err == nil {
		t.Fatal("expected error for duplicate email")
	}
}
