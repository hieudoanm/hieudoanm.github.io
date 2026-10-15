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

var previewCmd = &cobra.Command{
	Use:   "preview",
	Short: "Serve the built files over HTTP",
	Long: `Serves index.html (and any other files) from a directory over HTTP so
the built landing page can be previewed in a browser. Stops on Ctrl+C.`,
	Args: cobra.NoArgs,
	RunE: func(cmd *cobra.Command, args []string) error {
		dir, err := cmd.Flags().GetString("dir")
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
		printServerBox(cmd.OutOrStdout(), previewLinks(base, !isLoopbackHost(bind)))
		ctx, stop := signal.NotifyContext(cmd.Context(), os.Interrupt, syscall.SIGTERM)
		defer stop()
		return landify.Preview(ctx, dir, ln)
	},
}

func init() {
	previewCmd.Flags().StringP("dir", "d", ".", "directory to serve")
	previewCmd.Flags().StringP("bind", "b", "127.0.0.1", "address to bind")
	previewCmd.Flags().IntP("port", "p", 8080, "port to listen on")
}
