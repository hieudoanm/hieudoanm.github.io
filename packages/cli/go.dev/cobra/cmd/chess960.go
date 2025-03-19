// Package cmd ..
package cmd

import (
	"fmt"
	"hieu-cli/data"
	"hieu-cli/utils"
	"math/rand"

	"github.com/spf13/cobra"
)

// chess960Cmd represents the chess960 command
var chess960Cmd = &cobra.Command{
	Use:   "chess960",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		utils.LogProgramName()
		var n = len(data.Positions)
		// Get a random index from 0 to n-1
		randomIndex := rand.Intn(n)
		var position = data.Positions[randomIndex]
		fmt.Printf("Position %d: %s\n", randomIndex+1, position)
	},
}

func init() {
	rootCmd.AddCommand(chess960Cmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// chess960Cmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// chess960Cmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
