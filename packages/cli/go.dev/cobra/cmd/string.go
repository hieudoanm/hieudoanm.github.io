// Package cmd ...
package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

// stringCmd represents the string command
var stringCmd = &cobra.Command{
	Use:   "string",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("capitalise - Capitalise")
		fmt.Println("deburr     - Café to Cafe")
		fmt.Println("kebabcase  - kebab-case")
		fmt.Println("uppercase  - UPPERCASE")
		fmt.Println("snakecase  - snake_case")
		fmt.Println("lowercase  - lowercase")
	},
}

func init() {
	rootCmd.AddCommand(stringCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// stringCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// stringCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
