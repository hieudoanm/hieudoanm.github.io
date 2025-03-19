// Package cmd ...
package cmd

import (
	"fmt"
	"hieu-cli/utils"
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

// stringKebabcaseCmd represents the stringKebabcase command
var stringKebabcaseCmd = &cobra.Command{
	Use:   "kebabcase",
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
		fmt.Println(ToKebabCase(text))
	},
}

func init() {
	stringCmd.AddCommand(stringKebabcaseCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// stringKebabcaseCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// stringKebabcaseCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
