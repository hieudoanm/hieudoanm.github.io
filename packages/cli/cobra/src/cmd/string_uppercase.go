// Package cmd ...
package cmd

import (
	"fmt"
	"strings"

	"github.com/spf13/cobra"
)

// uppercaseCmd represents the stringUppercase command
var uppercaseCmd = &cobra.Command{
	Use:   "uppercase",
	Short: "Run the uppercase operation for the string app",
	Long: `The uppercase command is a specific utility to execute operations related to uppercase within the string application.

As a component of the devtools tools, this command empowers you to interact directly with string's uppercase features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {

		// Get Text
		fmt.Print("Text: ")
		var text string
		fmt.Scanln(&text)
		// Uppercase
		fmt.Println(strings.ToUpper(text))
	},
}

func init() {
	rootCmd.AddCommand(uppercaseCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// uppercaseCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// uppercaseCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
