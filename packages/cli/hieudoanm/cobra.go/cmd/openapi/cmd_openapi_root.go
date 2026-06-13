package openapi

import (
	"fmt"

	"github.com/spf13/cobra"
)

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "openapi",
		Short: "OpenAPI related tools",
		Long:  `Tools for interacting with and managing OpenAPI specifications.`,
		RunE: func(cmd *cobra.Command, args []string) error {
			fmt.Println("openapi called")
			return nil
		},
	}

	cmd.AddCommand(newPostmanCmd())
	cmd.PersistentFlags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")
	return cmd
}
