package main

import (
	"bufio"
	"fmt"
	"net"
	"strings"
	"sync"
	"testing"
)

func TestNewDB(t *testing.T) {
	db := NewDB()
	if db == nil {
		t.Fatal("NewDB() returned nil")
	}
	if db.data == nil {
		t.Fatal("data map not initialized")
	}
}

func TestDBSetGet(t *testing.T) {
	db := NewDB()

	db.Set("key1", "value1")

	val, ok := db.Get("key1")
	if !ok {
		t.Fatal("expected key1 to exist")
	}
	if val != "value1" {
		t.Fatalf("expected value1, got %s", val)
	}
}

func TestDBGetMissing(t *testing.T) {
	db := NewDB()

	_, ok := db.Get("nonexistent")
	if ok {
		t.Fatal("expected nonexistent key to return false")
	}
}

func TestDBDel(t *testing.T) {
	db := NewDB()
	db.Set("key1", "value1")

	if !db.Del("key1") {
		t.Fatal("expected Del to return true for existing key")
	}

	_, ok := db.Get("key1")
	if ok {
		t.Fatal("expected key1 to be deleted")
	}
}

func TestDBDelMissing(t *testing.T) {
	db := NewDB()

	if db.Del("nonexistent") {
		t.Fatal("expected Del to return false for missing key")
	}
}

func TestDBOverwrite(t *testing.T) {
	db := NewDB()

	db.Set("key1", "value1")
	db.Set("key1", "value2")

	val, ok := db.Get("key1")
	if !ok {
		t.Fatal("expected key1 to exist")
	}
	if val != "value2" {
		t.Fatalf("expected value2, got %s", val)
	}
}

func TestDBConcurrency(t *testing.T) {
	db := NewDB()
	var wg sync.WaitGroup
	n := 100

	for i := range n {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			key := fmt.Sprintf("key%d", i)
			value := fmt.Sprintf("value%d", i)
			db.Set(key, value)

			val, ok := db.Get(key)
			if !ok || val != value {
				t.Errorf("concurrent Set/Get failed for %s", key)
			}
		}(i)
	}

	wg.Wait()

	for i := range n {
		key := fmt.Sprintf("key%d", i)
		val, ok := db.Get(key)
		if !ok {
			t.Errorf("expected %s to exist after concurrent writes", key)
		}
		expected := fmt.Sprintf("value%d", i)
		if val != expected {
			t.Errorf("expected %s for %s, got %s", expected, key, val)
		}
	}
}

func dialDB(t *testing.T) (net.Listener, net.Conn, *DB) {
	t.Helper()

	db := NewDB()
	listener, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatalf("failed to listen: %v", err)
	}

	go func() {
		conn, err := listener.Accept()
		if err != nil {
			return
		}
		handleConnection(conn, db)
	}()

	client, err := net.Dial("tcp", listener.Addr().String())
	if err != nil {
		listener.Close()
		t.Fatalf("failed to dial: %v", err)
	}

	return listener, client, db
}

func cmd(t *testing.T, conn net.Conn, command string) string {
	t.Helper()

	_, err := fmt.Fprintf(conn, "%s\r\n", command)
	if err != nil {
		t.Fatalf("failed to write command: %v", err)
	}

	response, err := bufio.NewReader(conn).ReadString('\n')
	if err != nil {
		t.Fatalf("failed to read response: %v", err)
	}

	return strings.TrimRight(response, "\r\n")
}

func TestHandleConnectionPING(t *testing.T) {
	listener, client, _ := dialDB(t)
	defer listener.Close()
	defer client.Close()

	resp := cmd(t, client, "PING")
	if resp != "PONG" {
		t.Fatalf("expected PONG, got %s", resp)
	}
}

func TestHandleConnectionSET(t *testing.T) {
	listener, client, _ := dialDB(t)
	defer listener.Close()
	defer client.Close()

	resp := cmd(t, client, "SET mykey myvalue")
	if resp != "OK" {
		t.Fatalf("expected OK, got %s", resp)
	}
}

func TestHandleConnectionGET(t *testing.T) {
	listener, client, db := dialDB(t)
	defer listener.Close()
	defer client.Close()

	db.Set("mykey", "myvalue")

	resp := cmd(t, client, "GET mykey")
	if resp != "myvalue" {
		t.Fatalf("expected myvalue, got %s", resp)
	}
}

func TestHandleConnectionGETMissing(t *testing.T) {
	listener, client, _ := dialDB(t)
	defer listener.Close()
	defer client.Close()

	resp := cmd(t, client, "GET nonexistent")
	if resp != "(nil)" {
		t.Fatalf("expected (nil), got %s", resp)
	}
}

func TestHandleConnectionDEL(t *testing.T) {
	listener, client, db := dialDB(t)
	defer listener.Close()
	defer client.Close()

	db.Set("mykey", "myvalue")

	resp := cmd(t, client, "DEL mykey")
	if resp != "1" {
		t.Fatalf("expected 1, got %s", resp)
	}

	_, ok := db.Get("mykey")
	if ok {
		t.Fatal("expected mykey to be deleted")
	}
}

func TestHandleConnectionDELMissing(t *testing.T) {
	listener, client, _ := dialDB(t)
	defer listener.Close()
	defer client.Close()

	resp := cmd(t, client, "DEL nonexistent")
	if resp != "0" {
		t.Fatalf("expected 0, got %s", resp)
	}
}

func TestHandleConnectionKEYS(t *testing.T) {
	listener, client, db := dialDB(t)
	defer listener.Close()
	defer client.Close()

	db.Set("a", "1")
	db.Set("b", "2")
	db.Set("c", "3")

	resp := cmd(t, client, "KEYS")
	keys := strings.Fields(resp)
	if len(keys) != 3 {
		t.Fatalf("expected 3 keys, got %d: %v", len(keys), keys)
	}
}

func TestHandleConnectionUnknownCommand(t *testing.T) {
	listener, client, _ := dialDB(t)
	defer listener.Close()
	defer client.Close()

	resp := cmd(t, client, "FOO")
	if resp != "ERR unknown command" {
		t.Fatalf("expected ERR unknown command, got %s", resp)
	}
}

func TestHandleConnectionSETNoArgs(t *testing.T) {
	listener, client, _ := dialDB(t)
	defer listener.Close()
	defer client.Close()

	resp := cmd(t, client, "SET")
	if resp != "ERR usage: SET key value" {
		t.Fatalf("expected ERR usage, got %s", resp)
	}
}

func TestHandleConnectionSETOneArg(t *testing.T) {
	listener, client, _ := dialDB(t)
	defer listener.Close()
	defer client.Close()

	resp := cmd(t, client, "SET key")
	if resp != "ERR usage: SET key value" {
		t.Fatalf("expected ERR usage, got %s", resp)
	}
}

func TestHandleConnectionGETNoArgs(t *testing.T) {
	listener, client, _ := dialDB(t)
	defer listener.Close()
	defer client.Close()

	resp := cmd(t, client, "GET")
	if resp != "ERR usage: GET key" {
		t.Fatalf("expected ERR usage, got %s", resp)
	}
}

func TestHandleConnectionGETTooManyArgs(t *testing.T) {
	listener, client, _ := dialDB(t)
	defer listener.Close()
	defer client.Close()

	resp := cmd(t, client, "GET a b")
	if resp != "ERR usage: GET key" {
		t.Fatalf("expected ERR usage, got %s", resp)
	}
}

func TestHandleConnectionDELNoArgs(t *testing.T) {
	listener, client, _ := dialDB(t)
	defer listener.Close()
	defer client.Close()

	resp := cmd(t, client, "DEL")
	if resp != "ERR usage: DEL key" {
		t.Fatalf("expected ERR usage, got %s", resp)
	}
}

func TestHandleConnectionDELTooManyArgs(t *testing.T) {
	listener, client, _ := dialDB(t)
	defer listener.Close()
	defer client.Close()

	resp := cmd(t, client, "DEL a b")
	if resp != "ERR usage: DEL key" {
		t.Fatalf("expected ERR usage, got %s", resp)
	}
}

func TestHandleConnectionValueWithSpaces(t *testing.T) {
	listener, client, _ := dialDB(t)
	defer listener.Close()
	defer client.Close()

	resp := cmd(t, client, "SET mykey hello world")
	if resp != "OK" {
		t.Fatalf("expected OK, got %s", resp)
	}

	resp = cmd(t, client, "GET mykey")
	if resp != "hello world" {
		t.Fatalf("expected 'hello world', got %s", resp)
	}
}

func TestHandleConnectionPINGCaseInsensitive(t *testing.T) {
	listener, client, _ := dialDB(t)
	defer listener.Close()
	defer client.Close()

	resp := cmd(t, client, "ping")
	if resp != "PONG" {
		t.Fatalf("expected PONG, got %s", resp)
	}
}

func TestHandleConnectionEmptyLine(t *testing.T) {
	listener, client, _ := dialDB(t)
	defer listener.Close()
	defer client.Close()

	_, err := fmt.Fprintf(client, "\r\n")
	if err != nil {
		t.Fatalf("failed to write empty line: %v", err)
	}

	resp := cmd(t, client, "PING")
	if resp != "PONG" {
		t.Fatalf("expected PONG after empty line, got %s", resp)
	}
}

func TestHandleConnectionMultipleCommands(t *testing.T) {
	listener, client, _ := dialDB(t)
	defer listener.Close()
	defer client.Close()

	if resp := cmd(t, client, "SET a 1"); resp != "OK" {
		t.Fatalf("SET a: expected OK, got %s", resp)
	}
	if resp := cmd(t, client, "SET b 2"); resp != "OK" {
		t.Fatalf("SET b: expected OK, got %s", resp)
	}
	if resp := cmd(t, client, "GET a"); resp != "1" {
		t.Fatalf("GET a: expected 1, got %s", resp)
	}
	if resp := cmd(t, client, "GET b"); resp != "2" {
		t.Fatalf("GET b: expected 2, got %s", resp)
	}
	if resp := cmd(t, client, "DEL a"); resp != "1" {
		t.Fatalf("DEL a: expected 1, got %s", resp)
	}
	if resp := cmd(t, client, "GET a"); resp != "(nil)" {
		t.Fatalf("GET a after DEL: expected (nil), got %s", resp)
	}
}
