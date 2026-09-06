package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestRbacMiddleware_NoUserID(t *testing.T) {
	srv := newTestServer(t)
	handler := srv.rbacMiddleware("admin")(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	w := httptest.NewRecorder()
	r := httptest.NewRequest("GET", "/api/collections", nil)
	handler.ServeHTTP(w, r)

	if w.Code != 401 {
		t.Fatalf("expected 401, got %d", w.Code)
	}
}

func TestRbacMiddleware_NoPermissions(t *testing.T) {
	srv := newTestServer(t)
	handler := srv.rbacMiddleware("admin")(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	w := httptest.NewRecorder()
	r := httptest.NewRequest("GET", "/api/collections", nil)
	r.Header.Set("X-User-ID", "user1")
	handler.ServeHTTP(w, r)

	if w.Code != 200 {
		t.Fatalf("expected 200 (no permissions table = pass), got %d", w.Code)
	}
}

func TestRbacMiddleware_Forbidden(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	// Create a permission for user
	request(t, h, "POST", "/api/permissions", `{"user_id":"other_user","collection":"*","role":"viewer"}`)

	// The authed user should be forbidden from admin-only action without admin role
	resp := request(t, h, "POST", "/api/collections", `{"name":"test"}`)
	if resp.StatusCode != 403 {
		t.Fatalf("expected 403, got %d", resp.StatusCode)
	}
}

func TestRbacMiddleware_AdminPasses(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	// Get the user ID from the token
	claims, _ := validateToken(token)

	// Set user as admin
	request(t, h, "POST", "/api/permissions", `{"user_id":"`+claims.UserID+`","collection":"*","role":"admin"}`)

	// Should now be able to create collection
	resp := request(t, h, "POST", "/api/collections", `{"name":"admin_test"}`)
	if resp.StatusCode != 200 {
		t.Fatalf("expected 200, got %d", resp.StatusCode)
	}
}

func TestPermissionsCreate_Validation(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	// Missing user_id
	resp := request(t, h, "POST", "/api/permissions", `{"collection":"c","role":"viewer"}`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400, got %d", resp.StatusCode)
	}

	// Missing collection
	resp = request(t, h, "POST", "/api/permissions", `{"user_id":"u","role":"viewer"}`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400, got %d", resp.StatusCode)
	}

	// Invalid role
	resp = request(t, h, "POST", "/api/permissions", `{"user_id":"u","collection":"c","role":"superadmin"}`)
	if resp.StatusCode != 400 {
		t.Fatalf("expected 400, got %d", resp.StatusCode)
	}
}

func TestPermissionsDelete_NotFound(t *testing.T) {
	srv := newTestServer(t)
	token := loginAndGetToken(t, srv)
	h := authenticated(srv.routes(), token)

	resp := request(t, h, "DELETE", "/api/permissions/nonexistent", "")
	if resp.StatusCode != 404 {
		t.Fatalf("expected 404, got %d", resp.StatusCode)
	}
}


