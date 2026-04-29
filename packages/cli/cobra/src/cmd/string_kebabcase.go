// Package cmd ...
package cmd

import (
	"fmt"
	"regexp"
	"strings"

	"github.com/spf13/cobra"
)

// ToKebabCase converts a string to kebab-case
func ToKebabCase(s string) string {
	// Convert camelCase or PascalCase to kebab-case
	re := regexp.MustCompile("([a-z0-9])([A-Z])")
	kebab := re.ReplaceAllString(s, "${1}-${2}")

	// Convert spaces and underscores to hyphens and lowercase everything
	kebab = strings.ReplaceAll(kebab, " ", "-")
	kebab = strings.ReplaceAll(kebab, "_", "-")
	return strings.ToLower(kebab)
}

// kebabcaseCmd represents the stringKebabcase command
var kebabcaseCmd = &cobra.Command{
	Use:   "kebabcase",
	Short: "Run the kebabcase operation for the string app",
	Long: `The kebabcase command is a specific utility to execute operations related to kebabcase within the string application.

As a component of the devtools tools, this command empowers you to interact directly with string's kebabcase features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {

		// Get Text
		fmt.Print("Text: ")
		var text string
		fmt.Scanln(&text)
		// Uppercase
		fmt.Println(ToKebabCase(text))
	},
}

func init() {
	rootCmd.AddCommand(kebabcaseCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// kebabcaseCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// kebabcaseCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
