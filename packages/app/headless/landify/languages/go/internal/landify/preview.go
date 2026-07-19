package landify

import (
	"context"
	"errors"
	"net"
	"net/http"
	"time"
)

// Preview serves the files in dir over HTTP on ln. It blocks until ctx is done,
// then shuts the server down gracefully and returns nil.
//
// It is a plain static file server: the JSON API (health, build, validate,
// themes and the docs endpoints) lives on the `serve` command instead.
func Preview(ctx context.Context, dir string, ln net.Listener) error {
	mux := http.NewServeMux()
	mux.Handle("/", http.FileServer(http.Dir(dir)))
	return serve(ctx, ln, mux)
}

// serve runs handler on ln until ctx is done, then shuts it down gracefully. It
// is shared by the preview file server and the JSON API server.
func serve(ctx context.Context, ln net.Listener, handler http.Handler) error {
	srv := &http.Server{Handler: handler, ReadHeaderTimeout: 10 * time.Second}
	errCh := make(chan error, 1)
	go func() {
		errCh <- srv.Serve(ln)
	}()
	select {
	case err := <-errCh:
		if errors.Is(err, http.ErrServerClosed) {
			return nil
		}
		return err
	case <-ctx.Done():
		shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		return srv.Shutdown(shutdownCtx)
	}
}
