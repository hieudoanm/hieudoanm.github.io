package port

import (
	"net"
	"testing"
)

func TestCheckPortOpen_Closed(t *testing.T) {
	open := checkPortOpen("127.0.0.1:1", 1)
	if open {
		t.Error("expected port 1 on 127.0.0.1 to be closed")
	}
}

func TestCheckPortOpen_Open(t *testing.T) {
	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatalf("failed to start listener: %v", err)
	}
	defer ln.Close()
	addr := ln.Addr().String()

	open := checkPortOpen(addr, 1)
	if !open {
		t.Error("expected listener port to be open")
	}
}
