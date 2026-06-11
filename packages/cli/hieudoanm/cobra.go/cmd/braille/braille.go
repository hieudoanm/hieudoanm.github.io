package braille

import (
	"fmt"
	"strings"

	"github.com/AlecAivazis/survey/v2"
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

func ConvertToBraille(text string) string {
	var result strings.Builder
	for _, character := range text {
		code, exists := braille[character]
		if exists {
			result.WriteString(code)
		} else {
			result.WriteRune(character)
		}
		result.WriteString("")
	}
	return result.String()
}

func NewCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "convert",
		Short: "Convert text to Braille",
		Long:  `Converts plain text to Unicode Braille characters. Supports letters, numbers, and common punctuation.`,
		RunE: func(cmd *cobra.Command, args []string) error {
			var text string
			prompt := &survey.Input{Message: "Text:"}
			if err := survey.AskOne(prompt, &text); err != nil {
				return err
			}
			fmt.Printf("Converting: %s\n", text)
			brailleText := ConvertToBraille(text)
			fmt.Println("Braille:", brailleText)
			return nil
		},
	}
}
