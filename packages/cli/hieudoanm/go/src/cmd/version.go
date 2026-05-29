package cmd

import (
	"github.com/spf13/cobra"
)

// Version is dynamically set by the compiler during build
var Version = "dev"
var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Print the version number of the application",
	Long:  `Print the version number of the application.`,
	Run: func(cmd *cobra.Command, args []string) {
		cmd.Printf("Version: %s\n", Version)
	},
}

func init() {
	rootCmd.AddCommand(versionCmd)
}
