/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/
package chess

import (
	"github.com/spf13/cobra"
)

// pgnCmd represents the pgn command
var pgnCmd = &cobra.Command{
	Use:   "pgn",
	Short: "Run the pgn operation for the chess.graphics app",
	Long: `The pgn command is a specific utility to execute operations related to pgn within the chess.graphics application.

As a component of the chess tools, this command empowers you to interact directly with chess.graphics's pgn features via the CLI.`,
}
