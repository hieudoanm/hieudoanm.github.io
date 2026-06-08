/*
Copyright © 2026 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"os"

	"github.com/hieudoanm/hieudoanm/src/cmd/chess"
	"github.com/hieudoanm/hieudoanm/src/cmd/colors"
	"github.com/hieudoanm/hieudoanm/src/cmd/docsify"
	"github.com/hieudoanm/hieudoanm/src/cmd/doi"
	"github.com/hieudoanm/hieudoanm/src/cmd/instagram"
	"github.com/hieudoanm/hieudoanm/src/cmd/ip"
	"github.com/hieudoanm/hieudoanm/src/cmd/openapi"
	"github.com/hieudoanm/hieudoanm/src/cmd/openrouter"
	"github.com/hieudoanm/hieudoanm/src/cmd/shopify"
	stringcmd "github.com/hieudoanm/hieudoanm/src/cmd/string"
	"github.com/hieudoanm/hieudoanm/src/cmd/system"
	"github.com/hieudoanm/hieudoanm/src/cmd/telegram"
	"github.com/hieudoanm/hieudoanm/src/cmd/youtube"
	"github.com/spf13/cobra"
)

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "hieudoanm",
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

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}

func init() {
	rootCmd.AddCommand(chess.NewCommand())
	rootCmd.AddCommand(colors.NewCommand())
	rootCmd.AddCommand(doi.NewCommand())
	rootCmd.AddCommand(docsify.NewCommand())
	rootCmd.AddCommand(instagram.NewCommand())
	rootCmd.AddCommand(ip.NewCommand())
	rootCmd.AddCommand(openapi.NewCommand())
	rootCmd.AddCommand(openrouter.NewCommand())
	rootCmd.AddCommand(shopify.NewCommand())
	rootCmd.AddCommand(stringcmd.NewCommand())
	rootCmd.AddCommand(system.NewCommand())
	rootCmd.AddCommand(telegram.NewCommand())
	rootCmd.AddCommand(youtube.NewCommand())
}
