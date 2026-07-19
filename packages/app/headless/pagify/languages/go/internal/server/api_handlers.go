package server

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"os"

	"pagify/internal/build"
	"pagify/internal/workspace"
)

// buildRequest is the JSON body of POST /api/v1/build. Content names a
// directory inside the server root (default the root itself); Path selects the
// page to render by its site-absolute URL (default "/").
type buildRequest struct {
	Content string `json:"content"`
	Path    string `json:"path"`
}

// errContentMissing marks a content path with no directory behind it.
var errContentMissing = errors.New("content directory not found in the server root")

func handleHealth(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

// handleBuild renders one page of the site named in the request and returns it
// as HTML. Nothing is written to disk.
func handleBuild(ws *workspace.Workspace) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			writeError(w, http.StatusMethodNotAllowed, "build requires POST")
			return
		}
		request, ok := decodeBuildRequest(w, r)
		if !ok {
			return
		}
		contentDir, err := resolveContent(ws, request.Content)
		if err != nil {
			writeError(w, statusFor(err), err.Error())
			return
		}
		html, err := build.RenderPage(build.Options{ContentDir: contentDir}, request.Path)
		if err != nil {
			writeError(w, statusFor(err), err.Error())
			return
		}
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.Write(html)
	}
}

// decodeBuildRequest reads the JSON body and defaults an omitted page to the
// site root. It reports false after writing an error response.
func decodeBuildRequest(w http.ResponseWriter, r *http.Request) (buildRequest, bool) {
	var request buildRequest
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	if err := decoder.Decode(&request); err != nil && !errors.Is(err, io.EOF) {
		writeError(w, http.StatusBadRequest, "invalid JSON body: "+err.Error())
		return buildRequest{}, false
	}
	if request.Path == "" {
		request.Path = "/"
	}
	return request, true
}

// resolveContent confines the requested content directory to the workspace and
// confirms it names an existing directory.
func resolveContent(ws *workspace.Workspace, dir string) (string, error) {
	target, err := ws.Resolve(dir)
	if err != nil {
		return "", err
	}
	info, err := os.Stat(target)
	if errors.Is(err, os.ErrNotExist) {
		return "", errContentMissing
	}
	if err != nil {
		return "", err
	}
	if !info.IsDir() {
		return "", errContentMissing
	}
	return target, nil
}

// statusFor maps a resolution or render failure onto a response status.
func statusFor(err error) int {
	if errors.Is(err, errContentMissing) || errors.Is(err, build.ErrPageNotFound) {
		return http.StatusNotFound
	}
	return http.StatusBadRequest
}

func writeJSON(w http.ResponseWriter, status int, value any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(value)
}

func writeError(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, map[string]string{"error": message})
}
