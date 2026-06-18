package convert

import (
	"fmt"
	"strings"

	"github.com/spf13/cobra"
)

var braille = map[rune]string{
	'a': "⠁", 'b': "⠃", 'c': "⠉", 'd': "⠙", 'e': "⠑", 'f': "⠋", 'g': "⠛", 'h': "⠓",
	'i': "⠊", 'j': "⠚", 'k': "⠅", 'l': "⠇", 'm': "⠍", 'n': "⠝", 'o': "⠕", 'p': "⠏",
	'q': "⠟", 'r': "⠗", 's': "⠎", 't': "⠞", 'u': "⠥", 'v': "⠧", 'w': "⠺", 'x': "⠭",
	'y': "⠽", 'z': "⠵",
	'.': "⠲", ',': "⠂", ';': "⠆", ':': "⠒", '!': "⠖", '?': "⠦", '\'': "⠄", '-': "⠤",
	'(': "⠣", ')': "⠜", '"': "⠘",
}

func ToBraille(text string) string {
	var result strings.Builder
	for _, ch := range strings.ToLower(text) {
		code, exists := braille[ch]
		if exists {
			result.WriteString(code)
		} else {
			result.WriteRune(ch)
		}
	}
	return result.String()
}

func newBrailleCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "braille [text]",
		Short: "Convert text to Braille",
		Long:  `Converts plain text to Unicode Braille characters. Supports letters, numbers, and common punctuation.`,
		Example: `  convert braille "hello"
  convert braille "good morning"`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := resolveText(args)
			if err != nil {
				return err
			}
			fmt.Println(ToBraille(text))
			return nil
		},
	}
}
