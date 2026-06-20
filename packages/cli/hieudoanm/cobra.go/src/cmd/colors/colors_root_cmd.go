// Package colors ...
package colors

import (
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "colors",
		Short: "Color conversion and palette generation tools",
		Long:  `Convert between color spaces (HEX, RGB, HSL, HCL, OKLCH, CMYK) and generate color palettes.`,
		Example: `  colors hex
  colors rgb
  colors hcl
  colors oklch
  colors palette
  colors random`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}

	cmd.PersistentFlags().BoolP("json", "j", false, "Output in JSON format")
	cmd.AddCommand(newConvertHclCmd())
	cmd.AddCommand(newConvertHexCmd())
	cmd.AddCommand(newConvertOklchCmd())
	cmd.AddCommand(newConvertRgbCmd())
	cmd.AddCommand(newPaletteCmd())
	cmd.AddCommand(newRandomCmd())

	return cmd
}
