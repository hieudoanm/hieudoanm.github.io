package convert

import (
	"fmt"
	"regexp"
	"strings"

	"github.com/spf13/cobra"
)

func ToKebabCase(s string) string {
	re := regexp.MustCompile("([a-z0-9])([A-Z])")
	kebab := re.ReplaceAllString(s, "${1}-${2}")
	kebab = strings.ReplaceAll(kebab, " ", "-")
	kebab = strings.ReplaceAll(kebab, "_", "-")
	return strings.ToLower(kebab)
}

func newKebabcaseCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "kebabcase [text]",
		Short: "Convert a string to kebab-case",
		Long:  `Convert a string to kebab-case by replacing spaces, underscores, and camelCase boundaries with hyphens.`,
		Example: `  convert kebabcase "hello world"
  convert kebabcase "helloWorld"
  convert kebabcase "hello_world"`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := resolveText(args)
			if err != nil {
				return err
			}
			fmt.Println(ToKebabCase(text))
			return nil
		},
	}
}
