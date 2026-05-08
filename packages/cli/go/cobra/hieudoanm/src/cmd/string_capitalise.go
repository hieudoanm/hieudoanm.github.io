// Package cmd ...
package cmd

import (
	"fmt"
	"strings"
	"unicode"

	"github.com/spf13/cobra"
)

// Capitalize capitalizes the first letter of each word
func Capitalize(s string) string {
	words := strings.Fields(s) // Split by spaces
	for i, word := range words {
		if len(word) > 0 {
			words[i] = string(unicode.ToUpper(rune(word[0]))) + strings.ToLower(word[1:])
		}
	}
	return strings.Join(words, " ")
}

// capitaliseCmd represents the stringCapitalise command
var capitaliseCmd = &cobra.Command{
	Use:   "capitalise",
	Short: "Run the capitalise operation for the string app",
	Long: `The capitalise command is a specific utility to execute operations related to capitalise within the string application.

As a component of the devtools tools, this command empowers you to interact directly with string's capitalise features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {

		// Get Text
		fmt.Print("Text: ")
		var text string
		fmt.Scanln(&text)
		// Uppercase
		fmt.Println(Capitalize(text))
	},
}

func init() {
	rootCmd.AddCommand(capitaliseCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// capitaliseCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// capitaliseCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
