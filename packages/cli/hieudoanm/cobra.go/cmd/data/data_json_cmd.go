package data

import (
	"encoding/json"
	"fmt"
	"io"
	"os"

	"github.com/spf13/cobra"
)

func readJSONInput(args []string) ([]byte, error) {
	if len(args) > 0 {
		input, err := os.ReadFile(args[0])
		if err != nil {
			return nil, fmt.Errorf("read file: %w", err)
		}
		return input, nil
	}
	input, err := io.ReadAll(os.Stdin)
	if err != nil {
		return nil, fmt.Errorf("read stdin: %w", err)
	}
	return input, nil
}

func parseJSON(input []byte) (interface{}, error) {
	var data interface{}
	if err := json.Unmarshal(input, &data); err != nil {
		return nil, fmt.Errorf("parse json: %w", err)
	}
	return data, nil
}

func outputJSON(data interface{}) {
	b, _ := json.MarshalIndent(data, "", "  ")
	fmt.Println(string(b))
}

func newJsonCmd() *cobra.Command {
	var query, diff, merge string
	var pretty bool

	cmd := &cobra.Command{
		Use:   "json [file]",
		Short: "Query, format, diff, and merge JSON data",
		Long:  `Pretty-print JSON, run jq-like queries, or diff/merge two JSON files.`,
		Example: `  json data.json
  json --query ".name" data.json
  json --diff file1.json file2.json
  json --merge base.json patch.json`,
		Args: cobra.MaximumNArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			if diff != "" {
				return jsonDiff(args[0], diff)
			}
			if merge != "" {
				return jsonMerge(args[0], merge)
			}

			input, err := readJSONInput(args)

			if err != nil {
				return err
			}

			if query != "" {
				data, err := parseJSON(input)
				if err != nil {
					return err
				}
				result, err := jsonQuery(data, query)
				if err != nil {
					return err
				}
				outputJSON(result)
				return nil
			}

			data, err := parseJSON(input)
			if err != nil {
				return err
			}
			outputJSON(data)
			return nil
		},
	}

	cmd.Flags().StringVarP(&query, "query", "q", "", "JQ-like query (e.g. .name, .items[0])")
	cmd.Flags().StringVar(&diff, "diff", "", "Diff with another JSON file")
	cmd.Flags().StringVar(&merge, "merge", "", "Merge with another JSON file (patch)")
	cmd.Flags().BoolVarP(&pretty, "pretty", "p", false, "Pretty-print JSON")
	return cmd
}
