// Package stringcmd ...
package stringcmd

import (
	"fmt"
	"strings"

	"github.com/spf13/cobra"
)

// stringUppercaseCmd represents the stringUppercase command
var stringUppercaseCmd = &cobra.Command{
	Use:   "uppercase",
	Short: "Run the uppercase operation for the string app",
	Long: `The uppercase command is a specific utility to execute operations related to uppercase within the string application.

As a component of the devtools tools, this command empowers you to interact directly with string's uppercase features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Print("Text: ")
		var text string
		fmt.Scanln(&text)
		fmt.Println(strings.ToUpper(text))
	},
}
