// Package docsify ...
package docsify

import (
	"github.com/spf13/cobra"
)

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "docsify",
		Short: "",
		Long:  "",
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}

	cmd.PersistentFlags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")
	cmd.AddCommand(newCobraCmd())
	cmd.AddCommand(newObsidianCmd())
	cmd.AddCommand(newScanCmd())
	cmd.AddCommand(newTreeCmd())

	return cmd
}
