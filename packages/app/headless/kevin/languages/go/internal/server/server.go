package server

import (
	"bufio"
	"context"
	"log/slog"
	"net"
	"strings"

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
	addr := ln.Addr().String()
	go func() {
		<-ctx.Done()
		slog.Debug("shutdown requested, closing listener", "addr", addr)
		ln.Close()
	}()

	for {
		conn, err := ln.Accept()
		if err != nil {
			if ctx.Err() != nil {
				slog.Info("server stopped", "addr", addr)
				return nil
			}
			slog.Error("accept failed", "addr", addr, "err", err)
			continue
		}
		slog.Info("connection opened", "remote", conn.RemoteAddr().String(), "local", conn.LocalAddr().String())
		go s.handleConn(conn)
	}
}

func (s *Server) handleConn(conn net.Conn) {
	remote := conn.RemoteAddr().String()
	defer func() {
		slog.Info("connection closed", "remote", remote)
		conn.Close()
	}()

	scanner := bufio.NewScanner(conn)
	for scanner.Scan() {
		line := strings.TrimRight(scanner.Text(), "\r")
		resp, ok := handleLine(line, s.kv)
		if !ok {
			continue
		}
		slog.Debug("command handled", "remote", remote, "request", line, "response", strings.TrimRight(resp, "\n"))
		if strings.HasPrefix(resp, "ERR ") {
			slog.Warn("command error", "remote", remote, "request", line, "response", strings.TrimRight(resp, "\n"))
		}
		if _, err := conn.Write([]byte(resp)); err != nil {
			slog.Debug("write failed", "remote", remote, "err", err)
			return
		}
	}
	if err := scanner.Err(); err != nil {
		slog.Debug("scan failed", "remote", remote, "err", err)
	}
}
