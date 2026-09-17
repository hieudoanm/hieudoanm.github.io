package landify

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"os"
	"sort"

	"landify/internal/workspace"
)

// configRequest is the JSON body of POST /api/v1/build and /api/v1/validate.
// An empty file defaults to landify.yaml inside the server root.
type configRequest struct {
	File  string `json:"file"`
	Theme string `json:"theme"`
}

// validateResponse is the body of a successful POST /api/v1/validate.
type validateResponse struct {
	Valid  bool     `json:"valid"`
	Errors []string `json:"errors"`
}

// themeInfo is one entry of the GET /api/v1/themes response.
type themeInfo struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

// errConfigMissing marks a config path with no file behind it, so the handler
// can answer 404 rather than the generic 400.
var errConfigMissing = errors.New("config file not found in the server root")

func handleHealth(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

// handleBuild renders the landing page named in the request and returns it as
// HTML. Nothing is written to disk.
func handleBuild(ws *workspace.Workspace) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			writeError(w, http.StatusMethodNotAllowed, "build requires POST")
			return
		}
		request, ok := decodeConfigRequest(w, r)
		if !ok {
			return
		}
		target, err := resolveConfig(ws, request.File)
		if err != nil {
			writeError(w, statusFor(err), err.Error())
			return
		}
		html, err := RenderFile(target, request.Theme)
		if err != nil {
			writeError(w, http.StatusBadRequest, err.Error())
			return
		}
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.Write(html)
	}
}

// handleValidate checks the named config and reports the schema errors without
// rendering anything.
func handleValidate(ws *workspace.Workspace) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			writeError(w, http.StatusMethodNotAllowed, "validate requires POST")
			return
		}
		request, ok := decodeConfigRequest(w, r)
		if !ok {
			return
		}
		target, err := resolveConfig(ws, request.File)
		if err != nil {
			writeError(w, statusFor(err), err.Error())
			return
		}
		cfg, err := LoadFile(target)
		if err != nil {
			writeJSON(w, http.StatusOK, validateResponse{Valid: false, Errors: []string{err.Error()}})
			return
		}
		problems := Errors(cfg)
		if problems == nil {
			problems = []string{}
		}
		writeJSON(w, http.StatusOK, validateResponse{Valid: len(problems) == 0, Errors: problems})
	}
}

// handleThemes lists the built-in theme presets in sorted name order.
func handleThemes(w http.ResponseWriter, r *http.Request) {
	themes := Themes()
	sort.Slice(themes, func(i, j int) bool { return themes[i].Name < themes[j].Name })
	infos := make([]themeInfo, 0, len(themes))
	for _, theme := range themes {
		infos = append(infos, themeInfo{Name: theme.Name, Description: theme.Description})
	}
	writeJSON(w, http.StatusOK, map[string]any{"themes": infos})
}

// decodeConfigRequest reads the JSON body and defaults an omitted file to the
// config path the CLI uses. It reports false after writing an error response.
func decodeConfigRequest(w http.ResponseWriter, r *http.Request) (configRequest, bool) {
	var request configRequest
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	if err := decoder.Decode(&request); err != nil && !errors.Is(err, io.EOF) {
		writeError(w, http.StatusBadRequest, "invalid JSON body: "+err.Error())
		return configRequest{}, false
	}
	if request.File == "" {
		request.File = workspace.DefaultConfigPath
	}
	return request, true
}

// resolveConfig confines the requested config path to the workspace and
// confirms it names an existing file, returning its absolute path.
func resolveConfig(ws *workspace.Workspace, path string) (string, error) {
	target, err := ws.Resolve(path)
	if err != nil {
		return "", err
	}
	info, err := os.Stat(target)
	if errors.Is(err, os.ErrNotExist) {
		return "", errConfigMissing
	}
	if err != nil {
		return "", err
	}
	if info.IsDir() {
		return "", errConfigMissing
	}
	return target, nil
}

// statusFor maps a resolution failure onto the response status it deserves.
func statusFor(err error) int {
	if errors.Is(err, errConfigMissing) {
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
