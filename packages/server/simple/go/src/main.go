package main

import (
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

func dataDir() string {
	dir := os.Getenv("SIMPLE_DATA")
	if dir == "" {
		home, err := os.UserHomeDir()
		if err != nil {
			return filepath.Join(os.TempDir(), ".simple")
		}
		dir = filepath.Join(home, ".simple")
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

	if err := http.ListenAndServe(addr, srv); err != nil {
		log.Fatalf("server: %v", err)
	}
}
