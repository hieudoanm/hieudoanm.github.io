// Package system ...
package system

import (
	"github.com/spf13/cobra"
)

// NewCommand returns the telegram root cobra command.
func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "system",
		Short: "",
		Long:  "",
	}

	cmd.AddCommand(monitorCmd)

	return cmd
}
