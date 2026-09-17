package cmd

import (
	"io"

	"github.com/spf13/cobra"

	"pagify/internal/server"
)

// newServeCommand builds the serve subcommand, which starts the JSON API.
func newServeCommand(stdout io.Writer) *cobra.Command {
	var root string
	var host string
	var port int

	command := &cobra.Command{
		Use:   "serve",
		Short: "Start the JSON API server",
		Long: `Serve starts a JSON API server for rendering individual pages of a
site, alongside an OpenAPI document and a Swagger UI. All file access is
confined to --root. To preview the built site instead, use "preview".

  pagify serve
  pagify serve --root ./docs --port 8080`,
		RunE: func(command *cobra.Command, args []string) error {
			return server.ServeAPI(server.Options{
				Root:     root,
				Host:     host,
				Port:     port,
				Announce: announceFunc(stdout, host != "" && !isLoopbackHost(host)),
			})
		},
	}

	command.Flags().StringVar(&root, "root", ".", "directory the API is confined to")
	command.Flags().StringVar(&host, "host", "", "interface to bind (default 127.0.0.1)")
	command.Flags().IntVarP(&port, "port", "p", 8080, "port to bind")
	return command
}

// announceFunc prints a box with the URL the API server is listening on. Links
// are wrapped in an escape sequence so a terminal can make them clickable.
func announceFunc(stdout io.Writer, exposeNetwork bool) func(string) {
	return func(url string) {
		printServerBox(stdout, serveLinks(url, exposeNetwork))
	}
}
