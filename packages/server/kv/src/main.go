package main

import (
	"bufio"
	"fmt"
	"net"
	"strings"
	"sync"
)

type DB struct {
	mu   sync.RWMutex
	data map[string]string
}

func NewDB() *DB {
	return &DB{
		data: make(map[string]string),
	}
}

func (db *DB) Set(key, value string) {
	db.mu.Lock()
	defer db.mu.Unlock()

	db.data[key] = value
}

func (db *DB) Get(key string) (string, bool) {
	db.mu.RLock()
	defer db.mu.RUnlock()

	value, ok := db.data[key]
	return value, ok
}

func (db *DB) Del(key string) bool {
	db.mu.Lock()
	defer db.mu.Unlock()

	if _, ok := db.data[key]; !ok {
		return false
	}

	delete(db.data, key)
	return true
}

func handleConnection(conn net.Conn, db *DB) {
	defer conn.Close()

	scanner := bufio.NewScanner(conn)

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())

		if line == "" {
			continue
		}

		parts := strings.Fields(line)

		switch strings.ToUpper(parts[0]) {

		case "PING":
			fmt.Fprintln(conn, "PONG")

		case "SET":
			if len(parts) < 3 {
				fmt.Fprintln(conn, "ERR usage: SET key value")
				continue
			}

			key := parts[1]
			value := strings.Join(parts[2:], " ")

			db.Set(key, value)

			fmt.Fprintln(conn, "OK")

		case "GET":
			if len(parts) != 2 {
				fmt.Fprintln(conn, "ERR usage: GET key")
				continue
			}

			value, ok := db.Get(parts[1])

			if !ok {
				fmt.Fprintln(conn, "(nil)")
			} else {
				fmt.Fprintln(conn, value)
			}

		case "DEL":
			if len(parts) != 2 {
				fmt.Fprintln(conn, "ERR usage: DEL key")
				continue
			}

			if db.Del(parts[1]) {
				fmt.Fprintln(conn, "1")
			} else {
				fmt.Fprintln(conn, "0")
			}

		case "KEYS":
			db.mu.RLock()

			keys := make([]string, 0, len(db.data))

			for key := range db.data {
				keys = append(keys, key)
			}

			db.mu.RUnlock()

			fmt.Fprintln(conn, strings.Join(keys, " "))

		default:
			fmt.Fprintln(conn, "ERR unknown command")
		}
	}
}

func main() {
	db := NewDB()

	listener, err := net.Listen("tcp", ":6379")
	if err != nil {
		panic(err)
	}

	fmt.Println("Redis-like server listening on :6379")

	for {
		conn, err := listener.Accept()
		if err != nil {
			continue
		}

		go handleConnection(conn, db)
	}
}
