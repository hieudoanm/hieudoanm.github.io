package httpapi

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"io"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/hieudoanm/backbone/internal/auth"
)

type ipRateLimiter struct {
	mu     sync.Mutex
	tokens float64
	last   time.Time
}

var rateLimiters sync.Map

func rateLimitMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ip := r.RemoteAddr
		if idx := strings.LastIndex(ip, ":"); idx != -1 {
			ip = ip[:idx]
		}
		val, _ := rateLimiters.LoadOrStore(ip, &ipRateLimiter{
			tokens: 200,
			last:   time.Now(),
		})
		rl := val.(*ipRateLimiter)
		rl.mu.Lock()
		now := time.Now()
		elapsed := now.Sub(rl.last).Seconds()
		rl.tokens += elapsed * 100
		if rl.tokens > 200 {
			rl.tokens = 200
		}
		rl.last = now
		if rl.tokens < 1 {
			rl.mu.Unlock()
			errorJSON(w, "rate limit exceeded", http.StatusTooManyRequests)
			return
		}
		rl.tokens--
		rl.mu.Unlock()
		next.ServeHTTP(w, r)
	})
}

func validateContentType(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "POST" || r.Method == "PATCH" || r.Method == "PUT" {
			ct := r.Header.Get("Content-Type")
			if !strings.HasPrefix(ct, "application/json") {
				errorJSON(w, "content-type must be application/json", http.StatusUnsupportedMediaType)
				return
			}
			data, err := io.ReadAll(r.Body)
			if err != nil {
				errorJSON(w, "invalid body", http.StatusBadRequest)
				return
			}
			if !json.Valid(data) {
				errorJSON(w, "invalid json body", http.StatusBadRequest)
				return
			}
			r.Body = io.NopCloser(bytes.NewReader(data))
		}
		next.ServeHTTP(w, r)
	})
}

func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			errorJSON(w, "authorization header required", http.StatusUnauthorized)
			return
		}
		tokenStr := strings.TrimPrefix(authHeader, "Bearer ")
		if tokenStr == authHeader {
			errorJSON(w, "bearer token required", http.StatusUnauthorized)
			return
		}
		claims, err := auth.ValidateToken(tokenStr)
		if err != nil {
			errorJSON(w, "invalid token", http.StatusUnauthorized)
			return
		}
		r.Header.Set("X-User-ID", claims.UserID)
		r.Header.Set("X-User-Email", claims.Email)
		next.ServeHTTP(w, r)
	})
}

func (s *Server) rbacMiddleware(requiredRoles ...string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			userID := r.Header.Get("X-User-ID")
			if userID == "" {
				errorJSON(w, "unauthorized", http.StatusUnauthorized)
				return
			}

			var permCount int
			s.db.QueryRow(`SELECT COUNT(*) FROM _permissions`).Scan(&permCount)
			if permCount == 0 {
				next.ServeHTTP(w, r)
				return
			}

			collection := r.PathValue("name")

			var role string
			var err error
			if collection == "" {
				for _, reqRole := range requiredRoles {
					err = s.db.QueryRow(
						`SELECT role FROM _permissions WHERE user_id = ? AND role = ? LIMIT 1`,
						userID, reqRole,
					).Scan(&role)
					if err == nil {
						break
					}
				}
			} else {
				err = s.db.QueryRow(
					`SELECT role FROM _permissions WHERE user_id = ? AND collection = ?`,
					userID, collection,
				).Scan(&role)
			}

			if err != nil {
				if err == sql.ErrNoRows {
					errorJSON(w, "forbidden", http.StatusForbidden)
					return
				}
				errorJSON(w, err.Error(), http.StatusInternalServerError)
				return
			}

			for _, required := range requiredRoles {
				if role == required {
					next.ServeHTTP(w, r)
					return
				}
			}
			if role == "admin" {
				next.ServeHTTP(w, r)
				return
			}

			errorJSON(w, "forbidden", http.StatusForbidden)
		})
	}
}
