package convert

import (
	"fmt"
	"strings"
	"unicode"

	"github.com/spf13/cobra"
)

func ToCamelCase(s string) string {
	words := strings.FieldsFunc(s, func(r rune) bool {
		return r == ' ' || r == '-' || r == '_'
	})
	for i, w := range words {
		if i == 0 {
			words[i] = strings.ToLower(w)
		} else {
			words[i] = string(unicode.ToUpper(rune(w[0]))) + strings.ToLower(w[1:])
		}
	}
	return strings.Join(words, "")
}

func newCamelcaseCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "camelcase [text]",
		Short: "Convert a string to camelCase",
		Args:  cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := resolveText(args)
			if err != nil {
				return err
			}
			fmt.Println(ToCamelCase(text))
			return nil
		},
	}
}
