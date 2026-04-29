/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"github.com/spf13/cobra"
)

// colorsCmd represents the base command when called without any subcommands
var colorsCmd = &cobra.Command{
	Use:   "colors",
	Short: "Colors CLI application (design tools)",
	Long: `The colors CLI application is a comprehensive backend utility belonging to the design suite of tools.

Use this root executable to manage configuring, running, and interacting with all colors-related operations securely and efficiently from your terminal.`,
	// Uncomment the following line if your bare application
	// has an action associated with it:
	// Run: func(cmd *cobra.Command, args []string) { },
}

func init() {
	rootCmd.AddCommand(colorsCmd)
}
