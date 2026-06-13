package doi

import (
	"github.com/spf13/cobra"
)

func newRefCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "ref [doi]",
		Short: "Generate a formatted reference from a DOI",
		Long:  `Fetches metadata for a given DOI from Crossref and generates a formatted reference entry.`,
		Args:  cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := resolveDOI(args)
			if err != nil {
				return err
			}
			data, err := fetchCrossref(id)
			if err != nil {
				return err
			}
			PrintReference(data)
			return nil
		},
	}
}
