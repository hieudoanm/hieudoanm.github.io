// Command browserverless is a lightweight headless browser built on the
// go-webengine engine — screenshot, scrape, and serve-mode execution from one
// static, pure-Go binary.
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
	"github.com/hieudoanm/browserverless/internal/server"
	"github.com/hieudoanm/browserverless/internal/version"
)

func main() {
	os.Exit(run(os.Args[1:], os.Stdout, os.Stderr))
}

func run(args []string, stdout, stderr io.Writer) int {
	if len(args) == 0 {
		fmt.Fprint(stdout, usage)
		return 0
	}

	switch args[0] {
	case "help", "-h", "--help":
		fmt.Fprint(stdout, usage)
		return 0
	case "version", "--version":
		fmt.Fprintf(stdout, "browserverless %s\n", version.Version)
		return 0
	case "screenshot":
		return cmdScreenshot(args[1:], stdout, stderr)
	case "scrape":
		return cmdScrape(args[1:], stdout, stderr)
	case "serve":
		return cmdServe(args[1:], stderr)
	case "health":
		return cmdHealth(args[1:], stdout, stderr)
	default:
		fmt.Fprintf(stderr, "browserverless: unknown command %q\n\n", args[0])
		fmt.Fprint(stderr, usage)
		return 2
	}
}

func cmdScreenshot(args []string, stdout, stderr io.Writer) int {
	fs := flag.NewFlagSet("screenshot", flag.ContinueOnError)
	fs.SetOutput(stderr)
	var output string
	fs.StringVar(&output, "output", "screenshot.png", "output PNG path")
	fs.StringVar(&output, "o", "screenshot.png", "output PNG path")
	width := fs.Int("width", headless.DefaultViewportWidth, "viewport width")
	height := fs.Int("height", headless.DefaultViewportHeight, "viewport height")
	timeoutMS := fs.Int("timeout", int(headless.DefaultLoadTimeout.Milliseconds()), "load timeout in milliseconds")
	if err := fs.Parse(args); err != nil {
		return flagExitCode(err)
	}
	url := fs.Arg(0)
	if url == "" {
		fmt.Fprintln(stderr, "browserverless screenshot: <url> is required")
		return 2
	}

	browser := headless.New(headless.Config{
		ViewportWidth:  *width,
		ViewportHeight: *height,
		LoadTimeout:    time.Duration(*timeoutMS) * time.Millisecond,
	})
	result, err := browser.Screenshot(context.Background(), url)
	if err != nil {
		fmt.Fprintf(stderr, "browserverless: screenshot: %v\n", err)
		return 1
	}
	if err := os.WriteFile(output, result.PNG, 0o644); err != nil {
		fmt.Fprintf(stderr, "browserverless: screenshot: %v\n", err)
		return 1
	}
	fmt.Fprintf(stdout, "Screenshot saved to %s (%s)\n", output, result.URL)
	return 0
}

func cmdScrape(args []string, stdout, stderr io.Writer) int {
	fs := flag.NewFlagSet("scrape", flag.ContinueOnError)
	fs.SetOutput(stderr)
	var output string
	fs.StringVar(&output, "output", "", "output HTML file (defaults to stdout)")
	fs.StringVar(&output, "o", "", "output HTML file (defaults to stdout)")
	timeoutMS := fs.Int("timeout", int(headless.DefaultLoadTimeout.Milliseconds()), "load timeout in milliseconds")
	if err := fs.Parse(args); err != nil {
		return flagExitCode(err)
	}
	url := fs.Arg(0)
	if url == "" {
		fmt.Fprintln(stderr, "browserverless scrape: <url> is required")
		return 2
	}

	browser := headless.New(headless.Config{
		LoadTimeout: time.Duration(*timeoutMS) * time.Millisecond,
	})
	result, err := browser.Scrape(context.Background(), url)
	if err != nil {
		fmt.Fprintf(stderr, "browserverless: scrape: %v\n", err)
		return 1
	}
	if output != "" {
		if err := os.WriteFile(output, []byte(result.HTML), 0o644); err != nil {
			fmt.Fprintf(stderr, "browserverless: scrape: %v\n", err)
			return 1
		}
		fmt.Fprintf(stdout, "HTML dumped to %s\n", output)
		return 0
	}
	fmt.Fprint(stdout, result.HTML)
	return 0
}

func cmdServe(args []string, stderr io.Writer) int {
	fs := flag.NewFlagSet("serve", flag.ContinueOnError)
	fs.SetOutput(stderr)
	bind := fs.String("bind", "127.0.0.1:8080", "address to bind, e.g. 127.0.0.1:8080")
	port := fs.Int("port", 0, "port to listen on; overrides the port in --bind")
	width := fs.Int("width", headless.DefaultViewportWidth, "viewport width")
	height := fs.Int("height", headless.DefaultViewportHeight, "viewport height")
	timeoutMS := fs.Int("timeout", int(headless.DefaultLoadTimeout.Milliseconds()), "per-request load timeout in milliseconds")
	if err := fs.Parse(args); err != nil {
		return flagExitCode(err)
	}

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	err := server.Serve(ctx, server.Config{
		Bind:           *bind,
		Port:           *port,
		ViewportWidth:  *width,
		ViewportHeight: *height,
		LoadTimeout:    time.Duration(*timeoutMS) * time.Millisecond,
	})
	if err != nil {
		fmt.Fprintf(stderr, "browserverless: serve: %v\n", err)
		return 1
	}
	return 0
}

func flagExitCode(err error) int {
	if err == flag.ErrHelp {
		return 0
	}
	return 2
}
