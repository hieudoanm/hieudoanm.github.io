// Package cmd ...
package cmd

import (
	"fmt"
	"strings"

	"github.com/spf13/cobra"
)

// braille ...
var braille = map[rune]string{
	'a': "⠁", 'b': "⠃", 'c': "⠉", 'd': "⠙", 'e': "⠑", 'f': "⠋", 'g': "⠛", 'h': "⠓",
	'i': "⠊", 'j': "⠚", 'k': "⠅", 'l': "⠇", 'm': "⠍", 'n': "⠝", 'o': "⠕", 'p': "⠏",
	'q': "⠟", 'r': "⠗", 's': "⠎", 't': "⠞", 'u': "⠥", 'v': "⠧", 'w': "⠺", 'x': "⠭",
	'y': "⠽", 'z': "⠵",

	'.': "⠲", ',': "⠂", ';': "⠆", ':': "⠒", '!': "⠖", '?': "⠦", '\'': "⠄", '-': "⠤",
	'(': "⠣", ')': "⠜", '"': "⠘",
}

// ConvertToBraille ...
func ConvertToBraille(text string) string {
	var result strings.Builder

	// Loop through each character in the input text
	for _, character := range text {
		// Convert the character to lower case and look it up in the Braille map
		code, exists := braille[character]
		if exists {
			result.WriteString(code)
		} else {
			// If no Braille code exists for the character, append the character itself
			result.WriteRune(character)
		}
		result.WriteString("") // Add space between Braille characters
	}

	return result.String()
}

// brailleCmd represents the braille command
var brailleCmd = &cobra.Command{
	Use:   "convert",
	Short: "Run the braille operation for the string app",
	Long: `The braille command is a specific utility to execute operations related to braille within the string application.

As a component of the devtools tools, this command empowers you to interact directly with string's braille features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {
		// Get URL
		fmt.Print("Text: ")
		var text string
		fmt.Scanln(&text)
		fmt.Printf("Converting: %s\n", text)
		// Convert to Braille
		brailleText := ConvertToBraille(text)
		fmt.Println("Braille:", brailleText)
	},
}

func init() {
	rootCmd.AddCommand(brailleCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// brailleCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// brailleCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
