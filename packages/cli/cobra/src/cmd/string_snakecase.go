// Package cmd ...
package cmd

import (
	"fmt"
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

// snakecaseCmd represents the stringSnakecase command
var snakecaseCmd = &cobra.Command{
	Use:   "snakecase",
	Short: "Run the snakecase operation for the string app",
	Long: `The snakecase command is a specific utility to execute operations related to snakecase within the string application.

As a component of the devtools tools, this command empowers you to interact directly with string's snakecase features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {

		// Get Text
		fmt.Print("Text: ")
		var text string
		fmt.Scanln(&text)
		// Uppercase
		fmt.Println(ToSnakeCase(text))
	},
}

func init() {
	rootCmd.AddCommand(snakecaseCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// snakecaseCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// snakecaseCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
