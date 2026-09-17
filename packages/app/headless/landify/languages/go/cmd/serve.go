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
	Short: "Start the landify JSON API server",
	Long: `Serves the landify JSON API over HTTP: render and validate landing
pages and list the built-in themes, alongside an OpenAPI document and a Swagger
UI. All file access is confined to --root. To preview the built files instead,
use the "preview" command.`,
	Args: cobra.NoArgs,
	RunE: func(cmd *cobra.Command, args []string) error {
		root, err := cmd.Flags().GetString("root")
		if err != nil {
			return err
		}
		bind, err := cmd.Flags().GetString("bind")
		if err != nil {
			return err
		}
		port, err := cmd.Flags().GetInt("port")
		if err != nil {
			return err
		}
		ln, err := net.Listen("tcp", net.JoinHostPort(bind, strconv.Itoa(port)))
		if err != nil {
			return fmt.Errorf("listen on %s:%d: %w", bind, port, err)
		}
		base := "http://" + net.JoinHostPort(bind, strconv.Itoa(port))
		printServerBox(cmd.OutOrStdout(), serveLinks(base, !isLoopbackHost(bind)))
		ctx, stop := signal.NotifyContext(cmd.Context(), os.Interrupt, syscall.SIGTERM)
		defer stop()
		return landify.ServeAPI(ctx, root, ln)
	},
}

func init() {
	serveCmd.Flags().StringP("root", "r", ".", "directory the API is confined to")
	serveCmd.Flags().StringP("bind", "b", "127.0.0.1", "address to bind")
	serveCmd.Flags().IntP("port", "p", 8080, "port to listen on")
}
