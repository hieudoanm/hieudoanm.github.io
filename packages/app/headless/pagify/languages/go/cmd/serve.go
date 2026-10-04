package cmd

import (
	"fmt"
	"io"
	"os"

	"github.com/spf13/cobra"

	"pagify/internal/server"
)

// newServeCommand builds the serve subcommand.
func newServeCommand(stdout io.Writer) *cobra.Command {
	var host string
	var port int

	command := &cobra.Command{
		Use:   "serve [content]",
		Short: "Serve the site locally and rebuild as you edit",
		Long: `Serve builds the site and serves it over HTTP, rebuilding on every request.

Edit any Markdown file and reload the browser to see the change:

  pagify serve
  pagify serve ./docs --port 8080`,
		Args:      cobra.MaximumNArgs(1),
		ValidArgs: []string{defaultContentDir},
		RunE: func(command *cobra.Command, args []string) error {
			contentDir := defaultContentDir
			if len(args) == 1 {
				contentDir = args[0]
			}
			return server.Serve(contentDir, server.Options{
				Root:     defaultOutputDir,
				Host:     host,
				Port:     port,
				Announce: announceFunc(stdout),
			})
		},
	}

	command.Flags().StringVar(&host, "host", "", "interface to bind (default 127.0.0.1)")
	command.Flags().IntVarP(&port, "port", "p", 0, "port to bind (default a free port)")
	return command
}

// announceFunc prints the URL the server is listening on, with an escape
// sequence so a terminal can make it clickable.
func announceFunc(stdout io.Writer) func(string) {
	return func(url string) {
		fmt.Fprintf(stdout, "\n  pagify is serving %s\n  Press Ctrl+C to stop.\n\n", url)
		if term := os.Getenv("TERM"); term != "" && term != "dumb" {
			fmt.Fprintf(stdout, "  \x1b]8;;%s\x1b\\%s\x1b]8;;\x1b\\\n", url, url)
		}
	}
}
