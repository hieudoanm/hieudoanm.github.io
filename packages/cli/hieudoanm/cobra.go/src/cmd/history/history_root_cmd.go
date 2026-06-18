package history

import (
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "history",
		Short: "Command execution history",
		Long:  "View and manage CLI and MCP command execution history.",
	}
	cmd.AddCommand(newListCmd())
	cmd.AddCommand(newSearchCmd())
	cmd.AddCommand(newClearCmd())
	cmd.AddCommand(newStatsCmd())
	return cmd
}
