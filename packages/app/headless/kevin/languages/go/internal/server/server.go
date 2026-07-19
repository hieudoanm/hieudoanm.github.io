package server

import (
	"bufio"
	"context"
	"log"
	"net"

	"github.com/hieudoanm/kevin/internal/db"
)

// Server serves the Redis-style protocol over TCP.
type Server struct {
	kv *db.DB
}

// New returns a Server backed by kv.
func New(kv *db.DB) *Server {
	return &Server{kv: kv}
}

// Serve accepts connections on ln until ctx is cancelled.
func (s *Server) Serve(ctx context.Context, ln net.Listener) error {
	go func() {
		<-ctx.Done()
		ln.Close()
	}()

	for {
		conn, err := ln.Accept()
		if err != nil {
			if ctx.Err() != nil {
				return nil
			}
			log.Printf("accept: %v", err)
			continue
		}
		go s.handleConn(conn)
	}
}

func (s *Server) handleConn(conn net.Conn) {
	defer conn.Close()
	scanner := bufio.NewScanner(conn)
	for scanner.Scan() {
		resp, ok := handleLine(scanner.Text(), s.kv)
		if !ok {
			continue
		}
		if _, err := conn.Write([]byte(resp)); err != nil {
			return
		}
	}
}
