package convert

import (
	"github.com/spf13/cobra"
)

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "convert",
		Short: "Text conversion utilities",
		Long:  `Convert text between formats: Braille, Morse code, and string case transformations.`,
		Example: `  convert base64 "hello world"
  convert morse "sos"
  convert slug "Hello World!"`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}

	cmd.AddCommand(newBrailleCmd())
	cmd.AddCommand(newMorseCmd())
	cmd.AddCommand(newBase64Cmd())
	cmd.AddCommand(newURLCmd())
	cmd.AddCommand(newCapitaliseCmd())
	cmd.AddCommand(newDeburrCmd())
	cmd.AddCommand(newKebabcaseCmd())
	cmd.AddCommand(newCamelcaseCmd())
	cmd.AddCommand(newPascalcaseCmd())
	cmd.AddCommand(newSlugCmd())
	cmd.AddCommand(newLowercaseCmd())
	cmd.AddCommand(newSnakecaseCmd())
	cmd.AddCommand(newUppercaseCmd())
	cmd.AddCommand(newCountCmd())
	cmd.PersistentFlags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")
	return cmd
}
