// Package cmd ...
package cmd

import (
	"fmt"
	"nothing-cli/utils"
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

// stringCapitaliseCmd represents the stringCapitalise command
var stringCapitaliseCmd = &cobra.Command{
	Use:   "capitalise",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		utils.LogProgramName()
		// Get Text
		fmt.Print("Text: ")
		var text string
		fmt.Scanln(&text)
		// Uppercase
		fmt.Println(Capitalize(text))
	},
}

func init() {
	stringCmd.AddCommand(stringCapitaliseCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// stringCapitaliseCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// stringCapitaliseCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
