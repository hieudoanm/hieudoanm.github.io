package convert

import (
	"encoding/json"
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
			jsonOutput, _ := cmd.Flags().GetBool("json")
			r := Capitalise(text)
			if jsonOutput {
				b, _ := json.MarshalIndent(map[string]interface{}{"input": text, "output": r}, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Println(r)
			}
			return nil
		},
	}
}
