// Package stringcmd ...
package stringcmd

import (
	"fmt"
	"regexp"
	"strings"

	"github.com/spf13/cobra"
)

// ToKebabCase converts a string to kebab-case
func ToKebabCase(s string) string {
	re := regexp.MustCompile("([a-z0-9])([A-Z])")
	kebab := re.ReplaceAllString(s, "${1}-${2}")
	kebab = strings.ReplaceAll(kebab, " ", "-")
	kebab = strings.ReplaceAll(kebab, "_", "-")
	return strings.ToLower(kebab)
}

// stringKebabcaseCmd represents the stringKebabcase command
var stringKebabcaseCmd = &cobra.Command{
	Use:   "kebabcase",
	Short: "Run the kebabcase operation for the string app",
	Long: `The kebabcase command is a specific utility to execute operations related to kebabcase within the string application.

As a component of the devtools tools, this command empowers you to interact directly with string's kebabcase features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Print("Text: ")
		var text string
		fmt.Scanln(&text)
		fmt.Println(ToKebabCase(text))
	},
}
