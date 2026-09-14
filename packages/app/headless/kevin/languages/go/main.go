package main

import (
	"context"
	"flag"
	"log"
	"net"
	"os"
	"os/signal"
	"syscall"

	"github.com/hieudoanm/kevin/internal/db"
	"github.com/hieudoanm/kevin/internal/server"
)

func main() {
	port := flag.String("port", "6379", "TCP port to listen on")
	flag.Parse()

	ln, err := net.Listen("tcp", ":"+*port)
	if err != nil {
		log.Fatal(err)
	}

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	log.Printf("kv — Redis-style server listening on :%s", *port)
	if err := server.New(db.New()).Serve(ctx, ln); err != nil {
		log.Fatal(err)
	}
}
