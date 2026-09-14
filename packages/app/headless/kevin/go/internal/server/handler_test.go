package server

import (
	"strings"
	"testing"

	"github.com/hieudoanm/kevin/internal/db"
)

func TestHandleLine(t *testing.T) {
	tests := []struct {
		name  string
		setup func(*db.DB)
		line  string
		want  string
		reply bool
	}{
		{name: "ping", line: "PING", want: "PONG\n", reply: true},
		{name: "ping case-insensitive", line: "ping", want: "PONG\n", reply: true},
		{name: "set", line: "SET mykey myvalue", want: "OK\n", reply: true},
		{name: "set no args", line: "SET", want: "ERR usage: SET key value\n", reply: true},
		{name: "set one arg", line: "SET key", want: "ERR usage: SET key value\n", reply: true},
		{name: "get", setup: func(k *db.DB) { k.Set("mykey", "myvalue") }, line: "GET mykey", want: "myvalue\n", reply: true},
		{name: "get missing", line: "GET nonexistent", want: "(nil)\n", reply: true},
		{name: "get no args", line: "GET", want: "ERR usage: GET key\n", reply: true},
		{name: "get too many args", line: "GET a b", want: "ERR usage: GET key\n", reply: true},
		{name: "get trailing space ok", setup: func(k *db.DB) { k.Set("mykey", "myvalue") }, line: "GET mykey ", want: "myvalue\n", reply: true},
		{name: "del", setup: func(k *db.DB) { k.Set("mykey", "myvalue") }, line: "DEL mykey", want: "1\n", reply: true},
		{name: "del missing", line: "DEL nonexistent", want: "0\n", reply: true},
		{name: "del no args", line: "DEL", want: "ERR usage: DEL key\n", reply: true},
		{name: "del too many args", line: "DEL a b", want: "ERR usage: DEL key\n", reply: true},
		{name: "unknown command", line: "FOO", want: "ERR unknown command\n", reply: true},
		{name: "empty line", line: "", want: "", reply: false},
		{name: "whitespace line", line: "   ", want: "", reply: false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			kv := db.New()
			if tt.setup != nil {
				tt.setup(kv)
			}
			got, ok := handleLine(tt.line, kv)
			if ok != tt.reply || got != tt.want {
				t.Errorf("handleLine(%q) = %q, %v; want %q, %v", tt.line, got, ok, tt.want, tt.reply)
			}
		})
	}
}

func TestValueWithSpaces(t *testing.T) {
	kv := db.New()
	if got, _ := handleLine("SET mykey hello world", kv); got != "OK\n" {
		t.Fatalf("SET with spaces = %q; want OK", got)
	}
	if got, _ := handleLine("GET mykey", kv); got != "hello world\n" {
		t.Errorf("GET after SET with spaces = %q; want %q", got, "hello world\n")
	}
}

func TestMultipleCommands(t *testing.T) {
	kv := db.New()
	seq := []struct{ cmd, want string }{
		{"SET a 1", "OK\n"},
		{"SET b 2", "OK\n"},
		{"GET a", "1\n"},
		{"GET b", "2\n"},
		{"DEL a", "1\n"},
		{"GET a", "(nil)\n"},
	}
	for _, s := range seq {
		if got, _ := handleLine(s.cmd, kv); got != s.want {
			t.Errorf("handleLine(%q) = %q; want %q", s.cmd, got, s.want)
		}
	}
}

func TestKeys(t *testing.T) {
	kv := db.New()
	kv.Set("a", "1")
	kv.Set("b", "2")
	kv.Set("c", "3")
	got, ok := handleLine("KEYS", kv)
	if !ok {
		t.Fatal("KEYS should produce a reply")
	}
	if got == "\n" {
		t.Fatal("KEYS should not be empty")
	}
	if count := len(strings.Fields(got)); count != 3 {
		t.Errorf("KEYS = %q; want 3 keys, got %d", got, count)
	}
}

func TestKeysEmpty(t *testing.T) {
	kv := db.New()
	if got, _ := handleLine("KEYS", kv); got != "\n" {
		t.Errorf("KEYS on empty DB = %q; want %q", got, "\n")
	}
}
