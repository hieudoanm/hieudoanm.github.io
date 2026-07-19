// Package httpapi implements the HTTP API surface of the backbone server.
package httpapi

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/hieudoanm/backbone/internal/cache"
	"github.com/hieudoanm/backbone/internal/cron"
	"github.com/hieudoanm/backbone/internal/id"
	"github.com/hieudoanm/backbone/internal/realtime"
	crob "github.com/robfig/cron/v3"
)

func isConflict(err error) bool {
	return err != nil && strings.Contains(err.Error(), "UNIQUE")
}

// Server wires together the database and live-update hubs.
type Server struct {
	db            *sql.DB
	dataDir       string
	secretsKey    []byte
	cronScheduler *crob.Cron
	wsHub         *realtime.WSHub
	cache         *cache.CacheStore
	sseHub        *realtime.SSEHub
	logHub        *realtime.SSEHub
	pubsubHub     *realtime.SSEHub
}

// NewServer builds a Server with all hubs started.
func NewServer(db *sql.DB, dataDir string, secretsKey []byte) *Server {
	s := &Server{
		db:            db,
		dataDir:       dataDir,
		secretsKey:    secretsKey,
		cronScheduler: cron.StartScheduler(db),
		wsHub:         realtime.NewWSHub(db),
		cache:         cache.NewCacheStore(db),
		sseHub:        realtime.NewSSEHub(db),
		logHub:        realtime.NewSSEHub(db),
		pubsubHub:     realtime.NewSSEHub(db),
	}
	go s.wsHub.Run()
	return s
}

func errorJSON(w http.ResponseWriter, msg string, code int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(map[string]string{"error": msg})
}

func jsonResponse(w http.ResponseWriter, data any) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

func (s *Server) handleBackup(w http.ResponseWriter, r *http.Request) {
	path := filepath.Join(os.TempDir(), "backbone-backup-"+id.Generate()+".db")
	defer os.Remove(path)
	if _, err := s.db.Exec(fmt.Sprintf("VACUUM INTO '%s'", path)); err != nil {
		errorJSON(w, "backup failed: "+err.Error(), http.StatusInternalServerError)
		return
	}
	data, err := os.ReadFile(path)
	if err != nil {
		errorJSON(w, "read backup: "+err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/octet-stream")
	w.Header().Set("Content-Disposition", `attachment; filename="backbone-backup.db"`)
	w.Write(data)
}

// ServeHTTP routes every request and logs it.
func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	s.routes().ServeHTTP(w, r)
	log.Printf("%s %s %s", r.Method, r.URL.Path, r.RemoteAddr)
}
