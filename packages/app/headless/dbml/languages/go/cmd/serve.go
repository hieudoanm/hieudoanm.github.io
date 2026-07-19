package cmd

import (
	"fmt"
	"io"
	"log/slog"
	"os"
	"os/signal"
	"syscall"

	"github.com/spf13/cobra"

	"dbml/internal/server"
)

func newServeCommand(stdout io.Writer) *cobra.Command {
	var port string
	var debug bool

	command := &cobra.Command{
		Use:   "serve",
		Short: "Start HTTP server for DBML conversion API",
		Long: `Start an HTTP server that exposes a REST API for converting DBML to various formats.

The server accepts POST requests with DBML content and returns SQL, Mermaid, or SVG output.

Examples:
  dbml serve --port 8080
  dbml serve -p 3000

API Endpoints:
  GET  /api/v1/health             - Health check
  POST /api/v1/convert            - Convert DBML to multiple formats
  POST /api/v1/convert/sql        - Convert DBML to SQL only
  POST /api/v1/convert/mermaid    - Convert DBML to Mermaid only
  GET  /api/v1/openapi.json       - OpenAPI 3 document
  GET  /api/v1/docs               - Swagger UI

Request body (JSON):
  {
    "dbml": "Table users { id integer [pk] }",
    "formats": ["sql", "mermaid"]
  }

Request body (multipart/form-data):
  - file: DBML file upload
  - dbml: DBML content as form field

Response:
  {
    "sql": "CREATE TABLE users (...);",
    "mermaid": "erDiagram\\n    users {\\n        PK INTEGER id\\n    }",
    "svg": ""
  }`,
		RunE: func(command *cobra.Command, args []string) error {
			if debug {
				slog.SetDefault(slog.New(slog.NewTextHandler(stdout, &slog.HandlerOptions{Level: slog.LevelDebug})))
			}
			return runServe(stdout, port)
		},
	}

	command.Flags().StringVarP(&port, "port", "p", "8080", "Port to listen on")
	command.Flags().BoolVar(&debug, "debug", false, "Enable debug logging")
	return command
}

func runServe(stdout io.Writer, port string) error {
	srv := server.NewServer(port)

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		<-sigChan
		fmt.Fprintln(stdout, "\nShutting down server...")
		os.Exit(0)
	}()

	printServerBox(stdout, serveLinks("http://localhost:"+port, true))

	return srv.Start()
}
