package gh

import (
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "gh",
		Short: "GitHub CLI tools",
		Long:  `GitHub CLI utilities for interacting with GitHub APIs.`,
		Example: `  gh languages --repo hieudoanm/hieudoanm.github.io
  gh license
  gh coc
  gh ignore
  gh og --url hieudoanm/hieudoanm.github.io`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}

	cmd.PersistentFlags().BoolP("json", "j", false, "Output in JSON format")

	cmd.AddCommand(newCocCmd())
	cmd.AddCommand(newIgnoreCmd())
	cmd.AddCommand(newLanguagesCmd())
	cmd.AddCommand(newLicenseCmd())
	cmd.AddCommand(newOGCmd())

	return cmd
}
