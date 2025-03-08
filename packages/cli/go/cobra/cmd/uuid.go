// Package cmd ...
package cmd

import (
	"fmt"
	"nothing-cli/utils"

	"github.com/google/uuid"
	"github.com/spf13/cobra"
)

var maxUUID int

// uuidCmd represents the download command
var uuidCmd = &cobra.Command{
	Use:   "uuid",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		utils.LogProgramName()
		for i := 0; i < maxUUID; i++ {
			// Generate a new UUID (v4)
			newUUID := uuid.New()

			// Print the UUID
			fmt.Println(newUUID)
		}
	},
}

func init() {
	rootCmd.AddCommand(uuidCmd)

	uuidCmd.PersistentFlags().IntVarP(&maxUUID, "max", "m", 1, "Number of UUIDs")
}
