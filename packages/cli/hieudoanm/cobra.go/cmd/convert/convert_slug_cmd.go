package convert

import (
	"fmt"
	"regexp"
	"strings"

	"github.com/spf13/cobra"
)

var nonSlug = regexp.MustCompile(`[^a-z0-9-]`)
var multiDash = regexp.MustCompile(`-+`)

func Slug(s string) string {
	slug := strings.ToLower(s)
	slug = strings.ReplaceAll(slug, " ", "-")
	slug = nonSlug.ReplaceAllString(slug, "")
	slug = multiDash.ReplaceAllString(slug, "-")
	slug = strings.Trim(slug, "-")
	return slug
}

func newSlugCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "slug [text]",
		Short: "Generate a URL-friendly slug",
		Long:  `Generate a URL-friendly slug by lowercasing, replacing spaces with hyphens, and removing special characters.`,
		Example: `  convert slug "Hello World!"
  convert slug "My Blog Post Title"`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := resolveText(args)
			if err != nil {
				return err
			}
			fmt.Println(Slug(text))
			return nil
		},
	}
}
