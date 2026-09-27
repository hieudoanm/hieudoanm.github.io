package mcp

import (
	"bufio"
	"context"
	"errors"
	"fmt"
	"net"
	"strings"
	"sync"
)

// tcpStore talks the inline protocol to a running `kevin serve` over a single
// TCP connection. The MCP server handles one request at a time, so the
// connection is serialised behind a mutex rather than pooled.
type tcpStore struct {
	mu   sync.Mutex
	conn net.Conn
	in   *bufio.Reader
}

// DialTCPStore connects to a `kevin serve` listening on addr. The caller owns
// the returned Store and must Close it.
func DialTCPStore(ctx context.Context, addr string) (Store, error) {
	var dialer net.Dialer
	conn, err := dialer.DialContext(ctx, "tcp", addr)
	if err != nil {
		return nil, fmt.Errorf("dial kevin at %s: %w", addr, err)
	}
	return &tcpStore{conn: conn, in: bufio.NewReader(conn)}, nil
}

// Close releases the underlying connection.
func (s *tcpStore) Close() error {
	return s.conn.Close()
}

// do sends one command line and returns the trimmed reply. A Redis-style
// "ERR ..." reply is surfaced as a Go error so callers do not have to inspect
// the text themselves.
func (s *tcpStore) do(format string, args ...any) (string, error) {
	request := fmt.Sprintf(format, args...)

	s.mu.Lock()
	defer s.mu.Unlock()

	if _, err := fmt.Fprintf(s.conn, "%s\r\n", request); err != nil {
		return "", fmt.Errorf("send %q: %w", request, err)
	}
	reply, err := s.in.ReadString('\n')
	if err != nil {
		return "", fmt.Errorf("read reply to %q: %w", request, err)
	}
	reply = strings.TrimRight(reply, "\r\n")
	if strings.HasPrefix(reply, "ERR ") {
		return "", errors.New(reply)
	}
	return reply, nil
}

// Ping verifies the remote server is alive.
func (s *tcpStore) Ping() error {
	_, err := s.do("PING")
	return err
}

// Get returns the value stored under key and whether it was present. A miss is
// reported as the protocol's "(nil)" sentinel.
func (s *tcpStore) Get(key string) (string, bool, error) {
	if err := validateToken("key", key); err != nil {
		return "", false, err
	}
	value, err := s.do("GET %s", key)
	if err != nil {
		return "", false, err
	}
	if value == "(nil)" {
		return "", false, nil
	}
	return value, true, nil
}

// Set stores value under key. The expiry is applied with a follow-up EXPIRE
// rather than the "SET key value EX n" form, because that form is parsed by
// searching the value for " EX " and would corrupt a value containing it.
func (s *tcpStore) Set(key, value string, ttlSeconds int) error {
	if err := validateToken("key", key); err != nil {
		return err
	}
	if err := validateToken("value", value); err != nil {
		return err
	}
	if _, err := s.do("SET %s %s", key, value); err != nil {
		return err
	}
	if ttlSeconds <= 0 {
		return nil
	}
	_, err := s.do("EXPIRE %s %d", key, ttlSeconds)
	return err
}

// Del removes every key and returns how many were present.
func (s *tcpStore) Del(keys []string) (int, error) {
	if len(keys) == 0 {
		return 0, errors.New("keys must not be empty")
	}
	for _, key := range keys {
		if err := validateToken("key", key); err != nil {
			return 0, err
		}
	}
	reply, err := s.do("DEL %s", strings.Join(keys, " "))
	if err != nil {
		return 0, err
	}
	return parseCount(reply)
}

// Exists reports whether key is present and unexpired.
func (s *tcpStore) Exists(key string) (bool, error) {
	if err := validateToken("key", key); err != nil {
		return false, err
	}
	reply, err := s.do("EXISTS %s", key)
	if err != nil {
		return false, err
	}
	count, err := parseCount(reply)
	if err != nil {
		return false, err
	}
	return count > 0, nil
}

// Keys returns every present, unexpired key. The protocol joins keys with
// spaces, so a key containing a space cannot round-trip over TCP; such keys
// are rejected by Set and Del.
func (s *tcpStore) Keys() ([]string, error) {
	reply, err := s.do("KEYS")
	if err != nil {
		return nil, err
	}
	return strings.Fields(reply), nil
}

// Len returns the number of present, unexpired keys.
func (s *tcpStore) Len() (int, error) {
	reply, err := s.do("LEN")
	if err != nil {
		return 0, err
	}
	return parseCount(reply)
}

// Flush removes every key and returns how many were removed. The protocol does
// not report the count, so Len is read before and after to derive it.
func (s *tcpStore) Flush() (int, error) {
	before, err := s.Len()
	if err != nil {
		return 0, err
	}
	if _, err := s.do("FLUSHALL"); err != nil {
		return 0, err
	}
	return before, nil
}

// TTL returns the remaining lifetime of key in whole seconds plus its state.
// The protocol encodes the state in the sign of the number: -2 for a missing
// key and -1 for a key with no expiry.
func (s *tcpStore) TTL(key string) (int, TTLState, error) {
	if err := validateToken("key", key); err != nil {
		return 0, TTLStateMissing, err
	}
	reply, err := s.do("TTL %s", key)
	if err != nil {
		return 0, TTLStateMissing, err
	}
	seconds, err := parseCount(reply)
	if err != nil {
		return 0, TTLStateMissing, err
	}
	return seconds, stateFromSeconds(seconds), nil
}

// Expire sets an expiry on key and reports whether key existed.
func (s *tcpStore) Expire(key string, seconds int) (bool, error) {
	if err := validateToken("key", key); err != nil {
		return false, err
	}
	reply, err := s.do("EXPIRE %s %d", key, seconds)
	if err != nil {
		return false, err
	}
	applied, err := parseCount(reply)
	if err != nil {
		return false, err
	}
	return applied > 0, nil
}

// stateFromSeconds maps the signed integer returned by the TTL command onto a
// TTLState. The protocol encodes a missing key as -2 and a key with no expiry
// as -1.
func stateFromSeconds(seconds int) TTLState {
	switch {
	case seconds <= -2:
		return TTLStateMissing
	case seconds < 0:
		return TTLStateNoExpiry
	default:
		return TTLStateExpiring
	}
}

// parseCount parses a non-negative integer reply.
func parseCount(reply string) (int, error) {
	value := 0
	if _, err := fmt.Sscanf(reply, "%d", &value); err != nil {
		return 0, fmt.Errorf("unexpected reply %q", reply)
	}
	return value, nil
}

// validateToken rejects keys and values the inline protocol cannot carry: it
// tokenises on single spaces and terminates lines on newlines, so an embedded
// space or newline would silently split one value into two arguments.
func validateToken(name, value string) error {
	if value == "" {
		return fmt.Errorf("%s must not be empty", name)
	}
	if strings.ContainsAny(value, " \r\n") {
		return fmt.Errorf("%s must not contain spaces or newlines when kevin is reached over TCP, got %q", name, value)
	}
	return nil
}
