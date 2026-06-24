package json

import (
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/data/internal"
	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	var query, diff, merge string

	cmd := &cobra.Command{
		Use:   "json [file]",
		Short: "Query, format, diff, and merge JSON data",
		Long:  `Pretty-print JSON, run jq-like queries, or diff/merge two JSON files.`,
		Example: `  data json data.json
  data json data.json --query ".name"
  data json data.json --diff file2.json
  data json --merge base.json patch.json`,
		Args: cobra.MaximumNArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			if diff != "" {
				return internal.JSONDiff(args[0], diff)
			}
			if merge != "" {
				return internal.JSONMerge(args[0], merge)
			}

			input, err := internal.ReadInput(args)
			if err != nil {
				return err
			}

			if query != "" {
				data, err := internal.ParseJSON(input)
				if err != nil {
					return err
				}
				result, err := internal.JSONQuery(data, query)
				if err != nil {
					return err
				}
				fmt.Println(internal.OutputJSON(result))
				return nil
			}

			data, err := internal.ParseJSON(input)
			if err != nil {
				return err
			}
			fmt.Println(internal.OutputJSON(data))
			return nil
		},
	}

	cmd.Flags().StringVarP(&query, "query", "q", "", "JQ-like query (e.g. .name, .items[0])")
	cmd.Flags().StringVar(&diff, "diff", "", "Diff with another JSON file")
	cmd.Flags().StringVar(&merge, "merge", "", "Merge with another JSON file (patch)")
	return cmd
}
