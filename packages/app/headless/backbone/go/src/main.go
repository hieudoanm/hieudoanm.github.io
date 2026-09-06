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
	db, err := openDB()
	if err != nil {
		log.Fatalf("open db: %v", err)
	}
	defer db.Close()

	if err := migrateDB(db); err != nil {
		log.Fatalf("migrate db: %v", err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	addr := ":" + port

	key, err := getOrCreateSecretsKey(dataDir())
	if err != nil {
		log.Fatalf("secrets key: %v", err)
	}
	srv := &Server{db: db, dataDir: dataDir(), secretsKey: key}
	srv.cronScheduler = startCronScheduler(db)
	defer srv.cronScheduler.Stop()
	srv.wsHub = NewWSHub(db)
	go srv.wsHub.Run()
	srv.cache = NewCacheStore(db)
	srv.sseHub = NewSSEHub(db)
	srv.logHub = NewSSEHub(db)
	srv.pubsubHub = NewSSEHub(db)

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
