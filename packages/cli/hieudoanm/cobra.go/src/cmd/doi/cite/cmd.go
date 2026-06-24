package cite

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/doi/internal"
	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "cite [doi]",
		Short: "Generate an APA citation from a DOI",
		Long:  `Fetches metadata for a given DOI from Crossref and generates an APA-formatted citation.`,
		Example: `  doi cite 10.1000/xyz123
  doi cite 10.1038/nature12373`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			id, err := internal.ResolveDOI(args)
			if err != nil {
				return err
			}
			data, err := internal.FetchCrossref(id)
			if err != nil {
				return err
			}

			if ok, _ := cmd.Flags().GetBool("json"); ok {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"doi":  id,
					"data": data,
				}, "", "  ")
				fmt.Println(string(b))
				return nil
			}

			internal.PrintCitation(data)
			return nil
		},
	}
}
