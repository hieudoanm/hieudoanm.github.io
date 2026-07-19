package main

import (
	"net/http/httptest"
	"testing"
)

func TestHandleOpenAPIJSON(t *testing.T) {
	srv := &Server{}
	w := httptest.NewRecorder()
	r := httptest.NewRequest("GET", "/api/openapi.json", nil)
	srv.handleOpenAPIJSON(w, r)
	if w.Code != 200 {
		t.Fatalf("expected 200, got %d", w.Code)
	}
	ct := w.Header().Get("Content-Type")
	if ct != "application/json" {
		t.Fatalf("expected application/json, got %s", ct)
	}
	if w.Body.Len() == 0 {
		t.Fatal("expected non-empty body")
	}
}

func TestHandleSwaggerUI(t *testing.T) {
	srv := &Server{}
	w := httptest.NewRecorder()
	r := httptest.NewRequest("GET", "/api/docs", nil)
	srv.handleSwaggerUI(w, r)
	if w.Code != 200 {
		t.Fatalf("expected 200, got %d", w.Code)
	}
	ct := w.Header().Get("Content-Type")
	if ct != "text/html; charset=utf-8" {
		t.Fatalf("expected text/html, got %s", ct)
	}
	if w.Body.Len() == 0 {
		t.Fatal("expected non-empty body")
	}
}
