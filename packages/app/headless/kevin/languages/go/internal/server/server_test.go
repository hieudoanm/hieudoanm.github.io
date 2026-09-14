package server

import (
	"bufio"
	"context"
	"fmt"
	"net"
	"strings"
	"sync"
	"testing"

	"github.com/hieudoanm/kevin/internal/db"
)

func startTestServer(t *testing.T) (addr string, close func()) {
	t.Helper()
	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatal(err)
	}
	ctx, cancel := context.WithCancel(context.Background())
	srv := New(db.New())
	go srv.Serve(ctx, ln)
	return ln.Addr().String(), func() {
		cancel()
		ln.Close()
	}
}

func roundTrip(t *testing.T, conn net.Conn, reader *bufio.Reader, cmd string) string {
	t.Helper()
	if _, err := fmt.Fprintf(conn, "%s\n", cmd); err != nil {
		t.Fatal(err)
	}
	line, err := reader.ReadString('\n')
	if err != nil {
		t.Fatal(err)
	}
	return strings.TrimRight(line, "\n")
}

func TestServeProtocol(t *testing.T) {
	addr, close := startTestServer(t)
	defer close()

	conn, err := net.Dial("tcp", addr)
	if err != nil {
		t.Fatal(err)
	}
	defer conn.Close()
	reader := bufio.NewReader(conn)

	cases := []struct{ cmd, want string }{
		{"PING", "PONG"},
		{"SET mykey myvalue", "OK"},
		{"GET mykey", "myvalue"},
		{"GET nonexistent", "(nil)"},
		{"DEL mykey", "1"},
		{"DEL mykey", "0"},
		{"FOO", "ERR unknown command"},
	}
	for _, c := range cases {
		if got := roundTrip(t, conn, reader, c.cmd); got != c.want {
			t.Errorf("roundTrip(%q) = %q; want %q", c.cmd, got, c.want)
		}
	}
}

func TestServeConcurrentClients(t *testing.T) {
	addr, close := startTestServer(t)
	defer close()

	var wg sync.WaitGroup
	for i := 0; i < 50; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			conn, err := net.Dial("tcp", addr)
			if err != nil {
				t.Error(err)
				return
			}
			defer conn.Close()
			reader := bufio.NewReader(conn)

			set := roundTrip(t, conn, reader, fmt.Sprintf("SET key%d value%d", i, i))
			if set != "OK" {
				t.Errorf("concurrent SET = %q; want OK", set)
			}
			if got := roundTrip(t, conn, reader, fmt.Sprintf("GET key%d", i)); got != fmt.Sprintf("value%d", i) {
				t.Errorf("concurrent GET = %q", got)
			}
		}(i)
	}
	wg.Wait()

	conn, err := net.Dial("tcp", addr)
	if err != nil {
		t.Fatal(err)
	}
	defer conn.Close()
	reader := bufio.NewReader(conn)
	if _, err := fmt.Fprintf(conn, "KEYS\n"); err != nil {
		t.Fatal(err)
	}
	line, err := reader.ReadString('\n')
	if err != nil {
		t.Fatal(err)
	}
	if count := len(strings.Fields(line)); count != 50 {
		t.Errorf("KEYS = %d keys; want 50", count)
	}
}
