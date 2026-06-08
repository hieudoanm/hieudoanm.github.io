/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"

	"github.com/hieudoanm/hieudoanm/src/services/blackjack"

	tea "charm.land/bubbletea/v2"
	"github.com/spf13/cobra"
)

// countCmd represents the count command
var countCmd = &cobra.Command{
	Use:   "count",
	Short: "Run the count operation for the cards app",
	Run: func(cmd *cobra.Command, args []string) {

		p := tea.NewProgram(blackjack.NewModel())

		if _, err := p.Run(); err != nil {
			fmt.Printf("error running program: %s\n", err)
		}
	},
}

func init() {
	rootCmd.AddCommand(countCmd)
}
