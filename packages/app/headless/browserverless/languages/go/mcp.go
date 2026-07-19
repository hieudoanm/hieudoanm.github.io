package main

import (
	"context"
	"flag"
	"fmt"
	"io"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/hieudoanm/browserverless/internal/headless"
	"github.com/hieudoanm/browserverless/internal/mcp"
)

// cmdMCP dispatches the `browserverless mcp` command group. The root CLI is
// hand-rolled (see AGENTS.md), so this mirrors the flag.NewFlagSet style of the
// other subcommands and keeps the entrypoint thin.
func cmdMCP(args []string, stdout, stderr io.Writer) int {
	if len(args) == 0 {
		fmt.Fprint(stderr, mcpUsage)
		return 2
	}

	switch args[0] {
	case "help", "-h", "--help":
		fmt.Fprint(stdout, mcpUsage)
		return 0
	case "serve":
		return cmdMCPServe(args[1:], stdout, stderr)
	default:
		fmt.Fprintf(stderr, "browserverless mcp: unknown command %q\n\n", args[0])
		fmt.Fprint(stderr, mcpUsage)
		return 2
	}
}

// cmdMCPServe serves the MCP protocol on stdout until stdin closes, which is
// how an MCP client signals shutdown.
func cmdMCPServe(args []string, stdout, stderr io.Writer) int {
	fs := flag.NewFlagSet("mcp serve", flag.ContinueOnError)
	fs.SetOutput(stderr)
	addr := fs.String("addr", "", "base URL of a running browserverless server; renders in-process when empty")
	width := fs.Int("width", headless.DefaultViewportWidth, "viewport width for in-process rendering")
	height := fs.Int("height", headless.DefaultViewportHeight, "viewport height for in-process rendering")
	timeoutMS := fs.Int("timeout", int(headless.DefaultLoadTimeout.Milliseconds()), "load timeout in milliseconds")
	if err := fs.Parse(args); err != nil {
		return flagExitCode(err)
	}
	if fs.NArg() > 0 {
		fmt.Fprintf(stderr, "browserverless mcp serve: unexpected argument %q\n", fs.Arg(0))
		return 2
	}
	if err := validateMCPServe(*addr, *width, *height, *timeoutMS); err != nil {
		fmt.Fprintf(stderr, "browserverless mcp serve: %v\n", err)
		return 2
	}

	server := mcp.NewServerWithIO(stdout)
	mcp.Register(server, newRenderer(*addr, *width, *height, *timeoutMS))

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	if err := server.RunWithContext(ctx); err != nil {
		fmt.Fprintf(stderr, "browserverless mcp serve: %v\n", err)
		return 1
	}
	return 0
}

// newRenderer picks the backend: an HTTP proxy of a running server when addr is
// set, otherwise an in-process engine configured for this session.
func newRenderer(addr string, width, height, timeoutMS int) mcp.Renderer {
	if addr != "" {
		return mcp.NewHTTPRenderer(addr)
	}
	return mcp.NewLocalRenderer(headless.Config{
		ViewportWidth:  width,
		ViewportHeight: height,
		LoadTimeout:    time.Duration(timeoutMS) * time.Millisecond,
	})
}

// validateMCPServe rejects flags that would render every call useless. Viewport
// and timeout only apply to in-process rendering, so they are checked only when
// no --addr server was given.
func validateMCPServe(addr string, width, height, timeoutMS int) error {
	if addr != "" {
		if _, err := headless.ValidateURL(addr); err != nil {
			return fmt.Errorf("--addr: %w", err)
		}
		return nil
	}
	if width <= 0 || height <= 0 {
		return fmt.Errorf("--width and --height must be positive, got %dx%d", width, height)
	}
	if timeoutMS <= 0 {
		return fmt.Errorf("--timeout must be positive, got %d", timeoutMS)
	}
	return nil
}
