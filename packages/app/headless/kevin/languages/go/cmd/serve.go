package cmd

import (
	"context"
	"fmt"
	"log/slog"
	"net"
	"os"
	"os/signal"
	"syscall"

	"github.com/hieudoanm/kevin/internal/db"
	"github.com/hieudoanm/kevin/internal/gui"
	"github.com/hieudoanm/kevin/internal/server"
	"github.com/spf13/cobra"
)

func newServeCommand() *cobra.Command {
	var (
		port string
		bind string
		gui  bool
		data string
	)

	serve := &cobra.Command{
		Use:   "serve",
		Short: "Run the Redis-style TCP server",
		RunE: func(_ *cobra.Command, _ []string) error {
			ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
			defer stop()

			kv := db.New()
			if data != "" {
				if err := kv.Load(data); err != nil {
					slog.Warn("could not load data file", "path", data, "err", err)
				} else {
					slog.Info("loaded data file", "path", data)
				}
			}
			if data != "" {
				defer func() {
					if err := kv.Save(data); err != nil {
						slog.Error("could not save data file", "path", data, "err", err)
					} else {
						slog.Info("saved data file", "path", data)
					}
				}()
			}

			addr := bind + ":" + port
			ln, err := net.Listen("tcp", addr)
			if err != nil {
				return fmt.Errorf("listen on %s: %w", addr, err)
			}

			if gui {
				return serveWithGUI(ctx, ln, addr, kv)
			}

			slog.Info("server listening", "addr", addr)
			return server.New(kv).Serve(ctx, ln)
		},
	}

	serve.Flags().StringVar(&port, "port", "6379", "TCP port to listen on")
	serve.Flags().StringVar(&bind, "bind", "0.0.0.0", "Address to bind to")
	serve.Flags().BoolVar(&gui, "gui", false, "open the key/value manager GUI alongside the server")
	serve.Flags().StringVar(&data, "data", "", "path to JSON data file for persistence")
	return serve
}

func serveWithGUI(ctx context.Context, ln net.Listener, addr string, kv *db.DB) error {
	serverErr := make(chan error, 1)
	go func() {
		serverErr <- server.New(kv).Serve(ctx, ln)
	}()

	slog.Info("server listening", "addr", addr)
	if err := gui.Run(ctx, kv); err != nil {
		return err
	}
	return <-serverErr
}
