package data

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
	"strings"

	"github.com/spf13/cobra"
)

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

			var input []byte
			if len(args) > 0 {
				var err error
				input, err = os.ReadFile(args[0])
				if err != nil {
					return fmt.Errorf("read file: %w", err)
				}
			} else {
				var err error
				input, err = io.ReadAll(os.Stdin)
				if err != nil {
					return fmt.Errorf("read stdin: %w", err)
				}
			}

			if query != "" {
				var data interface{}
				if err := json.Unmarshal(input, &data); err != nil {
					return fmt.Errorf("parse json: %w", err)
				}
				result, err := jsonQuery(data, query)
				if err != nil {
					return err
				}
				b, _ := json.MarshalIndent(result, "", "  ")
				fmt.Println(string(b))
				return nil
			}

			if pretty {
				var data interface{}
				if err := json.Unmarshal(input, &data); err != nil {
					return fmt.Errorf("parse json: %w", err)
				}
				b, _ := json.MarshalIndent(data, "", "  ")
				fmt.Println(string(b))
				return nil
			}

			var data interface{}
			if err := json.Unmarshal(input, &data); err != nil {
				return fmt.Errorf("parse json: %w", err)
			}
			b, _ := json.MarshalIndent(data, "", "  ")
			fmt.Println(string(b))
			return nil
		},
	}

	cmd.Flags().StringVarP(&query, "query", "q", "", "JQ-like query (e.g. .name, .items[0])")
	cmd.Flags().StringVar(&diff, "diff", "", "Diff with another JSON file")
	cmd.Flags().StringVar(&merge, "merge", "", "Merge with another JSON file (patch)")
	cmd.Flags().BoolVarP(&pretty, "pretty", "p", false, "Pretty-print JSON")
	return cmd
}

func jsonDiff(file1, file2 string) error {
	a, err := os.ReadFile(file1)
	if err != nil {
		return fmt.Errorf("read %s: %w", file1, err)
	}
	b, err := os.ReadFile(file2)
	if err != nil {
		return fmt.Errorf("read %s: %w", file2, err)
	}

	var va, vb interface{}
	json.Unmarshal(a, &va)
	json.Unmarshal(b, &vb)

	ba, _ := json.MarshalIndent(va, "", "  ")
	bb, _ := json.MarshalIndent(vb, "", "  ")

	linesA := strings.Split(string(ba), "\n")
	linesB := strings.Split(string(bb), "\n")

	max := len(linesA)
	if len(linesB) > max {
		max = len(linesB)
	}

	for i := 0; i < max; i++ {
		var la, lb string
		if i < len(linesA) {
			la = linesA[i]
		}
		if i < len(linesB) {
			lb = linesB[i]
		}
		if la != lb {
			if la != "" {
				fmt.Printf("- %s\n", la)
			}
			if lb != "" {
				fmt.Printf("+ %s\n", lb)
			}
		}
	}
	return nil
}

func jsonMerge(baseFile, patchFile string) error {
	base, err := os.ReadFile(baseFile)
	if err != nil {
		return fmt.Errorf("read base: %w", err)
	}
	patch, err := os.ReadFile(patchFile)
	if err != nil {
		return fmt.Errorf("read patch: %w", err)
	}

	var baseMap, patchMap map[string]interface{}
	if err := json.Unmarshal(base, &baseMap); err != nil {
		return fmt.Errorf("parse base: %w", err)
	}
	if err := json.Unmarshal(patch, &patchMap); err != nil {
		return fmt.Errorf("parse patch: %w", err)
	}

	for k, v := range patchMap {
		baseMap[k] = v
	}

	out, _ := json.MarshalIndent(baseMap, "", "  ")
	fmt.Println(string(out))
	return nil
}

func jsonQuery(data interface{}, query string) (interface{}, error) {
	parts := strings.Split(query, ".")
	current := data
	for _, part := range parts {
		if part == "" {
			continue
		}
		if strings.HasSuffix(part, "]") {
			idx := strings.Index(part, "[")
			if idx >= 0 {
				key := part[:idx]
				arrIdx := 0
				fmt.Sscanf(part[idx+1:len(part)-1], "%d", &arrIdx)

				if key != "" {
					m, ok := current.(map[string]interface{})
					if !ok {
						return nil, fmt.Errorf("expected object at %s", key)
					}
					current = m[key]
				}

				arr, ok := current.([]interface{})
				if !ok {
					return nil, fmt.Errorf("expected array at index %d", arrIdx)
				}
				if arrIdx >= len(arr) {
					return nil, fmt.Errorf("index %d out of bounds", arrIdx)
				}
				current = arr[arrIdx]
			}
		} else {
			m, ok := current.(map[string]interface{})
			if !ok {
				return nil, fmt.Errorf("expected object at %s", part)
			}
			var found bool
			current, found = m[part]
			if !found {
				return nil, fmt.Errorf("key %s not found", part)
			}
		}
	}
	return current, nil
}
