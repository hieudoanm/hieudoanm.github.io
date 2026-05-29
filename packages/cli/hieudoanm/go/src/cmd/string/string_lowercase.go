// Package stringcmd ...
package stringcmd

import (
	"fmt"
	"strings"

	"github.com/spf13/cobra"
)

// stringLowercaseCmd represents the stringLowercase command
var stringLowercaseCmd = &cobra.Command{
	Use:   "lowercase",
	Short: "Run the lowercase operation for the string app",
	Long: `The lowercase command is a specific utility to execute operations related to lowercase within the string application.

As a component of the devtools tools, this command empowers you to interact directly with string's lowercase features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Print("Text: ")
		var text string
		fmt.Scanln(&text)
		fmt.Println(strings.ToLower(text))
	},
}
