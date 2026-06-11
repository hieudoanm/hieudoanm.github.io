// Package system ...
package system

import (
	"github.com/spf13/cobra"
)

// NewCommand returns the system root cobra command.
func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "system",
		Short: "System monitoring and diagnostics tools",
		Long:  `System monitoring utilities including CPU, RAM, disk, and network metrics.`,
	}

	cmd.AddCommand(monitorCmd)

	return cmd
}
