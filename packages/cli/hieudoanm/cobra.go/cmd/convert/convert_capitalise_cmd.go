package convert

import (
	"fmt"
	"strings"
	"unicode"

	"github.com/spf13/cobra"
)

func Capitalise(s string) string {
	words := strings.Fields(s)
	for i, word := range words {
		if len(word) > 0 {
			words[i] = string(unicode.ToUpper(rune(word[0]))) + strings.ToLower(word[1:])
		}
	}
	return strings.Join(words, " ")
}

func newCapitaliseCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "capitalise [text]",
		Short: "Capitalise the first letter of each word",
		Long:  `Capitalise the first letter of each word in the provided text.`,
		Example: `  convert capitalise "hello world"
  convert capitalise "the quick brown fox"`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := resolveText(args)
			if err != nil {
				return err
			}
			fmt.Println(Capitalise(text))
			return nil
		},
	}
}
