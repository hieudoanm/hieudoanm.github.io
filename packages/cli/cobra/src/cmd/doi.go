/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"github.com/spf13/cobra"
)

// doiCmd represents the base command when called without any subcommands
var doiCmd = &cobra.Command{
	Use:   "doi",
	Short: "Doi CLI application (productivity tools)",
	Long: `The doi CLI application is a comprehensive backend utility belonging to the productivity suite of tools.

Use this root executable to manage configuring, running, and interacting with all doi-related operations securely and efficiently from your terminal.`,
	// Uncomment the following line if your bare application
	// has an action associated with it:
	// Run: func(cmd *cobra.Command, args []string) { },
}

func init() {
	rootCmd.AddCommand(doiCmd)
}
