package convert

import (
	"fmt"
	"strings"

	"github.com/spf13/cobra"
)

func newLowercaseCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "lowercase [text]",
		Short: "Convert a string to lowercase",
		Long:  `Convert all characters in the provided text to lowercase.`,
		Example: `  convert lowercase "HELLO WORLD"
  convert lowercase "The Quick Brown Fox"`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := resolveText(args)
			if err != nil {
				return err
			}
			fmt.Println(strings.ToLower(text))
			return nil
		},
	}
}
