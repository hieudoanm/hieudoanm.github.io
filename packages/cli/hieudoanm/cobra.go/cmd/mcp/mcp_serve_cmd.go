package mcp

import (
	"github.com/hieudoanm/hieudoanm/libs/mcp"
	"github.com/spf13/cobra"
)

func newServeCmd(rootCmd *cobra.Command) *cobra.Command {
	return &cobra.Command{
		Use:   "serve",
		Short: "Start the MCP server over stdio",
		Long:  `Start the MCP stdio server. Reads JSON-RPC messages from stdin and writes responses to stdout.`,
		RunE: func(cmd *cobra.Command, args []string) error {
			server := mcp.NewServer()
			registerTools(server, rootCmd)
			return server.Run()
		},
	}
}
