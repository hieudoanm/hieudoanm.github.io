package server

import (
	"strconv"
	"strings"
	"time"

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
	case "EXISTS":
		return handleExists(rest, kv)
	case "LEN":
		return handleLen(rest, kv)
	case "FLUSHALL", "FLUSHDB":
		return handleFlush(rest, kv)
	case "EXPIRE":
		return handleExpire(rest, kv)
	case "TTL":
		return handleTTL(rest, kv)
	default:
		return "ERR unknown command\n", true
	}
}

func handleSet(rest string, kv *db.DB) (string, bool) {
	key, after := splitToken(rest)
	if key == "" {
		return "ERR usage: SET key value [EX seconds]\n", true
	}
	value := strings.TrimLeft(after, " ")
	if value == "" {
		return "ERR usage: SET key value [EX seconds]\n", true
	}
	if idx := strings.LastIndex(strings.ToUpper(value), " EX "); idx >= 0 {
		ttl, err := strconv.Atoi(strings.TrimSpace(value[idx+4:]))
		if err != nil || ttl <= 0 {
			return "ERR invalid expire time\n", true
		}
		kv.SetWithTTL(key, value[:idx], time.Duration(ttl)*time.Second)
		return "OK\n", true
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
	keys := splitAll(rest)
	if len(keys) == 0 {
		return "ERR usage: DEL key [key ...]\n", true
	}
	return strconv.Itoa(kv.DelMultiple(keys)) + "\n", true
}

func handleExists(rest string, kv *db.DB) (string, bool) {
	key, after := splitToken(rest)
	if key == "" || strings.TrimSpace(after) != "" {
		return "ERR usage: EXISTS key\n", true
	}
	if kv.Exists(key) {
		return "1\n", true
	}
	return "0\n", true
}

func handleLen(rest string, kv *db.DB) (string, bool) {
	if strings.TrimSpace(rest) != "" {
		return "ERR usage: LEN\n", true
	}
	return strconv.Itoa(kv.Len()) + "\n", true
}

func handleFlush(rest string, kv *db.DB) (string, bool) {
	if strings.TrimSpace(rest) != "" {
		return "ERR usage: FLUSHALL\n", true
	}
	kv.Flush()
	return "OK\n", true
}

func handleExpire(rest string, kv *db.DB) (string, bool) {
	key, seconds, ok := splitTwo(rest)
	if !ok {
		return "ERR usage: EXPIRE key seconds\n", true
	}
	ttl, err := strconv.Atoi(seconds)
	if err != nil || ttl <= 0 {
		return "ERR invalid expire time\n", true
	}
	if kv.Expire(key, time.Duration(ttl)*time.Second) {
		return "1\n", true
	}
	return "0\n", true
}

func handleTTL(rest string, kv *db.DB) (string, bool) {
	key, after := splitToken(rest)
	if key == "" || strings.TrimSpace(after) != "" {
		return "ERR usage: TTL key\n", true
	}
	remaining, hasExpiry := kv.TTL(key)
	if !hasExpiry {
		return strconv.Itoa(int(remaining.Seconds())) + "\n", true
	}
	seconds := int((remaining + 999*time.Millisecond).Seconds())
	return strconv.Itoa(seconds) + "\n", true
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

// splitAll returns every space-delimited token of s.
func splitAll(s string) []string {
	tokens := []string{}
	for {
		token, rest := splitToken(s)
		if token == "" {
			break
		}
		tokens = append(tokens, token)
		s = rest
	}
	return tokens
}

// splitTwo consumes two tokens and reports whether both were present.
func splitTwo(s string) (first, second string, ok bool) {
	first, rest := splitToken(s)
	if first == "" {
		return "", "", false
	}
	second, rest = splitToken(rest)
	if second == "" || strings.TrimSpace(rest) != "" {
		return "", "", false
	}
	return first, second, true
}

// splitThree consumes a command and a single argument, reporting ok.
func splitThree(s string) (cmd, arg, rest string, ok bool) {
	cmd, rest = splitToken(s)
	if cmd == "" {
		return "", "", "", false
	}
	arg, rest = splitToken(rest)
	if arg == "" {
		return "", "", "", false
	}
	return cmd, arg, rest, true
}
