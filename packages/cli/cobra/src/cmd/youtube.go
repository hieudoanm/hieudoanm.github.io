/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"github.com/spf13/cobra"
)

// youtubeCmd represents the base command when called without any subcommands
var youtubeCmd = &cobra.Command{
	Use:   "youtube",
	Short: "String CLI application (devtools tools)",
	Long: `The string CLI application is a comprehensive backend utility belonging to the devtools suite of tools.

Use this root executable to manage configuring, running, and interacting with all string-related operations securely and efficiently from your terminal.`,
	// Uncomment the following line if your bare application
	// has an action associated with it:
	// Run: func(cmd *cobra.Command, args []string) { },
}

func init() {
	rootCmd.AddCommand(youtubeCmd)
}
