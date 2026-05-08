// Package cmd ...
package cmd

import (
	"fmt"
	"strings"
	"unicode"

	"github.com/spf13/cobra"
	"golang.org/x/text/unicode/norm"
)

// Deburr removes diacritical marks (accents) from letters
func Deburr(s string) string {
	t := norm.NFD.String(s) // Decomposes characters (é → e + ́)
	var sb strings.Builder
	for _, r := range t {
		if unicode.IsMark(r) {
			continue // Skip accent marks
		}
		sb.WriteRune(r)
	}
	return sb.String()
}

// stringDeburrCmd represents the stringDeburr command
var stringDeburrCmd = &cobra.Command{
	Use:   "deburr",
	Short: "Run the deburr operation for the string app",
	Long: `The deburr command is a specific utility to execute operations related to deburr within the string application.

As a component of the devtools tools, this command empowers you to interact directly with string's deburr features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {

		// Get Text
		fmt.Print("Text: ")
		var text string
		fmt.Scanln(&text)
		// Uppercase
		fmt.Println(Deburr(text))
	},
}

func init() {
	rootCmd.AddCommand(stringDeburrCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// stringDeburrCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// stringDeburrCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
