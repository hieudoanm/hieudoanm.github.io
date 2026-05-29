// Package docsify ...
package docsify

import (
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "docsify",
		Short: "",
		Long:  "",
	}

	cmd.AddCommand(docsifyCobraCmd)
	cmd.AddCommand(docsifyScanCmd)
	cmd.AddCommand(docsifyTreeCmd)

	return cmd
}
