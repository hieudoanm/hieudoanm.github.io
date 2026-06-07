package convert

import (
	"encoding/json"
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
		Long:  `Convert a string to camelCase by joining words with the first word lowercased and subsequent words capitalised.`,
		Example: `  convert camelcase "hello world"
  convert camelcase "hello-world"
  convert camelcase "hello_world"`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := resolveText(args)
			if err != nil {
				return err
			}
			jsonOutput, _ := cmd.Flags().GetBool("json")
			r := ToCamelCase(text)
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
