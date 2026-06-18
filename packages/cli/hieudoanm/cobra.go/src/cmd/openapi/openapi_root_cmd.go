package openapi

import (
	"github.com/spf13/cobra"
)

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "openapi",
		Short: "OpenAPI related tools",
		Long:  `Tools for interacting with and managing OpenAPI specifications.`,
		Example: `  openapi validate -f spec.yaml
  openapi openapi2postman -i spec.yaml`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}

	cmd.AddCommand(newPostmanCmd())
	cmd.AddCommand(newValidateCmd())
	cmd.PersistentFlags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")
	return cmd
}
