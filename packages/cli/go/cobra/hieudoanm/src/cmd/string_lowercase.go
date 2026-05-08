// Package cmd ...
package cmd

import (
	"fmt"
	"strings"

	"github.com/spf13/cobra"
)

// lowercaseCmd represents the stringLowercase command
var lowercaseCmd = &cobra.Command{
	Use:   "lowercase",
	Short: "Run the lowercase operation for the string app",
	Long: `The lowercase command is a specific utility to execute operations related to lowercase within the string application.

As a component of the devtools tools, this command empowers you to interact directly with string's lowercase features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {

		// Get Text
		fmt.Print("Text: ")
		var text string
		fmt.Scanln(&text)
		// Uppercase
		fmt.Println(strings.ToLower(text))
	},
}

func init() {
	rootCmd.AddCommand(lowercaseCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// lowercaseCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// lowercaseCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
