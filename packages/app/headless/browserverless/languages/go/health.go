package main

import (
	"context"
	"flag"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"
)

// cmdHealth checks a running browserverless server by GETting /api/v1/health.
// It is also the Docker HEALTHCHECK command.
func cmdHealth(args []string, stdout, stderr io.Writer) int {
	fs := flag.NewFlagSet("health", flag.ContinueOnError)
	fs.SetOutput(stderr)
	base := fs.String("base", "http://127.0.0.1:8080", "base URL of a running server")
	fs.StringVar(base, "url", *base, "base URL of a running server")
	if err := fs.Parse(args); err != nil {
		return flagExitCode(err)
	}

	target := strings.TrimRight(*base, "/") + "/api/v1/health"
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, target, nil)
	if err != nil {
		fmt.Fprintf(stderr, "browserverless health: %v\n", err)
		return 1
	}
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Fprintf(stderr, "browserverless health: %v\n", err)
		return 1
	}
	defer resp.Body.Close()
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		fmt.Fprintf(stderr, "browserverless health: %s %s -> %d\n", http.MethodGet, target, resp.StatusCode)
		return 1
	}
	fmt.Fprintln(stdout, "ok")
	return 0
}
