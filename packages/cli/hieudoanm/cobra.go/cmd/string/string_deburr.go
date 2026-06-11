// Package stringcmd ...
package stringcmd

import (
	"fmt"
	"strings"
	"unicode"

	"github.com/spf13/cobra"
	"golang.org/x/text/unicode/norm"
)

// Deburr removes diacritical marks (accents) from letters
func Deburr(s string) string {
	t := norm.NFD.String(s)
	var sb strings.Builder
	for _, r := range t {
		if unicode.IsMark(r) {
			continue
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
		fmt.Print("Text: ")
		var text string
		fmt.Scanln(&text)
		fmt.Println(Deburr(text))
	},
}
