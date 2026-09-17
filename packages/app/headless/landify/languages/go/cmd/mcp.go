package cmd

import (
	"os"
	"os/signal"
	"syscall"

	"github.com/spf13/cobra"

	"landify/internal/mcp"
)

var mcpCmd = &cobra.Command{
	Use:   "mcp",
	Short: "Model Context Protocol server that exposes Landify as tools",
	Long: `Runs an MCP server on stdio so an LLM client can scaffold, validate and
build landing pages through the same code paths as the CLI.

The server speaks newline-delimited JSON-RPC 2.0: every response is one line of
JSON on stdout, and all diagnostics go to stderr. File access is confined to
--root, so a client cannot read or write anything outside that directory.`,
}

var mcpServeCmd = &cobra.Command{
	Use:   "serve",
	Short: "Start the Landify MCP server on stdio",
	Args:  cobra.NoArgs,
	RunE: func(cmd *cobra.Command, _ []string) error {
		root, err := cmd.Flags().GetString("root")
		if err != nil {
			return err
		}
		ws, err := mcp.NewWorkspace(root)
		if err != nil {
			return err
		}

		ctx, stop := signal.NotifyContext(cmd.Context(), os.Interrupt, syscall.SIGTERM)
		defer stop()

		server := mcp.NewServer()
		mcp.Register(server, ws)
		return server.RunWithContext(ctx)
	},
}

func init() {
	mcpServeCmd.Flags().String("root", mcp.DefaultRoot, "directory the server is allowed to read and write")
	mcpCmd.AddCommand(mcpServeCmd)
}
