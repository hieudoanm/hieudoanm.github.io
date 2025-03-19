// Package cmd ...
package cmd

import (
	"fmt"
	"hieu-cli/utils"

	"github.com/spf13/cobra"
)

// instagramCmd represents the instagram command
var instagramCmd = &cobra.Command{
	Use:   "instagram",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		utils.LogProgramName()
		fmt.Println("download - Download image(s) by URL")
	},
}

func init() {
	rootCmd.AddCommand(instagramCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// instagramCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// instagramCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
