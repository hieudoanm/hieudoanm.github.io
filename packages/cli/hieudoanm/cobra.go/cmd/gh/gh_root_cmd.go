package gh

import (
	"github.com/spf13/cobra"
)

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "gh",
		Short: "GitHub CLI tools",
		Long:  `GitHub CLI utilities for interacting with GitHub APIs.`,
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}

	cmd.PersistentFlags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")

	cmd.AddCommand(newCocCmd())
	cmd.AddCommand(newIgnoreCmd())
	cmd.AddCommand(newLanguagesCmd())
	cmd.AddCommand(newLicenseCmd())
	cmd.AddCommand(newOGCmd())

	return cmd
}
