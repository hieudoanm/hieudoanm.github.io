// Package cmd ...
package cmd

import (
	"github.com/spf13/cobra"
)

// igCmd represents the base command when called without any subcommands
var igCmd = &cobra.Command{
	Use:   "ig",
	Short: "A brief description of your application",
	Long: `A longer description that spans multiple lines and likely contains
examples and usage of using your application. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	// Uncomment the following line if your bare application
	// has an action associated with it:
	// Run: func(cmd *cobra.Command, args []string) { },
}

func init() {
	rootCmd.AddCommand(igCmd)

	// Here you will define your flags and configuration settings.
	// Cobra supports persistent flags, which, if defined here,
	// will be global for your application.

	// igCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is $HOME/.ig.yaml)")

	// Cobra also supports local flags, which will only run
	// when this action is called directly.
	// igCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
