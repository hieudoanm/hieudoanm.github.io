// Package cmd ...
package cmd

import (
	"fmt"

	"hieu-cli/utils"

	"github.com/spf13/cobra"
)

// helpCmd represents the help command
var helpCmd = &cobra.Command{
	Use:   "help",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		utils.LogProgramName()
		// Commands
		fmt.Println("chess     - Chess SDK")
		fmt.Println("chess960  - Chess960 SDK")
		fmt.Println("colors    - Colors SDK")
		fmt.Println("convert   - Convert Text")
		fmt.Println("crypto    - Crypto SDK")
		fmt.Println("forex     - Get Foreign Currency Exchange")
		fmt.Println("generate  - Generate")
		fmt.Println("instagram - Instagram SDK")
		fmt.Println("status    - Get Status")
		fmt.Println("string    - String SDK")
		fmt.Println("telegram  - Telegram SDK")
		fmt.Println("version   - Get Version")
		fmt.Println("youtube   - YouTube SDK")
	},
}

func init() {
	rootCmd.AddCommand(helpCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// helpCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// helpCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
