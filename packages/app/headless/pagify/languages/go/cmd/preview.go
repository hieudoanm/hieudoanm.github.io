package cmd

import (
	"io"

	"github.com/spf13/cobra"

	"pagify/internal/server"
)

// newPreviewCommand builds the preview subcommand, which serves the built site
// statically and rebuilds on every request.
func newPreviewCommand(stdout io.Writer) *cobra.Command {
	var host string
	var port int

	command := &cobra.Command{
		Use:   "preview [content]",
		Short: "Serve the site locally, rebuilding as you edit",
		Long: `Preview builds the site and serves it over HTTP, rebuilding it on every
request. Edit any Markdown file and reload the browser to see the change.

  pagify preview
  pagify preview ./docs --port 8080`,
		Args:      cobra.MaximumNArgs(1),
		ValidArgs: []string{defaultContentDir},
		RunE: func(command *cobra.Command, args []string) error {
			contentDir := defaultContentDir
			if len(args) == 1 {
				contentDir = args[0]
			}
			return server.Preview(contentDir, server.Options{
				Root:     defaultOutputDir,
				Host:     host,
				Port:     port,
				Announce: previewAnnounceFunc(stdout, host != "" && !isLoopbackHost(host)),
			})
		},
	}

	command.Flags().StringVar(&host, "host", "", "interface to bind (default 127.0.0.1)")
	command.Flags().IntVarP(&port, "port", "p", 0, "port to bind (default a free port)")
	return command
}

// previewAnnounceFunc prints the startup box for the static preview, which has
// no API to advertise.
func previewAnnounceFunc(stdout io.Writer, exposeNetwork bool) func(string) {
	return func(url string) {
		printServerBox(stdout, previewLinks(url, exposeNetwork))
	}
}
