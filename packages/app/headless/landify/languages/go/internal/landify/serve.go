package landify

import (
	"context"
	"errors"
	"net"
	"net/http"
	"time"
)

// Serve serves the files in dir over HTTP on ln. It blocks until ctx is done,
// then shuts the server down gracefully and returns nil.
func Serve(ctx context.Context, dir string, ln net.Listener) error {
	srv := &http.Server{Handler: http.FileServer(http.Dir(dir))}
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
