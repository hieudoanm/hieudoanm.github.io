package server

import (
	"errors"
	"fmt"
	"log/slog"
	"net"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"strings"
	"time"

	"pagify/internal/build"
)

// Options configures a preview server.
type Options struct {
	// Root is the directory the built site is written to and served from.
	Root string
	// Host is the interface to bind. Defaults to loopback.
	Host string
	// Port is the TCP port to bind. Zero picks a free one.
	Port int
	// Announce receives the resolved URL so the caller can show it to the user.
	Announce func(url string)
}

// defaultHost binds loopback only. A preview server writes into the output
// directory on every request, so it should not be reachable from the network.
const defaultHost = "127.0.0.1"

// Serve builds the site and serves it until the process is interrupted.
//
// It rebuilds on each request rather than watching the filesystem: a Markdown
// build is fast enough that watch machinery would cost more than it saves, and
// it removes an entire class of missed-change bugs.
func Serve(contentDir string, opts Options) error {
	if opts.Host == "" {
		opts.Host = defaultHost
	}

	listener, err := net.Listen("tcp", net.JoinHostPort(opts.Host, fmt.Sprint(opts.Port)))
	if err != nil {
		return fmt.Errorf("listen on %s:%d: %w", opts.Host, opts.Port, err)
	}

	url := fmt.Sprintf("http://%s", listener.Addr())
	slog.Info("preview server ready", "url", url, "content", contentDir)
	if opts.Announce != nil {
		opts.Announce(url)
	}

	server := &http.Server{
		Handler:           previewHandler(contentDir, opts.Root),
		ReadHeaderTimeout: 10 * time.Second,
	}
	if err := server.Serve(listener); err != nil && !errors.Is(err, http.ErrServerClosed) {
		return fmt.Errorf("serve %s: %w", opts.Root, err)
	}
	return nil
}

// previewHandler rebuilds the site before serving, so every request sees the
// current Markdown. A build failure is reported and the previous output is
// served, which beats replacing a readable page with an error.
func previewHandler(contentDir, root string) http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		if _, err := build.Build(build.Options{ContentDir: contentDir, OutputDir: root}); err != nil {
			slog.Error("rebuild failed, serving previous build", "error", err)
		}
		serveStatic(root, basePathOf(contentDir)).ServeHTTP(writer, request)
	})
}

// basePathOf reads the base path the site publishes under, so the preview
// serves the same URLs the generated links point at. An unreadable or absent
// config means no base path, which matches what the build assumes.
func basePathOf(contentDir string) string {
	config, err := build.LoadConfig(contentDir)
	if err != nil {
		return ""
	}
	return config.BasePath
}

// serveStatic serves files under root, resolving directory URLs to their
// index.html the way ordinary static hosts do, and honouring basePath so the
// preview behaves like the deployed site.
func serveStatic(root, basePath string) http.Handler {
	files := http.FileServer(http.Dir(root))
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		target, err := resolvePath(root, request.URL.Path, basePath)
		if err != nil {
			slog.Warn("cannot resolve request", "path", request.URL.Path, "error", err)
			writeNotFound(writer)
			return
		}
		request.URL.Path = target
		files.ServeHTTP(writer, request)
	})
}

// resolvePath maps a URL path onto a path the file server can serve, and
// reports errNoFile when nothing is there.
//
// A path naming a directory resolves to that directory with a trailing slash,
// leaving the file server to open its index.html. Both /guide and /guide/
// therefore serve the same page without a redirect, and a directory with no
// index produces a 404 rather than a listing.
//
// basePath is stripped first, because the site's own links include it.
func resolvePath(root, urlPath, basePath string) (string, error) {
	cleaned := path.Clean("/" + strings.TrimPrefix(urlPath, "/"))
	if basePath != "" {
		trimmed, ok := trimBasePath(cleaned, basePath)
		if !ok {
			return "", errOutsideBasePath
		}
		cleaned = trimmed
	}

	absolute := filepath.Join(root, filepath.FromSlash(cleaned))
	info, err := os.Stat(absolute)
	if err != nil {
		if os.IsNotExist(err) {
			return "", fmt.Errorf("%w: %s", errNoFile, cleaned)
		}
		return "", err
	}
	if info.IsDir() {
		return directoryTarget(root, cleaned)
	}
	return cleaned, nil
}

// directoryTarget confirms a directory holds an index page and returns the
// rooted path the file server needs to open it.
func directoryTarget(root, cleaned string) (string, error) {
	index := filepath.Join(root, filepath.FromSlash(cleaned), "index.html")
	if _, err := os.Stat(index); err != nil {
		if os.IsNotExist(err) {
			return "", fmt.Errorf("%w: %s", errNoFile, cleaned)
		}
		return "", err
	}
	return cleaned + "/", nil
}

// errNoFile marks a path with nothing to serve, so the caller can answer with
// the theme's 404 page instead of the file server's plain text.
var errNoFile = errors.New("no file at path")

// errOutsideBasePath marks a request that falls outside the site's base path,
// which no deployed site would serve either.
var errOutsideBasePath = errors.New("path is outside the configured base path")

// trimBasePath removes basePath from the front of cleaned, reporting false when
// it is not there. The result always keeps its leading slash, so the file
// server still receives a rooted path.
func trimBasePath(cleaned, basePath string) (string, bool) {
	if cleaned == basePath {
		return "/", true
	}
	prefix := basePath + "/"
	if !strings.HasPrefix(cleaned, prefix) {
		return "", false
	}
	return "/" + strings.TrimPrefix(cleaned, prefix), true
}
