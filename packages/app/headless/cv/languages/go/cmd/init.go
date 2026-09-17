package cmd

import (
	"fmt"
	"os"

	"cv/internal/cv"

	"github.com/spf13/cobra"
)

var initCmd = &cobra.Command{
	Use:   "init",
	Short: "Create cv.yaml with default structure",
	Long:  `Creates a cv.yaml file with the default CV structure.`,
	Args:  cobra.NoArgs,
	RunE: func(cmd *cobra.Command, args []string) error {
		file := "cv.yaml"
		if _, err := os.Stat(file); err == nil {
			return fmt.Errorf("%s already exists", file)
		}
		if err := cv.WriteDefaultCV(file); err != nil {
			return err
		}
		cmd.Printf("Created %s\n", file)
		return nil
	},
}
