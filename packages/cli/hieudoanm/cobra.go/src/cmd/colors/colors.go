// Package colors ...
package colors

import (
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "colors",
		Short: "Colors CLI application (design tools)",
		Long: `The colors CLI application is a comprehensive backend utility belonging to the design suite of tools.

Use this root executable to manage configuring, running, and interacting with all colors-related operations securely and efficiently from your terminal.`,
	}

	cmd.AddCommand(colorsConvertHclCmd)
	cmd.AddCommand(colorsConvertHexCmd)
	cmd.AddCommand(colorsConvertOklchCmd)
	cmd.AddCommand(colorsConvertRgbCmd)
	cmd.AddCommand(colorsPaletteCmd)
	cmd.AddCommand(colorsRandomCmd)

	return cmd
}
