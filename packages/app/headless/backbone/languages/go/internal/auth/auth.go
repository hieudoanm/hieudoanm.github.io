// Package auth implements JWT-based user authentication.
package auth

import (
	"database/sql"
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/hieudoanm/backbone/internal/id"
	"golang.org/x/crypto/bcrypt"
)

// User is an authenticated account.
type User struct {
	ID        string `json:"id"`
	Email     string `json:"email"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

// Claims carries the identity fields embedded in a JWT.
type Claims struct {
	UserID string `json:"user_id"`
	Email  string `json:"email"`
	jwt.RegisteredClaims
}

// JWTSecret returns the signing key, falling back to a dev default.
func JWTSecret() []byte {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		secret = "dev-secret-change-in-production"
	}
	return []byte(secret)
}

// RegisterUser creates a user with a bcrypt-hashed password.
func RegisterUser(db *sql.DB, email, password string) (*User, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, fmt.Errorf("hash password: %w", err)
	}
	now := time.Now().UTC().Format(time.RFC3339)
	id := id.Generate()
	_, err = db.Exec(
		`INSERT INTO _users (id, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`,
		id, email, string(hash), now, now,
	)
	if err != nil {
		return nil, fmt.Errorf("create user: %w", err)
	}
	return &User{ID: id, Email: email, CreatedAt: now, UpdatedAt: now}, nil
}

// LoginUser verifies credentials and returns a signed JWT.
func LoginUser(db *sql.DB, email, password string) (*User, string, error) {
	var user User
	var hashedPwd string
	err := db.QueryRow(
		`SELECT id, email, created_at, updated_at, password FROM _users WHERE email = ?`, email,
	).Scan(&user.ID, &user.Email, &user.CreatedAt, &user.UpdatedAt, &hashedPwd)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, "", fmt.Errorf("invalid credentials")
		}
		return nil, "", err
	}
	if err := bcrypt.CompareHashAndPassword([]byte(hashedPwd), []byte(password)); err != nil {
		return nil, "", fmt.Errorf("invalid credentials")
	}
	token, err := GenerateToken(user.ID, user.Email)
	if err != nil {
		return nil, "", err
	}
	return &user, token, nil
}

// GenerateToken issues a 72-hour JWT for a user.
func GenerateToken(userID, email string) (string, error) {
	claims := Claims{
		UserID: userID,
		Email:  email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(72 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(JWTSecret())
}

// ValidateToken parses and verifies a JWT, returning its claims.
func ValidateToken(tokenStr string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenStr, &Claims{}, func(t *jwt.Token) (any, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
		}
		return JWTSecret(), nil
	})
	if err != nil {
		return nil, err
	}
	claims, ok := token.Claims.(*Claims)
	if !ok || !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}
	return claims, nil
}
