// Package stringcmd ...
package stringcmd

import (
	"fmt"
	"regexp"
	"strings"

	"github.com/spf13/cobra"
)

// ToSnakeCase converts a string to snake_case
func ToSnakeCase(s string) string {
	re := regexp.MustCompile("([a-z0-9])([A-Z])")
	snake := re.ReplaceAllString(s, "${1}_${2}")
	snake = strings.ReplaceAll(snake, " ", "_")
	snake = strings.ReplaceAll(snake, "-", "_")
	return strings.ToLower(snake)
}

// stringSnakecaseCmd represents the stringSnakecase command
var stringSnakecaseCmd = &cobra.Command{
	Use:   "snakecase",
	Short: "Run the snakecase operation for the string app",
	Long: `The snakecase command is a specific utility to execute operations related to snakecase within the string application.

As a component of the devtools tools, this command empowers you to interact directly with string's snakecase features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Print("Text: ")
		var text string
		fmt.Scanln(&text)
		fmt.Println(ToSnakeCase(text))
	},
}
