package main

const usage = `browserverless — lightweight headless browser built on go-webengine

Usage:
  browserverless <command> [flags]

Commands:
  screenshot   Take a screenshot of a URL as PNG
  scrape       Dump the full HTML of a URL
  serve        Start an HTTP server exposing the headless rendering web API
  health       Check a running server's /api/v1/health
  help         Show this help
  version      Show the version

Screenshot:
  browserverless screenshot [flags] <url>
    -output, -o string   output PNG path (default "screenshot.png")
    -width int           viewport width (default 1280)
    -height int          viewport height (default 720)
    -timeout int         load timeout in milliseconds (default 30000)

Scrape:
  browserverless scrape [flags] <url>
    -output, -o string   output HTML file (defaults to stdout)
    -timeout int         load timeout in milliseconds (default 30000)

Serve:
  browserverless serve [flags]
    -bind string         address to bind (default "127.0.0.1:8080")
    -port int            port to listen on; overrides the port in --bind
    -width int           viewport width (default 1280)
    -height int          viewport height (default 720)
    -timeout int         per-request load timeout in milliseconds (default 30000)

Health:
  browserverless health [flags]
    -base, -url string   base URL of a running server (default "http://127.0.0.1:8080")
`
