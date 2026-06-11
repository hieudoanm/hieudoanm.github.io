package gh

import (
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "gh",
		Short: "GitHub CLI tools",
		Long:  `GitHub CLI utilities for interacting with GitHub APIs.`,
	}

	cmd.AddCommand(ghCocCmd)
	cmd.AddCommand(ghIgnoreCmd)
	cmd.AddCommand(ghLanguagesCmd)
	cmd.AddCommand(ghLicenseCmd)
	cmd.AddCommand(ghOGCmd)

	return cmd
}
