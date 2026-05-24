// Package stringcmd ...
package stringcmd

import (
	"fmt"
	"strings"
	"unicode"

	"github.com/spf13/cobra"
)

// Capitalize capitalizes the first letter of each word
func Capitalize(s string) string {
	words := strings.Fields(s)
	for i, word := range words {
		if len(word) > 0 {
			words[i] = string(unicode.ToUpper(rune(word[0]))) + strings.ToLower(word[1:])
		}
	}
	return strings.Join(words, " ")
}

// stringCapitaliseCmd represents the stringCapitalise command
var stringCapitaliseCmd = &cobra.Command{
	Use:   "capitalise",
	Short: "Run the capitalise operation for the string app",
	Long: `The capitalise command is a specific utility to execute operations related to capitalise within the string application.

As a component of the devtools tools, this command empowers you to interact directly with string's capitalise features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Print("Text: ")
		var text string
		fmt.Scanln(&text)
		fmt.Println(Capitalize(text))
	},
}
