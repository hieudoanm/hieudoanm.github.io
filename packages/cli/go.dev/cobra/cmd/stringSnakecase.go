// Package cmd ...
package cmd

import (
	"fmt"
	"nothing-cli/utils"
	"regexp"
	"strings"

	"github.com/spf13/cobra"
)

// ToSnakeCase converts a string to snake_case
func ToSnakeCase(s string) string {
	// Convert camelCase or PascalCase to snake_case
	re := regexp.MustCompile("([a-z0-9])([A-Z])")
	snake := re.ReplaceAllString(s, "${1}_${2}")

	// Convert spaces, hyphens to underscores and lowercase everything
	snake = strings.ReplaceAll(snake, " ", "_")
	snake = strings.ReplaceAll(snake, "-", "_")
	return strings.ToLower(snake)
}

// stringSnakecaseCmd represents the stringSnakecase command
var stringSnakecaseCmd = &cobra.Command{
	Use:   "snakecase",
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
		fmt.Println(ToSnakeCase(text))
	},
}

func init() {
	stringCmd.AddCommand(stringSnakecaseCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// stringSnakecaseCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// stringSnakecaseCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
