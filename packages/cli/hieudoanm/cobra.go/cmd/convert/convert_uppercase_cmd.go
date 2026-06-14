package convert

import (
	"fmt"
	"strings"

	"github.com/spf13/cobra"
)

func newUppercaseCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "uppercase [text]",
		Short: "Convert a string to uppercase",
		Long:  `Convert all characters in the provided text to uppercase.`,
		Example: `  convert uppercase "hello world"
  convert uppercase "the quick brown fox"`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := resolveText(args)
			if err != nil {
				return err
			}
			fmt.Println(strings.ToUpper(text))
			return nil
		},
	}
}
