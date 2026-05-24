// Package doi ...
package doi

import (
	"github.com/spf13/cobra"
)

// NewCommand returns the doi root cobra command.
func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "doi",
		Short: "Doi CLI application (productivity tools)",
		Long: `The doi CLI application is a comprehensive backend utility belonging to the productivity suite of tools.

Use this root executable to manage configuring, running, and interacting with all doi-related operations securely and efficiently from your terminal.`,
	}

	cmd.AddCommand(doiCiteCmd)
	cmd.AddCommand(doiRefCmd)

	return cmd
}
