package serve

import (
	"context"
	"os"
	"os/signal"
	"syscall"

	"github.com/hieudoanm/jack/src/libs/mcp"
	"github.com/spf13/cobra"
)

func NewCmd(rootCmd *cobra.Command) *cobra.Command {
	return &cobra.Command{
		Use:   "serve",
		Short: "Start the MCP server over stdio",
		Long:  `Start the MCP stdio server. Reads JSON-RPC messages from stdin and writes responses to stdout.`,
		RunE: func(cmd *cobra.Command, args []string) error {
			ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
			defer cancel()
			server := mcp.NewServer()
			registerTools(server, rootCmd)
			return server.RunWithContext(ctx)
		},
	}
}
