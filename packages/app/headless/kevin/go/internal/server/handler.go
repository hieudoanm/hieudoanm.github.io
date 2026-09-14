package server

import (
	"strings"

	"github.com/hieudoanm/kevin/internal/db"
)

// handleLine parses one protocol line and returns the response, or ok=false
// when the line should be ignored (empty or whitespace only).
func handleLine(line string, kv *db.DB) (string, bool) {
	line = strings.TrimRight(line, "\r\n")
	if strings.TrimSpace(line) == "" {
		return "", false
	}

	cmd, rest := splitToken(line)
	switch strings.ToUpper(cmd) {
	case "PING":
		return "PONG\n", true
	case "SET":
		return handleSet(rest, kv)
	case "GET":
		return handleGet(rest, kv)
	case "DEL":
		return handleDel(rest, kv)
	case "KEYS":
		return strings.Join(kv.Keys(), " ") + "\n", true
	default:
		return "ERR unknown command\n", true
	}
}

func handleSet(rest string, kv *db.DB) (string, bool) {
	key, after := splitToken(rest)
	if key == "" {
		return "ERR usage: SET key value\n", true
	}
	value := strings.TrimLeft(after, " ")
	if value == "" {
		return "ERR usage: SET key value\n", true
	}
	kv.Set(key, value)
	return "OK\n", true
}

func handleGet(rest string, kv *db.DB) (string, bool) {
	key, after := splitToken(rest)
	if key == "" || strings.TrimSpace(after) != "" {
		return "ERR usage: GET key\n", true
	}
	if value, ok := kv.Get(key); ok {
		return value + "\n", true
	}
	return "(nil)\n", true
}

func handleDel(rest string, kv *db.DB) (string, bool) {
	key, after := splitToken(rest)
	if key == "" || strings.TrimSpace(after) != "" {
		return "ERR usage: DEL key\n", true
	}
	if kv.Del(key) {
		return "1\n", true
	}
	return "0\n", true
}

// splitToken returns the first space-delimited token of s and everything
// after it (leading separator spaces preserved), mirroring the C reference's
// strtok_r splitting on single spaces.
func splitToken(s string) (token, rest string) {
	start := 0
	for start < len(s) && s[start] == ' ' {
		start++
	}
	end := start
	for end < len(s) && s[end] != ' ' {
		end++
	}
	return s[start:end], s[end:]
}
