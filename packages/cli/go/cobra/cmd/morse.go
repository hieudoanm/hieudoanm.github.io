// Package cmd ...
package cmd

import (
	"fmt"
	"hieu-cli/utils"
	"strings"

	"github.com/spf13/cobra"
)

var morseMap map[rune]string = map[rune]string{
	'a': ".-",
	'b': "-...",
	'c': "-.-.",
	'd': "-..",
	'e': ".",
	'f': "..-.",
	'g': "--.",
	'h': "....",
	'i': "..",
	'j': ".---",
	'k': "-.-",
	'l': ".-..",
	'm': "--",
	'n': "-.",
	'o': "---",
	'p': ".--.",
	'q': "--.-",
	'r': ".-.",
	's': "...",
	't': "-",
	'u': "..-",
	'v': "...-",
	'w': ".--",
	'x': "-..-",
	'y': "-.--",
	'z': "--..",

	'1': ".----",
	'2': "..---",
	'3': "...--",
	'4': "....-",
	'5': ".....",
	'6': "-....",
	'7': "--...",
	'8': "---..",
	'9': "----.",
	'0': "-----",

	'.':  ".-.-.-",
	',':  "--..--",
	';':  "-.-.-.",
	':':  "---...",
	'!':  "-.-.--",
	'?':  "..--..",
	'\'': ".----.",
	'-':  "-....-",
	'(':  "-.--.",
	')':  "-.--.-",
	'"':  ".-..-.",
	'/':  "-..-.",
}

// ConvertTextToMorse converts a given text to Morse code
func ConvertTextToMorse(text string) string {
	var result []string

	// Iterate through each character of the input text
	for _, character := range text {
		// Convert character to lowercase
		lowerCharacter := rune(strings.ToLower(string(character))[0])

		// Look up Morse code for the character, if available
		code, found := morseMap[lowerCharacter]
		if found {
			result = append(result, code)
		} else {
			// If no Morse code exists, add the character itself
			result = append(result, string(character))
		}
	}

	// Join the Morse code and return as a string
	return strings.Join(result, "")
}

// morseCmd represents the morse command
var morseCmd = &cobra.Command{
	Use:   "morse",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		utils.LogProgramName()
		// Get URL
		fmt.Print("Text: ")
		var text string
		fmt.Scanln(&text)
		fmt.Printf("Converting: %s\n", text)
		// Convert to Morse
		morseCode := ConvertTextToMorse(text)
		fmt.Println("Morse Code:", morseCode)
	},
}

func init() {
	rootCmd.AddCommand(morseCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// morseCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// morseCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
