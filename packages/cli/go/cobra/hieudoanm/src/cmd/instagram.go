/*
Copyright © 2026 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"github.com/spf13/cobra"
)

var instagramCmd = &cobra.Command{
	Use:   "instagram",
	Short: "Instagram related tools",
	Long:  `Instagram related tools like downloading images and reels.`,
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
