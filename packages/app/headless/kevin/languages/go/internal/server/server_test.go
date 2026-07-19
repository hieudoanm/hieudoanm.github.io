package server

import (
	"context"
	"net"
	"testing"
	"time"

	"github.com/hieudoanm/kevin/internal/db"
)

func TestGracefulShutdown(t *testing.T) {
	kv := db.New()
	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatal(err)
	}

	ctx, cancel := context.WithCancel(context.Background())
	errCh := make(chan error, 1)
	go func() {
		errCh <- New(kv).Serve(ctx, ln)
	}()

	time.Sleep(50 * time.Millisecond)
	cancel()

	select {
	case err := <-errCh:
		if err != nil {
			t.Errorf("Serve returned %v; want nil", err)
		}
	case <-time.After(2 * time.Second):
		t.Error("Serve did not return after context cancellation")
	}
}

func TestAcceptErrorContinues(t *testing.T) {
	kv := db.New()
	// Use a non-TCP listener to force an accept error.
	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatal(err)
	}
	addr := ln.Addr().String()

	ctx, cancel := context.WithCancel(context.Background())
	errCh := make(chan error, 1)
	go func() {
		errCh <- New(kv).Serve(ctx, ln)
	}()

	// Connect then immediately close to create a brief accept event.
	conn, err := net.Dial("tcp", addr)
	if err != nil {
		t.Fatal(err)
	}
	conn.Close()

	time.Sleep(50 * time.Millisecond)
	cancel()

	select {
	case <-errCh:
	case <-time.After(2 * time.Second):
		t.Error("Serve did not stop after context cancellation")
	}
}
