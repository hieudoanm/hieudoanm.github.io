package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"strings"
	"syscall"
	"time"

	"github.com/hieudoanm/backbone/internal/httpapi"
	"github.com/hieudoanm/backbone/internal/mcp"
	"github.com/hieudoanm/backbone/internal/secrets"
	"github.com/hieudoanm/backbone/internal/store"
)

func dataDir() string {
	dir := os.Getenv("BACKBONE_DATA")
	if dir == "" {
		home, err := os.UserHomeDir()
		if err != nil {
			return filepath.Join(os.TempDir(), ".backbone")
		}
		dir = filepath.Join(home, ".backbone")
	}
	return dir
}

func getLocalIP() string {
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		return "127.0.0.1"
	}
	for _, addr := range addrs {
		if ipnet, ok := addr.(*net.IPNet); ok && !ipnet.IP.IsLoopback() && ipnet.IP.To4() != nil {
			return ipnet.IP.String()
		}
	}
	return "127.0.0.1"
}

func main() {
	args := os.Args[1:]

	if len(args) > 0 && args[0] == "mcp" {
		if err := runMCP(args[1:]); err != nil {
			log.Fatalf("mcp server: %v", err)
		}
		return
	}

	db, err := store.OpenDB()
	if err != nil {
		log.Fatalf("open db: %v", err)
	}
	defer db.Close()

	if err := store.MigrateDB(db); err != nil {
		log.Fatalf("migrate db: %v", err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	addr := ":" + port

	key, err := secrets.GetOrCreateKey(dataDir())
	if err != nil {
		log.Fatalf("secrets key: %v", err)
	}
	srv := httpapi.NewServer(db, dataDir(), key)

	localURL := fmt.Sprintf("http://localhost:%s", port)
	netURL := fmt.Sprintf("http://%s:%s", getLocalIP(), port)
	localLink := fmt.Sprintf("\033]8;;%s\007%s\033]8;;\007", localURL, localURL)
	netLink := fmt.Sprintf("\033]8;;%s\007%s\033]8;;\007", netURL, netURL)
	fmt.Println()
	fmt.Println("  ┌─────────────────────────────────────────────┐")
	fmt.Println("  │  Server running at:                         │")
	fmt.Println("  │                                             │")
	fmt.Printf("  │    ➜  Local:   %s%s│\n", localLink, strings.Repeat(" ", 29-len(localURL)))
	fmt.Printf("  │    ➜  Network: %s%s│\n", netLink, strings.Repeat(" ", 29-len(netURL)))
	fmt.Println("  │                                             │")
	fmt.Println("  └─────────────────────────────────────────────┘")
	fmt.Println()

	httpServer := &http.Server{Addr: addr, Handler: srv}

	go func() {
		sig := make(chan os.Signal, 1)
		signal.Notify(sig, syscall.SIGINT, syscall.SIGTERM)
		<-sig
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		httpServer.Shutdown(ctx)
	}()

	if err := httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("server: %v", err)
	}
}

// runMCP serves the Model Context Protocol over stdio. The database is opened
// and migrated once here and handed to the tools, so a tool call reuses the one
// connection instead of opening and leaking its own.
//
// `serve` is accepted so `backbone mcp serve` works, matching the Rust and
// Kotlin ports and the wording MCP clients expect.
func runMCP(args []string) error {
	for _, arg := range args {
		if arg != "serve" {
			return fmt.Errorf("unknown mcp argument %q", arg)
		}
	}

	db, err := store.OpenDB()
	if err != nil {
		return fmt.Errorf("open db: %w", err)
	}
	defer db.Close()
	if err := store.MigrateDB(db); err != nil {
		return fmt.Errorf("migrate db: %w", err)
	}

	s := mcp.NewServer()
	mcp.Register(s, mcp.ServerDeps{DB: db})

	fmt.Fprintln(os.Stderr, "backbone-mcp server running on stdio")
	return s.Run()
}
