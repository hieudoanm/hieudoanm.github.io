package cmd

import (
	"io"
	"os"
	"os/signal"
	"syscall"

	"github.com/spf13/cobra"

	"dbml/internal/mcp"
)

func newMCPCommand(stdout io.Writer) *cobra.Command {
	mcpCommand := &cobra.Command{
		Use:   "mcp",
		Short: "Run MCP server for LLM clients",
		Long: `Start a Model Context Protocol (MCP) server that exposes DBML conversion
tools to LLM clients over stdio.`,
	}

	mcpCommand.AddCommand(newMCPServeCommand(stdout))
	return mcpCommand
}

func newMCPServeCommand(stdout io.Writer) *cobra.Command {
	return &cobra.Command{
		Use:   "serve",
		Short: "Start MCP server on stdio",
		Args:  cobra.NoArgs,
		RunE: func(command *cobra.Command, _ []string) error {
			ctx, stop := signal.NotifyContext(command.Context(), os.Interrupt, syscall.SIGTERM)
			defer stop()

			return mcp.NewServer(stdout).RunWithContext(ctx)
		},
	}
}
