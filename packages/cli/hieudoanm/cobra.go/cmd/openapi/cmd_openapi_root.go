package openapi

import (
	"fmt"

	"github.com/spf13/cobra"
)

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
	return cmd
}
