package cmd

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"os"
	"os/signal"
	"syscall"

	"github.com/hieudoanm/kevin/internal/db"
	"github.com/hieudoanm/kevin/internal/mcp"
	"github.com/spf13/cobra"
)

func newMCPCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "mcp",
		Short: "Model Context Protocol server that exposes KeVIN as tools",
	}
	cmd.AddCommand(newMCPServeCommand())
	return cmd
}

func newMCPServeCommand() *cobra.Command {
	var (
		data string
		addr string
	)

	serve := &cobra.Command{
		Use:   "serve",
		Short: "Start the KeVIN MCP server on stdio",
		RunE: func(cmd *cobra.Command, _ []string) error {
			ctx, stop := signal.NotifyContext(cmd.Context(), os.Interrupt, syscall.SIGTERM)
			defer stop()

			store, err := openStore(ctx, addr, data)
			if err != nil {
				return err
			}
			defer closeStore(store)

			if err := store.Ping(); err != nil {
				return fmt.Errorf("ping store: %w", err)
			}
			slog.Info("mcp server ready", "transport", "stdio", "store", describeStore(addr))

			server := mcp.NewServer()
			mcp.RegisterTools(server, store)
			return server.RunWithContext(ctx)
		},
	}

	serve.Flags().StringVar(&data, "data", "", "path to JSON data file for persistence (in-process only)")
	serve.Flags().StringVar(&addr, "addr", "", "address of a running kevin serve to proxy over TCP (e.g. localhost:6379)")
	return serve
}

// openStore builds the store the tools operate on. With addr set it proxies to
// a running `kevin serve`; otherwise it creates an in-process store, optionally
// backed by a JSON snapshot so writes outlive the MCP session.
func openStore(ctx context.Context, addr, data string) (mcp.Store, error) {
	if addr != "" {
		if data != "" {
			return nil, errors.New("--addr and --data are mutually exclusive: a proxied store is owned by the running server")
		}
		store, err := mcp.DialTCPStore(ctx, addr)
		if err != nil {
			return nil, fmt.Errorf("connect to kevin at %s: %w", addr, err)
		}
		return store, nil
	}

	kv := db.New()
	if data == "" {
		return mcp.NewDBStore(kv), nil
	}
	if err := kv.Load(data); err != nil {
		slog.Warn("could not load data file", "path", data, "err", err)
	} else {
		slog.Info("loaded data file", "path", data)
	}
	return &persistedStore{Store: mcp.NewDBStore(kv), kv: kv, path: data}, nil
}

// closeStore releases the store and, for a persisted in-process store, writes
// the snapshot back to disk.
func closeStore(store mcp.Store) {
	if err := store.Close(); err != nil {
		slog.Error("could not close store", "err", err)
	}
}

// describeStore names the backend for the startup log line.
func describeStore(addr string) string {
	if addr != "" {
		return "tcp:" + addr
	}
	return "in-process"
}

// persistedStore wraps the in-process store so that closing it saves a JSON
// snapshot, mirroring how `kevin serve --data` persists on shutdown.
type persistedStore struct {
	mcp.Store
	kv   *db.DB
	path string
}

// Close saves the snapshot and then releases the wrapped store.
func (s *persistedStore) Close() error {
	if err := s.kv.Save(s.path); err != nil {
		slog.Error("could not save data file", "path", s.path, "err", err)
		return err
	}
	slog.Info("saved data file", "path", s.path)
	return s.Store.Close()
}
