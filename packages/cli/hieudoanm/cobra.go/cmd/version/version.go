package version

import (
	"github.com/spf13/cobra"
)

var V = "dev"

func NewCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "version",
		Short: "Print the application version",
		Long:  `Print the version number of the application.`,
		Run: func(cmd *cobra.Command, args []string) {
			cmd.Printf("Version: %s\n", V)
		},
	}
}
