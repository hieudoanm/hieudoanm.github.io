// Package cmd ...
package cmd

import (
	"fmt"
	"hieu-cli/utils"
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
		fmt.Println(Deburr(text))
	},
}

func init() {
	stringCmd.AddCommand(stringDeburrCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// stringDeburrCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// stringDeburrCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
