package cmd

import (
	"fmt"
	"net"
	"os"
	"os/signal"
	"strconv"
	"syscall"

	"github.com/spf13/cobra"

	"landify/internal/landify"
)

var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Serve the current directory over HTTP",
	Long: `Serves index.html (and any other files) from a directory over HTTP so
the built landing page can be previewed in a browser. Stops on Ctrl+C.`,
	Args: cobra.NoArgs,
	RunE: func(cmd *cobra.Command, args []string) error {
		dir, err := cmd.Flags().GetString("dir")
		if err != nil {
			return err
		}
		port, err := cmd.Flags().GetInt("port")
		if err != nil {
			return err
		}
		ln, err := net.Listen("tcp", net.JoinHostPort("127.0.0.1", strconv.Itoa(port)))
		if err != nil {
			return fmt.Errorf("listen on port %d: %w", port, err)
		}
		cmd.Printf("Serving %s on http://localhost:%d\n", dir, port)
		ctx, stop := signal.NotifyContext(cmd.Context(), os.Interrupt, syscall.SIGTERM)
		defer stop()
		return landify.Serve(ctx, dir, ln)
	},
}

func init() {
	serveCmd.Flags().StringP("dir", "d", ".", "directory to serve")
	serveCmd.Flags().IntP("port", "p", 8080, "port to listen on")
}
