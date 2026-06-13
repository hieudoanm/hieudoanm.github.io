// Package colors ...
package colors

import (
	"github.com/spf13/cobra"
)

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "colors",
		Short: "Colors CLI application (design tools)",
		Long: `The colors CLI application is a comprehensive backend utility belonging to the design suite of tools.

Use this root executable to manage configuring, running, and interacting with all colors-related operations securely and efficiently from your terminal.`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}

	cmd.PersistentFlags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")
	cmd.AddCommand(newConvertHclCmd())
	cmd.AddCommand(newConvertHexCmd())
	cmd.AddCommand(newConvertOklchCmd())
	cmd.AddCommand(newConvertRgbCmd())
	cmd.AddCommand(newPaletteCmd())
	cmd.AddCommand(newRandomCmd())

	return cmd
}
