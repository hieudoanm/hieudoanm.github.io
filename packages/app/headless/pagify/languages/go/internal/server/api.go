package server

import (
	"errors"
	"fmt"
	"log/slog"
	"net"
	"net/http"
	"time"

	"pagify/internal/workspace"
)

// ServeAPI builds a JSON API server confined to opts.Root and serves it until
// the process is interrupted. A page is rendered on demand by POST
// /api/v1/build; nothing is written to disk.
func ServeAPI(opts Options) error {
	ws, err := workspace.NewWorkspace(opts.Root)
	if err != nil {
		return err
	}
	if opts.Host == "" {
		opts.Host = defaultHost
	}

	listener, err := net.Listen("tcp", net.JoinHostPort(opts.Host, fmt.Sprint(opts.Port)))
	if err != nil {
		return fmt.Errorf("listen on %s:%d: %w", opts.Host, opts.Port, err)
	}
	url := fmt.Sprintf("http://%s", listener.Addr())
	slog.Info("api server ready", "url", url, "root", ws.Root())
	if opts.Announce != nil {
		opts.Announce(url)
	}

	server := &http.Server{Handler: apiHandler(ws), ReadHeaderTimeout: 10 * time.Second}
	if err := server.Serve(listener); err != nil && !errors.Is(err, http.ErrServerClosed) {
		return fmt.Errorf("serve api: %w", err)
	}
	return nil
}

// apiHandler routes the JSON API. Every content path a request names is
// resolved through ws, so no request can read outside the server root.
func apiHandler(ws *workspace.Workspace) http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/v1/health", handleHealth)
	mux.HandleFunc("/api/v1/openapi.json", handleOpenAPI)
	mux.HandleFunc("/api/v1/docs", handleSwaggerUI)
	mux.HandleFunc("/api/v1/build", handleBuild(ws))
	return mux
}
