package convert

import (
	"fmt"
	"strings"

	"github.com/spf13/cobra"
)

var morseMap = map[rune]string{
	'a': ".-", 'b': "-...", 'c': "-.-.", 'd': "-..", 'e': ".",
	'f': "..-.", 'g': "--.", 'h': "....", 'i': "..", 'j': ".---",
	'k': "-.-", 'l': ".-..", 'm': "--", 'n': "-.", 'o': "---",
	'p': ".--.", 'q': "--.-", 'r': ".-.", 's': "...", 't': "-",
	'u': "..-", 'v': "...-", 'w': ".--", 'x': "-..-", 'y': "-.--", 'z': "--..",
	'1': ".----", '2': "..---", '3': "...--", '4': "....-", '5': ".....",
	'6': "-....", '7': "--...", '8': "---..", '9': "----.", '0': "-----",
	'.': ".-.-.-", ',': "--..--", ';': "-.-.-.", ':': "---...",
	'!': "-.-.--", '?': "..--..", '\'': ".----.", '-': "-....-",
	'(': "-.--.", ')': "-.--.-", '"': ".-..-.", '/': "-..-.",
}

func ToMorse(text string) string {
	var result []string
	for _, ch := range strings.ToLower(text) {
		code, found := morseMap[ch]
		if found {
			result = append(result, code)
		} else {
			result = append(result, string(ch))
		}
	}
	return strings.Join(result, " ")
}

func newMorseCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "morse [text]",
		Short: "Convert text to Morse code",
		Long:  `Converts plain text to Morse code. Supports letters, numbers, and common punctuation.`,
		Args:  cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := resolveText(args)
			if err != nil {
				return err
			}
			fmt.Println(ToMorse(text))
			return nil
		},
	}
}
