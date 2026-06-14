package doi

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"
)

func newFetchCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "fetch [doi]",
		Short: "Fetch raw metadata for a DOI",
		Long:  `Fetches metadata for a given DOI from Crossref and displays the raw JSON response.`,
		Example: `  doi fetch 10.1000/xyz123
  doi fetch 10.1038/nature12373`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := resolveDOI(args)
			if err != nil {
				return err
			}
			data, err := fetchCrossref(id)
			if err != nil {
				return err
			}
			b, _ := json.MarshalIndent(data, "", "  ")
			fmt.Println(string(b))
			return nil
		},
	}
}
