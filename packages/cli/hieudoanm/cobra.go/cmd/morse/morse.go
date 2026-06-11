package morse

import (
	"fmt"
	"strings"

	"github.com/AlecAivazis/survey/v2"
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

func ConvertTextToMorse(text string) string {
	var result []string
	for _, character := range text {
		lowerCharacter := rune(strings.ToLower(string(character))[0])
		code, found := morseMap[lowerCharacter]
		if found {
			result = append(result, code)
		} else {
			result = append(result, string(character))
		}
	}
	return strings.Join(result, "")
}

func NewCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "convert",
		Short: "Convert text to Morse code",
		Long:  `Converts plain text to Morse code. Supports letters, numbers, and common punctuation.`,
		RunE: func(cmd *cobra.Command, args []string) error {
			var text string
			prompt := &survey.Input{Message: "Text:"}
			if err := survey.AskOne(prompt, &text); err != nil {
				return err
			}
			fmt.Printf("Converting: %s\n", text)
			morseCode := ConvertTextToMorse(text)
			fmt.Println("Morse Code:", morseCode)
			return nil
		},
	}
}
