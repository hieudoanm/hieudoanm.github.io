package convert

import (
	"fmt"
	"strings"
	"unicode"

	"github.com/spf13/cobra"
)

func ToPascalCase(s string) string {
	words := strings.FieldsFunc(s, func(r rune) bool {
		return r == ' ' || r == '-' || r == '_'
	})
	for i, w := range words {
		words[i] = string(unicode.ToUpper(rune(w[0]))) + strings.ToLower(w[1:])
	}
	return strings.Join(words, "")
}

func newPascalcaseCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "pascalcase [text]",
		Short: "Convert a string to PascalCase",
		Long:  `Convert a string to PascalCase by capitalising the first letter of each word and joining them.`,
		Example: `  convert pascalcase "hello world"
  convert pascalcase "hello-world"
  convert pascalcase "hello_world"`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := resolveText(args)
			if err != nil {
				return err
			}
			fmt.Println(ToPascalCase(text))
			return nil
		},
	}
}
