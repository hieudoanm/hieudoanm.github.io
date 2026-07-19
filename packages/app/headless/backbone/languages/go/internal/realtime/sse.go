package realtime

import (
	"database/sql"
	"fmt"
	"net/http"
	"sync"

	"github.com/hieudoanm/backbone/internal/id"
)

// SSEClient is a single server-sent-events subscriber.
type SSEClient struct {
	ID    string
	Ch    chan []byte
	mu    sync.Mutex
	close chan struct{}
}

// SSEHub fans out events to registered SSE clients.
type SSEHub struct {
	mu      sync.RWMutex
	clients map[string]*SSEClient
	db      *sql.DB
}

// NewSSEHub creates an SSE hub bound to the given database.
func NewSSEHub(db *sql.DB) *SSEHub {
	return &SSEHub{
		clients: make(map[string]*SSEClient),
		db:      db,
	}
}

// Register adds a client to the hub.
func (h *SSEHub) Register(client *SSEClient) {
	h.mu.Lock()
	h.clients[client.ID] = client
	h.mu.Unlock()
}

// Unregister removes a client from the hub.
func (h *SSEHub) Unregister(id string) {
	h.mu.Lock()
	delete(h.clients, id)
	h.mu.Unlock()
}

// Broadcast delivers a payload to every connected client.
func (h *SSEHub) Broadcast(data []byte) {
	h.mu.RLock()
	defer h.mu.RUnlock()
	for _, client := range h.clients {
		select {
		case client.Ch <- data:
		default:
		}
	}
}

// HandleStream serves an HTTP SSE stream for a client.
func (h *SSEHub) HandleStream(w http.ResponseWriter, r *http.Request) {
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "streaming unsupported", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	id := id.Generate()
	client := &SSEClient{
		ID:    id,
		Ch:    make(chan []byte, 64),
		close: make(chan struct{}),
	}
	h.Register(client)
	defer h.Unregister(id)

	ctx := r.Context()
	for {
		select {
		case <-ctx.Done():
			return
		case data, ok := <-client.Ch:
			if !ok {
				return
			}
			fmt.Fprintf(w, "data: %s\n\n", data)
			flusher.Flush()
		}
	}
}
