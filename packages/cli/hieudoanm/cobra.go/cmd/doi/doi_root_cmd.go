package doi

import (
	"github.com/spf13/cobra"
)

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "doi",
		Short: "DOI productivity tools",
		Long:  `Tools for working with Digital Object Identifiers (DOIs): fetch metadata, generate citations, and validate identifiers.`,
	}

	cmd.AddCommand(newCiteCmd())
	cmd.AddCommand(newRefCmd())
	cmd.AddCommand(newFetchCmd())
	cmd.AddCommand(newValidateCmd())
	cmd.PersistentFlags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")
	return cmd
}
