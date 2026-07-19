package landify

import (
	"context"
	"net"
	"net/http"

	"landify/internal/workspace"
)

// ServeAPI serves the landify JSON API on ln, confined to the files under root.
// It blocks until ctx is done, then shuts down gracefully and returns nil.
func ServeAPI(ctx context.Context, root string, ln net.Listener) error {
	ws, err := workspace.NewWorkspace(root)
	if err != nil {
		return err
	}
	return serve(ctx, ln, apiHandler(ws))
}

// apiHandler routes the JSON API. Every filesystem path a request names is
// resolved through ws, so no request can read outside the server root.
func apiHandler(ws *workspace.Workspace) http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/v1/health", handleHealth)
	mux.HandleFunc("/api/v1/openapi.json", handleOpenAPI)
	mux.HandleFunc("/api/v1/docs", handleSwaggerUI)
	mux.HandleFunc("/api/v1/build", handleBuild(ws))
	mux.HandleFunc("/api/v1/validate", handleValidate(ws))
	mux.HandleFunc("/api/v1/themes", handleThemes)
	return mux
}
