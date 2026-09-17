package cmd

import (
	"os"
	"os/signal"
	"syscall"

	"cv/internal/mcp"

	"github.com/spf13/cobra"
)

var mcpCmd = &cobra.Command{
	Use:   "mcp",
	Short: "Run MCP server",
	Long:  `Start MCP server for LLM clients.`,
}

var mcpServeCmd = &cobra.Command{
	Use:   "serve",
	Short: "Start MCP server on stdio",
	Args:  cobra.NoArgs,
	RunE: func(cmd *cobra.Command, _ []string) error {
		ctx, stop := signal.NotifyContext(cmd.Context(), os.Interrupt, syscall.SIGTERM)
		defer stop()

		server := mcp.NewServer()
		return server.RunWithContext(ctx)
	},
}

func init() {
	mcpCmd.AddCommand(mcpServeCmd)
}
