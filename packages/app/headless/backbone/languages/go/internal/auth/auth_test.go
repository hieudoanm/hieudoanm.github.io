package auth

import (
	"database/sql"
	"testing"

	"github.com/hieudoanm/backbone/internal/store"
)

func newTestDB(t *testing.T) (*sql.DB, func()) {
	t.Helper()
	dir := t.TempDir()
	t.Setenv("BACKBONE_DATA", dir)
	db, err := store.OpenDB()
	if err != nil {
		t.Fatal(err)
	}
	return db, func() { db.Close() }
}

func TestJwtSecret_Default(t *testing.T) {
	t.Setenv("JWT_SECRET", "")
	secret := JWTSecret()
	if string(secret) != "dev-secret-change-in-production" {
		t.Fatalf("expected default secret, got %s", string(secret))
	}
}

func TestJwtSecret_Custom(t *testing.T) {
	t.Setenv("JWT_SECRET", "my-custom-secret")
	secret := JWTSecret()
	if string(secret) != "my-custom-secret" {
		t.Fatalf("expected custom secret, got %s", string(secret))
	}
}

func TestGenerateAndValidateToken(t *testing.T) {
	t.Setenv("JWT_SECRET", "test-secret")
	token, err := GenerateToken("user1", "user1@test.com")
	if err != nil {
		t.Fatalf("generate token: %v", err)
	}
	if token == "" {
		t.Fatal("expected non-empty token")
	}

	claims, err := ValidateToken(token)
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
	_, err := ValidateToken("invalid-token")
	if err == nil {
		t.Fatal("expected error for invalid token")
	}
}

func TestValidateToken_WrongSigningMethod(t *testing.T) {
	t.Setenv("JWT_SECRET", "test-secret")
	token, err := GenerateToken("u1", "u1@test.com")
	if err != nil {
		t.Fatal(err)
	}

	t.Setenv("JWT_SECRET", "different-secret")
	_, err = ValidateToken(token)
	if err == nil {
		t.Fatal("expected error for wrong secret")
	}
}

func TestRegisterAndLoginUser(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	store.MigrateDB(db)

	user, err := RegisterUser(db, "test@test.com", "password123")
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
	loggedIn, token, err := LoginUser(db, "test@test.com", "password123")
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
	_, _, err = LoginUser(db, "test@test.com", "wrongpassword")
	if err == nil {
		t.Fatal("expected error for wrong password")
	}

	// Login with nonexistent email
	_, _, err = LoginUser(db, "nonexistent@test.com", "password123")
	if err == nil {
		t.Fatal("expected error for nonexistent user")
	}
}

func TestRegisterUser_DuplicateEmail(t *testing.T) {
	db, cleanup := newTestDB(t)
	defer cleanup()
	store.MigrateDB(db)

	_, err := RegisterUser(db, "dup@test.com", "password123")
	if err != nil {
		t.Fatalf("first register: %v", err)
	}

	_, err = RegisterUser(db, "dup@test.com", "password123")
	if err == nil {
		t.Fatal("expected error for duplicate email")
	}
}
