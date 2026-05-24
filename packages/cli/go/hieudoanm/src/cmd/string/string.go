// Package stringcmd ...
package stringcmd

import (
	"github.com/spf13/cobra"
)

// NewCommand returns the string root cobra command.
func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "string",
		Short: "String CLI application (devtools)",
		Long: `The string CLI application is a comprehensive backend utility belonging to the devtools suite of tools.

Use this root executable to manage configuring, running, and interacting with all string-related operations securely and efficiently from your terminal.`,
	}

	cmd.AddCommand(stringCapitaliseCmd)
	cmd.AddCommand(stringDeburrCmd)
	cmd.AddCommand(stringKebabcaseCmd)
	cmd.AddCommand(stringLowercaseCmd)
	cmd.AddCommand(stringSnakecaseCmd)
	cmd.AddCommand(stringUppercaseCmd)

	return cmd
}
