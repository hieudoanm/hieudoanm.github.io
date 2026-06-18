package convert

import (
	"fmt"
	"regexp"
	"strings"

	"github.com/spf13/cobra"
)

func ToSnakeCase(s string) string {
	re := regexp.MustCompile("([a-z0-9])([A-Z])")
	snake := re.ReplaceAllString(s, "${1}_${2}")
	snake = strings.ReplaceAll(snake, " ", "_")
	snake = strings.ReplaceAll(snake, "-", "_")
	return strings.ToLower(snake)
}

func newSnakecaseCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "snakecase [text]",
		Short: "Convert a string to snake_case",
		Long:  `Convert a string to snake_case by replacing spaces, hyphens, and camelCase boundaries with underscores.`,
		Example: `  convert snakecase "hello world"
  convert snakecase "helloWorld"
  convert snakecase "hello-world"`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := resolveText(args)
			if err != nil {
				return err
			}
			fmt.Println(ToSnakeCase(text))
			return nil
		},
	}
}
