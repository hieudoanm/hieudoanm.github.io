package main

import (
	"database/sql"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/gorilla/websocket"
)

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

type WSHub struct {
	mu         sync.RWMutex
	clients    map[string]*WSClient
	register   chan *WSClient
	unregister chan *WSClient
	broadcast  chan []byte
	db         *sql.DB
}

func NewWSHub(db *sql.DB) *WSHub {
	return &WSHub{
		clients:    make(map[string]*WSClient),
		register:   make(chan *WSClient),
		unregister: make(chan *WSClient),
		broadcast:  make(chan []byte, 256),
		db:         db,
	}
}

func (h *WSHub) Run() {
	for {
		select {
		case client := <-h.register:
			h.mu.Lock()
			h.clients[client.ID] = client
			h.mu.Unlock()
			insertWSConnection(h.db, client.ID, client.RemoteAddr, client.Path, client.UserAgent)

		case client := <-h.unregister:
			h.mu.Lock()
			if _, ok := h.clients[client.ID]; ok {
				delete(h.clients, client.ID)
				close(client.Send)
			}
			h.mu.Unlock()
			updateWSDisconnect(h.db, client.ID)

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

func (h *WSHub) CloseClient(id string) {
	h.mu.RLock()
	client, ok := h.clients[id]
	h.mu.RUnlock()
	if ok {
		h.unregister <- client
		client.Conn.Close()
	}
}

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

func (h *WSHub) ServeWS(w http.ResponseWriter, r *http.Request) {
	conn, err := wsUpgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("ws upgrade: %v", err)
		return
	}

	id := generateID()
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
		insertWSMessage(c.Hub.db, c.ID, "received", string(message))
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
