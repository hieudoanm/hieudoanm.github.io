// Package realtime provides WebSocket and SSE hubs for live updates.
package realtime

import (
	"database/sql"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/gorilla/websocket"
	"github.com/hieudoanm/backbone/internal/id"
	"github.com/hieudoanm/backbone/internal/store"
)

// WSClient is a connected websocket client.
type WSClient struct {
	ID          string
	Hub         *WSHub
	Conn        *websocket.Conn
	Send        chan []byte
	RemoteAddr  string
	UserAgent   string
	Path        string
	ConnectedAt string
}

// WSHub tracks and fans out messages to websocket clients.
type WSHub struct {
	mu         sync.RWMutex
	clients    map[string]*WSClient
	register   chan *WSClient
	unregister chan *WSClient
	broadcast  chan []byte
	db         *sql.DB
}

// NewWSHub creates a websocket hub bound to the given database.
func NewWSHub(db *sql.DB) *WSHub {
	return &WSHub{
		clients:    make(map[string]*WSClient),
		register:   make(chan *WSClient),
		unregister: make(chan *WSClient),
		broadcast:  make(chan []byte, 256),
		db:         db,
	}
}

// Run processes register, unregister, and broadcast events.
func (h *WSHub) Run() {
	for {
		select {
		case client := <-h.register:
			h.mu.Lock()
			h.clients[client.ID] = client
			h.mu.Unlock()
			store.InsertWSConnection(h.db, client.ID, client.RemoteAddr, client.Path, client.UserAgent)

		case client := <-h.unregister:
			h.mu.Lock()
			if _, ok := h.clients[client.ID]; ok {
				delete(h.clients, client.ID)
				close(client.Send)
			}
			h.mu.Unlock()
			store.UpdateWSDisconnect(h.db, client.ID)

		case message := <-h.broadcast:
			h.mu.RLock()
			for _, client := range h.clients {
				select {
				case client.Send <- message:
				default:
				}
			}
			h.mu.RUnlock()
		}
	}
}

// Broadcast delivers a message to every connected client.
func (h *WSHub) Broadcast(message []byte) {
	h.broadcast <- message
}

// SendToClient delivers a message to a single client.
func (h *WSHub) SendToClient(id string, message []byte) bool {
	h.mu.RLock()
	client, ok := h.clients[id]
	h.mu.RUnlock()
	if !ok {
		return false
	}
	select {
	case client.Send <- message:
		return true
	default:
		return false
	}
}

// CloseClient unregisters and closes a client connection.
func (h *WSHub) CloseClient(id string) {
	h.mu.RLock()
	client, ok := h.clients[id]
	h.mu.RUnlock()
	if ok {
		h.unregister <- client
		client.Conn.Close()
	}
}

// ActiveCount returns the number of connected clients.
func (h *WSHub) ActiveCount() int {
	h.mu.RLock()
	defer h.mu.RUnlock()
	return len(h.clients)
}

var wsUpgrader = websocket.Upgrader{
	CheckOrigin:     func(r *http.Request) bool { return true },
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

// ServeWS upgrades a connection and registers the new client.
func (h *WSHub) ServeWS(w http.ResponseWriter, r *http.Request) {
	conn, err := wsUpgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("ws upgrade: %v", err)
		return
	}

	id := id.Generate()
	client := &WSClient{
		ID:          id,
		Hub:         h,
		Conn:        conn,
		Send:        make(chan []byte, 256),
		RemoteAddr:  r.RemoteAddr,
		UserAgent:   r.UserAgent(),
		Path:        r.URL.Path,
		ConnectedAt: time.Now().UTC().Format(time.RFC3339),
	}

	h.register <- client
	go client.writePump()
	go client.readPump()
}

func (c *WSClient) readPump() {
	defer func() {
		c.Hub.unregister <- c
		c.Conn.Close()
	}()
	for {
		_, message, err := c.Conn.ReadMessage()
		if err != nil {
			break
		}
		store.InsertWSMessage(c.Hub.db, c.ID, "received", string(message))
	}
}

func (c *WSClient) writePump() {
	ticker := time.NewTicker(30 * time.Second)
	defer func() {
		ticker.Stop()
		c.Conn.Close()
	}()
	for {
		select {
		case message, ok := <-c.Send:
			if !ok {
				c.Conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}
			if err := c.Conn.WriteMessage(websocket.TextMessage, message); err != nil {
				return
			}
		case <-ticker.C:
			if err := c.Conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}
