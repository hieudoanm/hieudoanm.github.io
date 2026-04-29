/*
Copyright © 2026 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"
	"os"

	"github.com/google/uuid"
	"github.com/spf13/cobra"
)

var uuidVersion int

// uuidCmd represents the base command when called without any subcommands
var uuidCmd = &cobra.Command{
	Use:   "uuid",
	Short: "A simple UUID generator",
	Long:  `A simple UUID generator that supports multiple versions (v1, v4, v7).`,
	Run: func(cmd *cobra.Command, args []string) {
		var u uuid.UUID
		var err error

		switch uuidVersion {
		case 1:
			u, err = uuid.NewUUID()
		case 4:
			u = uuid.New()
		case 7:
			u, err = uuid.NewV7()
		default:
			u = uuid.New()
		}

		if err != nil {
			fmt.Fprintf(os.Stderr, "Error: failed to generate UUID v%d: %v\n", uuidVersion, err)
			os.Exit(1)
		}

		fmt.Println(u.String())
	},
}

func init() {
	uuidCmd.Flags().IntVarP(&uuidVersion, "version", "v", 4, "UUID version to generate (1, 4, or 7)")
}
