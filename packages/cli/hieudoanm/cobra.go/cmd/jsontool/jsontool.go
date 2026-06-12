package jsontool

import (
	"bytes"
	"encoding/json"
	"fmt"
	"os"
	"strings"

	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	var minify, validate, diff, merge bool
	var indent, query, file1, file2 string

	cmd := &cobra.Command{
		Use:   "json [json-string]",
		Short: "Format, validate, query, diff, and merge JSON",
		Long:  `Pretty-print, validate, query, diff, merge, or minify JSON from the command line.`,
		Example: `  json '{"a":1,"b":2}'
  json --minify '{"a": 1, "b": 2}'
  json --validate '{"a":1}'
  json --query .a '{"a":1,"b":2}'
  json --diff '{"a":1}' '{"a":2}'
  json --merge '{"a":1}' '{"b":2}'`,
		Args: cobra.MaximumNArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			if diff {
				return doDiff(args)
			}
			if merge {
				return doMerge(args)
			}
			if validate {
				return doValidate(args)
			}
			if query != "" {
				return doQuery(query, args)
			}

			input := readInput(args)
			if input == "" {
				return fmt.Errorf("provide a JSON string as argument or pipe input")
			}

			if minify {
				var v interface{}
				if err := json.Unmarshal([]byte(input), &v); err != nil {
					return fmt.Errorf("invalid JSON: %w", err)
				}
				b, _ := json.Marshal(v)
				fmt.Println(string(b))
				return nil
			}

			var buf bytes.Buffer
			if err := json.Indent(&buf, []byte(input), "", indent); err != nil {
				return fmt.Errorf("invalid JSON: %w", err)
			}
			fmt.Println(buf.String())
			return nil
		},
	}

	cmd.Flags().BoolVarP(&minify, "minify", "m", false, "Minify JSON output")
	cmd.Flags().BoolVarP(&validate, "validate", "v", false, "Validate JSON only")
	cmd.Flags().StringVarP(&indent, "indent", "i", "  ", "Indentation string")
	cmd.Flags().StringVarP(&query, "query", "q", "", "Query JSON using dot notation (e.g. .name, .items[0].id)")
	cmd.Flags().BoolVar(&diff, "diff", false, "Diff two JSON values")
	cmd.Flags().BoolVar(&merge, "merge", false, "Merge two JSON objects")
	cmd.Flags().StringVar(&file1, "file1", "", "First JSON file for diff/merge")
	cmd.Flags().StringVar(&file2, "file2", "", "Second JSON file for diff/merge")
	return cmd
}

func readInput(args []string) string {
	if len(args) > 0 && args[0] != "" {
		return args[0]
	}

	stat, _ := os.Stdin.Stat()
	if (stat.Mode() & os.ModeCharDevice) == 0 {
		buf := new(bytes.Buffer)
		buf.ReadFrom(os.Stdin)
		return strings.TrimSpace(buf.String())
	}

	return ""
}

func doValidate(args []string) error {
	input := readInput(args)
	if input == "" {
		return fmt.Errorf("provide JSON to validate")
	}
	var v interface{}
	if err := json.Unmarshal([]byte(input), &v); err != nil {
		fmt.Printf("Invalid JSON: %v\n", err)
	} else {
		fmt.Println("Valid JSON")
	}
	return nil
}

func doQuery(q string, args []string) error {
	input := readInput(args)
	if input == "" {
		return fmt.Errorf("provide JSON to query")
	}

	q = strings.TrimPrefix(q, ".")

	var v interface{}
	if err := json.Unmarshal([]byte(input), &v); err != nil {
		return fmt.Errorf("invalid JSON: %w", err)
	}

	result, err := queryJSON(v, strings.Split(q, "."))
	if err != nil {
		return err
	}

	b, _ := json.MarshalIndent(result, "", "  ")
	fmt.Println(string(b))
	return nil
}

func queryJSON(v interface{}, path []string) (interface{}, error) {
	current := v
	for _, part := range path {
		if part == "" {
			continue
		}
		switch node := current.(type) {
		case map[string]interface{}:
			if val, ok := node[part]; ok {
				current = val
			} else {
				return nil, fmt.Errorf("key %q not found", part)
			}
		case []interface{}:
			idx := 0
			if _, err := fmt.Sscanf(part, "%d", &idx); err != nil {
				return nil, fmt.Errorf("expected array index, got %q", part)
			}
			if idx < 0 || idx >= len(node) {
				return nil, fmt.Errorf("index %d out of range (len %d)", idx, len(node))
			}
			current = node[idx]
		default:
			return nil, fmt.Errorf("cannot traverse into %T", current)
		}
	}
	return current, nil
}

func doDiff(args []string) error {
	var a, b string
	if len(args) >= 2 {
		a, b = args[0], args[1]
	} else {
		return fmt.Errorf("diff requires two JSON arguments or --file1 and --file2")
	}

	var v1, v2 interface{}
	if err := json.Unmarshal([]byte(a), &v1); err != nil {
		return fmt.Errorf("first argument: %w", err)
	}
	if err := json.Unmarshal([]byte(b), &v2); err != nil {
		return fmt.Errorf("second argument: %w", err)
	}

	diffs := diffJSON("", v1, v2)
	if len(diffs) == 0 {
		fmt.Println("Values are identical")
		return nil
	}

	fmt.Println("Differences:")
	fmt.Println(strings.Repeat("─", 40))
	for _, d := range diffs {
		fmt.Println(d)
	}
	return nil
}

func diffJSON(path string, a, b interface{}) []string {
	var diffs []string

	switch va := a.(type) {
	case map[string]interface{}:
		vb, ok := b.(map[string]interface{})
		if !ok {
			return append(diffs, fmt.Sprintf("%s: type mismatch (%T vs %T)", path, a, b))
		}
		allKeys := make(map[string]bool)
		for k := range va {
			allKeys[k] = true
		}
		for k := range vb {
			allKeys[k] = true
		}
		for k := range allKeys {
			p := path + "." + k
			_, inA := va[k]
			_, inB := vb[k]
			if !inA {
				diffs = append(diffs, fmt.Sprintf("%s: added", p))
			} else if !inB {
				diffs = append(diffs, fmt.Sprintf("%s: removed", p))
			} else {
				diffs = append(diffs, diffJSON(p, va[k], vb[k])...)
			}
		}

	case []interface{}:
		vb, ok := b.([]interface{})
		if !ok {
			return append(diffs, fmt.Sprintf("%s: type mismatch (%T vs %T)", path, a, b))
		}
		maxLen := len(va)
		if len(vb) > maxLen {
			maxLen = len(vb)
		}
		for i := 0; i < maxLen; i++ {
			p := fmt.Sprintf("%s[%d]", path, i)
			if i >= len(va) {
				diffs = append(diffs, fmt.Sprintf("%s: added", p))
			} else if i >= len(vb) {
				diffs = append(diffs, fmt.Sprintf("%s: removed", p))
			} else {
				diffs = append(diffs, diffJSON(p, va[i], vb[i])...)
			}
		}

	default:
		if a != b {
			diffs = append(diffs, fmt.Sprintf("%s: %v != %v", path, a, b))
		}
	}

	return diffs
}

func doMerge(args []string) error {
	if len(args) < 2 {
		return fmt.Errorf("merge requires at least two JSON objects")
	}

	var result map[string]interface{}
	for i, arg := range args {
		var obj map[string]interface{}
		if err := json.Unmarshal([]byte(arg), &obj); err != nil {
			return fmt.Errorf("argument %d: %w", i+1, err)
		}
		if i == 0 {
			result = obj
		} else {
			for k, v := range obj {
				result[k] = v
			}
		}
	}

	b, _ := json.MarshalIndent(result, "", "  ")
	fmt.Println(string(b))
	return nil
}
