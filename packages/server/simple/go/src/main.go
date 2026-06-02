package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func dataDir() string {
	dir := os.Getenv("SIMPLEBASE_DATA")
	if dir == "" {
		home, err := os.UserHomeDir()
		if err != nil {
			return filepath.Join(os.TempDir(), ".simplebase")
		}
		dir = filepath.Join(home, ".simplebase")
	}
	return dir
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

	addr := os.Getenv("PORT")
	if addr == "" {
		addr = "8080"
	}
	addr = ":" + addr

	srv := &Server{db: db, dataDir: dataDir()}
	log.Printf("SimpleBase listening on %s", addr)
	if err := http.ListenAndServe(addr, srv); err != nil {
		log.Fatalf("server: %v", err)
	}
}
