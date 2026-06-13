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
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Println("openapi called")
		},
	}

	cmd.AddCommand(NewPostmanCommand())
	return cmd
}
